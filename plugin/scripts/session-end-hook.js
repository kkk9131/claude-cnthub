#!/usr/bin/env node
/**
 * Session End Hook
 *
 * Called when a Claude Code session ends completely.
 * Finalizes the session in cnthub.
 *
 * Input (stdin JSON):
 * - session_id: string
 * - transcript_path: string
 * - cwd: string
 * - hook_event_name: "SessionEnd"
 */

const {
  readHookContext,
  validateHookContext,
  sendToAPI,
  getErrorMessage,
} = require("./hook-utils");

async function main() {
  try {
    const context = await readHookContext();
    if (!context || !validateHookContext(context)) {
      process.exit(0);
    }

    const response = await sendToAPI("/hook/session-end", {
      sessionId: context.session_id,
      endedAt: new Date().toISOString(),
      status: "completed",
      metadata: {
        transcriptPath: context.transcript_path,
        cwd: context.cwd,
      },
    });

    if (!response.ok) {
      console.error(`[cnthub] Failed to end session: ${response.status}`);
      process.exit(0);
    }

    console.error(`[cnthub] Session ended: ${context.session_id}`);
    process.exit(0);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("[cnthub] Request timeout");
    } else {
      console.error(
        `[cnthub] Session end hook error: ${getErrorMessage(error)}`
      );
    }
    process.exit(0);
  }
}

main();
