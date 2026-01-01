# Plans.md - claude-cnthub 開発計画

> 最終更新: 2026-01-01
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

| ID | タスク | 依存 | ブランチ | 状態 |
|----|--------|------|---------|------|
| P-01 | Project 型定義・DB スキーマ | - | `feature/project-schema` | `cc:完了` |
| P-02 | プロジェクト CRUD API | P-01 | `feature/project-api` | `cc:完了` |
| P-03 | セッション→プロジェクト自動紐付け | P-01 | `feature/session-project-link` | `cc:完了` |

### 1-B: Skills 連携

| ID | タスク | 依存 | ブランチ | 状態 |
|----|--------|------|---------|------|
| S-01 | cnthub:add Skill 定義 | - | `feature/skill-add` | `cc:完了` |
| S-02 | cnthub:search Skill 定義 | - | `feature/skill-search` | `cc:完了` |
| S-03 | cnthub:gui Skill 定義 | - | `feature/skill-gui` | `cc:完了` |

### 1-C: GUI ノード操作

| ID | タスク | 依存 | ブランチ | 状態 |
|----|--------|------|---------|------|
| G-01 | ツリービューコンポーネント | - | `feature/tree-view` | `cc:完了` |
| G-02 | ドラッグ&ドロップ基盤 (dnd-kit) | G-01 | `feature/dnd-foundation` | `cc:完了` |
| G-03 | マージ操作 UI | G-02 | `feature/merge-ui` | `cc:完了` |
| G-04 | プロジェクト切替 UI | P-02 | `feature/project-switcher` | `cc:完了` |

### 1-D: サーバー統合

| ID | タスク | 依存 | ブランチ | 状態 |
|----|--------|------|---------|------|
| I-01 | サーバー統合 (Port 3048) | - | `feature/unified-server` | `cc:完了` |
| I-02 | Memory API シンプル化 | I-01 | `feature/simple-memory-api` | `cc:完了` |
| I-03 | 新セッション ID 体系 (`ch_ss_0001`) | I-01 | `feature/new-session-id` | `cc:完了` |
| I-04 | ローカル Embedding フォールバック | - | `feature/local-embedding` | `cc:完了` |

### 1-E: UI 統合

> G-01〜G-04 で作成したコンポーネントを実際の画面に統合

| ID | タスク | 依存 | ブランチ | 状態 |
|----|--------|------|---------|------|
| UI-01 | TreeView を SessionList に統合 | G-01 | `feature/ui-treeview-integration` | `cc:TODO` |
| UI-02 | ProjectSwitcher を Sidebar に統合 | G-04 | `feature/ui-project-switcher` | `cc:TODO` |
| UI-03 | DnD + MergeUI をセッション画面に統合 | G-02, G-03 | `feature/ui-dnd-merge` | `cc:TODO` |

### 1-F: CLI (補助)

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

1. **UI-01** - TreeView を SessionList に統合
2. **UI-02** - ProjectSwitcher を Sidebar に統合
3. **UI-03** - DnD + MergeUI をセッション画面に統合

> 詳細なタスクチケットは [TASKS.md](./TASKS.md) を参照

---

## 実装メモ (2026-01-01)

### I-01: サーバー統合 (Port 3048)
- `packages/api/src/config.ts`: デフォルトポートを 3048 に変更
- `packages/api/src/routes/memories.ts`: `/memories/add`, `/search`, `/context` 追加
- `packages/api/src/db/migrations/007_create_observations.ts`: observations テーブル
- `packages/api/src/repositories/observation.ts`: CRUD 操作

### P-01: Project 型定義
- `packages/shared/src/types/project.ts`: Project, CreateProjectRequest, UpdateProjectRequest 型
- `packages/shared/src/index.ts`: エクスポート追加
- DB スキーマは既存の migration で作成済み (projects テーブル)

### G-01: ツリービューコンポーネント
- `packages/web/src/components/TreeView/`: TreeNode, TreeBranch, TreeView
- 12 テストケース (展開/折りたたみ、キーボード操作、アクセシビリティ)
- アイコン追加: ChevronDownIcon, GitMergeIcon, DocumentIcon

### I-03: 新セッション ID 体系 (`ch_ss_0001`)
- `packages/shared/src/utils/id-generator.ts`: ID 生成ユーティリティ
- ID プレフィックス: `ch_ss_` (セッション), `ch_mg_` (マージ), `ch_pj_` (プロジェクト), `ch_ob_` (観測記録)
- 各リポジトリ (session.ts, merge.ts, observation.ts) を新 ID 体系に対応
- 10 テストケース (ID 生成・パース・バリデーション)

### P-02: プロジェクト CRUD API
- `packages/api/src/repositories/project.ts`: CRUD 操作
- `packages/api/src/routes/projects.ts`: REST API エンドポイント
- エンドポイント: GET/POST `/api/projects`, GET/PUT/DELETE `/api/projects/:id`
- 11 テストケース (一覧・作成・取得・更新・削除)

### G-02: ドラッグ&ドロップ基盤 (dnd-kit)
- `packages/web/src/components/DnD/`: DnDProvider, DraggableItem, DroppableZone
- @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities をインストール
- アクセシブル (キーボード・ポインターセンサー対応)
- 型フィルタリング (project, session, merge)

### S-01: cnthub:add Skill 定義
- `.claude/skills/cnthub-add/SKILL.md`: スキル定義
- コンテキスト追加コマンド (`/cnthub:add`)
- 対応タイプ: decision, learning, note, tool_use, error, file_change

### I-04: ローカル Embedding フォールバック
- `packages/api/src/services/embeddings.ts`: Voyage AI + Transformers.js 二重対応
- `packages/api/src/db/migrations/008_add_local_embeddings.ts`: 384次元テーブル追加
- VOYAGE_API_KEY なしでもセマンティック検索が利用可能に
- モデル: Xenova/all-MiniLM-L6-v2 (384次元、ローカル実行)
