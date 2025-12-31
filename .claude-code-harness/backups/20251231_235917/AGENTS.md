# claude-cnthub 開発ワークフロー

## 概要

Claude Code セッション管理 + AI メモリ機能を統合した開発支援ツール。

## 開発モード: Solo

Claude Code 単独で開発を行う。

## ワークフロー

```
1. /plan-with-agent  → 計画を立てる
2. /work             → Plans.md のタスクを実行
3. /sync-status      → 進捗を確認・更新
4. /harness-review   → コードレビュー
```

## タスク管理

### マーカー凡例

| マーカー     | 意味       |
| ------------ | ---------- |
| `cc:TODO`    | 未着手     |
| `cc:WIP`     | 作業中     |
| `cc:完了`    | 完了       |
| `cc:blocked` | ブロック中 |

### Plans.md の更新ルール

- タスク開始時: `cc:TODO` → `cc:WIP`
- タスク完了時: `cc:WIP` → `cc:完了`
- チェックボックス: `[ ]` → `[x]`

## プロジェクト構成

```
packages/
├── api/      # Backend (Hono + SQLite)
├── web/      # Frontend (React + Vite)
├── shared/   # 共通型定義
└── plugin/   # Claude Plugin パッケージ
```

## コマンド一覧

| コマンド             | 説明                 |
| -------------------- | -------------------- |
| `bun run dev`        | 開発サーバー起動     |
| `bun run test`       | テスト実行           |
| `bun run test:watch` | TDD ウォッチモード   |
| `bun run build`      | プロダクションビルド |

## 参照

- [CLAUDE.md](./CLAUDE.md) - プロジェクト概要
- [Agent-docs/](./Agent-docs/) - 詳細仕様
