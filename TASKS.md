# TASKS.md - Phase 1.6: Context Management 強化

> 最終更新: 2026-01-04
> 関連: [Plans.md](./Plans.md)

## 並列実行グループ

```
Wave 1（並列実行可）✅ 完了
├── API-01: pending_inject API
├── API-02: セッション名生成 API
├── HOOK-01: SessionStart 改修
├── HOOK-02: SessionEnd 改修
└── CMD-02: /cnthub:get 改修

Wave 2（Wave 1 完了後、並列実行可）✅ 完了
├── HOOK-03: UserPromptSubmit Hook 新規作成
└── CMD-01: /cnthub:export 改修
```

---

## Wave 1: 独立タスク（並列実行可）

### API-01: pending_inject API

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **ブランチ** | `feature/pending-inject-api` |
| **ファイル** | `packages/api/src/routes/inject.ts` |

**機能**:
- `POST /api/inject/pending` - 残り部分を一時保存
- `GET /api/inject/pending/:sessionId` - pending があるか確認
- `DELETE /api/inject/pending/:sessionId` - 注入完了後に削除

**スキーマ**:
```typescript
interface PendingInject {
  sessionId: string;      // Claude Code session ID
  context: string;        // 残り部分のコンテキスト
  createdAt: Date;
  expiresAt: Date;        // 1時間で自動削除
}
```

**実装メモ**:
- インメモリ Map + Lazy Deletion パターンで実装
- テスト: 20 件パス

---

### API-02: セッション名生成 API

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **ブランチ** | `feature/session-name-api` |
| **ファイル** | `packages/api/src/services/session-naming.ts` |

**機能**:
- 初回メッセージ内容から AI でセッション名を生成
- 最大 50 文字

**エンドポイント**:
- `POST /api/sessions/:id/generate-name`
- Body: `{ message: string }`
- Response: `{ name: string }`

**実装メモ**:
- グレースフルデグラデーション: AI 失敗時はメッセージ先頭50文字
- テスト: 13 件パス

---

### HOOK-01: SessionStart 改修

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **ブランチ** | `feature/sessionstart-simplify` |
| **ファイル** | `plugin/scripts/session-start-hook.js` |

**変更内容**:
- コンテキスト注入を削除（`requestContext: false`）
- セッション登録のみ（従来通り）

**実装メモ**:
- コンテキスト注入は UserPromptSubmit Hook に移行

---

### HOOK-02: SessionEnd 改修

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **ブランチ** | `feature/sessionend-no-title` |
| **ファイル** | `packages/api/src/services/session-end-orchestrator.ts` |

**変更内容**:
- タイトル生成をスキップ（Step 3）
- 要約・Embedding は維持

**実装メモ**:
- `result.steps.titleGenerated = true` で互換性維持

---

### CMD-02: /cnthub:get 改修

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **ブランチ** | `feature/cmd-get-merged` |
| **ファイル** | `plugin/commands/cnthub-get.md` |

**変更内容**:
- 対象セッション拡張: `completed` + `merged`
- ステータス表示を追加 `[completed]` / `[merged]`

---

## Wave 2: 依存タスク（Wave 1 完了後）

### HOOK-03: UserPromptSubmit Hook 新規作成

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **依存** | API-01, API-02 |
| **ブランチ** | `feature/userprompt-hook` |
| **ファイル** | `plugin/scripts/user-prompt-hook.js`, `plugin/hooks/hooks.json` |

**機能**:
1. 初回メッセージ検出
2. `/cnthub:` コマンドならスキップ
3. 通常メッセージなら:
   - セッション名を生成（API-02）
   - 関連セッションを検索
   - `additionalContext` で注入
4. `pending_inject` があれば残り部分を注入（API-01）

**実装メモ**:
- 341行のスクリプト
- hooks.json に UserPromptSubmit 登録（timeout: 10秒）

---

### CMD-01: /cnthub:export 改修

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **依存** | API-01 |
| **ブランチ** | `feature/cmd-export-clear` |
| **ファイル** | `plugin/commands/cnthub-export.md` |

**変更内容**:
Export 完了後に確認を追加:
- Yes → 残り部分を backend 保存 + /clear を促す
- No → 従来通りコピーのみ

---

## 完了条件

- [x] 全タスク `cc:完了`
- [x] テスト通過（33件パス）
- [x] ドキュメント更新

## 完了日

2026-01-04

---

# Phase 1.6.1: Context Management バグ修正

> 作成日: 2026-01-04
> 完了日: 2026-01-04
> Phase 1.6 の実装後に発見された問題の修正

## 問題一覧

| ID | 問題 | 優先度 | 原因 | 状態 |
|----|------|--------|------|------|
| BUG-01 | MCP inject_context が summary を返さない | 🔴 Critical | API が summary を含まない | `cc:完了` |
| BUG-02 | セッション名が UUID のまま更新されない | 🔴 Critical | API が UUID を受け付けない | `cc:完了` |
| BUG-03 | セッション一覧に重複名が多い | 🟡 Medium | Export 時の名前重複 | `cc:完了` |
| CLN-01 | 不要なテストセッションのクリーンアップ機能 | 🟢 Low | - | `cc:完了` |

---

## BUG-01: MCP inject_context が summary を返さない

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **優先度** | 🔴 Critical |
| **ファイル** | `plugin/scripts/mcp-server.js` |

### 現象
- `/cnthub:get` で `inject_context` を実行すると `"No summary available"` が返る
- 実際にはセッションに summary は保存されている

### 原因
- `injectContext` 関数は `getSession` のみ呼び出し
- `GET /sessions/:id` は summary を含まない
- summary は `GET /sessions/:id/summary` で別途取得する必要がある

### 修正方針
```javascript
// mcp-server.js の injectContext を修正
async function injectContext({ sessionIds, format = "summary" }) {
  const results = await Promise.all(
    sessionIds.map(async (sessionId) => {
      const session = await getSession({ sessionId });
      // summary も取得
      const summary = await getSessionSummary({ sessionId });
      return { ...session, summary };
    })
  );
  // ...
}
```

---

## BUG-02: セッション名が UUID のまま更新されない

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **優先度** | 🔴 Critical |
| **ファイル** | `packages/api/src/routes/sessions.ts`, `packages/api/src/repositories/session.ts` |

### 現象
- セッション名が `Session eab254c8-21b7-4a4d-bdce-0b8e66579aff` のまま
- 期待: AI 生成の意味のある名前

### 根本原因 ✅ 特定済み
Claude Code Hook が渡す `session_id` は **UUID** だが、API は **cnthub session ID** (`ch_ss_xxxx`) を期待している。

```
Claude Code Hook
     │
     └─ session_id = "85022d53-0d46-480c-8a48-06e07410b1ec" (UUID)
            │
            ▼
     API: /api/sessions/85022d53-.../generate-name
            │
            ▼
     404 Not Found ❌ (ch_ss_xxxx を期待)
            │
            ▼
     セッション名が更新されない
```

### 修正方針: Option B
`GET /api/sessions/:id` を **両方の ID 形式** で対応させる。

```typescript
// sessions.ts - getSessionById を修正
export function getSessionById(id: string): Session | null {
  // ch_ss_ で始まる場合は従来通り
  if (id.startsWith("ch_ss_")) {
    return queryOne("SELECT * FROM sessions WHERE session_id = ?", id);
  }
  // それ以外は claudeSessionId として検索
  return queryOne("SELECT * FROM sessions WHERE claude_session_id = ?", id);
}
```

### 影響範囲
- `GET /api/sessions/:id`
- `PATCH /api/sessions/:id`
- `DELETE /api/sessions/:id`
- `POST /api/sessions/:id/generate-name`
- その他 `:id` パラメータを使用する全エンドポイント

---

## BUG-03: セッション一覧に重複名が多い

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **優先度** | 🟡 Medium |
| **ファイル** | `packages/api/src/routes/observations.ts` |

### 現象
- `Claude Code プロセス調査` が4つある
- 同じ groupName で export するとセッション名が重複

### 修正方針
1. Export 時にセッション名の末尾にタイムスタンプを追加
   - 例: `Claude Code プロセス調査 (2026-01-04 15:43)`
2. または連番を追加
   - 例: `Claude Code プロセス調査 #2`

---

## CLN-01: セッションクリーンアップ機能

| 項目 | 内容 |
|------|------|
| **状態** | `cc:完了` |
| **優先度** | 🟢 Low |
| **ファイル** | `packages/api/src/routes/sessions.ts`, `packages/api/src/schemas/index.ts` |

### 要件
- テスト用セッション（ServerStatusCheck, MCP Export Test 等）を削除
- UI または API で一括削除可能に
- 安全のため確認ダイアログ付き

### 実装内容
- `POST /api/sessions/bulk-delete` エンドポイントを追加
- 最大100件まで一括削除可能
- 各セッションの削除結果をレスポンスで返却

---

## 並列実行グループ

```
Wave 1（並列実行可）✅ 完了
├── BUG-01: MCP inject_context 修正
├── BUG-02: セッション名生成デバッグ
└── BUG-03: セッション名重複回避

Wave 2（Wave 1 完了後）✅ 完了
└── CLN-01: クリーンアップ機能
```

## 完了条件

- [x] 全タスク `cc:完了`
- [x] テスト通過（436件パス、既存の Embedding テスト5件のみ失敗）
- [x] ビルド成功
- [x] ドキュメント更新

## 完了日

2026-01-04
