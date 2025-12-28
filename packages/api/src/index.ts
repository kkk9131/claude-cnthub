/**
 * claude-cnthub API Server
 *
 * メインエントリポイント
 * Hono + Bun による REST/WebSocket API サーバー
 */

import { app } from "./app";
import { runMigrations } from "./db";

// ==================== サーバー起動 ====================

const PORT = process.env.API_PORT || 3001;

// マイグレーション実行
runMigrations();

console.log(`
╔═══════════════════════════════════════════╗
║       claude-cnthub API Server            ║
╠═══════════════════════════════════════════╣
║  Status:    Running                       ║
║  Port:      ${String(PORT).padEnd(27)}║
║  Health:    http://localhost:${PORT}/health  ║
╚═══════════════════════════════════════════╝
`);

export default {
  port: Number(PORT),
  fetch: app.fetch,
};
