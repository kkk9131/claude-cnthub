---
name: parallel-impl
description: 並列実装を完全自動化。Plans.md/Tasks.mdから依存分析→Worktree作成→bypass+TDDで実装開始。引数不要。
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, TodoWrite, Skill
---

# /parallel-impl - 自動並列実装

```
/parallel-impl
```

これだけ。Plans.md/Tasks.md を自動分析し、並列実装を開始。

## 自動実行フロー

```
Step 1: 依存分析
  └→ Plans.md/Tasks.md から TODO 抽出 → 依存グラフ構築 → 並列グループ特定

Step 2: Worktree 作成
  └→ グループごとに git worktree add → 設定コピー

Step 3: Agent 起動 (bypass + TDD)
  └→ Task Agent × N → /claude-code-harness:core:work + TDD

Step 4: 統合
  └→ 完了待ち → 競合チェック → マージ → クリーンアップ
```

## 出力例

```
🔍 依存分析中...

📊 分析結果
  並列グループ A: L-02, L-03
  並列グループ B: M-03
  クロス依存: なし

🔧 Worktree 作成
  ✅ ../claude-cnthub-groupA
  ✅ ../claude-cnthub-groupB

🚀 Agent 起動 (bypass: ON)
  ✅ Group A Agent
  ✅ Group B Agent

📡 実装中...
```

## 詳細リファレンス

| Step | ドキュメント |
|------|-------------|
| 依存分析 | [01-dependency-analysis.md](references/01-dependency-analysis.md) |
| Worktree | [02-worktree-setup.md](references/02-worktree-setup.md) |
| Agent管理 | [03-agent-management.md](references/03-agent-management.md) |
| 統合 | [04-integration.md](references/04-integration.md) |

## Agent プロンプト概要

```
作業ディレクトリ: {WORKTREE_PATH}
タスク: {TASK_LIST}

実行: /claude-code-harness:core:work でタスク実行
TDD: テスト作成 → 実装 → bun test
権限: bypass permissions ON
```

## 関連スキル

- `/claude-code-harness:core:work` - タスク実行
- `/tdd` - TDD ワークフロー
- `/gtr` - Worktree 手動操作
