# claude-cnthub

Claude Code Plugin for session management and AI memory. Captures session summaries, enables semantic search, and provides cross-session context injection.

## Why claude-cnthub?

Claude Codeで作業すると、セッションが終われば文脈は消えます。
claude-cnthubは**セッションを自動保存・要約し、次回の作業に活かせる**ようにします。

- 「先週やったあの実装、どうやったっけ？」→ **検索で即発見**
- 「前回の続きから」→ **コンテキスト自動注入**
- セッション間の関連付けを**ビジュアル化**

## Quick Start

```bash
# 1. インストール
claude plugin install /path/to/claude-cnthub/plugin

# 2. 使うだけ（自動で動作）
# Claude Codeを普通に使うだけで、セッションが自動記録されます

# 3. 過去を検索（MCP Tool）
search("認証機能の実装")

# 4. Web UIで確認
open http://localhost:3048/viewer/
```

## Features

- **Session Tracking**: Automatically captures and summarizes Claude Code sessions
- **Semantic Search**: Find relevant past sessions using natural language queries
- **Context Injection**: Inject context from previous sessions into new ones
- **Web UI**: Visual session browser and node editor at `localhost:3048/viewer/`
- **MCP Tools**: 7 tools for programmatic session access

## Requirements

- **Bun** 1.1+ (required - uses `bun:sqlite`)
- **Claude Code** CLI

## Installation

### As a Plugin (Recommended)

```bash
# Install from local directory
claude plugin install /path/to/claude-cnthub/plugin

# Or from GitHub (when published)
# claude plugin install github:kkk9131/claude-cnthub
```

### For Development

```bash
git clone https://github.com/kkk9131/claude-cnthub.git
cd claude-cnthub
bun install
bun run dev
```

## Usage

### Automatic Session Tracking

Once installed, the plugin automatically:
1. Creates a session record when Claude Code starts
2. Tracks tool usage and observations during the session
3. Generates AI-powered summaries when the session ends

### Web UI

Access the session viewer at:
```
http://localhost:3048/viewer/
```

### MCP Tools

The plugin provides 7 MCP tools:

| Tool | Description |
|------|-------------|
| `search` | Semantic search across sessions |
| `list_sessions` | List session index (Level 0) |
| `get_session` | Get session details (Level 1) |
| `inject_context` | Get context from past sessions |
| `list_observations` | List observations for a session |
| `export_observations` | Export observations as a new session |
| `get_connected_sessions` | Get context from UI-connected sessions |

### Slash Commands

| Command | Description |
|---------|-------------|
| `/cnthub:export` | Export current session observations |
| `/cnthub:get` | Get context from past sessions |

## Architecture

```
plugin/
├── .claude-plugin/     # Plugin manifest
├── hooks/              # Session lifecycle hooks
├── commands/           # Slash commands (Skills)
├── scripts/
│   ├── worker-api.js   # Bundled API server
│   ├── mcp-server.js   # MCP server (7 tools)
│   └── *-hook.js       # Hook scripts
└── ui/                 # Web UI (React)
```

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `API_PORT` | 3048 | API server port |
| `DATABASE_PATH` | `~/.claude-cnthub/data.db` | SQLite database path |
| `VOYAGE_API_KEY` | - | Optional: Voyage AI for better embeddings |

## Development

```bash
# Start development servers
bun run dev           # API + Web
bun run dev:api       # API only (port 3048)
bun run dev:web       # Web only (port 5173)

# Testing
bun test              # Run all tests
bun test:watch        # Watch mode

# Build plugin
bun run build:plugin  # Build API + Web for plugin
```

## License

MIT
