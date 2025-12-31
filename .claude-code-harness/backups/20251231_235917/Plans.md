# Plans.md - claude-cnthub 開発計画

> 最終更新: 2025-12-31
> ビジョン: LLM セッションの永続化・コンテキスト共有・クロスLLM連携プラットフォーム

## 概要

```
Phase 1: Claude Code Plugin
──────────────────────────────────────────────────
LLM CLI エージェント (Claude Code)
         ↓ Hooks
   セッション記録・永続化
         ↓
   段階的コンテキスト取得 (Level 0/1)
         ↓
   マージ・知識統合
         ↓
   GUI 操作 (ノード操作・検索)

Phase 2: Cross-LLM 連携
──────────────────────────────────────────────────
         ┌── Claude Code (Hooks)
         │
cnthub ──┼── ChatGPT (REST API)
         │
         └── Codex / 他 LLM (REST API)

GUI でコンテキストをドラッグ&ドロップで転送
```

---

## 完了済みフェーズ

<details>
<summary>フェーズ1〜7（クリックで展開）</summary>

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

### フェーズ6: 段階的開示システム ✅
- [x] L-01: SessionIndex 型定義
- [x] L-02: Level 0 インデックス API
- [x] L-03: Level 1 要約詳細 API
- [x] L-04: 要約スキーマ拡張
- [x] L-05: タグ自動抽出サービス
- [x] L-06: SN 自動命名

### フェーズ7: マージシステム ✅
- [x] M-01: Merge 型定義・DB スキーマ
- [x] M-02: マージ実行 API
- [x] M-03: AI マージ要約生成サービス
- [x] M-04: マージ済み一覧・詳細 API
- [x] M-05: マージ抽出 API
- [x] M-06: マージ削除 API

</details>

---

## Phase 1: Claude Code Plugin `現在`

Claude Code Plugin として動作し、セッション永続化・コンテキスト注入・GUI 操作を実現。

### 1-A: プロジェクト管理

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| P-01 | Project 型定義・DB スキーマ | - | `feature/project-schema` |
| P-02 | プロジェクト CRUD API | P-01 | `feature/project-api` |
| P-03 | セッション→プロジェクト自動紐付け | P-01 | `feature/session-project-link` |

### 1-B: Skills 連携

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| S-01 | cnthub:add Skill 定義 | - | `feature/skill-add` |
| S-02 | cnthub:search Skill 定義 | - | `feature/skill-search` |
| S-03 | cnthub:gui Skill 定義 | - | `feature/skill-gui` |

### 1-C: GUI ノード操作

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| G-01 | ツリービューコンポーネント | - | `feature/tree-view` |
| G-02 | ドラッグ&ドロップ基盤 (dnd-kit) | G-01 | `feature/dnd-foundation` |
| G-03 | マージ操作 UI | G-02 | `feature/merge-ui` |
| G-04 | プロジェクト切替 UI | P-02 | `feature/project-switcher` |

### 1-D: サーバー統合

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| I-01 | サーバー統合 (Port 3048) | - | `feature/unified-server` |
| I-02 | Memory API シンプル化 | I-01 | `feature/simple-memory-api` |
| I-03 | 新セッション ID 体系 (`ch_ss_0001`) | I-01 | `feature/new-session-id` |

### 1-E: CLI (補助)

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| C-01 | CLI パッケージ初期化 | - | `feature/cli-init` |
| C-02 | `cnthub list` セッション一覧 | C-01 | `feature/cli-list` |
| C-03 | `cnthub search` 検索 | C-01 | `feature/cli-search` |
| C-04 | `cnthub merge` マージ | C-01 | `feature/cli-merge` |

---

## Phase 2: Cross-LLM 連携 `計画`

他 LLM (ChatGPT, Codex 等) へのコンテキスト転送を GUI で実現。

### 2-A: Profile System

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| PF-01 | project_profiles テーブル | P-01 | `feature/profile-schema` |
| PF-02 | Static/Dynamic Facts API | PF-01 | `feature/profile-api` |
| PF-03 | Dynamic Facts 自動更新 | PF-02 | `feature/profile-auto-update` |

### 2-B: LLM 接続

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| L-01 | LLM 接続設定 DB スキーマ | - | `feature/llm-connections` |
| L-02 | ChatGPT Adapter | L-01 | `feature/chatgpt-adapter` |
| L-03 | Codex Adapter | L-01 | `feature/codex-adapter` |
| L-04 | 接続管理 API | L-01 | `feature/connection-api` |

### 2-C: コンテキスト転送 UI

| ID | タスク | 依存 | ブランチ |
|----|--------|------|---------|
| T-01 | LLM 接続管理ページ | L-04 | `feature/llm-page` |
| T-02 | コンテキスト転送ページ | T-01, PF-02 | `feature/transfer-page` |
| T-03 | コンテキストプレビュー・編集 | T-02 | `feature/context-preview` |

---

## 次の優先タスク

1. **I-01** - サーバー統合 (Port 3048)
2. **I-03** - 新セッション ID 体系
3. **P-01, P-02** - プロジェクト管理基盤
4. **G-01, G-02** - ツリービュー・D&D

> 詳細なタスクチケットは [TASKS.md](./TASKS.md) を参照
