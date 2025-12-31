#!/usr/bin/env node
/**
 * Session Start Hook
 *
 * Called when a new Claude Code session starts.
 * Registers the session with cnthub API.
 *
 * Input (stdin JSON):
 * - session_id: string
 * - transcript_path: string
 * - cwd: string
 * - permission_mode: string
 * - hook_event_name: "SessionStart"
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

    const response = await sendToAPI("/hook/session-start", {
      sessionId: context.session_id,
      workingDirectory: context.cwd || process.cwd(),
      startedAt: new Date().toISOString(),
      transcriptPath: context.transcript_path,
      metadata: {
        permissionMode: context.permission_mode,
      },
    });

    if (!response.ok) {
      console.error(`[cnthub] Failed to register session: ${response.status}`);
      process.exit(0);
    }

    const result = await response.json();
    console.error(
      `[cnthub] Session registered: ${result.id || context.session_id}`
    );
    process.exit(0);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("[cnthub] Request timeout");
    } else {
      console.error(
        `[cnthub] Session start hook error: ${getErrorMessage(error)}`
      );
    }
    process.exit(0);
  }
}

main();
