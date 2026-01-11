---
name: cnthub:fork
description: セッションを分岐して別アプローチを並行で試す
---

# /cnthub:fork

現在のセッションを分岐し、同じ状態からA案/B案を並行で試せるようにする。
git worktree と連携して、コード変更も分離可能。

## 使い方

```
/cnthub:fork                    # 現在地点から分岐
/cnthub:fork --worktree         # git worktree も同時に作成
/cnthub:fork --at <message_id>  # 特定の発言時点から分岐（Phase 2）
```

## MCP ツール

- `fork_session` - セッション分岐を実行
- `list_forks` - 分岐セッション一覧
- `get_session_history` - セッション履歴取得

## ワークフロー

### 基本分岐

1. 現在のセッション状態を保存
2. `forkSession: true` で新セッションを作成
3. 親子関係を DB に記録
4. 新しいセッションで続行

### worktree 連携

1. 基本分岐を実行
2. `git worktree add` で作業ディレクトリを分離
3. 新セッションの working_dir を worktree に変更
4. 分岐セッションで続行

## 出力フォーマット

### 分岐確認

```markdown
## セッション分岐

現在のセッションを分岐します。

**現在のセッション:**
- ID: {session_id}
- 名前: {session_name}
- メッセージ数: {message_count}

**オプション:**
- [ ] git worktree を同時に作成

分岐を実行しますか？ (yes/no)
```

### 分岐完了

```markdown
## 分岐完了

新しいセッションを作成しました:

- **新セッションID**: {new_session_id}
- **親セッションID**: {parent_session_id}
- **分岐時点**: メッセージ #{fork_point}

**次のステップ:**
1. このセッションで A案 を試す
2. `/cnthub:get {parent_session_id}` で親セッションに戻る
3. 両方の結果を比較

---

**Tips:**
- 親セッションは変更されません
- `/cnthub:fork --list` で分岐一覧を確認
```

### worktree 連携完了

```markdown
## 分岐完了（worktree 連携）

新しいセッションと worktree を作成しました:

- **新セッションID**: {new_session_id}
- **親セッションID**: {parent_session_id}
- **worktree パス**: {worktree_path}
- **ブランチ名**: fork/{session_id}

**作業ディレクトリ:**
```
{worktree_path}
```

**次のステップ:**
1. このセッションで A案 を実装
2. 親セッションで B案 を実装
3. 両方の結果を比較して採用する方を選択
```

### 分岐一覧

```markdown
## 分岐セッション一覧

**親セッション:** {parent_session_id} ({parent_name})

| # | セッションID | 名前 | 作成日時 | ステータス |
|---|-------------|------|---------|-----------|
| 1 | ch_ss_0002 | A案実装 | 2024-01-01 10:00 | active |
| 2 | ch_ss_0003 | B案実装 | 2024-01-01 10:05 | completed |

**操作:**
- 切り替え: `/cnthub:get {session_id}`
- 削除: `/cnthub:fork --delete {session_id}`
```

## SDK 連携

### forkSession オプション

```typescript
// Claude Agent SDK の forkSession 機能を使用
const forkedResponse = query({
  prompt: "A案で実装を進めます",
  options: {
    resume: sessionId,      // 元のセッションID
    forkSession: true,      // 分岐フラグ
    model: "claude-sonnet-4-5"
  }
})
```

### git worktree 連携

```bash
# worktree 作成
git worktree add ../fork-{session_id} -b fork/{session_id}

# worktree 削除
git worktree remove ../fork-{session_id}
```

## DB スキーマ拡張

```sql
-- sessions テーブルに追加
ALTER TABLE sessions ADD COLUMN parent_session_id TEXT
  REFERENCES sessions(id) ON DELETE SET NULL;
ALTER TABLE sessions ADD COLUMN fork_point INTEGER;  -- 分岐時点のメッセージインデックス
ALTER TABLE sessions ADD COLUMN worktree_path TEXT;

CREATE INDEX idx_sessions_parent ON sessions(parent_session_id);
```

## エラー

- セッションなし: 「現在のセッションが見つかりません。」
- 分岐失敗: 「セッションの分岐に失敗しました。」
- worktree 作成失敗: 「git worktree の作成に失敗しました。Git リポジトリ内で実行してください。」
- 既存 worktree: 「同名の worktree が既に存在します。」
- API エラー: 「cnthub API に接続できません。」

## Phase 2: 特定時点への分岐

将来的に、特定の発言時点に戻って分岐する機能を追加予定:

```
/cnthub:fork --at 5    # メッセージ #5 の時点から分岐
```

これには以下が必要:
1. セッション履歴の保存（各ターンごと）
2. 履歴のトリミング機能
3. トリミングした履歴での新セッション作成
