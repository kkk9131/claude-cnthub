#!/usr/bin/env node
/**
 * Session Stop Hook
 *
 * Called when a Claude Code session is stopping.
 * Reads transcript and triggers summary generation.
 *
 * Input (stdin JSON):
 * - session_id: string
 * - transcript_path: string
 * - cwd: string
 * - hook_event_name: "Stop"
 */

const fs = require("fs");
const readline = require("readline");

const {
  readHookContext,
  validateHookContext,
  sendToAPI,
  isValidTranscriptPath,
  getErrorMessage,
} = require("./hook-utils");

const MAX_TRANSCRIPT_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_MESSAGES = 1000;

/**
 * トランスクリプトエントリからメッセージを抽出
 * @param {Object} entry - JSONLエントリ
 * @returns {Object|null} 抽出されたメッセージ
 */
function extractMessage(entry) {
  if (entry.type !== "user" && entry.type !== "assistant") {
    return null;
  }

  let content = "";
  if (typeof entry.message?.content === "string") {
    content = entry.message.content;
  } else if (entry.message?.content?.[0]?.text) {
    content = entry.message.content[0].text;
  }

  return {
    role: entry.type,
    content,
  };
}

/**
 * トランスクリプトファイルを読み取る
 * @param {string} transcriptPath - ファイルパス
 * @returns {Promise<Array>} トランスクリプトメッセージ
 */
async function readTranscript(transcriptPath) {
  if (!transcriptPath || !isValidTranscriptPath(transcriptPath)) {
    return [];
  }

  if (!fs.existsSync(transcriptPath)) {
    return [];
  }

  // ファイルサイズチェック
  const stats = fs.statSync(transcriptPath);
  if (stats.size > MAX_TRANSCRIPT_SIZE) {
    console.error(`[cnthub] Transcript file too large: ${stats.size} bytes`);
    return [];
  }

  const transcript = [];

  try {
    const fileStream = fs.createReadStream(transcriptPath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (!line.trim()) continue;

      try {
        const entry = JSON.parse(line);
        const message = extractMessage(entry);
        if (message) {
          transcript.push(message);
          // メッセージ数制限
          if (transcript.length >= MAX_MESSAGES) {
            console.error(`[cnthub] Transcript truncated to ${MAX_MESSAGES} messages`);
            break;
          }
        }
      } catch {
        // Skip invalid JSON lines
      }
    }
  } catch (error) {
    console.error(`[cnthub] Failed to read transcript: ${getErrorMessage(error)}`);
  }

  return transcript;
}

async function main() {
  try {
    const context = await readHookContext();
    if (!context || !validateHookContext(context)) {
      process.exit(0);
    }

    const transcript = await readTranscript(context.transcript_path);

    // 要約生成トリガー（タイムアウト長め: 25秒）
    const response = await sendToAPI(
      "/hook/session-stop",
      {
        sessionId: context.session_id,
        stoppedAt: new Date().toISOString(),
        transcript,
        metadata: {
          transcriptPath: context.transcript_path,
          cwd: context.cwd,
        },
      },
      25000
    );

    if (!response.ok) {
      console.error(`[cnthub] Failed to stop session: ${response.status}`);
      process.exit(0);
    }

    const result = await response.json();
    console.error(`[cnthub] Summary generated for session: ${context.session_id}`);

    process.exit(0);
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("[cnthub] Request timeout");
    } else {
      console.error(`[cnthub] Session stop hook error: ${getErrorMessage(error)}`);
    }
    process.exit(0);
  }
}

main();
