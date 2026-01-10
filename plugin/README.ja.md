# claude-cnthub プラグイン

Claude Code用のセッション管理・AIメモリプラグイン。

## 必要要件

- **Bun** 1.1以上（必須）

## 機能

- セッションの自動追跡・要約
- 過去セッションのセマンティック検索
- 過去セッションからのコンテキスト注入
- `localhost:3048/viewer/` でWeb UI
- プログラムアクセス用の7つのMCPツール

## クイックスタート

インストール後、プラグインは自動的に動作します:

1. Claude Code起動時にセッションが追跡されます
2. `http://localhost:3048/viewer/` でWeb UIにアクセス
3. MCPツールやスラッシュコマンドで検索・コンテキスト注入

## コマンド

- `/cnthub:export` - セッション観測をエクスポート
- `/cnthub:get` - 過去セッションからコンテキスト取得

## MCPツール

- `search` - セマンティック検索
- `list_sessions` - セッション一覧
- `get_session` - セッション詳細
- `inject_context` - 過去コンテキスト注入
- `list_observations` - 観測記録一覧
- `export_observations` - 観測記録エクスポート
- `get_connected_sessions` - 接続セッションのコンテキスト
