# デプロイガイド

## 前提条件

- [x] WordPress が http://www.corel.tooling-hub.com で稼働中
- [x] Next.jsプロジェクトがビルド可能
- [ ] Vercelアカウント作成
- [ ] Git/GitHubアカウント（Vercel連携用）

---

## ステップ1: WordPress側の設定

### 1.1 REST APIの確認

ブラウザで以下のURLにアクセスして、WordPressのREST APIが動作しているか確認：

```
http://www.corel.tooling-hub.com/wp-json/wp/v2/posts
```

**期待される結果**: JSON形式の記事データが表示される

### 1.2 CORS設定の追加

WordPressの管理画面にログイン後：

1. **外観 → テーマファイルエディター** にアクセス
2. **functions.php** を開く
3. `wordpress-cors-setup.php` の内容をコピーして、functions.phpの**末尾**に追加
4. **ファイルを更新**をクリック

または、FTP/SFTPで直接編集：
```
/wp-content/themes/[your-theme]/functions.php
```

### 1.3 パーマリンク設定

1. **設定 → パーマリンク** にアクセス
2. **投稿名** を選択
3. **変更を保存**

### 1.4 テスト記事の作成

1. **投稿 → 新規追加**
2. タイトルと本文を入力
3. **カテゴリー**を設定（例: フレームワーク、マーケティング）
4. **アイキャッチ画像**を設定
5. **公開**をクリック

---

## ステップ2: Gitリポジトリの作成

### 2.1 Gitの初期化

```bash
cd C:\Users\Administrator\web_coreL
git init
git add .
git commit -m "Initial commit: Next.js + WordPress Headless CMS"
```

### 2.2 GitHubリポジトリの作成

1. [GitHub](https://github.com) にログイン
2. **New repository** をクリック
3. リポジトリ名: `code-copy-forge-frontend`
4. **Create repository** をクリック

### 2.3 リモートリポジトリに推送

```bash
git remote add origin https://github.com/[your-username]/code-copy-forge-frontend.git
git branch -M main
git push -u origin main
```

---

## ステップ3: Vercelへのデプロイ

### 方法A: Vercel Dashboard経由（推奨）

1. [Vercel](https://vercel.com) にアクセス
2. **Sign Up** または **Log In**（GitHubアカウントで連携推奨）
3. **Add New... → Project** をクリック
4. GitHubリポジトリ `code-copy-forge-frontend` を選択
5. **Import** をクリック

#### プロジェクト設定:

| 項目 | 設定値 |
|------|--------|
| **Framework Preset** | Next.js |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |

#### 環境変数の設定:

**Environment Variables** セクションで以下を追加：

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | `http://www.corel.tooling-hub.com/wp-json/wp/v2` |

6. **Deploy** をクリック

### 方法B: Vercel CLI経由

```bash
# Vercel CLIのインストール
npm install -g vercel

# ログイン
vercel login

# frontendディレクトリに移動
cd frontend

# デプロイ
vercel

# プロンプトに従って設定:
# - Set up and deploy? Yes
# - Which scope? [your-account]
# - Link to existing project? No
# - Project name? code-copy-forge
# - Directory? ./
# - Override settings? No

# 本番デプロイ
vercel --prod
```

---

## ステップ4: デプロイ後の確認

### 4.1 動作確認

Vercelのデプロイが完了したら、提供されたURLにアクセス：

```
https://code-copy-forge-[random].vercel.app
```

**確認項目:**

- [ ] トップページが表示される
- [ ] 記事一覧が表示される（WordPressから取得）
- [ ] カテゴリーが表示される
- [ ] 記事詳細ページが正しく表示される
- [ ] 画像が読み込まれる
- [ ] レスポンシブデザインが機能する（モバイル確認）

### 4.2 WordPress CORS設定の更新（本番環境用）

デプロイURLが確定したら、`functions.php`のCORS設定を更新：

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $allowed_origins = [
            'http://localhost:3000',
            'https://code-copy-forge-[your-random].vercel.app',
        ];

        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Content-Type, Authorization');
        }

        return $value;
    });
}, 15);
```

---

## ステップ5: カスタムドメインの設定（オプション）

### 5.1 Vercel Dashboardでドメイン設定

1. Vercelプロジェクトページ → **Settings** → **Domains**
2. カスタムドメインを入力（例: `corel.tooling-hub.com`）
3. **Add** をクリック
4. DNS設定の指示に従う

### 5.2 DNS設定

ドメインレジストラ（お名前.com、Cloudflare等）で以下を設定：

**Aレコード:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAMEレコード:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## トラブルシューティング

### 記事が表示されない

**原因**: WordPress REST APIに接続できない

**解決策:**
1. WordPress REST APIが動作しているか確認:
   ```
   http://www.corel.tooling-hub.com/wp-json/wp/v2/posts
   ```
2. Vercelの環境変数が正しく設定されているか確認
3. WordPress側のCORS設定を確認

### 404エラーが表示される

**原因**: パーマリンク設定が正しくない

**解決策:**
1. WordPress管理画面 → **設定 → パーマリンク**
2. **投稿名**を選択
3. **変更を保存**

### CORSエラー

**原因**: WordPressがCORSリクエストを拒否

**解決策:**
1. `functions.php`にCORS設定を追加（上記参照）
2. Vercelのドメインを`allowed_origins`に追加

### ビルドエラー

**原因**: TypeScriptエラーまたは依存関係の問題

**解決策:**
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run build
```

### 画像が表示されない

**原因**: Next.jsのImage Optimizationの設定

**解決策:**
`next.config.js`に外部画像ドメインを追加：
```javascript
module.exports = {
  images: {
    domains: ['www.corel.tooling-hub.com'],
  },
}
```

---

## 継続的デプロイ（CI/CD）

GitHubリポジトリにプッシュすると、Vercelが自動的にデプロイを実行します：

```bash
# コードを変更
git add .
git commit -m "Update: feature X"
git push origin main

# Vercelが自動的にデプロイ
```

---

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
