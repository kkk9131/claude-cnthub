---
name: parallel-impl
description: Plans.md/Tasks.mdの依存関係を分析し、並列実行可能なフェーズをgtr worktreeで分離してTDD実装する。Use when implementing multiple phases in parallel, 並列実装, フェーズを並列で.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep, Task, TodoWrite
---

# /parallel-impl - 並列実装スキル

Plans.md/Tasks.md の依存関係を分析し、並列実行可能なフェーズを gtr worktree で分離して TDD 実装する。

## トリガー

- 「並列実装」「parallel implementation」「フェーズを並列で」
- `/parallel-impl [phase1] [phase2] [--tdd] [--bypass]`

## クイックスタート

```bash
# 基本
/parallel-impl phase6 phase7

# オプション付き
/parallel-impl phase6 phase7 --tdd --bypass
```

## ワークフロー概要

```
1. 依存分析     → Plans.md から並列可能タスクを特定
2. Worktree作成 → gtr で各フェーズ用に分離
3. Agent起動    → バックグラウンドで TDD 実装
4. 依存監視     → クロスフェーズ依存をシグナルで管理
5. 統合         → 競合チェック → マージ → クリーンアップ
```

## オプション

| オプション | 説明 | デフォルト |
|-----------|------|-----------|
| `--tdd` | TDD サイクル強制 | true |
| `--bypass` | Agent を bypass permissions で起動 | false |
| `--max-parallel N` | 最大並列数 | 2 |

## 実行フロー

### Phase 1: 依存分析
> 詳細: [references/01-dependency-analysis.md](references/01-dependency-analysis.md)

Plans.md を解析し、依存グラフを構築。並列可能グループを特定。

### Phase 2: Worktree 準備
> 詳細: [references/02-worktree-setup.md](references/02-worktree-setup.md)

```bash
git worktree add ../{project}-{phase} -b feature/{phase}-{timestamp}
```

### Phase 3: Agent 起動
> 詳細: [references/03-agent-management.md](references/03-agent-management.md)

Task tool で general-purpose Agent をバックグラウンド起動。

### Phase 4: 監視
依存シグナルファイル (`.claude/state/dependency-signals.txt`) を監視。

### Phase 5: 統合
> 詳細: [references/04-integration.md](references/04-integration.md)

競合チェック → マージ → worktree 削除。

## 出力例

```
📊 依存分析完了
  - Phase 6: 6 タスク (L-01〜L-06)
  - Phase 7: 6 タスク (M-01〜M-06)
  - クロス依存: L-04 → M-03

🔧 Worktree 作成
  ✅ ../claude-cnthub-phase6
  ✅ ../claude-cnthub-phase7

🚀 Agent 起動 (bypass: ON)
  ✅ Phase 6 Agent
  ✅ Phase 7 Agent

📡 監視中...
```

## 関連スキル

- `/gtr` - Git worktree 操作
- `/work` - タスク実行
- `/tdd` - TDD ワークフロー
