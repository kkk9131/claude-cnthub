# Plans.md - claude-cnthub 開発計画

> 最終更新: 2026-01-02
> ビジョン: LLM セッションの永続化・コンテキスト共有・クロスLLM連携プラットフォーム
> 要件定義: [07-plugin-requirements.md](./Agent-docs/07-plugin-requirements.md)

## 概要

```
Phase 1: Claude Code Plugin
──────────────────────────────────────────────────
Claude Code CLI
      │
      ├── SessionStart Hook → コンテキスト注入 (R-07)
      ├── PostToolUse Hook → リアルタイム観測 (R-02)
      └── SessionEnd Hook → 要約・Embedding (R-01, R-04, R-05)
              │
              ▼
        Backend API (Port 3048)
              │
              ├── 検索 (sqlite-vec + SQL) (R-06)
              └── Viewer UI (R-10〜R-12)
```

---

## 完了済み

<details>
<summary>完了済みタスク（クリックで展開）</summary>

### 基盤・コア機能 ✅
- [x] モノレポ構成、共通型定義、SQLite、Hono API
- [x] セッション CRUD、メッセージ管理、WebSocket、AI要約
- [x] sqlite-vec ベクトル検索、セマンティック検索

### プロジェクト管理 ✅
- [x] P-01: Project 型定義・DB スキーマ
- [x] P-02: プロジェクト CRUD API
- [x] P-03: セッション→プロジェクト自動紐付け

### サーバー統合 ✅
- [x] I-01: サーバー統合 (Port 3048)
- [x] I-02: Memory API シンプル化
- [x] I-03: 新セッション ID 体系 (`ch_ss_0001`)
- [x] I-04: ローカル Embedding フォールバック

</details>

---

## Phase 1: Plugin 機能実装 `現在`

### 1-A: Hook 実装 (高優先度)

| ID | タスク | 要件ID | ブランチ | 状態 |
|----|--------|--------|---------|------|
| H-01 | PostToolUse Hook（リアルタイム観測記録） | R-02 | `feature/posttooluse-hook` | `cc:TODO` |
| H-02 | SessionEnd 要約→タイトル→Embedding 連鎖 | R-01,R-04,R-05 | `feature/sessionend-summary` | `cc:TODO` |
| H-03 | SessionStart コンテキスト注入 | R-07 | `feature/sessionstart-inject` | `cc:TODO` |

### 1-B: スラッシュコマンド (高優先度)

| ID | タスク | 要件ID | ブランチ | 状態 |
|----|--------|--------|---------|------|
| CMD-01 | `/cnthub:get` - 過去セッション取得 | R-08 | `feature/cmd-get` | `cc:TODO` |
| CMD-02 | `/cnthub:export` - 現在セッション書き出し | R-09 | `feature/cmd-export` | `cc:TODO` |

### 1-C: Viewer UI (中優先度)

| ID | タスク | 要件ID | ブランチ | 状態 |
|----|--------|--------|---------|------|
| V-01 | Viewer UI 基盤 (packages/web → plugin/ui 統合) | R-10 | `feature/viewer-base` | `cc:TODO` |
| V-02 | セッション一覧 (プロジェクト切替) | R-11 | `feature/viewer-sidebar` | `cc:TODO` |
| V-03 | ノードエディタ (get/export 操作) | R-12 | `feature/viewer-node-editor` | `cc:TODO` |

---

## 削除予定

<details>
<summary>不要になったタスク（クリックで展開）</summary>

以下は要件再定義により不要になったタスク:

### 旧 UI 統合タスク (UI-01〜03)
> packages/web/ を plugin/ui/ に統合するため不要

- ~~UI-01: TreeView を SessionList に統合~~
- ~~UI-02: ProjectSwitcher を Sidebar に統合~~
- ~~UI-03: DnD + MergeUI をセッション画面に統合~~

### 旧 GUI コンポーネント (G-01〜04)
> Viewer UI で React Flow ベースに再実装するため不要

- ~~G-01: ツリービューコンポーネント~~
- ~~G-02: ドラッグ&ドロップ基盤~~
- ~~G-03: マージ操作 UI~~
- ~~G-04: プロジェクト切替 UI~~

### CLI (C-01〜04)
> Plugin 動作に不要、将来の拡張として保留

- ~~C-01: CLI パッケージ初期化~~
- ~~C-02: `cnthub list`~~
- ~~C-03: `cnthub search`~~
- ~~C-04: `cnthub merge`~~

### 旧 Skills (S-01〜03)
> CMD-01, CMD-02 に置き換え

- ~~S-01: cnthub:add Skill 定義~~
- ~~S-02: cnthub:search Skill 定義~~
- ~~S-03: cnthub:gui Skill 定義~~

</details>

---

## Phase 2: Cross-LLM 連携 `将来`

<details>
<summary>Phase 2 タスク（クリックで展開）</summary>

### Profile System
| ID | タスク | 依存 |
|----|--------|------|
| PF-01 | project_profiles テーブル | P-01 |
| PF-02 | Static/Dynamic Facts API | PF-01 |
| PF-03 | Dynamic Facts 自動更新 | PF-02 |

### LLM 接続
| ID | タスク | 依存 |
|----|--------|------|
| L-01 | LLM 接続設定 DB スキーマ | - |
| L-02 | ChatGPT Adapter | L-01 |
| L-03 | Codex Adapter | L-01 |
| L-04 | 接続管理 API | L-01 |

</details>

---

## 次の優先タスク

```
1. H-01 - PostToolUse Hook（リアルタイム観測記録）
2. H-02 - SessionEnd 要約→タイトル→Embedding 連鎖生成
3. H-03 - SessionStart コンテキスト注入
4. CMD-01 - /cnthub:get コマンド
5. CMD-02 - /cnthub:export コマンド
```

> 詳細な要件は [07-plugin-requirements.md](./Agent-docs/07-plugin-requirements.md) を参照
