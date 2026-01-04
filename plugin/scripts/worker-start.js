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
    const status = await getServerStatus();
    console.error("[cnthub] Failed to start server");
    console.error("");
    console.error("Troubleshooting:");
    console.error(
      `  - Check if port ${status.port} is already in use: lsof -i :${status.port}`
    );
    console.error("  - Check if bun is installed: bun --version");
    console.error("  - Try stopping first: bun run worker:stop");
    console.error("  - Check status: bun run worker:status");
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("[cnthub] Error:", error.message);
  process.exit(1);
});
