# データベース仕様書 — Prisma + WordPress（参照）

## 1. 概要
- 本仕様は、Prisma（PostgreSQL を想定）で管理する内部データと、Headless WordPress（WPGraphQL）で公開されるコンテンツの連携方針を示します。

## 2. Prisma モデル（推奨）
```prisma
model Newsletter {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Contact {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  messageId String?  // nodemailer 等の送信ID
  createdAt DateTime @default(now())
}

// 学習ハブ拡張用（オプション）
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
}
```

## 3. WP (Headless) との関係
- 記事（Post）やページは WP 側の投稿タイプで管理され、GraphQL 経由で取得する。
- Course 機能を追加する場合は WP の Custom Post Type（course, lesson）を定義し、GraphQL でコースデータを取得する。

## 4. データフロー
1. フロントが WP GraphQL から記事を取得（キャッシュ/ISR 管理）
2. フォーム送信（Contact, Newsletter）は Next API を経由して Prisma に保存
3. 重要イベント発生時に Webhook やメール通知を送信

## 5. マイグレーション・運用
- `prisma migrate` を用いた schema migration を CI 上で管理
- 本番 DB のバックアップ / マイグレーション実行手順をドキュメント化

---
*作成日:* 2025-12-27
