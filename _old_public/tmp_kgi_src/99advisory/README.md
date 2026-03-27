# 99advisory.jp

中小企業向け CFO型伴走支援サービスのウェブサイト。

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動（localhost:3000）
npm start

# 本番ビルド
npm run build
```

## デプロイ

`npm run build` で生成される `build/` フォルダをそのままホスティングに配置。

対応ホスティング例：
- Vercel（推奨・GitHub連携で自動デプロイ）
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront

## プロジェクト構造

```
99advisory/
├── public/
│   ├── index.html          # meta / OGP / 構造化データ
│   ├── favicon.ico         # ← 要差し替え
│   └── ogp.png             # ← 要作成（1200x630px）
├── src/
│   ├── index.js            # Reactエントリーポイント
│   ├── index.css           # グローバルCSS・レスポンシブ
│   ├── App.js              # 全コンポーネントの組み立て
│   ├── constants.js        # カラー定数・URL・ユーティリティ
│   ├── components/
│   │   ├── Header.js       # 固定ヘッダー・モバイルメニュー
│   │   ├── Hero.js         # ファーストビュー
│   │   ├── TrustBadges.js  # 安心バッジ（NDA・無料 etc）
│   │   ├── ProblemGrid.js  # お悩みから探す（6カード）
│   │   ├── ServiceSelector.js  # どれを選べばいい？（導線）
│   │   ├── PricingTable.js # サービス・料金カード
│   │   ├── SampleCards.js  # 成果物サンプル
│   │   ├── ReasonList.js   # 選ばれている理由
│   │   ├── Scope.js        # ご相談の多い領域（信頼セクション）
│   │   ├── DiagBanner.js   # 経営診断バナー
│   │   ├── Flow.js         # ご相談の流れ
│   │   ├── FAQ.js          # よくあるご質問（アコーディオン）
│   │   ├── Fit.js          # 向き・不向きセクション
│   │   ├── About.js        # 私たちについて
│   │   ├── FinalCTA.js     # 最終CTA
│   │   ├── Footer.js       # フッター
│   │   ├── BottomBar.js    # 固定フローティングCTA
│   │   └── Heading.js      # 再利用セクション見出し
│   └── data/
│       ├── problems.js     # お悩みデータ
│       ├── services.js     # サービス・料金データ
│       ├── samples.js      # サンプル資料データ
│       ├── faqs.js         # FAQデータ
│       └── reasons.js      # 選ばれる理由データ
├── package.json
├── .gitignore
└── README.md
```

## ページ構成（セクション順）

1. **Hero** — 決算書や試算表は見ている。でも、次の一手に自信が持てない。
2. **TrustBadges** — 初回30分無料 / NDA / 顧問税理士と併用OK etc
3. **ProblemGrid** — お悩みから探す（6カード）
4. **ServiceSelector** — どれを選べばいい？（悩み→サービス対応表）
5. **PricingTable** — サービスと料金
6. **SampleCards** — 実際にお渡しする資料のサンプル
7. **ReasonList** — 選ばれている理由
8. **Scope** — こんなご相談に対応しています（年商規模・業種・テーマ）
9. **DiagBanner** — 1分でわかる、何を先に見るべきか診断
10. **Flow** — ご相談の流れ（3ステップ）
11. **FAQ** — よくあるご質問（アコーディオン）
12. **Fit** — 向いているケース / 他をお勧めするケース
13. **About** — 私たちについて
14. **FinalCTA** — 最終コンバージョンセクション
15. **Footer**
16. **BottomBar** — スクロール追従CTA（無料相談 + 診断）

## 文言を変えたいとき

`src/data/` 以下のファイルを編集するだけでOK。コンポーネントに触る必要なし。

| 変えたい内容 | 編集ファイル |
|---|---|
| お悩みカード | `src/data/problems.js` |
| サービス名・料金・説明 | `src/data/services.js` |
| サンプル資料 | `src/data/samples.js` |
| FAQ | `src/data/faqs.js` |
| 選ばれる理由 | `src/data/reasons.js` |
| CTA URL・カラー | `src/constants.js` |

## meta情報

`public/index.html` に以下を設置済み：

- `<title>` + `<meta description>`
- OGP (Open Graph) タグ一式
- Twitter Card タグ
- 構造化データ（ProfessionalService）
- canonical URL（末尾スラッシュ統一）

## OGP画像（未作成）

`public/ogp.png` を1200x630pxで作成してください。

入れる要素：
- 99advisory ロゴ or サービス名
- 1フレーズ（例：「中小企業の"数字の壁打ち相手"」）
- ティール系の背景

作成ツール：Canva / Figma

## URL設計（末尾スラッシュあり統一）

| ページ | URL |
|---|---|
| トップ | `https://99advisory.jp/` |
| 資金繰りLP | `https://99advisory.jp/cashflow/` |
| 広告ROI LP | `https://99advisory.jp/advertising-roi/` |
| 銀行向け事業計画 LP | `https://99advisory.jp/bank-plan/` |

## 確認ツール

- OGP確認: https://developers.facebook.com/tools/debug/
- 構造化データ確認: https://search.google.com/test/rich-results

## 今後の拡張

- 個別LP追加時は `react-router-dom` を導入
- ページが5本以上になったら `react-helmet` でmeta管理
- ABテスト用にデータファイルを差し替えるだけで対応可
