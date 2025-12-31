---
name: cnthub-add
description: 現在のセッションにコンテキスト（メモ、発見、決定事項など）を追加。Use when user mentions /cnthub:add, コンテキスト追加, メモリ追加, 記録追加, save context, add memory.
allowed-tools: Bash, Read
---

# cnthub:add - コンテキスト追加スキル

現在のセッションにコンテキスト（メモ、発見、決定事項など）を追加します。
追加されたコンテキストは永続化され、将来のセッションでセマンティック検索可能になります。

## 使用方法

```
/cnthub:add <内容>
/cnthub:add type:<タイプ> <内容>
```

## タイプ一覧

| タイプ | 説明 | 使用例 |
|--------|------|--------|
| `decision` | 技術的な決定事項 | 認証方式の選定、アーキテクチャ決定 |
| `learning` | 学んだこと、発見 | ライブラリの使い方、バグの原因 |
| `note` | 一般的なメモ | TODO、注意点、補足情報 |
| `tool_use` | ツール使用記録 | コマンド実行結果、設定変更 |
| `error` | エラー・問題の記録 | バグ報告、トラブルシューティング |
| `file_change` | ファイル変更の記録 | リファクタリング、新規ファイル作成 |

## 使用例

### 基本的な使用

```
/cnthub:add 「認証にはJWTを使用する決定をした」
```

### タイプを指定

```
/cnthub:add type:decision 「認証方式はJWTを採用。理由: セッションレスでスケーラブル」
/cnthub:add type:learning 「Honoのミドルウェアはonion構造で動作する」
/cnthub:add type:error 「SQLite接続でタイムアウトが発生。原因はプール枯渇」
/cnthub:add type:note 「次回セッションでリファクタリング予定」
```

## 実行手順

このスキルが呼び出されたら、以下の手順で実行する:

### 1. 引数のパース

ユーザー入力から以下を抽出:
- `type`: タイプ指定（デフォルト: `note`）
- `content`: 追加するコンテキスト内容

パース例:
```
入力: type:decision 「JWTを採用する」
→ type: "decision", content: "JWTを採用する"

入力: 「これはメモです」
→ type: "note", content: "これはメモです"
```

### 2. セッションIDの取得

現在のセッションIDを環境または設定から取得:

```bash
# セッション状態ファイルを確認
cat /Users/kazuto/Desktop/claude-cnthub/.claude/state/session.json
```

セッションIDが見つからない場合:
1. 最新のセッションを自動取得
2. または新規セッションを作成

### 3. API呼び出し

```bash
curl -X POST http://localhost:3048/api/memories/add \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "<session-id>",
    "type": "<type>",
    "title": "<内容の先頭50文字>",
    "content": "<完全な内容>",
    "metadata": {
      "source": "skill:cnthub-add",
      "timestamp": "<ISO8601>"
    }
  }'
```

### 4. 結果の報告

成功時:
```
[cnthub:add] コンテキストを追加しました
- ID: ch_ob_xxxx
- タイプ: decision
- 内容: JWTを採用する
```

失敗時:
```
[cnthub:add] コンテキスト追加に失敗しました
- エラー: <エラーメッセージ>
- 対処法: <推奨アクション>
```

## API仕様（参考）

### POST /api/memories/add

**リクエストボディ:**
```json
{
  "sessionId": "ch_ss_0001",
  "type": "decision",
  "title": "コンテキストのタイトル（先頭50文字）",
  "content": "完全なコンテキスト内容",
  "metadata": {
    "source": "skill:cnthub-add"
  }
}
```

**レスポンス (201 Created):**
```json
{
  "id": "ch_ob_0001",
  "sessionId": "ch_ss_0001",
  "type": "decision",
  "title": "コンテキストのタイトル",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

## エラーハンドリング

| エラー | 原因 | 対処法 |
|--------|------|--------|
| `SESSION_NOT_FOUND` | セッションが存在しない | 新規セッションを作成 |
| `VALIDATION_ERROR` | 入力値が不正 | 必須項目を確認 |
| `Connection refused` | APIサーバー未起動 | `bun run dev:api` を実行 |

## 関連スキル

- `/cnthub:search` - 保存したコンテキストを検索
- `/cnthub:context` - プロジェクトコンテキストを取得

## 参照

- API実装: `packages/api/src/routes/memories.ts`
- 型定義: `packages/shared/src/types/`
