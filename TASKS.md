# TASKS.md - 並列実装タスク一覧

> git worktree による並列開発用タスクチケット
> 最終更新: 2025-12-31

## クイックスタート

```bash
# 1. ブランチ作成
git branch feature/unified-server
git branch feature/new-session-id
git branch feature/project-schema

# 2. worktree 作成（別ディレクトリで並列作業）
git worktree add ../cnthub-server feature/unified-server
git worktree add ../cnthub-session-id feature/new-session-id
git worktree add ../cnthub-project feature/project-schema

# 3. 各 worktree で作業
cd ../cnthub-server && bun install
cd ../cnthub-session-id && bun install
cd ../cnthub-project && bun install
```

---

## Phase 1: Claude Code Plugin

### 🔴 Group A: 基盤（依存なし・即時着手可）

#### I-01: サーバー統合

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/unified-server` |
| 見積もり | 3h |

**実装内容:**
```
packages/api/src/
├── index.ts           # Port 3048 で統合起動
├── routes/
│   ├── sessions.ts    # 既存
│   ├── memories.ts    # 新規 (シンプル API)
│   ├── hooks.ts       # Hook 受信
│   └── merges.ts      # 既存
```

**完了条件:**
- [ ] Port 3048 で統合サーバー起動
- [ ] `/hook/*` エンドポイント動作
- [ ] `/memories/*` エンドポイント動作
- [ ] 既存テスト通過

---

#### I-03: 新セッション ID 体系

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/new-session-id` |
| 見積もり | 2h |

**ID 形式:**
```typescript
ch_ss_0001  // セッション
ch_mg_0001  // マージ
ch_pj_0001  // プロジェクト
ch_ob_0001  // 観測記録
```

**実装内容:**
```typescript
// packages/api/src/utils/id-generator.ts
export function generateId(type: 'ss' | 'mg' | 'pj' | 'ob'): string {
  const count = getNextSequence(type);
  return `ch_${type}_${count.toString().padStart(4, '0')}`;
}
```

**完了条件:**
- [ ] ID 生成ユーティリティ実装
- [ ] sessions テーブルのカラム変更
- [ ] マイグレーション作成
- [ ] 既存テスト更新

---

#### P-01: Project 型定義・DB スキーマ

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/project-schema` |
| 見積もり | 2h |

**型定義:**
```typescript
// packages/shared/src/types/project.ts
export interface Project {
  id: string;           // ch_pj_0001
  name: string;
  path: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
```

**DB スキーマ:**
```sql
CREATE TABLE projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  path TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE sessions ADD COLUMN project_id TEXT REFERENCES projects(id);
```

**完了条件:**
- [ ] 型定義完了
- [ ] マイグレーション作成
- [ ] sessions との関連付け

---

#### S-01: cnthub:add Skill 定義

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/skill-add` |
| 見積もり | 1h |

**Skill ファイル:**
```
packages/plugin/skills/cnthub-add/SKILL.md
```

**完了条件:**
- [ ] SKILL.md 作成
- [ ] トリガー条件定義
- [ ] Worker API 呼び出し例記載

---

#### G-01: ツリービューコンポーネント

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/tree-view` |
| 見積もり | 4h |

**コンポーネント:**
```
packages/web/src/components/TreeView/
├── TreeView.tsx
├── TreeNode.tsx
├── TreeBranch.tsx
└── types.ts
```

**完了条件:**
- [ ] 基本コンポーネント実装
- [ ] 展開/折りたたみ動作
- [ ] ダークモードスタイリング

---

#### C-01: CLI パッケージ初期化

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/cli-init` |
| 見積もり | 2h |

**構成:**
```
packages/cli/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts
│   └── commands/
└── bin/cnthub
```

**完了条件:**
- [ ] パッケージ初期化
- [ ] `cnthub --help` 動作
- [ ] モノレポに統合

---

### 🟡 Group B: コア機能（Group A 依存）

| ID | タスク | 依存 | 見積もり |
|----|--------|------|---------|
| I-02 | Memory API シンプル化 | I-01 | 3h |
| P-02 | プロジェクト CRUD API | P-01 | 3h |
| P-03 | セッション→プロジェクト自動紐付け | P-01 | 2h |
| S-02 | cnthub:search Skill 定義 | S-01 | 1h |
| S-03 | cnthub:gui Skill 定義 | S-01 | 1h |
| G-02 | ドラッグ&ドロップ基盤 | G-01 | 4h |
| C-02 | `cnthub list` | C-01 | 2h |
| C-03 | `cnthub search` | C-01 | 2h |

---

### 🟢 Group C: 統合機能（Group B 依存）

| ID | タスク | 依存 | 見積もり |
|----|--------|------|---------|
| G-03 | マージ操作 UI | G-02 | 4h |
| G-04 | プロジェクト切替 UI | P-02 | 2h |
| C-04 | `cnthub merge` | C-01 | 2h |

---

### 🟠 Group C2: UI 統合（コンポーネント → 画面）

> G-01〜G-04 で作成したコンポーネントを実際の画面に統合

#### UI-01: TreeView を SessionList に統合

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/ui-treeview-integration` |
| 依存 | G-01 |
| 見積もり | 2h |

**実装内容:**
```
packages/web/src/components/SessionList.tsx
  - SessionCard → TreeView に置き換え
  - セッションをツリー構造で表示
  - 展開/折りたたみ動作
```

**完了条件:**
- [ ] SessionList が TreeView を使用
- [ ] セッションがツリー形式で表示
- [ ] 展開/折りたたみが動作

---

#### UI-02: ProjectSwitcher を Sidebar に統合

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/ui-project-switcher` |
| 依存 | G-04 |
| 見積もり | 1h |

**実装内容:**
```
packages/web/src/components/Sidebar.tsx
  - ProjectSwitcher コンポーネントを追加
  - プロジェクト一覧表示
  - 切替機能
```

**完了条件:**
- [ ] Sidebar に ProjectSwitcher 表示
- [ ] プロジェクト一覧が表示される
- [ ] プロジェクト切替が動作

---

#### UI-03: DnD + MergeUI をセッション画面に統合

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/ui-dnd-merge` |
| 依存 | G-02, G-03 |
| 見積もり | 3h |

**実装内容:**
```
packages/web/src/
├── App.tsx              # DnDProvider でラップ
├── components/
│   ├── SessionList.tsx  # DraggableItem 適用
│   └── Sidebar.tsx      # DroppableZone 追加（マージエリア）
```

**完了条件:**
- [ ] セッションをドラッグ可能
- [ ] ドロップターゲットがハイライト
- [ ] マージ操作 UI が表示される

---

## Phase 2: Cross-LLM 連携

### 🔵 Group D: Profile System

| ID | タスク | 依存 | 見積もり |
|----|--------|------|---------|
| PF-01 | project_profiles テーブル | P-01 | 2h |
| PF-02 | Static/Dynamic Facts API | PF-01 | 3h |
| PF-03 | Dynamic Facts 自動更新 | PF-02 | 2h |

---

### 🟣 Group E: LLM 接続

| ID | タスク | 依存 | 見積もり |
|----|--------|------|---------|
| L-01 | LLM 接続設定 DB スキーマ | - | 2h |
| L-02 | ChatGPT Adapter | L-01 | 4h |
| L-03 | Codex Adapter | L-01 | 3h |
| L-04 | 接続管理 API | L-01 | 3h |

---

### ⚪ Group F: コンテキスト転送 UI

| ID | タスク | 依存 | 見積もり |
|----|--------|------|---------|
| T-01 | LLM 接続管理ページ | L-04 | 4h |
| T-02 | コンテキスト転送ページ | T-01, PF-02 | 5h |
| T-03 | コンテキストプレビュー・編集 | T-02 | 3h |

---

## 進捗トラッキング

```
Phase 1: Claude Code Plugin
─────────────────────────────────────────
Group A (基盤):     ██████████ 6/6 ✅
Group B (コア):     ██████████ 8/8 ✅
Group C (統合):     ██████░░░░ 2/3
Group C2 (UI統合):  ░░░░░░░░░░ 0/3
─────────────────────────────────────────
Phase 1 Total:      ████████░░ 16/20

Phase 2: Cross-LLM 連携
─────────────────────────────────────────
Group D (Profile):  ░░░░░░░░░░ 0/3
Group E (LLM):      ░░░░░░░░░░ 0/4
Group F (転送UI):   ░░░░░░░░░░ 0/3
─────────────────────────────────────────
Phase 2 Total:      ░░░░░░░░░░ 0/10

Overall:            ████████░░ 16/30

# 次の優先タスク
1. UI-01 - TreeView を SessionList に統合
2. UI-02 - ProjectSwitcher を Sidebar に統合
3. UI-03 - DnD + MergeUI をセッション画面に統合
```
