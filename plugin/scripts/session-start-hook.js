#!/usr/bin/env node
/**
 * Session Start Hook
 *
 * Called when a new Claude Code session starts.
 * Registers the session with cnthub API and injects related context.
 *
 * Input (stdin JSON):
 * - session_id: string
 * - transcript_path: string
 * - cwd: string
 * - permission_mode: string
 * - hook_event_name: "SessionStart"
 *
 * Output (stdout):
 * - Related session context (if available)
 *   This will be automatically injected into Claude's context.
 */

const {
  readHookContext,
  validateHookContext,
  sendToAPI,
  getErrorMessage,
} = require("./hook-utils");

/**
 * Format context for Claude injection
 * @param {string} contextText - Raw context from API
 * @returns {string} Formatted context for Claude
 */
function formatContextForInjection(contextText) {
  if (!contextText) return "";

  // Wrap in a clear section for Claude
  return `
<related-sessions>
${contextText}
</related-sessions>
`.trim();
}

async function main() {
  try {
    const context = await readHookContext();
    if (!context || !validateHookContext(context)) {
      process.exit(0);
    }

    // Request context injection along with session registration
    const response = await sendToAPI("/hook/session-start", {
      sessionId: context.session_id,
      workingDirectory: context.cwd || process.cwd(),
      startedAt: new Date().toISOString(),
      transcriptPath: context.transcript_path,
      metadata: {
        permissionMode: context.permission_mode,
      },
      // Request related session context
      requestContext: true,
    });

    if (!response.ok) {
      console.error(`[cnthub] Failed to register session: ${response.status}`);
      process.exit(0);
    }

    const result = await response.json();
    console.error(
      `[cnthub] Session registered: ${result.id || context.session_id}`
    );

    // Output context to stdout for Claude injection
    if (result.contextText) {
      const formattedContext = formatContextForInjection(result.contextText);
      // stdout goes to Claude as context
      console.log(formattedContext);
      console.error("[cnthub] Related context injected");
    }

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
