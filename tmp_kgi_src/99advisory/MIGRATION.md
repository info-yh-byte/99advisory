# 99advisory 移行ガイド: GitHub Pages → React + Vercel

## 概要

現在の構成（静的HTML + GitHub Pages）を、React + Vercel に移行する。
既存の cashflow LP と diagnosis/kgi はそのまま動く形で移行する。

---

## 移行後のファイル構造

```
info-yh-byte/                   ← 既存リポジトリ
├── public/
│   ├── index.html              ← NEW（meta/OGP入り）
│   ├── favicon.ico             ← 後で追加
│   ├── ogp.png                 ← 後で追加
│   ├── cashflow/
│   │   └── index.html          ← 既存をそのまま移動
│   └── diagnosis/
│       └── kgi/
│           ├── index.html      ← 既存をそのまま移動
│           └── (その他ファイル)
├── src/
│   ├── index.js
│   ├── index.css
│   ├── App.js
│   ├── constants.js
│   ├── components/  (18ファイル)
│   └── data/        (5ファイル)
├── package.json
├── vercel.json
├── .gitignore
└── README.md
```

---

## 手順（全7ステップ）

### STEP 1: 99advisory.zip を展開してリポジトリにコピー

```bash
# リポジトリをクローン（まだなら）
git clone https://github.com/info-yh-byte/info-yh-byte.github.io.git
cd info-yh-byte.github.io

# 99advisory.zip を展開
unzip ~/Downloads/99advisory.zip

# src/, public/, package.json などをリポジトリにコピー
cp -r 99advisory/src ./
cp -r 99advisory/public ./
cp 99advisory/package.json ./
cp 99advisory/vercel.json ./    # もしZIPに入ってなければ後で作る
cp 99advisory/README.md ./
```

### STEP 2: 既存ファイルを移動

```bash
# cashflow LP を public/ 内に移動
mkdir -p public/cashflow
mv cashflow/index.html public/cashflow/index.html

# diagnosis/kgi を public/ 内に移動
mkdir -p public/diagnosis/kgi
cp -r diagnosis/kgi/* public/diagnosis/kgi/

# 旧トップページを削除（Reactに置き換わる）
rm index.html

# 旧フォルダを削除
rm -rf cashflow/
rm -rf diagnosis/

# GitHub Pages 用のワークフローを削除（Vercelに移行するため）
rm -rf .github/

# CNAME は不要（Vercelでドメイン設定する）
rm CNAME
```

### STEP 3: vercel.json を作成

ルートに以下の内容で `vercel.json` を作成：

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "create-react-app",
  "rewrites": [
    {
      "source": "/cashflow",
      "destination": "/cashflow/index.html"
    },
    {
      "source": "/diagnosis/kgi",
      "destination": "/diagnosis/kgi/index.html"
    }
  ],
  "trailingSlash": true
}
```

### STEP 4: .gitignore を更新

```
node_modules/
build/
.DS_Store
.env
.env.local
npm-debug.log*
```

### STEP 5: ローカルで動作確認

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm start
```

ブラウザで http://localhost:3000 を開いてトップページを確認。

> 注意: cashflow/ と diagnosis/kgi/ はローカル開発サーバーでは
> React経由では見えない（public/ の静的ファイルとして配信される）。
> Vercelにデプロイ後に /cashflow/ と /diagnosis/kgi/ が正常に動くか確認。

### STEP 6: GitHubにプッシュ

```bash
git add .
git commit -m "Migrate to React + Vercel"
git push origin main
```

### STEP 7: Vercelでデプロイ

1. https://vercel.com にアクセス（GitHubアカウントでログイン）
2. 「Import Project」→ GitHubリポジトリ `info-yh-byte` を選択
3. Framework は「Create React App」が自動検出されるはず
4. そのまま「Deploy」

デプロイ完了後：
- https://xxxxx.vercel.app/ でトップページが表示される
- https://xxxxx.vercel.app/cashflow/ で資金繰りLPが表示される
- https://xxxxx.vercel.app/diagnosis/kgi/ で診断が表示される

### STEP 8: カスタムドメイン設定

1. Vercel ダッシュボード → プロジェクト → Settings → Domains
2. `99advisory.jp` を追加
3. DNS設定を変更：

**お名前.com / ムームードメイン等の場合：**

| タイプ | ホスト | 値 |
|---|---|---|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

4. DNS反映を待つ（数分〜数時間）
5. Vercelが自動でSSL証明書を発行

> ⚠ GitHub Pages の設定は先に無効化しておくこと
> （リポジトリ → Settings → Pages → Source を "None" に変更）

---

## 確認チェックリスト

- [ ] `npm start` でローカルにトップページが表示される
- [ ] Vercelにデプロイが成功した
- [ ] https://99advisory.jp/ で新トップページが表示される
- [ ] https://99advisory.jp/cashflow/ でLPが表示される
- [ ] https://99advisory.jp/diagnosis/kgi/ で診断が表示される
- [ ] OGPが正しく表示される（Facebook Debuggerで確認）
- [ ] スマホ表示が崩れていない

---

## トラブルシューティング

### cashflow ページが 404 になる
→ `public/cashflow/index.html` が存在するか確認。
→ cashflow LP 内のCSS/JSパスが相対パスか確認（`./style.css` 等）。

### diagnosis/kgi が動かない
→ diagnosis/kgi が独自の React app の場合、ビルド済みファイルを
  `public/diagnosis/kgi/` に入れる必要がある。
→ もしソースのみの場合は、先にビルドして dist/ の中身を配置。

### ドメインが反映されない
→ DNS変更後、最大48時間かかる場合がある。
→ `dig 99advisory.jp` で A レコードが 76.76.21.21 を向いているか確認。

### GitHub Pages が競合する
→ リポジトリ Settings → Pages → Source を "None" にする。
→ `.github/workflows/` を削除する。
