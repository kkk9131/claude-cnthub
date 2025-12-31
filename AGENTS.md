# claude-cnthub 開発ワークフロー

## 概要

LLM セッションの永続化・コンテキスト共有・クロスLLM連携を実現する開発支援ツール。
Claude Code Plugin として動作し、セッション管理・AI要約・GUI操作を提供。

## 開発モード: 2-Agent

Cursor (PM) + Claude Code (Worker) で役割分担。

```
Cursor (PM)                    Claude Code (Worker)
─────────────────────────────────────────────────────
計画・レビュー・本番デプロイ   実装・テスト・staging

/plan-with-cc で計画作成  →   /work でタスク実行
                          ←   /handoff-to-cursor で報告
/review-cc-work でレビュー
```

## ワークフロー

### Cursor (PM) のコマンド

| コマンド | 説明 |
|---------|------|
| `/start-session` | 1日の開始。Plans.md 確認 |
| `/project-overview` | プロジェクト全体像を把握 |
| `/plan-with-cc` | Claude Code と計画策定 |
| `/handoff-to-claude` | タスクを Claude Code に依頼 |
| `/review-cc-work` | Claude Code の成果をレビュー |

### Claude Code (Worker) のコマンド

| コマンド | 説明 |
|---------|------|
| `/work` | Plans.md のタスクを実行 |
| `/sync-status` | 進捗を確認・更新 |
| `/harness-review` | セルフレビュー |
| `/handoff-to-cursor` | 完了報告を Cursor に送信 |

## タスク管理

### マーカー凡例

| マーカー | 意味 | 担当 |
|---------|------|------|
| `pm:TODO` | PM で計画中 | Cursor |
| `cc:TODO` | 実装待ち | Claude Code |
| `cc:WIP` | 実装中 | Claude Code |
| `cc:完了` | 実装完了 | Claude Code |
| `pm:レビュー中` | レビュー中 | Cursor |
| `pm:承認` | 承認済み | Cursor |

### Plans.md の更新ルール

- PM がタスク作成: `pm:TODO`
- Worker に依頼: `pm:TODO` → `cc:TODO`
- Worker 開始: `cc:TODO` → `cc:WIP`
- Worker 完了: `cc:WIP` → `cc:完了`
- PM レビュー: `cc:完了` → `pm:レビュー中`
- PM 承認: `pm:レビュー中` → `pm:承認`

## プロジェクト構成

```
packages/
├── api/      # Backend (Hono + SQLite) Port 3048
├── web/      # Frontend (React + Vite)
├── shared/   # 共通型定義
├── plugin/   # Claude Plugin パッケージ
└── cli/      # CLI ツール (任意)
```

## 開発コマンド

| コマンド | 説明 |
|---------|------|
| `bun run dev` | 開発サーバー起動 (Port 3048) |
| `bun run test` | テスト実行 |
| `bun run test:watch` | TDD ウォッチモード |
| `bun run build` | プロダクションビルド |

## 参照

- [CLAUDE.md](./CLAUDE.md) - プロジェクト設定
- [Plans.md](./Plans.md) - タスク管理
- [TASKS.md](./TASKS.md) - 並列実装タスク
- [Agent-docs/](./Agent-docs/) - 詳細仕様
