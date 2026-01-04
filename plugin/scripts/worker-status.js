#!/usr/bin/env node
/**
 * Worker Status Script
 *
 * API サーバーの状態を確認する CLI コマンド
 * Usage: node worker-status.js
 */

const {
  getServerStatus,
  loadConfig,
  CONFIG_FILE,
  PID_FILE,
} = require("./hook-utils");

async function main() {
  const status = await getServerStatus();
  const config = loadConfig();

  console.log("\n╔═══════════════════════════════════════════╗");
  console.log("║       claude-cnthub Worker Status         ║");
  console.log("╠═══════════════════════════════════════════╣");
  console.log(
    `║  Status:    ${status.isRunning ? "Running ✓" : "Stopped ✗"}                    ║`
  );
  console.log(`║  Health:    ${status.health.padEnd(10)}                    ║`);
  console.log(
    `║  PID:       ${String(status.pid || "-").padEnd(10)}                    ║`
  );
  console.log(`║  Port:      ${status.port}                            ║`);
  console.log("╠═══════════════════════════════════════════╣");
  console.log(`║  Config:    ${CONFIG_FILE.replace(process.env.HOME, "~")}`);
  console.log(`║  PID File:  ${PID_FILE.replace(process.env.HOME, "~")}`);
  console.log("╚═══════════════════════════════════════════╝\n");

  if (status.isRunning) {
    console.log("Commands:");
    console.log("  bun run worker:stop   - Stop the server");
    console.log(
      `  curl http://localhost:${status.port}/health - Check health\n`
    );
  } else {
    console.log("Commands:");
    console.log("  bun run worker:start  - Start the server");
    console.log("  (or start a Claude Code session)\n");
  }

  process.exit(status.isRunning ? 0 : 1);
}

main().catch((error) => {
  console.error("[cnthub] Error:", error.message);
  process.exit(1);
});
