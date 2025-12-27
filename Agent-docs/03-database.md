# データベース設計

## 概要

| 項目         | 内容                       |
| ------------ | -------------------------- |
| **DBMS**     | SQLite（Bun 組み込み）     |
| **拡張**     | sqlite-vec（ベクトル検索） |
| **保存場所** | `~/.claude-cnthub/data.db` |

---

## ER 図

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│   projects   │     │  work_items  │     │    sessions      │
├──────────────┤     ├──────────────┤     ├──────────────────┤
│ project_id   │◄────┤ project_id   │◄────┤ project_id       │
│ name         │     │ work_item_id │◄────┤ work_item_id     │
│ path         │     │ name         │     │ session_id       │
│ description  │     │ status       │     │ name             │
└──────────────┘     └──────────────┘     │ working_dir      │
                                          │ claude_session_id│
                                          │ status           │
                                          └────────┬─────────┘
                                                   │
                     ┌─────────────────────────────┼─────────────────────────────┐
                     │                             │                             │
                     ▼                             ▼                             ▼
          ┌──────────────────┐         ┌───────────────────┐         ┌─────────────────────┐
          │    messages      │         │ session_summaries │         │ work_item_progress  │
          ├──────────────────┤         ├───────────────────┤         ├─────────────────────┤
          │ message_id       │         │ summary_id        │         │ entry_id            │
          │ session_id       │         │ session_id        │         │ work_item_id        │
          │ type             │         │ short_summary     │         │ session_id          │
          │ content          │         │ detailed_summary  │         │ entry_type          │
          │ timestamp        │         │ topics (JSON)     │         │ summary             │
          └──────────────────┘         │ embedding_vector  │         └─────────────────────┘
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

### projects

プロジェクト管理テーブル

```sql
CREATE TABLE projects (
  project_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  path TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_path ON projects(path);
```

### work_items

Work Item（タスク）管理テーブル

```sql
CREATE TABLE work_items (
  work_item_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'planning'
    CHECK (status IN ('planning', 'in_progress', 'review', 'completed', 'blocked')),
  project_id TEXT REFERENCES projects(project_id) ON DELETE SET NULL,
  tags TEXT,  -- JSON array
  priority INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_work_items_project ON work_items(project_id);
CREATE INDEX idx_work_items_status ON work_items(status);
```

### sessions

セッション管理テーブル

```sql
CREATE TABLE sessions (
  session_id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  working_dir TEXT NOT NULL,
  task TEXT,
  status TEXT NOT NULL DEFAULT 'idle'
    CHECK (status IN ('idle', 'processing', 'completed', 'error')),
  claude_session_id TEXT,
  work_item_id TEXT REFERENCES work_items(work_item_id) ON DELETE SET NULL,
  project_id TEXT REFERENCES projects(project_id) ON DELETE SET NULL,
  continue_chat INTEGER DEFAULT 0,
  dangerously_skip_permissions INTEGER DEFAULT 0,
  error TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME
);

CREATE INDEX idx_sessions_status ON sessions(status);
CREATE INDEX idx_sessions_work_item ON sessions(work_item_id);
CREATE INDEX idx_sessions_project ON sessions(project_id);
CREATE INDEX idx_sessions_created ON sessions(created_at);
```

### messages

メッセージ保存テーブル

```sql
CREATE TABLE messages (
  message_id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
  type TEXT NOT NULL
    CHECK (type IN ('user', 'assistant', 'system', 'tool_use', 'tool_result', 'thinking', 'error')),
  content TEXT NOT NULL,
  compressed INTEGER DEFAULT 0,
  original_size INTEGER,
  compressed_size INTEGER,
  metadata TEXT,  -- JSON
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_messages_session ON messages(session_id);
CREATE INDEX idx_messages_timestamp ON messages(timestamp);
CREATE INDEX idx_messages_type ON messages(type);
```

### session_summaries

AI 生成のセッション要約テーブル

```sql
CREATE TABLE session_summaries (
  summary_id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE REFERENCES sessions(session_id) ON DELETE CASCADE,
  short_summary TEXT NOT NULL,
  detailed_summary TEXT NOT NULL,
  key_decisions TEXT,     -- JSON array
  files_modified TEXT,    -- JSON array
  tools_used TEXT,        -- JSON array
  topics TEXT,            -- JSON array
  original_token_count INTEGER,
  summary_token_count INTEGER,
  compression_ratio REAL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_summaries_session ON session_summaries(session_id);
CREATE INDEX idx_summaries_created ON session_summaries(created_at);
```

### vec_embeddings (sqlite-vec)

ベクトル検索用仮想テーブル

```sql
-- sqlite-vec 拡張のロード
-- SELECT load_extension('vec0');

CREATE VIRTUAL TABLE vec_embeddings USING vec0(
  embedding float[384]
);
```

### embedding_index

ベクトルとコンテンツのマッピングテーブル

```sql
CREATE TABLE embedding_index (
  embedding_id INTEGER PRIMARY KEY,
  source_type TEXT NOT NULL CHECK (source_type IN ('summary', 'message', 'work_item')),
  source_id TEXT NOT NULL,
  session_id TEXT REFERENCES sessions(session_id) ON DELETE CASCADE,
  content_preview TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_embedding_source ON embedding_index(source_type, source_id);
CREATE INDEX idx_embedding_session ON embedding_index(session_id);
```

### work_item_progress

Work Item の進捗トラッキングテーブル

```sql
CREATE TABLE work_item_progress (
  entry_id TEXT PRIMARY KEY,
  work_item_id TEXT NOT NULL REFERENCES work_items(work_item_id) ON DELETE CASCADE,
  session_id TEXT NOT NULL REFERENCES sessions(session_id) ON DELETE CASCADE,
  entry_type TEXT NOT NULL
    CHECK (entry_type IN ('milestone', 'progress', 'blocker', 'decision')),
  summary TEXT NOT NULL,
  details TEXT,
  metadata TEXT,  -- JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_progress_work_item ON work_item_progress(work_item_id);
CREATE INDEX idx_progress_session ON work_item_progress(session_id);
CREATE INDEX idx_progress_type ON work_item_progress(entry_type);
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
├── 002_add_summaries.ts
├── 003_add_vector_search.ts
└── 004_add_progress_tracking.ts
```

---

## クエリ例

### セマンティック検索

```sql
-- 1. クエリテキストから Embedding を生成（アプリ側で実行）
-- 2. 類似度検索
SELECT
  e.embedding_id,
  ei.source_type,
  ei.source_id,
  ei.content_preview,
  distance
FROM vec_embeddings e
INNER JOIN embedding_index ei ON e.rowid = ei.embedding_id
WHERE e.embedding MATCH ?  -- クエリベクトル
  AND k = 10              -- 上位10件
ORDER BY distance;
```

### セッション一覧（要約付き）

```sql
SELECT
  s.*,
  ss.short_summary,
  ss.topics
FROM sessions s
LEFT JOIN session_summaries ss ON s.session_id = ss.session_id
WHERE s.deleted_at IS NULL
ORDER BY s.updated_at DESC
LIMIT ? OFFSET ?;
```

### Work Item の進捗取得

```sql
SELECT
  wi.*,
  COUNT(DISTINCT s.session_id) as session_count,
  COUNT(CASE WHEN wip.entry_type = 'milestone' THEN 1 END) as milestone_count,
  COUNT(CASE WHEN wip.entry_type = 'blocker' THEN 1 END) as blocker_count
FROM work_items wi
LEFT JOIN sessions s ON wi.work_item_id = s.work_item_id
LEFT JOIN work_item_progress wip ON wi.work_item_id = wip.work_item_id
WHERE wi.work_item_id = ?
GROUP BY wi.work_item_id;
```
