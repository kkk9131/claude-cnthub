# claude-cnthub Plugin

Claude Code のセッション管理・AI メモリプラグイン。

## インストール

### 方法 1: 開発モードでテスト

```bash
# プラグインディレクトリを指定して Claude Code を起動
claude --plugin-dir /path/to/claude-cnthub
```

### 方法 2: ローカルプラグインとして登録

```bash
# シンボリックリンクを作成
mkdir -p ~/.claude/plugins/local
ln -s /path/to/claude-cnthub ~/.claude/plugins/local/claude-cnthub
```

### 方法 3: 将来的な公開版

```bash
# Registry 経由でインストール（将来対応）
claude plugin install claude-cnthub
```

## 必要条件

1. **API サーバーが起動していること**
   ```bash
   cd /path/to/claude-cnthub
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
| list_sessions | セッション一覧を取得 (Level 0) |
| get_session | セッション詳細を取得 (Level 1) |
| inject_context | 過去セッションのコンテキストを注入 |

## 設定

環境変数（オプション）:

```bash
CNTHUB_API_URL=http://localhost:3001  # API サーバーのURL（デフォルト: localhost:3001）
```

## ファイル構成

```
claude-cnthub/
├── .claude-plugin/
│   └── plugin.json          # プラグインマニフェスト
├── .mcp.json                 # MCP サーバー設定
├── hooks/
│   └── hooks.json            # Hook イベント定義
└── scripts/
    ├── mcp-server.js         # MCP サーバー
    ├── session-start-hook.js # セッション開始 Hook
    ├── session-stop-hook.js  # セッション停止 Hook
    └── session-end-hook.js   # セッション終了 Hook
```

## デバッグ

```bash
# 詳細ログを有効にして起動
claude --debug --plugin-dir /path/to/claude-cnthub

# Hook の実行結果を確認（Claude Code 内で Ctrl+O）
```

## トラブルシューティング

- **Hook が実行されない**: スクリプトに実行権限があるか確認 (`chmod +x scripts/*.js`)
- **API 接続エラー**: `bun run dev:api` でサーバーが起動しているか確認
- **MCP ツールが表示されない**: Claude Code を再起動して MCP サーバーを再読み込み
