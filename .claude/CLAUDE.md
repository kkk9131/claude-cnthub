# claude-cnthub

LLM セッションの永続化・コンテキスト共有・クロスLLM連携を実現する開発支援ツール。
Claude Code Plugin として動作し、セッション要約・セマンティック検索・コンテキスト自動注入で、過去の作業を活かした開発を実現。

## 技術スタック

- **ランタイム**: Bun 1.1+
- **Backend**: Hono + SQLite + sqlite-vec（ベクトル検索）
- **Frontend**: React 18 + Vite + TailwindCSS + Zustand
- **AI**: Claude Agent SDK（サブスク or API キー対応）
- **パッケージ管理**: Bun Workspaces（モノレポ）

## 重要なルール

- **ローカル専用**: 公開非対応、認証なし
- **AI 処理の堅牢性**: 要約失敗時もセッション継続（グレースフルデグラデーション）
- **WebSocket 必須**: リアルタイム表示は Socket.IO で実装
- **既存パターン優先**: 新コンポーネントは既存の設計パターンに従う
- **ダークモード統一**: UI は全てダークテーマで実装
- **TDD 必須**: 全ての実装はテスト駆動開発で行う（詳細: [05-test.md](Agent-docs/05-test.md)）
- **Agent SDK 実装時**: Skills, Hooks, Permissions等の実装は [08-agent-sdk-reference.md](Agent-docs/08-agent-sdk-reference.md) を参照

## 開発コマンド

```bash
# 開発サーバー起動
bun run dev           # API + Web 同時起動
bun run dev:api       # Backend のみ (Port 3048)
bun run dev:web       # Frontend のみ (Port 5173)

# テスト・ビルド
bun test              # 全テスト実行
bun run build         # プロダクションビルド
bun run lint          # リント
```

## 参照先

### 詳細仕様: `Agent-docs/`

| ドキュメント | 内容 |
|-------------|------|
| [00-references.md](Agent-docs/00-references.md) | 参考プロジェクト・URL |
| [01-requirements.md](Agent-docs/01-requirements.md) | 要件定義・機能一覧・制約事項 |
| [02-tech-stack.md](Agent-docs/02-tech-stack.md) | 技術選定・ディレクトリ構成 |
| [03-database.md](Agent-docs/03-database.md) | ER図・テーブル定義・クエリ例 |
| [04-api.md](Agent-docs/04-api.md) | REST/WebSocket API 仕様 |
| [05-test.md](Agent-docs/05-test.md) | テスト戦略・カバレッジ目標 |
| [06-ui.md](Agent-docs/06-ui.md) | 画面設計・コンポーネント構成 |
| [07-plugin-requirements.md](Agent-docs/07-plugin-requirements.md) | Plugin 要件定義 |
| [08-agent-sdk-reference.md](Agent-docs/08-agent-sdk-reference.md) | Agent SDK リファレンス（Skills, Hooks, Permissions等） |

## ディレクトリ構成

```
claude-cnthub/
├── packages/
│   ├── api/      # Backend (Hono + Bun, Port 3048)
│   ├── web/      # Frontend (React + Vite) ※V-01で plugin/ui/ に移行予定
│   └── shared/   # 共通型定義
├── plugin/       # Claude Code Plugin
│   ├── .claude-plugin/   # プラグインマニフェスト
│   ├── commands/         # スラッシュコマンド定義
│   ├── hooks/            # Hook イベント定義
│   └── scripts/          # Hook/MCP スクリプト
└── Agent-docs/   # 詳細仕様書
```

## 環境変数

```env
API_PORT=3048                       # 統合サーバーポート
WEB_PORT=5173                       # フロントエンドポート
ANTHROPIC_API_KEY=sk-ant-...        # API キー方式の場合
DATABASE_PATH=~/.claude-cnthub/data.db
```

## ID 体系

| プレフィックス | 用途 | 例 |
|--------------|------|-----|
| `ch_ss_` | セッション | `ch_ss_0001` |
| `ch_mg_` | マージ | `ch_mg_0001` |
| `ch_pj_` | プロジェクト | `ch_pj_0001` |
| `ch_ob_` | 観測記録 | `ch_ob_0001` |
