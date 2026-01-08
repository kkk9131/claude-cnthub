# ARCHIVE.md - 完了済みタスク

> Plans.md から移動した完了済みタスクの詳細

## Phase 1: 基盤・コア機能 ✅

- [x] モノレポ構成、共通型定義、SQLite、Hono API
- [x] セッション CRUD、メッセージ管理、WebSocket、AI要約
- [x] sqlite-vec ベクトル検索、セマンティック検索

## Phase 1: プロジェクト管理 ✅

- [x] P-01: Project 型定義・DB スキーマ
- [x] P-02: プロジェクト CRUD API
- [x] P-03: セッション→プロジェクト自動紐付け

## Phase 1: サーバー統合 ✅

- [x] I-01: サーバー統合 (Port 3048)
- [x] I-02: Memory API シンプル化
- [x] I-03: 新セッション ID 体系 (`ch_ss_0001`)
- [x] I-04: ローカル Embedding フォールバック

## Phase 1: Plugin 機能実装 ✅

- [x] H-01: PostToolUse Hook（リアルタイム観測記録）
- [x] H-02: SessionEnd 要約→タイトル→Embedding 連鎖
- [x] H-03: SessionStart コンテキスト注入
- [x] CMD-01: `/cnthub:get` - 過去セッション取得
- [x] CMD-02: `/cnthub:export` - 現在セッション書き出し
- [x] V-01〜V-03: Viewer UI（基盤・一覧・ノードエディタ）

## Phase 1.5: Smart Export ✅

- [x] SE-01: AI グルーピング API
- [x] SE-02: グループ選択 UI
- [x] SE-03: Export & 削除 API
- [x] SE-04: UI 統合

## Phase 1.6: Context Management 強化 ✅

- [x] API-01: pending_inject API
- [x] API-02: セッション名生成 API
- [x] HOOK-01: SessionStart 改修（コンテキスト注入削除）
- [x] HOOK-02: SessionEnd 改修（タイトル生成スキップ）
- [x] HOOK-03: UserPromptSubmit Hook 新規作成
- [x] CMD-01: /cnthub:export 改修（コンテキスト削減対応）
- [x] CMD-02: /cnthub:get 改修（merged ステータス対応）

## Phase 1.6.1: バグ修正 ✅

| ID | タスク | 原因 | 修正内容 |
|----|--------|------|----------|
| BUG-01 | MCP inject_context が summary を返さない | API が summary を含まない | `/sessions/:id/summary` も並列取得 |
| BUG-02 | セッション名が UUID のまま | API が UUID を受け付けない | `ch_ss_xxxx` と UUID 両方で検索可能に |
| BUG-03 | セッション一覧に重複名 | Export 時の名前重複 | タイムスタンプを追加 |
| CLN-01 | クリーンアップ機能 | - | `POST /api/sessions/bulk-delete` 追加 |

## Phase 1.7: UI統合 ✅

| ID | タスク | 状態 |
|----|--------|------|
| UI-DEL-01 | Work Items 関連ファイル削除 | ✅ |
| UI-DEL-02 | Settings ナビゲーション削除 | ✅ |
| UI-ADD-01 | セッション一括削除 UI | ✅ |
| UI-ADD-02 | プロジェクト管理 UI | ✅ |
| UI-ADD-03 | メッセージ削除 UI | ✅ |
| UI-ADD-04 | マージ削除 UI | ✅ |
| UI-FIX-01 | セッション詳細ポップアップ改善 | ✅ |
| UI-FIX-02 | テーマ永続化（localStorage） | ✅ |
