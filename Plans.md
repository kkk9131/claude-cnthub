# Plans.md - claude-cnthub 開発計画

> 最終更新: 2025-12-30

## フェーズ1: 基盤構築 `cc:完了`

### 1.1 プロジェクト初期化

- [x] モノレポ構成 (Bun Workspaces) `cc:完了`
- [x] 共通型定義 (packages/shared) `cc:完了`
- [x] テスト環境構築 (Vitest) `cc:完了`
- [x] Git リポジトリ初期化 `cc:完了`

### 1.2 データベース層

- [x] SQLite 接続設定 `cc:完了`
- [x] マイグレーションシステム `cc:完了`
- [x] sessions テーブル作成 `cc:完了`
- [x] messages テーブル作成 `cc:完了`
- [x] リポジトリパターン実装 `cc:完了`

### 1.3 API 基盤

- [x] Hono アプリケーション設定 `cc:完了`
- [x] エラーハンドリングミドルウェア `cc:完了`
- [x] ロギングミドルウェア `cc:完了`
- [x] Zod バリデーション設定 `cc:完了`

---

## フェーズ2: コア機能 `cc:完了`

### 2.1 セッション管理 API `cc:完了`

- [x] POST /api/sessions - セッション作成 `cc:完了`
- [x] GET /api/sessions - 一覧取得 `cc:完了`
- [x] GET /api/sessions/:id - 詳細取得 `cc:完了`
- [x] PATCH /api/sessions/:id - 更新 `cc:完了`
- [x] DELETE /api/sessions/:id - 削除 `cc:完了`

### 2.2 メッセージ管理 `cc:完了`

- [x] POST /api/sessions/:id/messages - メッセージ送信 `cc:完了`
- [x] GET /api/sessions/:id/messages - メッセージ一覧 `cc:完了`
- [x] WebSocket リアルタイム通信 `cc:完了`

### 2.3 AI 要約機能 `cc:完了`

- [x] Claude Agent SDK 統合 `cc:完了`
- [x] セッション要約生成 `cc:完了`
- [x] メタデータ抽出 (決定事項、変更ファイル) `cc:完了`

---

## フェーズ3: メモリ・検索機能 `cc:完了`

### 3.1 ベクトル検索

- [x] sqlite-vec 拡張導入 `cc:完了`
- [x] Embedding 生成サービス (Voyage AI) `cc:完了`
- [x] セマンティック検索 API `cc:完了`

### 3.2 コンテキスト注入

- [x] 関連セッション検索 `cc:完了`
- [x] コンテキスト組み立て `cc:完了`
- [x] トークン制限管理 `cc:完了`

---

## フェーズ4: Frontend `cc:完了`

### 4.1 基本 UI `cc:完了`

- [x] React + Vite 設定 `cc:完了`
- [x] TailwindCSS ダークテーマ `cc:完了`
- [x] レイアウトコンポーネント `cc:完了`

### 4.2 セッション画面 `cc:完了`

- [x] セッション一覧 `cc:完了`
- [x] チャット UI `cc:完了`
- [x] 要約表示 `cc:完了`

### 4.3 検索・Work Items `cc:完了`

- [x] セマンティック検索 UI `cc:完了`
- [x] Work Item 管理画面 `cc:完了`

---

## フェーズ5: Plugin / Hook `cc:TODO`

- [ ] Claude Plugin マニフェスト
- [ ] Hook サーバー実装
- [ ] hooks.json 設定生成

---

## 備考

### 優先度

1. **フェーズ1** - 基盤がないと何も始まらない
2. **フェーズ2.1-2.2** - コア機能の最小セット
3. **フェーズ2.3 + 3** - AI 機能で差別化
4. **フェーズ4-5** - UI と統合

### 技術的決定事項

- [decisions.md](.claude/memory/decisions.md) を参照
