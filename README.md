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
├── public/                     # 静的ファイルやビルド済みページを格納
│   ├── index.html              # ルート HTML。metaタグやOGP設定などを含む [oai_citation:0‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/public#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fpublic%2Findex.html%22%20%7D)
│   ├── bank-plan/              # 銀行融資プラン紹介用の静的ページ [oai_citation:1‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/public#:~:text=%7B%20%22name%22%3A%20%22bank,plan)
│   │   └── index.html          # 銀行プランの LP。本番環境で直接公開される [oai_citation:2‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/public/bank-plan#:~:text=%22name%22%3A%20%22index.html%22%2C%20%22path%22%3A%20%22public%2Fbank,plan%2Findex.html%22%2C%20%22type%22%3A%20%22file)
│   ├── cashflow/               # キャッシュフロー計画ページ [oai_citation:3‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/public#:~:text=%7B%20,ai%2F99advisory%2Ftree%2Fmain%2Fpublic%2Fcashflow%22)
│   │   └── index.html          # キャッシュフロー改善サービスの LP [oai_citation:4‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/public/cashflow#:~:text=%7B%20,)
│   └── diagnosis/              # 経営診断ツール関連
│       └── kgi/                # KGI診断ページ
│           ├── index.html      # KGI診断トップページ [oai_citation:5‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/public/diagnosis/kgi#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fpublic%2Fdiagnosis%2Fkgi%2Findex.html%22)
│           ├── index 2.html    # 診断ページの旧版／別バージョン [oai_citation:6‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/public/diagnosis/kgi#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fpublic%2Fdiagnosis%2Fkgi%2Findex%25202.html%22)
│           ├── package-lock.json # 診断ページ用の依存関係ロックファイル [oai_citation:7‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/public/diagnosis/kgi#:~:text=%7B%20%22name%22%3A%20%22package,lock.json%22%2C%20%22type%22%3A%20%22file%22%2C%20%22_links%22%3A)
│           └── assets/
│               └── index-*.js  # 診断ページ用にビルドされた JavaScript [oai_citation:8‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/public/diagnosis/kgi/assets#:~:text=%7B%20%22name%22%3A%20%22index,B4ZNXHmR.js%22%20%7D)
├── src/                        # React アプリケーションのソースコード [oai_citation:9‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fconstants.js%22%20%7D)
│   ├── index.js                # React のエントリーポイント [oai_citation:10‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src#:~:text=%7B%20,https%3A%2F%2Fapi.github.com%2Frepos%2F99tsukumoinfo)
│   ├── index.css               # グローバル CSS、レスポンシブ設定 [oai_citation:11‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Findex.css%22)
│   ├── App.js                  # 全コンポーネントを組み立てるルートコンポーネント [oai_citation:12‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2FApp.js%22)
│   ├── constants.js            # カラー定数や外部URLなどのユーティリティ [oai_citation:13‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fconstants.js%22%20%7D)
│   ├── components/             # UI を構成する再利用可能なコンポーネント群 [oai_citation:14‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FAbout.js%22)
│   │   ├── Header.js          # 固定ヘッダーとモバイルメニュー [oai_citation:15‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FAbout.js%22)
│   │   ├── Hero.js            # ファーストビューのヒーローセクション [oai_citation:16‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=%7B%20,ai%2F99advisory%2Fmain%2Fsrc%2Fcomponents%2FHero.js%22%2C%20%22type%22%3A%20%22file)
│   │   ├── TrustBadges.js     # NDA締結や無料などの安心バッジ [oai_citation:17‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FTrustBadges.js%22%20%7D)
│   │   ├── ProblemGrid.js     # ユーザのお悩みを6枚のカードで提示 [oai_citation:18‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FProblemGrid.js)
│   │   ├── ServiceSelector.js # 「どのサービスを選べば良いか？」導線 [oai_citation:19‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FServiceSelector.js%22)
│   │   ├── PricingTable.js    # 各サービスと料金を表示するカード [oai_citation:20‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FPricingTable.js%22)
│   │   ├── SampleCards.js     # 提供する成果物サンプルのカード [oai_citation:21‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FSampleCards.js%22)
│   │   ├── ReasonList.js      # 選ばれる理由を箇条書きで紹介 [oai_citation:22‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FReasonList.js)
│   │   ├── Scope.js           # よく寄せられる相談領域（信頼セクション） [oai_citation:23‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FScope.js)
│   │   ├── DiagBanner.js      # 経営診断への誘導バナー [oai_citation:24‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FDiagBanner.js%22)
│   │   ├── Flow.js            # 相談から利用までのフロー [oai_citation:25‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FFlow.js%22)
│   │   ├── FAQ.js             # よくある質問をアコーディオン形式で表示 [oai_citation:26‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FFAQ.js%22)
│   │   ├── Fit.js             # サービスの向き・不向きを説明 [oai_citation:27‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FFit.js%22)
│   │   ├── About.js           # 運営者についての紹介 [oai_citation:28‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FAbout.js%22)
│   │   ├── FinalCTA.js        # サイト全体の最後に配置するCTAボタン [oai_citation:29‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=,ai%2F99advisory%2Fmain%2Fsrc%2Fcomponents%2FFinalCTA.js%22%2C%20%22type%22%3A%20%22file)
│   │   ├── Footer.js          # フッターセクション（リンク、会社情報など） [oai_citation:30‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FFooter.js%22)
│   │   ├── BottomBar.js       # モバイル用の固定フローティングCTA [oai_citation:31‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FBottomBar.js)
│   │   └── Heading.js         # セクション見出しの再利用コンポーネント [oai_citation:32‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/components#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fcomponents%2FHeading.js%22)
│   └── data/                  # 表示に用いるデータをまとめたモジュール [oai_citation:33‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/data#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fdata%2Ffaqs.js)
│       ├── problems.js        # お悩みカード用データ [oai_citation:34‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/data#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fdata%2Fproblems.js%22)
│       ├── services.js        # 各サービスと料金のデータ [oai_citation:35‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/data#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fdata%2Fservices.js)
│       ├── samples.js         # 成果物サンプルのデータ [oai_citation:36‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/data#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fdata%2Fsamples.js)
│       ├── faqs.js            # FAQ一覧のデータ [oai_citation:37‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/data#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fdata%2Ffaqs.js)
│       └── reasons.js         # 選ばれる理由のデータ [oai_citation:38‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/src/data#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fsrc%2Fdata%2Freasons.js)
├── package.json               # プロジェクト設定と依存関係定義 [oai_citation:39‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fpackage.json%22)
├── package-lock.json          # 依存パッケージのロックファイル [oai_citation:40‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fpackage.json%22)
├── .gitignore                 # Git で管理しないファイルを指定する設定 [oai_citation:41‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fpackage.json%22)
├── README.md                  # プロジェクトの概要やセットアップ手順 [oai_citation:42‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Fpackage.json%22)
├── vercel.json                # Vercel デプロイ用設定 [oai_citation:43‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Fvercel.json%22%2C%20%22git_url%22%3A%20%22https%3A%2F%2Fapi.github.com%2Frepos%2F99tsukumoinfo)
├── tmp_kgi_backup/            # KGI 診断用の一時バックアップ（旧構成） [oai_citation:44‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_backup#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Ftmp_kgi_backup%2Findex.html%22)
│   ├── index.html             # 診断ページの旧 HTML [oai_citation:45‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_backup#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Ftmp_kgi_backup%2Findex.html)
│   ├── package.json           # バックアップ用の package 定義 [oai_citation:46‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_backup#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Ftmp_kgi_backup%2Fpackage.json%22)
│   ├── vite.config.js         # Vite 用のビルド設定 [oai_citation:47‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_backup#:~:text=,)
│   └── src/                   # 旧Reactソース（App.jsx 等） [oai_citation:48‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_backup/src#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Ftmp_kgi_backup%2Fsrc%2Fmain.jsx%22%20%7D)
│       ├── App.jsx           # 旧アプリケーションコンポーネント [oai_citation:49‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_backup/src#:~:text=%5B%20%7B%20,ai%2F99advisory%2Fmain%2Ftmp_kgi_backup%2Fsrc%2FApp.jsx%22%2C%20%22type%22%3A%20%22file)
│       └── main.jsx          # 旧版のエントリーポイント [oai_citation:50‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_backup/src#:~:text=,ai%2F99advisory%2Fmain%2Ftmp_kgi_backup%2Fsrc%2Fmain.jsx%22%2C%20%22type%22%3A%20%22file)
└── tmp_kgi_src/               # KGI 診断サイト全体のバックアップコピー [oai_citation:51‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_src/99advisory#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Ftmp_kgi_src%2F99advisory%2Fvercel.json%22%20%7D%20%7D)
    └── 99advisory/           # プロジェクト一式をまるごと複製したディレクトリ
        ├── public/           # 上記 `public` とほぼ同じ内容 [oai_citation:52‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_src/99advisory#:~:text=,ai%2F99advisory%2Fgit%2Ftrees%2Ffba189b6c247cf863b263c92f782ee0f5ce8f870)
        ├── src/              # 上記 `src` とほぼ同じ内容 [oai_citation:53‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_src/99advisory#:~:text=,ai%2F99advisory%2Ftree%2Fmain%2Ftmp_kgi_src%2F99advisory%2Fsrc)
        ├── README.md         # バックアップ用 README [oai_citation:54‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_src/99advisory#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Ftmp_kgi_src%2F99advisory%2FREADME.md%22)
        ├── package.json      # バックアップ用 package [oai_citation:55‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_src/99advisory#:~:text=,ai%2F99advisory%2Fblob%2Fmain%2Ftmp_kgi_src%2F99advisory%2Fpackage.json%22)
        ├── .gitignore        # バックアップ用 gitignore [oai_citation:56‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_src/99advisory#:~:text=%7B%20,ai%2F99advisory%2Fblob%2Fmain%2Ftmp_kgi_src%2F99advisory%2F.gitignore%22)
        └── vercel.json       # バックアップ用 vercel 設定 [oai_citation:57‡api.github.com](https://api.github.com/repos/99tsukumoinfo-ai/99advisory/contents/tmp_kgi_src/99advisory#:~:text=,ai%2F99advisory%2Fgit%2Fblobs%2F6e52bccc078538c3c5c6efe65a8a5573fd9a8b9d%22%2C%20%22html%22%3A%20%22https%3A%2F%2Fgithub.com%2F99tsukumoinfo)
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
