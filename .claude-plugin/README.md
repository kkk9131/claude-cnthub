# claude-cnthub Plugin

Claude Code のセッション管理・AI メモリプラグイン。

## インストール

### ローカル開発（推奨）

```bash
# プロジェクトディレクトリで Claude Code を起動
cd /Users/kazuto/Desktop/claude-cnthub
claude --plugin-dir ./plugin
```

**メリット**:
- マーケットプレイス登録不要
- プラグインの変更が再起動で即反映
- プライベートリポジトリでも動作

### 公開マーケットプレイス（将来）

リポジトリを公開後：
```bash
# マーケットプレイスを追加
claude plugin marketplace add https://github.com/kkk9131/claude-cnthub.git

# プラグインをインストール
claude plugin install claude-cnthub@claude-cnthub-marketplace
```

## 必要条件

1. **API サーバーが起動していること**
   ```bash
   cd /Users/kazuto/Desktop/claude-cnthub
   bun run dev:api
   ```

2. **Node.js が利用可能なこと**（Hook スクリプト実行に必要）

## 機能

### Hooks

| イベント | 説明 |
|---------|------|
| SessionStart | セッション開始時にセッションを登録 |
| Stop | セッション停止時に要約を生成 |
| SessionEnd | セッション終了時にセッションを完了 |

### MCP Tools

| ツール | 説明 |
|--------|------|
| search | セマンティック検索でセッションを検索 |
| list_sessions | セッション一覧を取得 |
| get_session | セッション詳細を取得 |
| inject_context | 過去セッションのコンテキストを注入 |

## 設定

環境変数（オプション）:

```bash
CNTHUB_API_URL=http://localhost:3048  # API サーバーのURL（デフォルト）
```

## ファイル構成

```
claude-cnthub/
├── .claude-plugin/
│   └── marketplace.json      # マーケットプレイス設定
├── plugin/                   # プラグイン本体
│   ├── .claude-plugin/
│   │   └── plugin.json       # プラグインマニフェスト
│   ├── hooks/
│   │   └── hooks.json        # Hook イベント定義
│   └── scripts/
│       ├── mcp-server.js         # MCP サーバー
│       ├── hook-utils.js         # 共通ユーティリティ
│       ├── session-start-hook.js # セッション開始 Hook
│       ├── session-stop-hook.js  # セッション停止 Hook
│       └── session-end-hook.js   # セッション終了 Hook
└── packages/
    └── api/                  # Backend API サーバー
```

## デバッグ

```bash
# 詳細ログを有効にして起動
claude --debug --plugin-dir ./plugin

# Hook の実行結果を確認（Claude Code 内で Ctrl+O）
```

## トラブルシューティング

### よくあるエラー

| エラー | 解決策 |
|--------|--------|
| `Plugin not found in marketplace 'inline'` | `~/.claude/settings.json` から該当エントリを削除 |
| `SSH authentication failed` | HTTPS URL を使用するか、リポジトリを公開 |
| `Marketplace file not found` | `--plugin-dir` でローカル開発モードを使用 |
| Hook が実行されない | `chmod +x plugin/scripts/*.js` で実行権限を付与 |
| API 接続エラー | `bun run dev:api` でサーバーを起動 |

### 設定ファイルの場所

| ファイル | 用途 |
|----------|------|
| `~/.claude/settings.json` | グローバル設定・有効プラグイン |
| `~/.claude/plugins/known_marketplaces.json` | 登録済みマーケットプレイス |
| `~/.claude/plugins/installed_plugins.json` | インストール済みプラグイン |
