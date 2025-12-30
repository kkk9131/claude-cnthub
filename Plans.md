# Plans.md - claude-cnthub 開発計画

> 最終更新: 2025-12-30
> ビジョン: 並列AIセッションの協調学習プラットフォーム

## 概要

```
LLM CLI エージェント（Claude Code, Cursor, etc.）
         ↓ Hook
   セッション要約・永続化
         ↓
   段階的コンテキスト取得（Level 0/1）
         ↓
   マージ・クロスプロジェクト共有
         ↓
   GUI ツリー操作 / CLI コマンド
```

---

## 完了済みフェーズ

<details>
<summary>フェーズ1〜5（クリックで展開）</summary>

### フェーズ1: 基盤構築 ✅
- [x] モノレポ構成、共通型定義、SQLite、Hono API

### フェーズ2: コア機能 ✅
- [x] セッション CRUD、メッセージ管理、WebSocket、AI要約

### フェーズ3: メモリ・検索 ✅
- [x] sqlite-vec ベクトル検索、セマンティック検索、コンテキスト注入

### フェーズ4: Frontend ✅
- [x] React + Vite + TailwindCSS、セッション一覧・チャット・検索 UI

### フェーズ5: Hook 統合 ✅
- [x] Hook API (`/hook/session-start`, `/hook/session-stop`, `/hook/session-end`)
- [x] Claude Code プラグイン (`.claude-plugin/`, `hooks/`, `scripts/`)
- [x] MCP Server (`cnthub-session`: search, list_sessions, get_session, inject_context)

</details>

---

## フェーズ6: 段階的開示システム `TODO`

コンテキスト削減のための Level 0/1 アーキテクチャ。

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| L-01 | SessionIndex 型定義 (id, sn, status, tags) | - | `feature/session-index-types` |
| L-02 | Level 0 インデックス API | L-01 | `feature/level0-api` |
| L-03 | Level 1 要約詳細 API | L-01 | `feature/level1-api` |
| L-04 | 要約スキーマ拡張（変更差分、エラー履歴、決定事項） | - | `feature/summary-schema` |
| L-05 | タグ自動抽出サービス | L-04 | `feature/auto-tagging` |
| L-06 | SN (セッション名) 自動命名 | L-04 | `feature/auto-naming` |

---

## フェーズ7: マージシステム `TODO`

要約同士をマージして知識を統合する。

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| M-01 | Merge 型定義・DB スキーマ | - | `feature/merge-schema` |
| M-02 | マージ実行 API (POST /api/merges) | M-01 | `feature/merge-api` |
| M-03 | AI マージ要約生成サービス | M-02, L-04 | `feature/merge-ai` |
| M-04 | マージ済み一覧・詳細 API | M-01 | `feature/merge-list-api` |
| M-05 | マージ抽出 API（マージ済みのみ取得） | M-01 | `feature/merge-filter-api` |
| M-06 | マージ削除 API | M-01 | `feature/merge-delete-api` |

---

## フェーズ8: プロジェクト管理 `TODO`

プロジェクト別管理とクロスプロジェクト共有。

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| P-01 | Project 型定義・DB スキーマ | - | `feature/project-schema` |
| P-02 | プロジェクト CRUD API | P-01 | `feature/project-api` |
| P-03 | セッション→プロジェクト紐付け | P-01 | `feature/session-project-link` |
| P-04 | 共有パターン DB スキーマ | P-01, M-01 | `feature/shared-patterns-schema` |
| P-05 | クロスプロジェクト検索 API | P-04 | `feature/cross-project-search` |

---

## フェーズ9: GUI ノード操作 `TODO`

ツリー構造でのドラッグ&ドロップ操作。

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| G-01 | ツリービューコンポーネント | - | `feature/tree-view` |
| G-02 | ドラッグ&ドロップ基盤 | G-01 | `feature/dnd-foundation` |
| G-03 | マージ操作 UI | G-02, M-02 | `feature/merge-ui` |
| G-04 | プロジェクト切替 UI | P-02 | `feature/project-switcher` |
| G-05 | クロスプロジェクトマージ UI | G-03, P-04 | `feature/cross-project-merge-ui` |
| G-06 | マージ済み抽出・削除 UI | M-05, M-06 | `feature/merge-management-ui` |

---

## フェーズ10: CLI ツール `TODO`

コマンドラインからの操作。

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| C-01 | CLI パッケージ初期化 (packages/cli) | - | `feature/cli-init` |
| C-02 | `cnthub list` セッション一覧 | C-01, L-02 | `feature/cli-list` |
| C-03 | `cnthub search <query>` 検索 | C-01, L-02 | `feature/cli-search` |
| C-04 | `cnthub merge <ids...>` マージ | C-01, M-02 | `feature/cli-merge` |
| C-05 | `cnthub inject <id>` コンテキスト注入 | C-01, L-03 | `feature/cli-inject` |
| C-06 | `cnthub init` hooks.json 生成 | C-01, H-04 | `feature/cli-init-hooks` |

---

## 次の優先タスク

1. **L-01, L-04, M-01, P-01** - 型定義・スキーマ（並列可）
2. **L-02, M-02, P-02** - コア API
3. **G-01, C-01** - UI/CLI 基盤

> 詳細なタスクチケットは [TASKS.md](./TASKS.md) を参照
