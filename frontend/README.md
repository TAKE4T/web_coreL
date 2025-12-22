# Code & Copy Forge - Webメディア

ダイアモンドオンライン風のWebメディアプラットフォーム。Next.js + Headless WordPressで構築。

## 技術スタック

- **フロントエンド**: Next.js 16 (App Router)
- **スタイリング**: Tailwind CSS
- **バックエンド**: WordPress (Headless CMS)
- **デプロイ**: Vercel
- **言語**: TypeScript

## 機能

- ✅ レスポンシブデザイン（モバイルファースト）
- ✅ WordPress REST API連携
- ✅ ISR（Incremental Static Regeneration）対応
- ✅ SEO最適化
- ✅ 記事一覧・詳細ページ
- ✅ カテゴリー別表示
- ✅ ダイアモンドオンライン風デザイン

## セットアップ

### 1. 環境変数の設定

`.env.local`ファイルを作成し、WordPress APIのURLを設定：

```bash
NEXT_PUBLIC_WORDPRESS_API_URL=http://www.corel.tooling-hub.com/wp-json/wp/v2
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開く。

## Vercelへのデプロイ

### 方法1: Vercel CLIを使用

```bash
# Vercel CLIのインストール
npm install -g vercel

# ログイン
vercel login

# デプロイ
vercel
```

### 方法2: GitHubと連携

1. GitHubリポジトリを作成
2. コードをプッシュ
3. Vercelダッシュボードで「Import Project」
4. 環境変数を設定：
   - `NEXT_PUBLIC_WORDPRESS_API_URL`

### 環境変数（Vercel）

Vercelダッシュボード → Settings → Environment Variables で以下を設定：

- `NEXT_PUBLIC_WORDPRESS_API_URL`: WordPressのREST API URL

## プロジェクト構造

```
frontend/
├── app/                    # Next.js App Router
│   ├── posts/[slug]/      # 記事詳細ページ
│   ├── page.tsx           # トップページ
│   ├── layout.tsx         # レイアウト
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── Header.tsx         # ヘッダー
│   ├── Footer.tsx         # フッター
│   └── ArticleCard.tsx    # 記事カード
├── lib/                   # ユーティリティ
│   └── wordpress.ts       # WordPress API
├── public/                # 静的ファイル
└── .env.local            # 環境変数（ローカル）
```

## WordPress設定

### 必要なプラグイン

WordPress側で以下の設定を確認：

1. **パーマリンク設定**: 「投稿名」を選択
2. **REST API**: 有効化されていることを確認
3. **CORS設定** (必要に応じて):
   ```php
   add_action('rest_api_init', function() {
       remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
       add_filter('rest_pre_serve_request', function($value) {
           header('Access-Control-Allow-Origin: *');
           header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
           header('Access-Control-Allow-Credentials: true');
           return $value;
       });
   }, 15);
   ```

## トラブルシューティング

### 記事が表示されない

1. WordPress REST APIが有効か確認：
   ```
   http://www.corel.tooling-hub.com/wp-json/wp/v2/posts
   ```
2. 環境変数が正しく設定されているか確認

### CORSエラー

WordPress側でCORS設定を追加（上記参照）

### ビルドエラー

```bash
# キャッシュをクリア
rm -rf .next
npm run build
```
