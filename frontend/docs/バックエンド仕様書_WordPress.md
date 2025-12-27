# バックエンド仕様書 — WordPress (Headless)

## 1. 概要
- WordPress を Headless CMS として利用し、WPGraphQL 経由で Next.js にコンテンツを提供する。

## 2. 必要な機能（WP 側）
- 投稿（post）/固定ページ（page）の公開
- カテゴリ・タグ管理
- 必要に応じて Custom Post Type（course, lesson）を追加
- GraphQL スキーマの整備（必要なフィールドを公開）

## 3. プラグイン・推奨設定
- WPGraphQL（必須）
- WPGraphQL JWT / Authentication（必要なら）
- ACF (Advanced Custom Fields) for structured content (optional)
- CORS / Headless 実行のためのセキュアな設定と公開キー管理

## 4. API 利用方針
- Next.js からは分割して GraphQL クエリを呼び出す（キャッシュの利用）
- 必要ならサーバー側で GraphQL クエリをまとめる（performance）

## 5. 運用
- 本番サイトのスキーマ変更は事前に検証環境でテスト
- バックアップポリシーと権限管理を明確化

---
*作成日:* 2025-12-27
