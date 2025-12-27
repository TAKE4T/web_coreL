# フロントエンド仕様書 — Next.js (App Router)

## 1. 技術スタック
- Next.js 16 (App Router)
- React 19, TypeScript
- Tailwind CSS v4
- GraphQL client: graphql-request
- テスト: Vitest + Testing Library
- Lint/Format: ESLint (eslint-config-next) / Prettier

## 2. ルーティング（主要）
- `/` - ホーム（最新記事, カテゴリ）
- `/posts/[slug]` - 記事詳細
- `/category/[slug]` - カテゴリ一覧
- `/contact` - お問い合わせ（フォーム）
- `/newsletter` - メルマガ登録
- `/dashboard` - 内部: 受講者用ダッシュボード（学習ハブ追加時）

## 3. 主要コンポーネント
- `Header`, `Footer`, `ArticleCard`, `CourseCard`, `CourseList`, `ContactForm`
- 各コンポーネントは TypeScript で型定義を行い、単体テストを用意する

## 4. データ取得方針
- 記事一覧/詳細は WP GraphQL から取得
- ISR（revalidate を適切に設定）でパフォーマンスと最新性を両立
- ユーザーが操作する API は Next API routes を使用

## 5. UI/UX 要件
- モバイルファースト設計、アクセシビリティの基本に準拠
- フォームはクライアント側バリデーション + サーバー側バリデーション

## 6. テスト・CI
- コンポーネントと API にユニットテストを追加（Vitest）
- PR 時に lint → typecheck → tests を GitHub Actions で実行

---
*作成日:* 2025-12-27
