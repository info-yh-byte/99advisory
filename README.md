# 99advisory

中小企業向け CFO アドバイザリーサービスのウェブサイト。

**URL:** https://99advisory.jp

---

## 技術スタック

| 項目 | 内容 |
|------|------|
| フレームワーク | Next.js 15 (App Router) |
| スタイリング | CSS（グローバル変数 + ページ内インラインスタイル） |
| コンテンツ | MDX（記事） |
| フォーム送信 | Resend（メール） + Google Sheets（ログ） |
| ホスティング | Vercel |
| デプロイ | GitHub main ブランチへの push で自動デプロイ |

---

## ディレクトリ構成

```
app/
  page.js                 # トップページ
  layout.js               # 共通レイアウト（ヘッダー・フッター）
  globals.css             # デザインシステム（CSS変数・共通クラス）
  contact/page.js         # お問い合わせフォーム
  thanks/page.js          # フォーム送信後のサンクスページ
  services/page.js        # サービス一覧
  seizo/page.js           # 財務健康診断 LP
  cashflow/page.js        # 資金繰り診断 LP
  bank-plan/page.js       # 銀行向け事業計画 LP
  monthly-report/page.js  # 月次経営レポート LP
  monthly-review/page.js  # 月次経営レビュー LP
  yojitsu/page.js         # 予実管理伴走 LP
  meeting-design/page.js  # 経営会議設計 LP
  articles/               # 記事一覧・詳細（MDX）
  company/                # 会社情報
  api/form-submit/        # フォーム送信 API（Resend + Sheets）

components/
  site/SiteHeader.js      # ヘッダー
  site/SiteFooter.js      # フッター
  lp/                     # LP共通コンポーネント（LPHero, LPSection など）
  home/                   # トップページ専用コンポーネント

content/
  site/navigation.js      # ナビゲーションリンク定義
  articles/               # MDX記事ファイル

lib/
  form-config.js          # フォーム種別・メールテンプレート設定
```

---

## デザインシステム

`app/globals.css` に CSS 変数でトークンを定義。

主な変数:

```css
--navy:    #0f1f3d   /* メインカラー（ボタン・見出し） */
--blue:    #2563eb   /* アクセントカラー */
--muted:   #64748b   /* 本文サブテキスト */
--hint:    #94a3b8   /* 注釈・補足テキスト */
--bg:      #ffffff   /* 背景 */
--surface: #f8fafc   /* カード背景 */
--border:  #e2e8f0   /* ボーダー */
```

各ページは `<style>` タグでページ固有の CSS を持つ。クラス名にプレフィックスをつけて衝突を避ける。

| ページ | プレフィックス |
|--------|--------------|
| トップ | `hp-` |
| サービス一覧 | `sv-` |
| 財務健康診断 | `sz-` |
| 資金繰り診断 | `cf-` |
| 銀行向け事業計画 | `bp-` |
| 月次経営レポート | `mr-` |
| 月次経営レビュー | `rv-` |
| 予実管理伴走 | `yj-` |
| 経営会議設計 | `md-` |
| お問い合わせ | `ct-` |
| サンクス | `th-` |

---

## フォームの仕組み

1. 各 LP・contact ページのフォームが `POST /api/form-submit` に送信
2. `lib/form-config.js` で `formType` に応じたメールテンプレートを解決
3. Resend でユーザーへの自動返信メール・管理者への通知メールを送信
4. Google Sheets にリードを記録
5. クライアント側で `router.push('/thanks?service={slug}')` に遷移

`formType` 一覧（`lib/form-config.js` 参照）:

| formType | 用途 |
|----------|------|
| `seizo_download` | 財務健康診断 |
| `cashflow_download` | 資金繰り診断 |
| `bankplan_download` | 銀行向け事業計画 |
| `monthly_report_contact` | 月次経営レポート |
| `monthly_review_contact` | 月次経営レビュー |
| `yojitsu_contact` | 予実管理伴走 |
| `meeting_design_contact` | 経営会議設計 |
| `general` | お問い合わせ（contact） |

---

## 環境変数

`.env.local`（ローカル）と Vercel の Environment Variables（本番）に同じ値を登録する。

```
RESEND_API_KEY=
GOOGLE_SHEET_ID=
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
```

---

## 開発の進め方

```bash
npm install
npm run dev    # localhost:3000 で開発サーバー起動
npm run build  # 本番ビルド確認
```

新しい機能を作るときは main からブランチを切る:

```bash
git checkout -b feat/xxx
# 作業・確認
git add .
git commit -m "feat: xxx"
git push origin feat/xxx
# → Vercel がプレビューURLを自動生成（確認用）
# → 問題なければ main にマージ → 本番に自動反映
```

ブランチはマージしたら削除する（使い捨て）:

```bash
git branch -d feat/xxx
git push origin --delete feat/xxx
```

---

## 残タスク

- [ ] `/privacy`・`/terms`・`/legal` のコンテンツ実装
- [ ] 記事の追加（`content/articles/` に MDX ファイルを追加）
