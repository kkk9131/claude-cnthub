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
