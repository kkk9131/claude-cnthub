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
  isValidTranscriptPath,
  getErrorMessage,
} = require("./hook-utils");

async function main() {
  try {
    const context = await readHookContext();
    if (!context || !validateHookContext(context)) {
      process.exit(0);
    }

    // transcript_path を検証（存在する場合のみ）
    let transcriptPath = null;
    if (context.transcript_path) {
      if (isValidTranscriptPath(context.transcript_path)) {
        transcriptPath = context.transcript_path;
      } else {
        console.error("[cnthub] Invalid transcript path, skipping");
      }
    }

    const response = await sendToAPI("/hook/session-end", {
      sessionId: context.session_id,
      // 直接フィールドとして送信（優先される）
      transcriptPath: transcriptPath,
      endedAt: new Date().toISOString(),
      status: "completed",
      // 後方互換性のため metadata にも含める
      metadata: {
        transcriptPath: transcriptPath,
        cwd: context.cwd,
      },
    });

    if (!response.ok) {
      console.error(`[cnthub] Failed to end session: ${response.status}`);
      process.exit(0);
    }

    // レスポンスを解析
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      responseData = {};
    }

    const processingInfo = responseData.processingStarted
      ? " (processing summary)"
      : "";
    console.error(
      `[cnthub] Session ended: ${context.session_id}${processingInfo}`
    );
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
