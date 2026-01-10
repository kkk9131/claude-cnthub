# claude-cnthub

Claude Code用のセッション管理・AIメモリプラグイン。セッションの自動要約、セマンティック検索、クロスセッションのコンテキスト注入を実現します。

## 機能

- **セッション追跡**: Claude Codeセッションを自動的にキャプチャ・要約
- **セマンティック検索**: 自然言語で過去のセッションを検索
- **コンテキスト注入**: 過去のセッションから新しいセッションへコンテキストを注入
- **Web UI**: `localhost:3048/viewer/` でセッションブラウザ・ノードエディタを表示
- **MCPツール**: プログラムからセッションにアクセスする7つのツール

## 必要要件

- **Bun** 1.1以上（必須 - `bun:sqlite`を使用）
- **Claude Code** CLI

## インストール

### プラグインとして（推奨）

```bash
# ローカルディレクトリからインストール
claude plugin install /path/to/claude-cnthub/plugin

# GitHubから（公開後）
# claude plugin install github:kkk9131/claude-cnthub
```

### 開発用

```bash
git clone https://github.com/kkk9131/claude-cnthub.git
cd claude-cnthub
bun install
bun run dev
```

## 使い方

### 自動セッション追跡

インストール後、プラグインは自動的に:
1. Claude Code起動時にセッションレコードを作成
2. セッション中のツール使用・観測を追跡
3. セッション終了時にAI要約を生成

### Web UI

セッションビューアへのアクセス:
```
http://localhost:3048/viewer/
```

### MCPツール

プラグインは7つのMCPツールを提供:

| ツール | 説明 |
|--------|------|
| `search` | セマンティック検索 |
| `list_sessions` | セッション一覧（Level 0） |
| `get_session` | セッション詳細（Level 1） |
| `inject_context` | 過去セッションからコンテキスト取得 |
| `list_observations` | 観測記録一覧 |
| `export_observations` | 観測記録を新セッションとしてエクスポート |
| `get_connected_sessions` | UI接続セッションのコンテキスト取得 |

### スラッシュコマンド

| コマンド | 説明 |
|----------|------|
| `/cnthub:export` | 現在のセッション観測をエクスポート |
| `/cnthub:get` | 過去セッションからコンテキスト取得 |

## アーキテクチャ

```
plugin/
├── .claude-plugin/     # プラグインマニフェスト
├── hooks/              # セッションライフサイクルフック
├── commands/           # スラッシュコマンド（Skills）
├── scripts/
│   ├── worker-api.js   # バンドル済みAPIサーバー
│   ├── mcp-server.js   # MCPサーバー（7ツール）
│   └── *-hook.js       # フックスクリプト
└── ui/                 # Web UI（React）
```

## 設定

| 環境変数 | デフォルト | 説明 |
|----------|-----------|------|
| `API_PORT` | 3048 | APIサーバーポート |
| `DATABASE_PATH` | `~/.claude-cnthub/data.db` | SQLiteデータベースパス |
| `VOYAGE_API_KEY` | - | オプション: Voyage AIでより高精度な埋め込み |

## 開発

```bash
# 開発サーバー起動
bun run dev           # API + Web
bun run dev:api       # APIのみ（ポート3048）
bun run dev:web       # Webのみ（ポート5173）

# テスト
bun test              # 全テスト実行
bun test:watch        # ウォッチモード

# プラグインビルド
bun run build:plugin  # API + Webをプラグイン用にビルド
```

## ライセンス

MIT
