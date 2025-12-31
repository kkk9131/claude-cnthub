# データベース設計

## 概要

| 項目 | 内容 |
|------|------|
| **DBMS** | SQLite（Bun 組み込み） |
| **拡張** | sqlite-vec（ベクトル検索） |
| **保存場所** | `~/.claude-cnthub/data.db` |

---

## ER 図

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│   projects   │     │    merges    │     │    sessions      │
├──────────────┤     ├──────────────┤     ├──────────────────┤
│ id (ch_pj_*) │◄────┤ project_id   │◄────┤ project_id       │
│ name         │     │ id (ch_mg_*) │     │ id (ch_ss_*)     │
│ path         │     │ name         │     │ name             │
│ description  │     │ summary      │     │ working_dir      │
└──────────────┘     │ source_ids   │     │ status           │
                     └──────────────┘     │ claude_session_id│
                                          └────────┬─────────┘
                                                   │
                     ┌─────────────────────────────┼────────────────┐
                     │                             │                │
                     ▼                             ▼                ▼
          ┌──────────────────┐         ┌───────────────────┐ ┌─────────────────┐
          │   observations   │         │ session_summaries │ │ project_profiles│
          ├──────────────────┤         ├───────────────────┤ ├─────────────────┤
          │ id (ch_ob_*)     │         │ id                │ │ project_id      │
          │ session_id       │         │ session_id        │ │ static_facts    │
          │ type             │         │ short_summary     │ │ dynamic_facts   │
          │ content          │         │ detailed_summary  │ └─────────────────┘
          │ metadata         │         │ tags              │
          └──────────────────┘         │ embedding_vector  │
                                       └───────────────────┘
                                                   │
                                                   ▼
                                       ┌───────────────────┐
                                       │ vec_embeddings    │
                                       │ (sqlite-vec)      │
                                       ├───────────────────┤
                                       │ embedding float[384]│
                                       └───────────────────┘
```

---

## テーブル定義

### sessions

セッション管理テーブル（cnthub 独自 ID）

```sql
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,                    -- ch_ss_0001 形式
  name TEXT NOT NULL,
  working_dir TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'completed', 'error', 'merged')),
  claude_session_id TEXT,                 -- Claude 側の session_id（参考用）
  project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,
  tags TEXT,                              -- JSON array
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME
);

CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_sessions_project ON sessions(project_id);
CREATE INDEX idx_sessions_created ON sessions(created_at);
```

### observations

セッション中の観測記録（ツール使用、決定事項、エラー等）

```sql
CREATE TABLE observations (
  id TEXT PRIMARY KEY,                    -- ch_ob_0001 形式
  session_id TEXT NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  type TEXT NOT NULL
    CHECK (type IN ('tool_use', 'decision', 'error', 'learning', 'file_change')),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata TEXT,                          -- JSON (tool_name, file_path, etc.)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_observations_session ON observations(session_id);
CREATE INDEX idx_observations_type ON observations(type);
CREATE INDEX idx_observations_created ON observations(created_at);
```

### session_summaries

AI 生成のセッション要約テーブル

```sql
CREATE TABLE session_summaries (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE REFERENCES sessions(id) ON DELETE CASCADE,
  short_summary TEXT NOT NULL,
  detailed_summary TEXT NOT NULL,
  decisions TEXT,                         -- JSON array
  file_changes TEXT,                      -- JSON array
  errors_fixed TEXT,                      -- JSON array
  tags TEXT,                              -- JSON array
  original_token_count INTEGER,
  summary_token_count INTEGER,
  compression_ratio REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_summaries_session ON session_summaries(session_id);
CREATE INDEX idx_summaries_created ON session_summaries(created_at);
```

### merges

マージ（複数セッションの知識統合）

```sql
CREATE TABLE merges (
  id TEXT PRIMARY KEY,                    -- ch_mg_0001 形式
  name TEXT NOT NULL,
  summary TEXT,
  source_session_ids TEXT NOT NULL,       -- JSON array
  source_merge_ids TEXT,                  -- JSON array（階層マージ用）
  decisions TEXT,                         -- JSON array
  file_changes TEXT,                      -- JSON array
  errors_fixed TEXT,                      -- JSON array
  tags TEXT,                              -- JSON array
  project_id TEXT REFERENCES projects(id) ON DELETE SET NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_merges_project ON merges(project_id);
CREATE INDEX idx_merges_created ON merges(created_at);
```

### projects

プロジェクト管理テーブル

```sql
CREATE TABLE projects (
  id TEXT PRIMARY KEY,                    -- ch_pj_0001 形式
  name TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_path ON projects(path);
```

### project_profiles (Phase 2)

プロジェクトプロファイル（Static/Dynamic Facts）

```sql
CREATE TABLE project_profiles (
  project_id TEXT PRIMARY KEY REFERENCES projects(id) ON DELETE CASCADE,
  static_facts TEXT,                      -- JSON (tech_stack, conventions, etc.)
  dynamic_facts TEXT,                     -- JSON (current_phase, recent_decisions, etc.)
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### vec_embeddings (sqlite-vec)

ベクトル検索用仮想テーブル

```sql
CREATE VIRTUAL TABLE vec_embeddings USING vec0(
  embedding float[384]
);
```

### embedding_index

ベクトルとコンテンツのマッピングテーブル

```sql
CREATE TABLE embedding_index (
  embedding_id INTEGER PRIMARY KEY,
  source_type TEXT NOT NULL CHECK (source_type IN ('summary', 'observation', 'merge')),
  source_id TEXT NOT NULL,
  session_id TEXT REFERENCES sessions(id) ON DELETE CASCADE,
  content_preview TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_embedding_source ON embedding_index(source_type, source_id);
CREATE INDEX idx_embedding_session ON embedding_index(session_id);
```

---

## ID 生成ルール

```typescript
// ID 生成関数
function generateId(prefix: 'ss' | 'mg' | 'pj' | 'ob'): string {
  const count = getNextSequence(prefix);
  return `ch_${prefix}_${count.toString().padStart(4, '0')}`;
}

// 例
generateId('ss'); // → ch_ss_0001
generateId('mg'); // → ch_mg_0001
generateId('pj'); // → ch_pj_0001
generateId('ob'); // → ch_ob_0001
```

---

## クエリ例

### セマンティック検索

```sql
SELECT
  e.embedding_id,
  ei.source_type,
  ei.source_id,
  ei.content_preview,
  distance
FROM vec_embeddings e
INNER JOIN embedding_index ei ON e.rowid = ei.embedding_id
WHERE e.embedding MATCH ?
  AND k = 10
ORDER BY distance;
```

### セッション一覧 (Level 0 インデックス)

```sql
SELECT
  s.id,
  s.name,
  s.status,
  s.tags,
  s.created_at
FROM sessions s
WHERE s.deleted_at IS NULL
ORDER BY s.updated_at DESC
LIMIT ? OFFSET ?;
```

### セッション詳細 (Level 1 要約)

```sql
SELECT
  s.*,
  ss.short_summary,
  ss.detailed_summary,
  ss.decisions,
  ss.file_changes,
  ss.tags
FROM sessions s
LEFT JOIN session_summaries ss ON s.id = ss.session_id
WHERE s.id = ?;
```

### プロジェクトプロファイル取得

```sql
SELECT
  p.*,
  pp.static_facts,
  pp.dynamic_facts
FROM projects p
LEFT JOIN project_profiles pp ON p.id = pp.project_id
WHERE p.path = ?;
```

---

## マイグレーション戦略

### バージョン管理

```sql
CREATE TABLE migrations (
  version INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  applied_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### マイグレーションファイル構成

```
packages/api/src/db/migrations/
├── 001_initial_schema.ts
├── 002_add_observations.ts
├── 003_add_merges.ts
├── 004_add_vector_search.ts
├── 005_add_profiles.ts        # Phase 2
└── 006_add_llm_connections.ts # Phase 2
```
