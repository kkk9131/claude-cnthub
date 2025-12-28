/**
 * claude-cnthub API Server
 *
 * メインエントリポイント
 * Hono + Bun による REST/WebSocket API サーバー
 */

import { app } from "./app";
import { runMigrations } from "./db";
import { websocketHandler, type WSClientData } from "./websocket";

// ==================== サーバー起動 ====================

const PORT = process.env.API_PORT || 3001;

// マイグレーション実行
try {
  runMigrations();
  console.log("[Database] Migrations completed successfully");
} catch (error) {
  console.error("[Database] Migration failed:", error);
  console.error("Server cannot start without valid database");
  process.exit(1);
}

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
  websocket: websocketHandler,
};
