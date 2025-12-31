---
name: cnthub-search
description: 保存したコンテキストをセマンティック検索・キーワード検索。Use when user mentions /cnthub:search, コンテキスト検索, メモリ検索, 過去の記録, search memory, find context.
allowed-tools: Bash, Read
---

# cnthub:search - コンテキスト検索スキル

保存したコンテキスト（メモ、発見、決定事項など）をセマンティック検索またはキーワード検索で取得します。
過去のセッションで記録した情報を素早く見つけ出し、現在の作業に活用できます。

## 使用方法

```
/cnthub:search <検索クエリ>
/cnthub:search type:<タイプ> <検索クエリ>
/cnthub:search limit:<件数> <検索クエリ>
/cnthub:search type:<タイプ> limit:<件数> <検索クエリ>
```

## オプション

| オプション | 説明 | デフォルト | 例 |
|-----------|------|-----------|-----|
| `type` | 検索対象のタイプ | 全タイプ | `type:decision` |
| `limit` | 取得件数 | 10 | `limit:5` |

## タイプ一覧

| タイプ | 説明 | 検索例 |
|--------|------|--------|
| `decision` | 技術的な決定事項 | 認証方式、アーキテクチャ決定 |
| `learning` | 学んだこと、発見 | ライブラリの使い方、バグの原因 |
| `note` | 一般的なメモ | TODO、注意点、補足情報 |
| `tool_use` | ツール使用記録 | コマンド実行結果、設定変更 |
| `error` | エラー・問題の記録 | バグ報告、トラブルシューティング |
| `file_change` | ファイル変更の記録 | リファクタリング、新規ファイル作成 |

## 使用例

### 基本的な検索

```
/cnthub:search 「JWT認証」
/cnthub:search 「SQLiteのパフォーマンス問題」
```

### タイプを指定した検索

```
/cnthub:search type:decision 「認証方式」
/cnthub:search type:error 「タイムアウト」
/cnthub:search type:learning 「Honoミドルウェア」
```

### 件数を指定した検索

```
/cnthub:search limit:5 「API設計」
/cnthub:search type:decision limit:3 「データベース」
```

## 実行手順

このスキルが呼び出されたら、以下の手順で実行する:

### 1. 引数のパース

ユーザー入力から以下を抽出:
- `type`: タイプ指定（オプション）
- `limit`: 取得件数（デフォルト: 10）
- `q`: 検索クエリ

パース例:
```
入力: type:decision limit:5 「JWT認証について」
→ type: "decision", limit: 5, q: "JWT認証について"

入力: 「データベース設計」
→ type: null, limit: 10, q: "データベース設計"
```

### 2. API呼び出し

```bash
# 基本検索
curl -s "http://localhost:3048/api/memories/search?q=<検索クエリ>&limit=10"

# タイプ指定検索
curl -s "http://localhost:3048/api/memories/search?q=<検索クエリ>&limit=10&type=decision"
```

具体例:
```bash
# JWT認証に関する決定事項を5件検索
curl -s "http://localhost:3048/api/memories/search?q=JWT%E8%AA%8D%E8%A8%BC&limit=5&type=decision"
```

### 3. 結果の整形

APIレスポンスをMarkdown形式で整形して報告:

**検索結果がある場合:**

```markdown
## 検索結果: 「<検索クエリ>」

**<結果件数>件** の関連コンテキストが見つかりました。

---

### 1. <タイトル>
- **タイプ**: decision
- **関連度**: 0.85
- **作成日**: 2024-01-01
- **セッション**: ch_ss_0001

> <コンテンツ（最初の200文字）>

---

### 2. <タイトル>
...
```

**検索結果がない場合:**

```markdown
## 検索結果: 「<検索クエリ>」

関連するコンテキストが見つかりませんでした。

**ヒント:**
- キーワードを変えて再検索してください
- タイプ指定を外して広く検索してください
- `/cnthub:add` で新しいコンテキストを追加できます
```

## API仕様（参考）

### GET /api/memories/search

**クエリパラメータ:**

| パラメータ | 型 | 必須 | 説明 |
|-----------|-----|------|------|
| `q` | string | Yes | 検索クエリ（セマンティック検索） |
| `limit` | number | No | 取得件数（1-100、デフォルト: 10） |
| `type` | string | No | タイプでフィルタリング |
| `projectId` | string | No | プロジェクトでフィルタリング |

**レスポンス (200 OK):**
```json
{
  "results": [
    {
      "id": "ch_ob_0001",
      "sessionId": "ch_ss_0001",
      "type": "decision",
      "title": "JWT認証を採用",
      "content": "認証方式はJWTを採用。理由: セッションレスでスケーラブル",
      "relevanceScore": 0.85,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "totalCount": 1,
  "query": "JWT認証"
}
```

## 検索の仕組み

1. **セマンティック検索（優先）**
   - Embeddingが利用可能な場合、ベクトル類似度で検索
   - 意味的に近いコンテキストを高精度で取得
   - `relevanceScore` は類似度（0-1、高いほど関連性が高い）

2. **キーワード検索（フォールバック）**
   - Embeddingが利用不可またはタイムアウト時
   - 全文検索で部分一致を探索
   - `relevanceScore` は固定値 1.0

## エラーハンドリング

| エラー | 原因 | 対処法 |
|--------|------|--------|
| `VALIDATION_ERROR` | クエリが空または不正 | 検索クエリを確認 |
| `Connection refused` | APIサーバー未起動 | `bun run dev:api` を実行 |
| タイムアウト | Embedding生成に時間がかかっている | 自動的にキーワード検索にフォールバック |

## 関連スキル

- `/cnthub:add` - 新しいコンテキストを追加
- `/cnthub:context` - プロジェクトコンテキストを取得

## 参照

- API実装: `packages/api/src/routes/memories.ts`
- 型定義: `packages/shared/src/types/`
