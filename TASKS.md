# TASKS.md - 並列実装タスク一覧

> git worktree による並列開発用タスクチケット

## クイックスタート

```bash
# 1. ブランチ作成
git branch feature/hook-server
git branch feature/session-index-types
git branch feature/merge-schema

# 2. worktree 作成（別ディレクトリで並列作業）
git worktree add ../cnthub-hook feature/hook-server
git worktree add ../cnthub-index feature/session-index-types
git worktree add ../cnthub-merge feature/merge-schema

# 3. 各 worktree で作業
cd ../cnthub-hook && bun install
cd ../cnthub-index && bun install
cd ../cnthub-merge && bun install
```

---

## 🔴 Group A: 基盤（依存なし・即時着手可）

### H-01: Hook サーバー基盤

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/hook-server` |
| 見積もり | 4h |
| 担当 | - |

**実装内容:**
```
packages/api/src/
├── routes/hooks.ts          # POST /hook/*
└── services/hookHandler.ts  # イベント処理
```

**API:**
- `POST /hook/session-start` - セッション開始
- `POST /hook/session-stop` - セッション終了（→要約生成トリガー）
- `POST /hook/message` - メッセージ受信

**完了条件:**
- [ ] エンドポイント実装
- [ ] イベントログ記録
- [ ] テスト作成

---

### H-03: セッション自動登録 API

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/session-auto-register` |
| 見積もり | 2h |
| 担当 | - |

**実装内容:**
```
packages/api/src/
└── routes/sessions.ts  # POST /api/sessions/auto
```

**API:**
- `POST /api/sessions/auto` - Hook からの自動セッション登録
  - セッションID生成（cnthub側）
  - プロジェクトパスから自動プロジェクト紐付け

**完了条件:**
- [ ] 自動登録 API 実装
- [ ] ID 生成ロジック（連番 + prefix）
- [ ] テスト作成

---

### L-01: SessionIndex 型定義

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/session-index-types` |
| 見積もり | 2h |
| 担当 | - |

**型定義:**
```typescript
// packages/shared/src/types/sessionIndex.ts

export interface SessionIndex {
  id: string;           // "0001"
  sn: string;           // セッション名 "API実装"
  status: SessionStatus;
  tags: string[];       // ["api", "error", "auth"]
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}

export type SessionStatus = 
  | "in_progress" 
  | "completed" 
  | "error" 
  | "merged";
```

**完了条件:**
- [ ] 型定義完了
- [ ] shared からエクスポート
- [ ] 既存型との整合性確認

---

### L-04: 要約スキーマ拡張

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/summary-schema` |
| 見積もり | 3h |
| 担当 | - |

**拡張フィールド:**
```typescript
// packages/shared/src/types/summary.ts

export interface SessionSummary {
  id: string;
  sn: string;
  
  // 既存
  content: string;
  
  // 新規追加
  changes: FileChange[];      // 変更差分
  errors: ErrorFix[];         // エラー→修正履歴
  decisions: Decision[];      // 決定事項
  
  tags: string[];
  createdAt: string;
}

export interface FileChange {
  path: string;
  action: "created" | "modified" | "deleted";
  diff?: string;
}

export interface ErrorFix {
  error: string;
  fix: string;
  timestamp: string;
}

export interface Decision {
  title: string;
  description: string;
  reason?: string;
}
```

**DB マイグレーション:**
```sql
ALTER TABLE summaries ADD COLUMN changes TEXT;      -- JSON
ALTER TABLE summaries ADD COLUMN errors TEXT;       -- JSON
ALTER TABLE summaries ADD COLUMN decisions TEXT;    -- JSON
ALTER TABLE summaries ADD COLUMN tags TEXT;         -- JSON
```

**完了条件:**
- [ ] 型定義完了
- [ ] マイグレーション作成
- [ ] 既存データとの互換性確認

---

### M-01: Merge 型定義・DB スキーマ

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/merge-schema` |
| 見積もり | 3h |
| 担当 | - |

**型定義:**
```typescript
// packages/shared/src/types/merge.ts

export interface Merge {
  id: string;
  name: string;
  summary: string;
  
  sourceSessionIds: string[];  // マージ元セッション
  sourceMergeIds?: string[];   // マージ元マージ（階層マージ用）
  
  changes: FileChange[];
  errors: ErrorFix[];
  decisions: Decision[];
  
  projectId?: string;
  tags: string[];
  
  createdAt: string;
  updatedAt: string;
}
```

**DB スキーマ:**
```sql
CREATE TABLE merges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  summary TEXT,
  source_session_ids TEXT NOT NULL,  -- JSON array
  source_merge_ids TEXT,              -- JSON array
  changes TEXT,                       -- JSON
  errors TEXT,                        -- JSON
  decisions TEXT,                     -- JSON
  project_id TEXT,
  tags TEXT,                          -- JSON
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id)
);
```

**完了条件:**
- [ ] 型定義完了
- [ ] マイグレーション作成
- [ ] shared からエクスポート

---

### P-01: Project 型定義・DB スキーマ

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/project-schema` |
| 見積もり | 2h |
| 担当 | - |

**型定義:**
```typescript
// packages/shared/src/types/project.ts

export interface Project {
  id: string;
  name: string;
  path: string;           // リポジトリパス
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

-- sessions テーブルに project_id 追加
ALTER TABLE sessions ADD COLUMN project_id TEXT REFERENCES projects(id);
```

**完了条件:**
- [ ] 型定義完了
- [ ] マイグレーション作成
- [ ] sessions との関連付け

---

### G-01: ツリービューコンポーネント

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/tree-view` |
| 見積もり | 4h |
| 担当 | - |

**コンポーネント:**
```
packages/web/src/components/
├── TreeView/
│   ├── TreeView.tsx        # メインコンポーネント
│   ├── TreeNode.tsx        # ノード
│   ├── TreeBranch.tsx      # ブランチ（展開/折りたたみ）
│   └── types.ts            # 型定義
```

**Props:**
```typescript
interface TreeViewProps {
  data: TreeNode[];
  onNodeClick?: (node: TreeNode) => void;
  onNodeExpand?: (node: TreeNode) => void;
  selectedId?: string;
}

interface TreeNode {
  id: string;
  label: string;
  type: "project" | "session" | "merge";
  children?: TreeNode[];
  data?: SessionIndex | Merge;
}
```

**完了条件:**
- [ ] コンポーネント実装
- [ ] 展開/折りたたみ動作
- [ ] スタイリング
- [ ] Storybook（任意）

---

### C-01: CLI パッケージ初期化

| 項目 | 内容 |
|------|------|
| ブランチ | `feature/cli-init` |
| 見積もり | 2h |
| 担当 | - |

**構成:**
```
packages/cli/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts          # エントリポイント
│   ├── commands/         # コマンド定義
│   └── lib/              # 共通ライブラリ
└── bin/
    └── cnthub            # 実行ファイル
```

**package.json:**
```json
{
  "name": "@claude-cnthub/cli",
  "bin": {
    "cnthub": "./bin/cnthub"
  },
  "dependencies": {
    "commander": "^12.0.0"
  }
}
```

**完了条件:**
- [ ] パッケージ初期化
- [ ] `cnthub --help` 動作
- [ ] モノレポに統合

---

## 🟡 Group B: コア API（Group A 依存）

| ID | タスク | 依存 | 見積もり |
|----|--------|------|---------|
| H-02 | Claude Code stop イベント検知 | H-01 | 3h |
| H-04 | hooks.json 設定生成 CLI | H-01 | 2h |
| L-02 | Level 0 インデックス API | L-01 | 3h |
| L-03 | Level 1 要約詳細 API | L-01 | 2h |
| L-05 | タグ自動抽出サービス | L-04 | 3h |
| L-06 | SN 自動命名 | L-04 | 2h |
| M-02 | マージ実行 API | M-01 | 4h |
| M-04 | マージ一覧・詳細 API | M-01 | 2h |
| M-05 | マージ抽出 API | M-01 | 2h |
| M-06 | マージ削除 API | M-01 | 1h |
| P-02 | プロジェクト CRUD API | P-01 | 3h |
| P-03 | セッション→プロジェクト紐付け | P-01 | 2h |
| G-02 | ドラッグ&ドロップ基盤 | G-01 | 4h |
| C-02 | `cnthub list` | C-01, L-02 | 2h |
| C-03 | `cnthub search` | C-01, L-02 | 2h |

---

## 🟢 Group C: 統合機能（Group B 依存）

| ID | タスク | 依存 | 見積もり |
|----|--------|------|---------|
| M-03 | AI マージ要約生成 | M-02, L-04 | 4h |
| P-04 | 共有パターン DB スキーマ | P-01, M-01 | 3h |
| P-05 | クロスプロジェクト検索 API | P-04 | 3h |
| G-03 | マージ操作 UI | G-02, M-02 | 4h |
| G-04 | プロジェクト切替 UI | P-02 | 2h |
| C-04 | `cnthub merge` | C-01, M-02 | 2h |
| C-05 | `cnthub inject` | C-01, L-03 | 2h |
| C-06 | `cnthub init` | C-01, H-04 | 2h |

---

## 🔵 Group D: 高度機能（Group C 依存）

| ID | タスク | 依存 | 見積もり |
|----|--------|------|---------|
| G-05 | クロスプロジェクトマージ UI | G-03, P-04 | 4h |
| G-06 | マージ管理 UI（抽出・削除） | M-05, M-06 | 3h |

---

## 進捗トラッキング

```
Group A: ████████░░ 6/8  (L-01,L-04,M-01,H-01,L-05,L-06 完了)
Group B: ████████░░ 10/15 (L-02,L-03,M-02,M-04,M-05,M-06,L-05,L-06,H-03,M-03 完了)
Group C: ░░░░░░░░░░ 0/8
Group D: ░░░░░░░░░░ 0/2
─────────────────────
Total:   ████████░░ 16/33

# 最新状況 (2025-12-31)
- Phase 6 (L-01~L-06): 全て完了
- Phase 7 (M-01~M-06): 全て完了 (M-03 AI マージ要約追加)
- 次: Phase 8 (プロジェクト管理) または Phase 9 (GUI)
```
