const BASE = '/amset-refund-scam-demo/';
const CACHE_PREFIX = 'amset-refund-demo-';
const READY_URL = `${BASE}offline-ready`;

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

async function getReadyCache() {
  const names = (await caches.keys()).filter((name) => name.startsWith(CACHE_PREFIX)).reverse();
  for (const name of names) {
    const cache = await caches.open(name);
    if (await cache.match(READY_URL)) return cache;
  }
  return null;
}

async function fetchWithRetry(request) {
  let failure;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(request);
      if (response.ok && response.status === 200) return response;
      failure = new Error(`HTTP ${response.status}`);
    } catch (error) {
      failure = error;
    }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
  }
  throw failure ?? new Error('通信を確認してください');
}

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'download' || !event.ports[0]) return;
  const port = event.ports[0];
  event.waitUntil((async () => {
    const manifestResponse = await fetchWithRetry(new Request(`${BASE}offline-pack.json`, { cache: 'reload' }));
    const manifest = await manifestResponse.json();
    const cache = await caches.open(`${CACHE_PREFIX}${manifest.version}`);
    let done = 0;
    let bytes = 0;
    for (const file of manifest.files) {
      const request = new Request(`${BASE}${file.path}`, { cache: 'reload' });
      if (!await cache.match(request)) {
        const response = await fetchWithRetry(request);
        await cache.put(request, response);
      }
      done++;
      bytes += file.bytes;
      port.postMessage({ type: 'progress', done, total: manifest.files.length, bytes, totalBytes: manifest.totalBytes });
    }
    await cache.put(READY_URL, new Response(manifest.version));
    for (const name of await caches.keys()) {
      if (name.startsWith(CACHE_PREFIX) && name !== `${CACHE_PREFIX}${manifest.version}`) await caches.delete(name);
    }
    port.postMessage({ type: 'complete', total: manifest.files.length, bytes, totalBytes: manifest.totalBytes });
  })().catch((error) => port.postMessage({ type: 'error', message: `保存できませんでした。通信を確認して再試行してください（${error instanceof Error ? error.message : '通信エラー'}）` })));
});

async function respondToRange(cached, rangeHeader) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader);
  if (!match) return cached;
  const data = await cached.arrayBuffer();
  const length = data.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, length - Number(match[2]));
  const end = match[2] && match[1] ? Math.min(length - 1, Number(match[2])) : length - 1;
  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= length) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${length}` } });
  }
  return new Response(data.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': cached.headers.get('Content-Type') ?? 'application/octet-stream',
      'Content-Length': String(end - start + 1),
      'Content-Range': `bytes ${start}-${end}/${length}`,
      'Accept-Ranges': 'bytes',
    },
  });
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
  event.respondWith((async () => {
    const cache = await getReadyCache();
    if (request.mode === 'navigate' && (url.pathname === BASE || url.pathname === `${BASE}index.html`)) {
      try {
        return await fetch(request);
      } catch {
        return await cache?.match(`${BASE}index.html`) ?? Response.error();
      }
    }
    const cached = await cache?.match(request, { ignoreSearch: true });
    if (cached) return request.headers.has('Range') ? respondToRange(cached, request.headers.get('Range')) : cached;
    try {
      return await fetch(request);
    } catch {
      return Response.error();
    }
  })());
});
