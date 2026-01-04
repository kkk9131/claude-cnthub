#!/usr/bin/env node
/**
 * Worker Stop Script
 *
 * API サーバーを停止する CLI コマンド
 * Usage: node worker-stop.js
 */

const { stopServer, getServerStatus } = require("./hook-utils");

async function main() {
  console.log("[cnthub] Stopping API server...");

  const status = await getServerStatus();

  if (!status.isRunning) {
    console.log("[cnthub] Server is already stopped");
    process.exit(0);
  }

  console.log(`[cnthub] Found server (PID: ${status.pid || "unknown"})`);

  const stopped = await stopServer();

  if (stopped) {
    console.log("[cnthub] Server stopped successfully");
    process.exit(0);
  } else {
    console.error("[cnthub] Failed to stop server gracefully");
    if (status.pid) {
      console.error("");
      console.error("Manual stop:");
      console.error(`  kill -9 ${status.pid}`);
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("[cnthub] Error:", error.message);
  process.exit(1);
});
