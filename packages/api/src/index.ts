/**
 * claude-cnthub API Server
 *
 * メインエントリポイント
 * Hono + Bun による REST/WebSocket API サーバー
 */

import type { Server } from "bun";
import { app } from "./app";
import { config } from "./config";
import { runMigrations } from "./db";
import { websocketHandler, type WSClientData } from "./websocket";
import { cleanupTimedOutSessions } from "./repositories/session";

// ==================== サーバー起動 ====================

// マイグレーション実行
try {
  runMigrations();
  console.log("[Database] Migrations completed successfully");
} catch (error) {
  console.error("[Database] Migration failed:", error);
  console.error("Server cannot start without valid database");
  process.exit(1);
}

// ==================== バックグラウンド処理 ====================

// タイムアウトセッションのクリーンアップ（2時間以上経過したprocessingセッション）
// ツール使用時にセッションがtouchされるため、アクティブなセッションは除外される
const SESSION_TIMEOUT_HOURS = 2;
const CLEANUP_INTERVAL_MS = 15 * 60 * 1000; // 15分ごとにチェック

// サーバー起動時に一度実行
try {
  const cleanedUp = cleanupTimedOutSessions(SESSION_TIMEOUT_HOURS);
  if (cleanedUp > 0) {
    console.log(`[Cleanup] Cleaned up ${cleanedUp} timed out sessions`);
  }
} catch (error) {
  console.warn("[Cleanup] Initial cleanup failed:", error);
}

// 定期的にクリーンアップを実行
setInterval(() => {
  try {
    const cleanedUp = cleanupTimedOutSessions(SESSION_TIMEOUT_HOURS);
    if (cleanedUp > 0) {
      console.log(`[Cleanup] Cleaned up ${cleanedUp} timed out sessions`);
    }
  } catch (error) {
    console.warn("[Cleanup] Periodic cleanup failed:", error);
  }
}, CLEANUP_INTERVAL_MS);

console.log(`
╔═══════════════════════════════════════════╗
║       claude-cnthub API Server            ║
╠═══════════════════════════════════════════╣
║  Status:    Running                       ║
║  Port:      ${String(config.api.port).padEnd(27)}║
║  Health:    http://localhost:${config.api.port}/health  ║
╚═══════════════════════════════════════════╝
`);

export default {
  port: config.api.port,
  idleTimeout: 120, // AI分析用に120秒に延長（デフォルト10秒）
  fetch(
    req: Request,
    server: Server<WSClientData>
  ): Response | Promise<Response> {
    const url = new URL(req.url);

    // WebSocketアップグレードリクエストの処理
    if (url.pathname === "/ws") {
      // Origin検証
      const origin = req.headers.get("origin");
      if (origin && !config.websocket.allowedOrigins.includes(origin)) {
        console.warn(
          `[WebSocket] Rejected connection from unauthorized origin: ${origin}`
        );
        return new Response("Forbidden: Invalid origin", { status: 403 });
      }

      // WebSocketにアップグレード
      const upgraded = server.upgrade(req, {
        data: { clientId: "" }, // open()で設定される
      });

      if (upgraded) {
        // アップグレード成功（Bunは自動的に101を返す）
        return undefined as unknown as Response;
      }

      return new Response("WebSocket upgrade failed", { status: 500 });
    }

    // 通常のHTTPリクエストはHonoで処理
    return app.fetch(req, server);
  },
  websocket: websocketHandler,
};
