---
name: project-context
description: claude-cnthubプロジェクトの技術スタック・構成・規約。Use when starting implementation, asking about project structure, or needing context about the codebase.
allowed-tools: Read, Grep, Glob
---

# claude-cnthub Project Context

## プロジェクト概要

Claude Codeのセッション管理とAIメモリ機能を統合した開発支援ツール。
セッション要約 → セマンティック検索 → コンテキスト自動注入で、過去の作業を活かした開発を実現。

## 技術スタック

| レイヤー | 技術 |
|---------|------|
| ランタイム | Bun 1.1+ |
| Backend | Hono + SQLite + sqlite-vec |
| Frontend | React 18 + Vite + TailwindCSS + Zustand |
| AI | Claude Agent SDK |
| パッケージ管理 | Bun Workspaces（モノレポ） |

## ディレクトリ構成

```
claude-cnthub/
├── packages/
│   ├── api/          # Backend (Hono + Bun)
│   │   └── src/
│   │       ├── routes/
│   │       ├── services/
│   │       ├── db/
│   │       └── test-utils/
│   ├── web/          # Frontend (React + Vite)
│   │   └── src/
│   │       ├── components/
│   │       ├── pages/
│   │       ├── stores/
│   │       └── hooks/
│   ├── shared/       # 共通型定義
│   │   └── src/
│   │       ├── types/
│   │       └── constants/
│   └── plugin/       # Claude Plugin
├── Agent-docs/       # 詳細仕様書
├── .claude/
│   ├── agents/       # サブエージェント
│   ├── skills/       # スキル
│   ├── hooks/        # hookスクリプト
│   ├── memory/       # メモリ・要約
│   └── state/        # 状態管理
└── Plans.md          # タスク管理（SSoT）
```

## 重要なルール

### 必須事項
- **ローカル専用**: 公開非対応、認証なし
- **AI処理の堅牢性**: 要約失敗時もセッション継続
- **WebSocket必須**: リアルタイム表示はSocket.IOで実装
- **ダークモード統一**: UIは全てダークテーマ

### コーディング規約
- TypeScript strictモード必須
- `any`型使用禁止
- 既存パターンに従う
- テストは実際の機能を検証（`expect(true).toBe(true)`禁止）

## 開発コマンド

```bash
# 開発
bun run dev           # API + Web同時起動
bun run dev:api       # Backendのみ
bun run dev:web       # Frontendのみ

# テスト・品質
bun test              # テスト実行
bun run lint          # リント
bun run format        # フォーマット
bun run build         # ビルド
```

## 環境変数

```env
API_PORT=3001
WEB_PORT=5173
HOOK_SERVER_PORT=37778
ANTHROPIC_API_KEY=sk-ant-...
DATABASE_PATH=~/.claude-cnthub/data.db
```

## ドキュメント参照先

| ドキュメント | 内容 |
|-------------|------|
| Agent-docs/01-requirements.md | 要件定義 |
| Agent-docs/02-tech-stack.md | 技術選定 |
| Agent-docs/03-database.md | DB設計 |
| Agent-docs/04-api.md | API仕様 |
| Agent-docs/05-test.md | テスト戦略 |
| Agent-docs/06-ui.md | UI設計 |

## メモリ・状態管理

| ファイル | 用途 |
|---------|------|
| Plans.md | タスク状態（SSoT） |
| .claude/memory/session-log.md | 作業履歴 |
| .claude/memory/decisions.md | 技術決定 |
| .claude/memory/patterns.md | コードパターン |
| .claude/memory/phase-summaries/ | フェーズ要約 |
