# コア・ランゲージ・ハブ

ビジネス成長のための実践的なマーケティング、デザイン、フレームワークの知識を提供するWebメディア

## 技術スタック

- **フロントエンド**: Next.js 16 (App Router) + TypeScript
- **スタイリング**: Tailwind CSS v4
- **CMS**: WordPress (Headless)
- **デプロイ**: Vercel

## プロジェクト構成

```
web_coreL/
├── frontend/              # Next.jsアプリケーション
│   ├── app/              # App Routerページ
│   ├── components/       # Reactコンポーネント
│   ├── lib/              # WordPress APIクライアント
│   └── public/           # 静的ファイル
├── wordpress-cors-setup.php  # WordPress CORS設定
└── README.md
```

## ローカル開発環境のセットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/TAKE4T/web_coreL.git
cd web_coreL
```

### 2. 依存関係のインストール

```bash
cd frontend
npm install
```

### 3. 環境変数の設定

`.env.local`ファイルを作成：

```bash
cp .env.example .env.local
```

内容：
```
NEXT_PUBLIC_WORDPRESS_API_URL=https://wpcore-l.tooling-hub.com/wp-json/wp/v2
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

`http://localhost:3000` にアクセス

## Vercelへのデプロイ方法

### 重要：Root Directoryの設定

Vercelにデプロイする際は、以下の設定が**必須**です：

#### 1. Vercelダッシュボードでプロジェクトを開く

- https://vercel.com/dashboard にアクセス
- プロジェクト「web_coreL」を選択
- **Settings** → **General** に移動

#### 2. Root Directoryを設定

- **Root Directory** セクションを見つける
- **Edit** をクリック
- `frontend` と入力
- **Save** をクリック

#### 3. 環境変数の設定

- **Settings** → **Environment Variables** に移動
- 以下の環境変数を追加：

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | `https://wpcore-l.tooling-hub.com/wp-json/wp/v2` |

#### 4. 再デプロイ

- **Deployments** タブに移動
- 最新のデプロイの右側の「...」メニューをクリック
- **Redeploy** をクリック

### デプロイURL

- **本番環境**: https://core-l.tooling-hub.com/

## WordPress REST API

### エンドポイント

- **ベースURL**: `https://wpcore-l.tooling-hub.com/wp-json/wp/v2`
- **記事一覧**: `/posts`
- **カテゴリー**: `/categories`

### CORS設定

WordPress側で `wordpress-cors-setup.php` を使用してCORSを有効化しています。

## トラブルシューティング

### 404エラーが発生する場合

1. Vercelの **Root Directory** が `frontend` に設定されているか確認
2. 環境変数 `NEXT_PUBLIC_WORDPRESS_API_URL` が設定されているか確認
3. Vercelで再デプロイを実行

### WordPress記事が表示されない場合

1. WordPress REST APIが正常に動作しているか確認：
   ```bash
   curl https://wpcore-l.tooling-hub.com/wp-json/wp/v2/posts
   ```

2. `.env.local`のURLが正しいか確認

3. WordPressのパーマリンク設定を再保存

## 今後の開発予定

- [ ] お問い合わせページ (`/contact`)
- [ ] ログイン機能 (`/login`)
- [ ] 会員登録機能 (`/register`)
- [ ] カテゴリーページ (`/category/[slug]`)
- [ ] 検索機能
- [ ] 事業診断ツール (`/diagnosis`)

## ライセンス

All rights reserved © コア・ランゲージ・ハブ
