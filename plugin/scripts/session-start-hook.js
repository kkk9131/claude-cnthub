#!/usr/bin/env node
/**
 * Session Start Hook
 *
 * Called when a new Claude Code session starts.
 * - Registers the session with cnthub API
 * - Caches transcript_path for use in PostToolUse hook
 *
 * Note: Context injection is NOT performed here because at session start,
 * we don't know what the user wants to work on yet. Related session search
 * requires user intent, which is available in UserPromptSubmit hook.
 *
 * Input (stdin JSON):
 * - session_id: string
 * - transcript_path: string
 * - cwd: string
 * - permission_mode: string
 * - hook_event_name: "SessionStart"
 *
 * Output (stdout):
 * - None (session registration only)
 */

const {
  readHookContext,
  validateHookContext,
  sendToAPI,
  getErrorMessage,
  ensureServerRunning,
  ensureWebRunning,
  saveTranscriptPath,
  log,
  logError,
} = require("./hook-utils");

async function main() {
  try {
    const context = await readHookContext();
    if (!context || !validateHookContext(context)) {
      process.exit(0);
    }

    // サーバーが起動していることを保証
    const serverReady = await ensureServerRunning();
    if (!serverReady) {
      log("[cnthub] API server not available, skipping session registration");
      process.exit(0);
    }

    // Webフロントエンドも起動（設定でautoStart: trueの場合）
    await ensureWebRunning();

    // Session registration only (context injection moved to UserPromptSubmit hook)
    const response = await sendToAPI("/hook/session-start", {
      sessionId: context.session_id,
      workingDirectory: context.cwd || process.cwd(),
      startedAt: new Date().toISOString(),
      transcriptPath: context.transcript_path,
      metadata: {
        permissionMode: context.permission_mode,
      },
      // Context injection disabled - handled by UserPromptSubmit hook
      // At session start, we don't know user intent, so related session search won't work
      requestContext: false,
    });

    if (!response.ok) {
      log(`[cnthub] Failed to register session: ${response.status}`);
      process.exit(0);
    }

    const result = await response.json();
    log(`[cnthub] Session registered: ${result.id || context.session_id}`);

    // transcript_path をキャッシュに保存（PostToolUse hookで使用）
    if (context.transcript_path) {
      saveTranscriptPath(context.session_id, context.transcript_path);
      log(`[cnthub] Transcript path cached for session: ${context.session_id}`);
    }

    // No context injection here - will be handled by UserPromptSubmit hook
    // when user's first prompt provides intent for related session search

    process.exit(0);
  } catch (error) {
    if (error.name === "AbortError") {
      logError("[cnthub] Request timeout");
    } else {
      logError(`[cnthub] Session start hook error: ${getErrorMessage(error)}`);
    }
    process.exit(0);
  }
}

main();
