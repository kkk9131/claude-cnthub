# Plans.md - claude-cnthub 開発計画

> 最終更新: 2025-12-29

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

## フェーズ2: コア機能 `cc:TODO`

### 2.1 セッション管理 API

- [ ] POST /api/sessions - セッション作成
- [ ] GET /api/sessions - 一覧取得
- [ ] GET /api/sessions/:id - 詳細取得
- [ ] PATCH /api/sessions/:id - 更新
- [ ] DELETE /api/sessions/:id - 削除

### 2.2 メッセージ管理

- [ ] POST /api/sessions/:id/messages - メッセージ送信
- [ ] GET /api/sessions/:id/messages - メッセージ一覧
- [ ] WebSocket リアルタイム通信

### 2.3 AI 要約機能

- [ ] Claude Agent SDK 統合
- [ ] セッション要約生成
- [ ] メタデータ抽出 (決定事項、変更ファイル)

---

## フェーズ3: メモリ・検索機能 `cc:TODO`

### 3.1 ベクトル検索

- [ ] sqlite-vec 拡張導入
- [ ] Embedding 生成サービス
- [ ] セマンティック検索 API

### 3.2 コンテキスト注入

- [ ] 関連セッション検索
- [ ] コンテキスト組み立て
- [ ] トークン制限管理

---

## フェーズ4: Frontend `cc:TODO`

### 4.1 基本 UI

- [ ] React + Vite 設定
- [ ] TailwindCSS ダークテーマ
- [ ] レイアウトコンポーネント

### 4.2 セッション画面

- [ ] セッション一覧
- [ ] チャット UI
- [ ] 要約表示

### 4.3 検索・Work Items

- [ ] セマンティック検索 UI
- [ ] Work Item 管理画面

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
