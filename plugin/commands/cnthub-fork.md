---
name: cnthub:fork
description: セッションを分岐して別アプローチを並行で試す
---

# /cnthub:fork

現在のセッションを分岐し、同じ状態からA案/B案を並行で試せるようにする。
git worktree と連携して、コード変更も分離可能。

## MCP ツール

- `fork_session` - セッション分岐を実行
- `list_forks` - 分岐セッション一覧

## ワークフロー

1. `fork_session` ツールで現在のセッションを分岐
2. ユーザーに分岐結果を表示
3. オプションで `list_forks` で分岐一覧を表示

## 実行手順

### Step 1: ユーザーに確認

```markdown
## セッション分岐

現在のセッションを分岐しますか？

**オプション:**
1. 基本分岐 - セッションのみ分岐
2. worktree 連携 - git worktree も同時に作成（コード変更を分離）

分岐名を指定してください（例: "A案: GraphQL実装"）:
```

### Step 2: fork_session ツールを実行

```javascript
// 基本分岐
fork_session({
  sessionId: "current",
  name: "<ユーザー指定の名前>"
})

// worktree 連携
fork_session({
  sessionId: "current",
  name: "<ユーザー指定の名前>",
  createWorktree: true
})
```

### Step 3: 結果を表示

#### 基本分岐の場合

```markdown
## 分岐完了

新しいセッションを作成しました:

- **新セッションID**: {forkedSession.id}
- **セッション名**: {forkedSession.name}
- **親セッションID**: {parentSession.id}
- **分岐時点**: メッセージ #{forkPoint}

**次のステップ:**
1. このセッションで A案 を試す
2. 親セッションで B案 を試す場合は `/cnthub:get {parentSession.id}` で戻る
3. 両方の結果を比較

---

**Tips:**
- 親セッションは変更されません
- `list_forks` で分岐一覧を確認できます
```

#### worktree 連携の場合

```markdown
## 分岐完了（worktree 連携）

新しいセッションと worktree を作成しました:

- **新セッションID**: {forkedSession.id}
- **セッション名**: {forkedSession.name}
- **親セッションID**: {parentSession.id}
- **worktree パス**: {worktreePath}
- **ブランチ名**: {branchName}

**作業ディレクトリ:**
```
{worktreePath}
```

**次のステップ:**
1. worktree ディレクトリで A案 を実装
2. 親セッションのディレクトリで B案 を実装
3. 両方の結果を比較して採用する方を選択
4. 不要な worktree は `git worktree remove {worktreePath}` で削除
```

## 分岐一覧の表示

ユーザーが分岐一覧を確認したい場合:

```javascript
list_forks({ sessionId: "current" })
```

### 出力フォーマット

```markdown
## 分岐セッション一覧

**親セッション:** {parentSessionId}

| # | セッションID | 名前 | ステータス | worktree |
|---|-------------|------|-----------|----------|
| 1 | {id} | {name} | {status} | {worktreePath || "-"} |

**操作:**
- 切り替え: `/cnthub:get {session_id}`
```

## エラーハンドリング

| エラー | メッセージ |
|--------|----------|
| セッションなし | 「現在のセッションが見つかりません。」 |
| 分岐失敗 | 「セッションの分岐に失敗しました。」 |
| worktree 作成失敗 | 「git worktree の作成に失敗しました: {error}」 |
| API エラー | 「cnthub API に接続できません。」 |

## 使用例

```
/cnthub:fork
> 分岐名: A案: GraphQL実装
> worktree: yes

## 分岐完了（worktree 連携）
- 新セッションID: ch_ss_0042
- worktree パス: /path/to/worktree-ch_ss_0042
- ブランチ名: fork/ch_ss_0042
```
