#!/usr/bin/env node
/**
 * Worker Start Script
 *
 * API サーバーを起動する CLI コマンド
 * Usage: node worker-start.js
 */

const { ensureServerRunning, getServerStatus } = require("./hook-utils");

async function main() {
  console.log("[cnthub] Starting API server...");

  const started = await ensureServerRunning();

  if (started) {
    const status = await getServerStatus();
    console.log(`[cnthub] Server started (PID: ${status.pid || "unknown"})`);
    console.log(`[cnthub] Listening on port ${status.port}`);
    process.exit(0);
  } else {
    console.error("[cnthub] Failed to start server");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("[cnthub] Error:", error.message);
  process.exit(1);
});
