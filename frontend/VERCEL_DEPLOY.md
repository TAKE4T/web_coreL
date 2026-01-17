# Vercelデプロイ手順（簡易版）

## 🚀 2つの方法

### **方法1: Vercel CLI（推奨・最速）**
### **方法2: Vercel Dashboard + GitHub**

---

## 📦 方法1: Vercel CLI（5分で完了）

### ステップ1: Vercel CLIをインストール

```bash
npm install -g vercel
```

### ステップ2: Vercelにログイン

```bash
vercel login
```

ブラウザが開くので、GitHubアカウントでログイン。

### ステップ3: デプロイ

```bash
cd frontend
vercel
```

**質問に答える:**

```
? Set up and deploy "~/frontend"? [Y/n] y
? Which scope do you want to deploy to? [あなたのアカウント]
? Link to existing project? [y/N] n
? What's your project's name? code-copy-forge
? In which directory is your code located? ./
? Want to override the settings? [y/N] n
```

### ステップ4: 環境変数を設定

```bash
vercel env add NEXT_PUBLIC_WORDPRESS_API_URL
```

値を入力:
```
http://www.corel.tooling-hub.com/index.php?rest_route=/wp/v2
```

Environment: **Production** を選択

### ステップ5: 本番デプロイ

```bash
vercel --prod
```

✅ 完了！URLが表示されます:
```
https://code-copy-forge-xxxx.vercel.app
```

---

## 🌐 方法2: Vercel Dashboard + GitHub

### ステップ1: GitHubリポジトリを作成

1. [GitHub](https://github.com/new) で新規リポジトリ作成
   - リポジトリ名: `code-copy-forge`
   - Public または Private を選択
   - 「Create repository」をクリック

### ステップ2: GitHubにプッシュ

```bash
cd frontend

# リモートリポジトリを追加
git remote add origin https://github.com/[あなたのユーザー名]/code-copy-forge.git

# プッシュ
git branch -M main
git push -u origin main
```

### ステップ3: Vercelでインポート

1. [Vercel](https://vercel.com) にアクセス
2. GitHubアカウントでログイン
3. 「Add New... → Project」をクリック
4. `code-copy-forge` リポジトリを選択
5. 「Import」をクリック

### ステップ4: プロジェクト設定

**Framework Preset:** Next.js（自動検出される）

**Environment Variables** をクリック:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_WORDPRESS_API_URL` | `http://www.corel.tooling-hub.com/index.php?rest_route=/wp/v2` |

### ステップ5: デプロイ

「Deploy」をクリック

⏱️ 約2-3分でデプロイ完了

✅ 完了！URLが表示されます

---

## 🔧 デプロイ後の設定

### WordPress側のCORS設定を更新

`functions.php` に追加（既存のCORS設定を置き換え）:

```php
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $allowed_origins = [
            'http://localhost:3000',
            'https://code-copy-forge-xxxx.vercel.app', // ← あなたのVercel URL
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

## ✅ 動作確認

デプロイURLにアクセスして確認:

- [ ] トップページが表示される
- [ ] 記事一覧が表示される
- [ ] 画像が読み込まれる
- [ ] カテゴリーが表示される
- [ ] レスポンシブデザインが機能する

---

## 🔄 継続的デプロイ（GitHub連携時）

GitHubにプッシュすると自動的にデプロイされます:

```bash
# コードを変更
git add .
git commit -m "Update: feature"
git push

# Vercelが自動的にデプロイ
```

---

## 🐛 トラブルシューティング

### 記事が表示されない

**原因:** WordPressのCORS設定

**解決策:**
1. WordPress `functions.php` のCORS設定を確認
2. Vercel URLを `allowed_origins` に追加

### ビルドエラー

**原因:** 環境変数が設定されていない

**解決策:**
```bash
# Vercel CLIの場合
vercel env add NEXT_PUBLIC_WORDPRESS_API_URL

# Dashboardの場合
Settings → Environment Variables で追加
```

### 環境変数が反映されない

**解決策:**
```bash
# 再デプロイ
vercel --prod
```

---

## 📱 カスタムドメインの設定（オプション）

### Vercel Dashboardで設定

1. プロジェクト → Settings → Domains
2. カスタムドメインを入力（例: `corel.tooling-hub.com`）
3. 「Add」をクリック
4. DNS設定の指示に従う

### DNS設定例

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

## 🎯 次のステップ

- [ ] WordPressで記事を追加
- [ ] カテゴリーを作成（フレームワーク、マーケティング等）
- [ ] アイキャッチ画像を設定
- [ ] SEO設定を確認

---

## 📚 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

## 💡 ヒント

### デプロイ時間を短縮

```bash
# プレビューデプロイ（高速）
vercel

# 本番デプロイ
vercel --prod
```

### ログを確認

```bash
vercel logs [deployment-url]
```

### 環境変数を確認

```bash
vercel env ls
```
