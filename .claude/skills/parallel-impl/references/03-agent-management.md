# Agent 管理 (Phase 3)

## Agent 起動

```typescript
Task({
  subagent_type: "general-purpose",
  run_in_background: true,
  prompt: AGENT_PROMPT
})
```

## プロンプトテンプレート

```markdown
## Phase {N}: {PHASE_NAME} - TDD 並列実装

**作業ディレクトリ**: {WORKTREE_PATH}
**ブランチ**: {BRANCH_NAME}

### タスク一覧
{TASK_TABLE}

### 実行方法
1. `/claude-code-harness:core:work` スキルでタスク実行
2. TDD: テスト作成 → `bun test` で失敗確認 → 実装 → 成功確認
3. コミット: `feat({TASK_ID}): {DESCRIPTION}`

### 依存待ち
シグナルファイル: `.claude/state/dependency-signals.txt`
待機タスク: {WAITING_TASKS}

### 完了時
1. Plans.md を `[x]` に更新
2. 依存シグナル発行
```

## bypass permissions 設定

### 方法 A: settings.json 拡張

```json
{
  "permissions": {
    "allow": ["Bash(*)", "Read", "Write", "Edit", "Glob", "Grep"]
  }
}
```

### 方法 B: プロンプト内で明示

```markdown
## 権限設定
このセッションは bypass permissions mode で動作。
すべてのツール呼び出しは自動承認。
```

## 進捗監視

```typescript
// 30秒ごとに確認
TaskOutput(agentId, { block: false })

// 完了待ち
TaskOutput(agentId, { block: true })
```

## エラーハンドリング

| エラー | 対処 |
|--------|------|
| テスト失敗 | 3回再試行 → 中断・報告 |
| Agent クラッシュ | 自動再起動 (最大2回) |
| 依存デッドロック | タイムアウト → 警告 |
