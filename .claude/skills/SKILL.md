---
name: gtr
description: Git Worktree Runner (gtr) operations skill. Use when user mentions worktree, gtr, 並行開発, parallel development, ブランチを別フォルダで, multiple branches simultaneously, or wants to work on multiple features/branches at the same time without stashing.
---

# gtr - Git Worktree Runner

複数ブランチでの並行開発を効率化する CLI ツール。stash/checkout なしで複数ブランチを同時操作可能。

## 基本フロー

```bash
git gtr new feature/login      # worktree 作成
git gtr editor feature/login   # エディタで開く
git gtr ai feature/login       # Claude Code 起動
git gtr rm feature/login       # 削除
```

## 主要コマンド

| コマンド | 説明 |
|---------|------|
| `new <branch>` | worktree 作成 |
| `editor <branch>` | エディタで開く |
| `ai <branch>` | AI ツール起動 |
| `list` | 一覧表示 |
| `rm <branch>` | 削除 |
| `run <branch> <cmd>` | コマンド実行 |
| `go <branch>` | パス取得 |

`1` でメインリポジトリを参照（例: `git gtr editor 1`）

## Resources

- `references/commands.md` - 全コマンドの詳細オプション
- `references/workflows.md` - ユースケース別ワークフロー
- `references/config.md` - 設定・トラブルシューティング
