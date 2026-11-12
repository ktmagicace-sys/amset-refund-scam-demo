# エンディングイラスト

## v2: 本編と画風を統一

現行表示は `official-v2.webp`, `grandson-v2.webp`, `staff-v2.webp`, `handoff-v2.webp`, `loss-v2.webp`, `late-v2.webp`。
ビルトイン画像生成ツールによる style-transfer 編集。Image 1 は同名の旧 `.webp`（場面参照）、Image 2 は `public/storyboards/refund-c-001-refund-call.png`（人物と画風のマスター参照）。生成PNGをWebP品質88へ符号化。旧画像は未変更。

最終共通プロンプト:

> Use case: style-transfer. Asset: ending illustration for an existing Japanese fraud-prevention game. Image 1 is the edit target: preserve its story event, actors' roles and setting. Image 2 is the MASTER STYLE AND GRANDMOTHER IDENTITY reference, which must dominate. Redraw the entire target in EXACTLY the same simple rounded flat children's educational illustration style as Image 2: softly textured cut-paper/gouache surfaces, very simple oval black eyes, minimal facial details, no realistic contour outlines, no anime realism, no cinematic detailed shading. Grandmother must be the same round-faced elderly Japanese woman as image 2, same short blue-gray wavy hair silhouette, mint-green cardigan, cream scalloped-collar blouse, same simplified facial proportions and hands. Other people and environment must be equally simplified, friendly educational illustrations. Muted mint, cream, warm wood, soft blue. Landscape 3:2 composition, no text, lettering, logos, numbers, interface, captions or watermark. Preserve whether the outcome is safe or sad; do not make bad endings look triumphant.

grandson のみ追加:

> Show the grandmother and her adult grandson talking safely at home, phone call ended, two cups of tea visible; no active scam call.

## 初版（保存用）

OpenAI built-in image generation で生成したプロジェクト用画像。元のPNGをWebPへ符号化して配置。
13の介入方法ごとに小説を作成し、状況に合う6種類のイラストを共有する。

| ファイル | 対応する結末 |
| --- | --- |
| official.webp | 電話を切り、公式窓口へ確認して送金を防ぐ |
| grandson.webp | 孫への相談で誘導を止める |
| staff.webp | 送金確定前に銀行職員へ相談する |
| handoff.webp | 引き継ぎは止まるが、危険は残る |
| loss.webp | 送金被害が発生する |
| late.webp | 送金後に家族と銀行へ相談する。回復は未確定 |

## 最終プロンプトセット

各画像は次の共通プロンプトと、それぞれの Scene を結合して生成。

> Use case: illustration-story. Asset: one standalone ending illustration for a Japanese anti-fraud narrative game, landscape composition, no text, no letters, no numbers, no watermark, no panels except if requested. Consistent heroine: elderly Japanese woman with short wavy gray hair, gentle round face, green cardigan over a cream blouse. Style: polished hand-drawn storybook animation, clear linework, soft painted shading, warm restrained colors, grounded contemporary Japanese setting.

- official — Scene: At home, the elderly woman has hung up a suspicious call and is calmly checking a city office official number on paper with a landline phone, warm afternoon light, relief, no officials in scene.
- grandson — Scene: The elderly woman at her front door is gently stopped by her adult grandson in casual blue clothes; he listens and helps her end a suspicious mobile call. They stay home together, caring hopeful mood.
- staff — Scene: Inside a Japanese bank ATM lobby, a female bank employee in navy uniform gently helps the elderly woman put away her phone BEFORE operating an ATM. Welcoming human intervention, hopeful mood.
- handoff — Scene: A split-composition narrative illustration of two suited male scammers in separate offices; the city-office impostor has ended the handoff phone call, a document with blank lines lies closed; the pension-office impostor waits with no information. The elderly woman at home in a small background vignette is still uncertain, not triumphant.
- loss — Scene: The elderly woman alone at a Japanese ATM looking shocked at a blank transaction receipt after realizing she has transferred her money, subdued blue evening light. Respectful empathetic framing, no victim-blaming.
- late — Scene: After a fraudulent transfer the elderly woman sits with an adult grandson at home contacting a real bank on a landline, receipt on table, serious but supportive mood. No suggestion money has been recovered, sober evening light.
