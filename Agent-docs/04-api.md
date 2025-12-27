# API 設計

## 概要

| 項目               | 内容                                       |
| ------------------ | ------------------------------------------ |
| **フレームワーク** | Hono                                       |
| **プロトコル**     | REST + WebSocket                           |
| **ポート**         | API: 3001, Hook: 37778                     |
| **認証**           | ローカル専用のため基本なし（将来拡張可能） |

---

## エンドポイント一覧

### Sessions API

| Method | Path                          | 説明                       |
| ------ | ----------------------------- | -------------------------- |
| GET    | `/api/sessions`               | セッション一覧取得         |
| POST   | `/api/sessions`               | セッション作成             |
| GET    | `/api/sessions/:id`           | セッション詳細取得         |
| PATCH  | `/api/sessions/:id`           | セッション更新             |
| DELETE | `/api/sessions/:id`           | セッション削除（論理削除） |
| POST   | `/api/sessions/:id/messages`  | メッセージ送信             |
| GET    | `/api/sessions/:id/messages`  | メッセージ一覧取得         |
| POST   | `/api/sessions/:id/interrupt` | 実行中断                   |

### Memory API

| Method | Path                                 | 説明               |
| ------ | ------------------------------------ | ------------------ |
| POST   | `/api/memory/sessions/:id/summarize` | 要約生成           |
| GET    | `/api/memory/sessions/:id/summary`   | 要約取得           |
| GET    | `/api/memory/summaries`              | 全要約一覧         |
| GET    | `/api/memory/search`                 | セマンティック検索 |
| POST   | `/api/memory/reindex`                | 再インデックス     |

### Work Items API

| Method | Path                           | 説明             |
| ------ | ------------------------------ | ---------------- |
| GET    | `/api/work-items`              | Work Item 一覧   |
| POST   | `/api/work-items`              | Work Item 作成   |
| GET    | `/api/work-items/:id`          | Work Item 詳細   |
| PATCH  | `/api/work-items/:id`          | Work Item 更新   |
| DELETE | `/api/work-items/:id`          | Work Item 削除   |
| GET    | `/api/work-items/:id/progress` | 進捗取得         |
| GET    | `/api/work-items/:id/timeline` | タイムライン取得 |

### Projects API

| Method | Path                | 説明             |
| ------ | ------------------- | ---------------- |
| GET    | `/api/projects`     | プロジェクト一覧 |
| POST   | `/api/projects`     | プロジェクト作成 |
| GET    | `/api/projects/:id` | プロジェクト詳細 |
| PATCH  | `/api/projects/:id` | プロジェクト更新 |
| DELETE | `/api/projects/:id` | プロジェクト削除 |

### Hook Server API (Port 37778)

| Method | Path      | 説明                  |
| ------ | --------- | --------------------- |
| POST   | `/hook`   | Claude Code Hook 受信 |
| GET    | `/health` | ヘルスチェック        |
| GET    | `/config` | Hook 設定取得         |

---

## 詳細仕様

### POST /api/sessions

セッション作成

**Request:**

```json
{
  "name": "認証機能の実装",
  "workingDir": "/path/to/project",
  "task": "ログイン機能を実装してください",
  "workItemId": "wi_123",
  "projectId": "proj_456",
  "continueChat": false,
  "dangerouslySkipPermissions": false,
  "enableContextInjection": true
}
```

**Response: 201 Created**

```json
{
  "sessionId": "sess_abc123",
  "name": "認証機能の実装",
  "workingDir": "/path/to/project",
  "status": "idle",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

### POST /api/sessions/:id/messages

メッセージ送信（Claude Code 実行）

**Request:**

```json
{
  "content": "ログイン機能を実装してください"
}
```

**Response: 202 Accepted**

```json
{
  "messageId": "msg_xyz789",
  "status": "processing"
}
```

### GET /api/memory/search

セマンティック検索

**Query Parameters:**

- `q` (required): 検索クエリ
- `limit` (optional): 結果数（default: 10）
- `projectId` (optional): プロジェクトフィルタ
- `from` (optional): 開始日時
- `to` (optional): 終了日時

**Request:**

```
GET /api/memory/search?q=認証の実装方法&limit=5
```

**Response: 200 OK**

```json
{
  "results": [
    {
      "sessionId": "sess_abc123",
      "sessionName": "認証機能の実装",
      "summary": "JWT を使用した認証機能を実装...",
      "relevanceScore": 0.92,
      "matchedContent": "...認証にはJWTトークンを使用し...",
      "createdAt": "2024-01-15T10:00:00Z"
    }
  ],
  "totalCount": 15,
  "query": "認証の実装方法"
}
```

### POST /api/memory/sessions/:id/summarize

セッション要約生成

**Response: 200 OK**

```json
{
  "summaryId": "sum_def456",
  "sessionId": "sess_abc123",
  "shortSummary": "JWT 認証機能を実装。ログイン/ログアウト API 完成。",
  "detailedSummary": "このセッションでは、JWT を使用した認証機能を実装しました...",
  "keyDecisions": [
    "JWT トークンの有効期限を24時間に設定",
    "リフレッシュトークンは Redis で管理"
  ],
  "filesModified": ["src/auth/login.ts", "src/middleware/auth.ts"],
  "toolsUsed": ["Write", "Edit", "Bash"],
  "topics": ["認証", "JWT", "セキュリティ"],
  "compressionRatio": 15.3,
  "createdAt": "2024-01-15T12:00:00Z"
}
```

### POST /hook (Hook Server)

Claude Code からのフック受信

**Request:**

```json
{
  "event": "PostToolUse",
  "sessionId": "claude_session_xyz",
  "projectDir": "/path/to/project",
  "timestamp": "2024-01-15T10:30:00Z",
  "data": {
    "toolName": "Write",
    "toolInput": {
      "file_path": "/src/auth/login.ts",
      "content": "..."
    },
    "toolResult": "File written successfully"
  }
}
```

**Response: 200 OK**

```json
{
  "status": "received",
  "processed": true
}
```

---

## WebSocket イベント

### 接続

```javascript
const socket = io("http://localhost:3001");

// セッションにサブスクライブ
socket.emit("subscribe", { sessionId: "sess_abc123" });
```

### サーバー → クライアント イベント

| Event               | Payload                                   | 説明           |
| ------------------- | ----------------------------------------- | -------------- |
| `message`           | `{ sessionId, type, content, timestamp }` | メッセージ受信 |
| `status_update`     | `{ sessionId, status }`                   | ステータス変更 |
| `process_started`   | `{ sessionId, pid }`                      | プロセス開始   |
| `process_exit`      | `{ sessionId, code }`                     | プロセス終了   |
| `error`             | `{ sessionId, error }`                    | エラー発生     |
| `summary_generated` | `{ sessionId, summary }`                  | 要約生成完了   |

---

## エラーレスポンス

### 形式

```json
{
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "Session with id 'sess_xyz' not found",
    "details": {}
  }
}
```

### エラーコード

| Code                   | HTTP Status | 説明                     |
| ---------------------- | ----------- | ------------------------ |
| `VALIDATION_ERROR`     | 400         | 入力値不正               |
| `SESSION_NOT_FOUND`    | 404         | セッションが見つからない |
| `WORK_ITEM_NOT_FOUND`  | 404         | Work Item が見つからない |
| `SESSION_BUSY`         | 409         | セッションが処理中       |
| `SUMMARIZATION_FAILED` | 500         | 要約生成失敗             |
| `INTERNAL_ERROR`       | 500         | 内部エラー               |

---

## レート制限

ローカル専用のため基本的に制限なし。
ただし AI 要約は同時実行数を制限：

- 同時要約生成: 最大 3 セッション
- 検索リクエスト: 制限なし
