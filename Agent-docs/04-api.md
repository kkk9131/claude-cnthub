# API 設計

## 概要

| 項目 | 内容 |
|------|------|
| **フレームワーク** | Hono |
| **プロトコル** | REST + WebSocket |
| **ポート** | 3048 (統合サーバー) |
| **認証** | ローカル専用のため基本なし |

---

## エンドポイント一覧

### Memory API (シンプル設計)

supermemory 参考のシンプルな 3 エンドポイント:

| Method | Path | 説明 |
|--------|------|------|
| POST | `/memories/add` | メモリ追加 |
| GET | `/memories/search` | セマンティック検索 |
| GET | `/memories/context` | コンテキスト取得 (注入用) |

### Sessions API

| Method | Path | 説明 |
|--------|------|------|
| GET | `/api/sessions` | セッション一覧 (Level 0) |
| POST | `/api/sessions` | セッション作成 |
| GET | `/api/sessions/:id` | セッション詳細 (Level 1) |
| PATCH | `/api/sessions/:id` | セッション更新 |
| DELETE | `/api/sessions/:id` | セッション削除 (論理削除) |
| GET | `/api/sessions/:id/observations` | 観測記録一覧 |
| POST | `/api/sessions/:id/fork` | セッション分岐 |
| GET | `/api/sessions/:id/forks` | 分岐セッション一覧 |

### Merges API

| Method | Path | 説明 |
|--------|------|------|
| GET | `/api/merges` | マージ一覧 |
| POST | `/api/merges` | マージ作成 |
| GET | `/api/merges/:id` | マージ詳細 |
| DELETE | `/api/merges/:id` | マージ削除 |

### Projects API

| Method | Path | 説明 |
|--------|------|------|
| GET | `/api/projects` | プロジェクト一覧 |
| POST | `/api/projects` | プロジェクト作成 |
| GET | `/api/projects/:id` | プロジェクト詳細 |
| PATCH | `/api/projects/:id` | プロジェクト更新 |

### Profiles API (Phase 2)

| Method | Path | 説明 |
|--------|------|------|
| GET | `/api/profiles/:projectId` | プロファイル取得 |
| PATCH | `/api/profiles/:projectId` | プロファイル更新 |

### Hook API

| Method | Path | 説明 |
|--------|------|------|
| POST | `/hook/session-start` | セッション開始 |
| POST | `/hook/user-prompt-submit` | プロンプト送信 |
| POST | `/hook/post-tool-use` | ツール使用後 |
| POST | `/hook/stop` | 中断 |
| POST | `/hook/session-end` | セッション終了 |
| GET | `/hook/health` | ヘルスチェック |

---

## 詳細仕様

### POST /memories/add

メモリ追加（観測記録、決定事項等）

**Request:**

```json
{
  "sessionId": "ch_ss_0001",
  "type": "decision",
  "title": "Skills + Worker API を採用",
  "content": "MCP Tools ではなく Skills を使用することに決定...",
  "metadata": {
    "reason": "安定性とclaude-code-harnessとの一貫性"
  }
}
```

**Response: 201 Created**

```json
{
  "id": "ch_ob_0042",
  "sessionId": "ch_ss_0001",
  "type": "decision",
  "title": "Skills + Worker API を採用",
  "createdAt": "2025-12-31T08:00:00Z"
}
```

### GET /memories/search

セマンティック検索

**Query Parameters:**

- `q` (required): 検索クエリ
- `limit` (optional): 結果数（default: 10）
- `projectId` (optional): プロジェクトフィルタ
- `type` (optional): タイプフィルタ (decision, error, etc.)

**Request:**

```
GET /memories/search?q=認証の実装方法&limit=5
```

**Response: 200 OK**

```json
{
  "results": [
    {
      "id": "ch_ob_0015",
      "sessionId": "ch_ss_0003",
      "type": "decision",
      "title": "JWT認証を採用",
      "content": "JWT を使用した認証機能を実装...",
      "relevanceScore": 0.92,
      "createdAt": "2025-12-30T10:00:00Z"
    }
  ],
  "totalCount": 15,
  "query": "認証の実装方法"
}
```

### GET /memories/context

コンテキスト注入用（SessionStart Hook で使用）

**Query Parameters:**

- `projectPath` (required): プロジェクトパス
- `query` (optional): 検索クエリ（タスク内容等）
- `level` (optional): 0 (インデックスのみ) or 1 (詳細込み)

**Response: 200 OK**

```json
{
  "project": {
    "id": "ch_pj_0001",
    "name": "claude-cnthub"
  },
  "recentSessions": [
    {
      "id": "ch_ss_0010",
      "name": "Phase 7 マージシステム実装",
      "status": "completed",
      "tags": ["merge", "api"]
    }
  ],
  "relevantMemories": [
    {
      "id": "ch_ob_0042",
      "type": "decision",
      "title": "Skills + Worker API を採用",
      "summary": "MCP Tools ではなく..."
    }
  ],
  "dynamicFacts": {
    "currentPhase": "Phase 8",
    "recentDecisions": ["Skills採用", "統合サーバー"]
  }
}
```

### GET /api/sessions (Level 0 インデックス)

セッション一覧（軽量）

**Response: 200 OK**

```json
{
  "sessions": [
    {
      "id": "ch_ss_0010",
      "name": "Phase 7 マージシステム実装",
      "status": "completed",
      "tags": ["merge", "api"],
      "createdAt": "2025-12-31T07:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42
  }
}
```

### GET /api/sessions/:id (Level 1 詳細)

セッション詳細（要約込み）

**Response: 200 OK**

```json
{
  "id": "ch_ss_0010",
  "name": "Phase 7 マージシステム実装",
  "status": "completed",
  "workingDir": "/Users/kazuto/Desktop/claude-cnthub",
  "claudeSessionId": "claude_xyz123",
  "projectId": "ch_pj_0001",
  "tags": ["merge", "api"],
  "summary": {
    "shortSummary": "マージシステムの CRUD API を実装完了",
    "detailedSummary": "Phase 7 のマージシステムを実装しました...",
    "decisions": [
      "階層マージ対応のスキーマ設計",
      "AI マージ要約機能の追加"
    ],
    "fileChanges": [
      {"path": "packages/api/src/routes/merges.ts", "action": "created"}
    ],
    "errorsFixed": [],
    "tags": ["merge", "api", "database"]
  },
  "createdAt": "2025-12-31T07:00:00Z",
  "updatedAt": "2025-12-31T08:00:00Z"
}
```

### POST /hook/session-start

Claude Code セッション開始

**Request:**

```json
{
  "claudeSessionId": "claude_xyz123",
  "projectDir": "/Users/kazuto/Desktop/claude-cnthub",
  "task": "Phase 8 のプロジェクト管理機能を実装"
}
```

**Response: 200 OK**

```json
{
  "sessionId": "ch_ss_0011",
  "inject": {
    "context": "## 最近のセッション\n- ch_ss_0010: マージシステム実装完了\n\n## 最近の決定事項\n- Skills + Worker API を採用",
    "tokenCount": 150
  }
}
```

### POST /api/sessions/:id/fork

セッション分岐

**Request:**

```json
{
  "name": "A案: GraphQL実装",
  "createWorktree": true,
  "forkPoint": 5
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | 分岐後のセッション名（省略時は自動生成） |
| `createWorktree` | boolean | No | git worktree を作成するか（default: false） |
| `forkPoint` | number | No | 分岐時点のメッセージインデックス（省略時は現在） |

**Response: 201 Created**

```json
{
  "forkedSession": {
    "sessionId": "ch_ss_0042",
    "name": "A案: GraphQL実装",
    "parentSessionId": "ch_ss_0010",
    "forkPoint": 5,
    "worktreePath": "/path/to/worktree-ch_ss_0042"
  },
  "parentSession": {
    "sessionId": "ch_ss_0010",
    "name": "Phase 7 マージシステム実装"
  },
  "forkPoint": 5,
  "worktreePath": "/path/to/worktree-ch_ss_0042",
  "branchName": "fork/ch_ss_0042"
}
```

### GET /api/sessions/:id/forks

分岐セッション一覧

**Response: 200 OK**

```json
{
  "forks": [
    {
      "sessionId": "ch_ss_0042",
      "name": "A案: GraphQL実装",
      "status": "active",
      "forkPoint": 5,
      "worktreePath": "/path/to/worktree-ch_ss_0042"
    },
    {
      "sessionId": "ch_ss_0043",
      "name": "B案: REST API実装",
      "status": "completed",
      "forkPoint": 5,
      "worktreePath": null
    }
  ],
  "parentSessionId": "ch_ss_0010"
}
```

---

## WebSocket イベント

### 接続

```javascript
const socket = io("http://localhost:3048");

socket.emit("subscribe", { sessionId: "ch_ss_0001" });
```

### サーバー → クライアント イベント

| Event | Payload | 説明 |
|-------|---------|------|
| `observation` | `{ sessionId, observation }` | 観測記録追加 |
| `status_update` | `{ sessionId, status }` | ステータス変更 |
| `summary_generated` | `{ sessionId, summary }` | 要約生成完了 |

---

## Skills 連携

### Skills と Worker API の関係

```
Skills (行動指針)
    ↓ Claude が文脈で自動ロード
Claude が判断
    ↓ Bash/fetch で API 呼び出し
Worker API (実行)
    ↓
データベース操作
```

### Skill 定義例: cnthub-add

```markdown
# cnthub:add

## トリガー
- ユーザーが「これを記録して」「覚えておいて」と言った時
- 重要な決定事項が発生した時
- エラーを解決した時

## 行動指針
1. 記録すべき内容を特定
2. 適切なタイプを選択 (decision, error, learning)
3. Worker API を呼び出し

## 実行例
```bash
curl -X POST http://localhost:3048/memories/add \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "$SESSION_ID",
    "type": "decision",
    "title": "...",
    "content": "..."
  }'
```
```

---

## エラーレスポンス

### 形式

```json
{
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "Session with id 'ch_ss_9999' not found"
  }
}
```

### エラーコード

| Code | HTTP Status | 説明 |
|------|-------------|------|
| `VALIDATION_ERROR` | 400 | 入力値不正 |
| `SESSION_NOT_FOUND` | 404 | セッションが見つからない |
| `PROJECT_NOT_FOUND` | 404 | プロジェクトが見つからない |
| `SUMMARIZATION_FAILED` | 500 | 要約生成失敗 |
| `INTERNAL_ERROR` | 500 | 内部エラー |
