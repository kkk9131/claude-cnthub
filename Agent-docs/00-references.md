# 参考資料

## 参考プロジェクト

| プロジェクト | URL | 概要 |
|-------------|-----|------|
| **claude-mem** | https://github.com/thedotmack/claude-mem | Claude Code用メモリ/コンテキスト管理プラグイン |
| **claude-code-harness** | https://github.com/Chachamaru127/claude-code-harness | Claude Code開発ワークフロー支援ツール |
| **Claude-Code-Board** | https://github.com/cablate/Claude-Code-Board/ | Claude Codeセッション管理UI |
| **supermemory-mcp** | https://github.com/supermemoryai/supermemory-mcp | 複数LLM間のユニバーサルメモリレイヤー |

---

## 各プロジェクトの参考ポイント

### claude-mem

**採用ポイント:**
- セッション間のメモリ永続化
- セマンティック検索によるコンテキスト検索
- Claude Code Hooks 連携 (6種: SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd)
- Progressive Disclosure (段階的開示) パターン
- Worker Service アーキテクチャ

**技術スタック:**
- Bun + SQLite + Chroma (ベクトル検索)
- Port 37777 で Worker Service 起動

### claude-code-harness

**採用ポイント:**
- 開発ワークフローの自動化
- Skills システム (文脈に応じた行動指針の自動ロード)
- Profile/Workflow/Skill の3層アーキテクチャ
- Hook によるガードレール実装

**技術スタック:**
- YAML ベースのワークフロー定義
- Skills は SKILL.md で定義

### Claude-Code-Board

**採用ポイント:**
- セッション管理 Web UI
- リアルタイム表示 (WebSocket)
- 複数セッション並行管理

**技術スタック:**
- React + Vite (Frontend)
- Node.js + WebSocket (Backend)
- SQLite

### supermemory-mcp

**採用ポイント:**
- シンプルな API 設計 (`/add`, `/search`, `/profile`)
- Container Tags によるプロジェクトスコープ管理
- Profile System (Static Facts / Dynamic Facts)
- クロスLLM メモリ共有の設計思想

**技術スタック:**
- Hono + PostgreSQL + Drizzle ORM
- Cloudflare Workers (クラウド版)
- MCP (Model Context Protocol) 対応

---

## claude-cnthub との差別化

| 項目 | 参考プロジェクト | claude-cnthub |
|------|-----------------|---------------|
| デプロイ | クラウド or ローカル | **ローカル専用** |
| 対象LLM | Claude Code のみ | **複数LLM対応 (Phase 2)** |
| ストレージ | 各種DB | **SQLite + sqlite-vec** |
| コンテキスト共有 | 同一LLM内 | **GUI でノード操作・LLM間転送** |
| セッションID | 各LLMのID使用 | **独自ID (`ch_ss_0001`)** |

---

## 公式ドキュメント

| ドキュメント | URL |
|-------------|-----|
| Claude Code Plugin | https://docs.anthropic.com/en/docs/claude-code/plugins |
| Claude Agent SDK | https://docs.anthropic.com/en/docs/claude-code/agent-sdk |
| MCP (Model Context Protocol) | https://modelcontextprotocol.io/docs |
