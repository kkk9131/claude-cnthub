# Plans.md - claude-cnthub 開発計画

> 最終更新: 2026-01-05
> ビジョン: LLM セッションの永続化・コンテキスト共有・クロスLLM連携プラットフォーム
> 要件定義: [07-plugin-requirements.md](./Agent-docs/07-plugin-requirements.md)

## 概要

```
Phase 1: Claude Code Plugin
──────────────────────────────────────────────────
Claude Code CLI
      │
      ├── SessionStart Hook → セッション登録のみ
      ├── UserPromptSubmit Hook → コンテキスト注入 + セッション名生成 (R-07)
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

### Phase 1: Plugin 機能実装 ✅
- [x] H-01: PostToolUse Hook（リアルタイム観測記録）
- [x] H-02: SessionEnd 要約→タイトル→Embedding 連鎖
- [x] H-03: SessionStart コンテキスト注入
- [x] CMD-01: `/cnthub:get` - 過去セッション取得
- [x] CMD-02: `/cnthub:export` - 現在セッション書き出し
- [x] V-01〜V-03: Viewer UI（基盤・一覧・ノードエディタ）

### Phase 1.5: Smart Export ✅
- [x] SE-01: AI グルーピング API
- [x] SE-02: グループ選択 UI
- [x] SE-03: Export & 削除 API
- [x] SE-04: UI 統合

### Phase 1.6: Context Management 強化 ✅
- [x] API-01: pending_inject API
- [x] API-02: セッション名生成 API
- [x] HOOK-01: SessionStart 改修（コンテキスト注入削除）
- [x] HOOK-02: SessionEnd 改修（タイトル生成スキップ）
- [x] HOOK-03: UserPromptSubmit Hook 新規作成
- [x] CMD-01: /cnthub:export 改修（コンテキスト削減対応）
- [x] CMD-02: /cnthub:get 改修（merged ステータス対応）

</details>

---

## Phase 1.6.1: Context Management バグ修正 `cc:完了`

Phase 1.6 実装後に発見された問題の修正。

| ID | タスク | 原因 | 状態 |
|----|--------|------|------|
| BUG-01 | MCP inject_context が summary を返さない | API が summary を含まない | `cc:完了` |
| BUG-02 | セッション名が UUID のまま更新されない | API が UUID を受け付けない | `cc:完了` |
| BUG-03 | セッション一覧に重複名が多い | Export 時の名前重複 | `cc:完了` |
| CLN-01 | 不要セッションのクリーンアップ機能 | - | `cc:完了` |

### 修正内容
- **BUG-01**: MCP の `injectContext` で `/sessions/:id/summary` も並列で取得
- **BUG-02**: `getSessionById()` を修正し、`ch_ss_xxxx` と UUID 両方で検索可能に
- **BUG-03**: Export 時のセッション名にタイムスタンプを追加して重複回避
- **CLN-01**: `POST /api/sessions/bulk-delete` で一括削除 API を追加

詳細は [TASKS.md](./TASKS.md#phase-161-context-management-バグ修正) 参照

---

## Phase 1.7: UI統合 `cc:TODO`

> 目的: 実装済みAPI機能をUIに反映し、未実装APIのUI部分を削除

### 概要

```
削除対象（APIが未実装）:
├── Work Items ページ全体
├── workItemStore.ts
└── マイルストーン・ブロッカー関連UI

追加対象（APIは実装済み）:
├── プロジェクト管理 CRUD UI
├── セッション一括削除 UI
├── メッセージ削除 UI
└── マージ削除 UI

整理対象:
├── Settings ページ（削除）
├── メモリAPI表示（将来検討）
└── 未使用コンポーネント整理
```

### タスク一覧

| ID | タスク | 優先度 | 状態 |
|----|--------|--------|------|
| UI-DEL-01 | Work Items 関連ファイル削除 | 🔴 High | `cc:TODO` |
| UI-DEL-02 | Settings ナビゲーション削除 | 🟡 Medium | `cc:TODO` |
| UI-ADD-01 | セッション一括削除 UI | 🔴 High | `cc:TODO` |
| UI-ADD-02 | プロジェクト管理 UI | 🟡 Medium | `cc:TODO` |
| UI-ADD-03 | メッセージ削除 UI | 🟢 Low | `cc:TODO` |
| UI-ADD-04 | マージ削除 UI | 🟢 Low | `cc:TODO` |
| UI-FIX-01 | セッション詳細ポップアップ改善 | 🟡 Medium | `cc:TODO` |
| UI-FIX-02 | テーマ永続化（localStorage） | 🟢 Low | `cc:TODO` |

詳細は [TASKS.md](./TASKS.md#phase-17-ui統合) 参照

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

## Context Management フロー（Phase 1.6.1 で修正中）

```
┌─────────────────────────────────────────────────────────────────┐
│  Context Management フロー                                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SessionStart                                                   │
│       │                                                         │
│       └─ (セッション登録のみ、コンテキスト注入なし)              │
│                                                                 │
│  UserPromptSubmit（初回メッセージ）                              │
│       │                                                         │
│       ├─ /cnthub:get → 手動選択（従来通り）                     │
│       ├─ /cnthub:export → Smart Export（改修版）               │
│       └─ 通常メッセージ → 自動検索 + additionalContext 注入     │
│                                                                 │
│  /cnthub:export 改修版                                          │
│       │                                                         │
│       ├─ Export 完了後、確認表示                                │
│       │   「選択部分をコンテキストから取り除きますか？」         │
│       │                                                         │
│       ├─ Yes → 残り部分を backend 保存                          │
│       │        ユーザーに /clear を促す                         │
│       │                                                         │
│       └─ /clear 後の次メッセージで残り部分を自動注入            │
│                                                                 │
│  SessionEnd                                                     │
│       │                                                         │
│       └─ 要約・Embedding のみ（タイトル生成スキップ）           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

詳細は [TASKS.md](./TASKS.md) 参照
