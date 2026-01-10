# claude-cnthub Plugin

Session management and AI memory for Claude Code.

## Requirements

- **Bun** 1.1+ (required)

## Features

- Automatic session tracking and summarization
- Semantic search across past sessions
- Context injection from previous sessions
- Web UI at `localhost:3048/viewer/`
- 7 MCP tools for programmatic access

## Quick Start

After installation, the plugin works automatically:

1. Sessions are tracked when Claude Code starts
2. Access Web UI at `http://localhost:3048/viewer/`
3. Use MCP tools or slash commands to search and inject context

## Commands

- `/cnthub:export` - Export session observations
- `/cnthub:get` - Get context from past sessions

## MCP Tools

- `search` - Semantic search
- `list_sessions` - List sessions
- `get_session` - Get session details
- `inject_context` - Inject past context
- `list_observations` - List observations
- `export_observations` - Export observations
- `get_connected_sessions` - Get connected session context
