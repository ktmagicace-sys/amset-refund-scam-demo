# 実験群C・正解接続動画の受け取り先

シーケンス図の人物別再生には、各人物の2本を順番に結合した
`city-continuous.mp4`、`victim-continuous.mp4`、`pension-continuous.mp4`
を使用します。全場面解放後は動画ソースを切り替えず、一つのシークバーで再生します。
結合版は H.264 / 960×960 / 24fps / 音声なし / faststart です。
元動画を差し替えた場合は結合版も再生成し、`connectionVideos.ts` の章開始位置を更新してください。

## 同時再生と神視点

`parallel-call.mp4` は被害者と市役所役の電話を2画面で同時再生します。
`parallel-atm.mp4` は被害者のATM操作と年金機構役の指示を2画面で同時再生します。
いずれも映像に含まれる前後の画像がすべて配置済みの場合に解放します。
同時の画像がそろった時には、これとは別に横方向の完成演出も表示します。

`overview-continuous.mp4` は全9画像配置後の3画面動画です。
左から被害者・市役所保健課・年金機構の順で、以下の編集上の共通時系列を使います。
実際の経過時間を復元したものではなく、場面間の関係を示す学習用編集です。

- 0〜5秒：還付金の電話・口座確認（被害者と市役所が同時に動く）
- 5〜10秒：市役所から担当者への引き継ぎ（被害者は直前場面で停止）
- 10〜11.5秒：年金機構からの電話へ場面を移す
- 11.5〜16.5秒：年金機構がATMへの移動を指示
- 16.5〜21.5秒：ATM操作と指示（被害者と年金機構が同時に動く）

再生成：`AMSET_FFMPEG=/path/to/ffmpeg node scripts/build-sequence-overview.mjs`。
対応するシークバーの時間表は `src/data/sequenceOverviewVideos.ts` にあります。

このフォルダへ、動画生成AIで作った動画を置きます。現時点ではアプリは既存のCSSプレビューを使い続けます。動画が揃ったら `src/data/connectionVideos.ts` の `CONNECTION_VIDEOS_ENABLED` を `true` にすると、正しくつながったピースの絵をタップして動画を再生できます。

## 動画の要件

- 形式: `mp4` 推奨（`webm` でも受け取り可能）
- 比率: 正方形（元のカード画像と同じ）
- 音声: なし
- 各動画の開始フレーム: `fromCardId` の画像
- 各動画の終了フレーム: `toCardId` の画像
- 正しい接続ごとに1本

## ファイル名

| ファイル名 | AMSETの正解接続 |
| --- | --- |
| `city-004-005.mp4` | refund-c-004 → refund-c-005 |
| `city-005-006.mp4` | refund-c-005 → refund-c-006 |
| `victim-001-002.mp4` | refund-c-001 → refund-c-002 |
| `victim-002-003.mp4` | refund-c-002 → refund-c-003 |
| `pension-007-008.mp4` | refund-c-007 → refund-c-008 |
| `pension-008-009.mp4` | refund-c-008 → refund-c-009 |

動画は、同じ人物レーンに正しく連結した順で途切れずに再生されます。たとえば `004 → 005 → 006` がつながれば、`city-004-005.mp4` の終了直後に `city-005-006.mp4` を再生します。再生・一時停止はピース内の絵をタップします。

元のCSSプレビューへ戻す場合は、`src/data/connectionVideos.ts` の `CONNECTION_VIDEOS_ENABLED` を `false` に戻します。`video-manifest.json` の `enabled` も同じ値に合わせてください。
