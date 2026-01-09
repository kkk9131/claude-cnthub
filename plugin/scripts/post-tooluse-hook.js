#!/usr/bin/env node
/**
 * PostToolUse Hook
 *
 * Called after a tool is used in Claude Code.
 * Records tool usage as an observation in cnthub.
 *
 * Input (stdin JSON):
 * - session_id: string
 * - tool_name: string
 * - tool_input: object
 * - tool_output: string
 * - hook_event_name: "PostToolUse"
 */

const {
  readHookContext,
  validateHookContext,
  sendToAPI,
  getErrorMessage,
  log,
  logError,
} = require("./hook-utils");

/**
 * ツール名から観測タイトルを生成
 * @param {string} toolName - ツール名
 * @param {Object} toolInput - ツール入力
 * @returns {string} 観測タイトル
 */
function generateTitle(toolName, toolInput) {
  switch (toolName) {
    case "Read":
      return `Read: ${toolInput?.file_path || "file"}`;
    case "Write":
      return `Write: ${toolInput?.file_path || "file"}`;
    case "Edit":
      return `Edit: ${toolInput?.file_path || "file"}`;
    case "Bash":
      const cmd = toolInput?.command || "";
      const shortCmd = cmd.length > 50 ? cmd.slice(0, 47) + "..." : cmd;
      return `Bash: ${shortCmd}`;
    case "Glob":
      return `Glob: ${toolInput?.pattern || "pattern"}`;
    case "Grep":
      return `Grep: ${toolInput?.pattern || "pattern"}`;
    default:
      return `Tool: ${toolName}`;
  }
}

/**
 * ツール出力を安全に切り詰め
 * @param {string} output - ツール出力
 * @param {number} maxLength - 最大文字数
 * @returns {string} 切り詰められた出力
 */
function truncateOutput(output, maxLength = 1000) {
  if (!output || typeof output !== "string") {
    return "";
  }
  if (output.length <= maxLength) {
    return output;
  }
  return output.slice(0, maxLength) + "\n... (truncated)";
}

async function main() {
  try {
    const context = await readHookContext();
    if (!context || !validateHookContext(context)) {
      process.exit(0);
    }

    const { session_id, tool_name, tool_input, tool_output } = context;

    // ツール名が無い場合はスキップ
    if (!tool_name || typeof tool_name !== "string") {
      process.exit(0);
    }

    const title = generateTitle(tool_name, tool_input);
    const content = truncateOutput(
      typeof tool_output === "string"
        ? tool_output
        : JSON.stringify(tool_output, null, 2)
    );

    const response = await sendToAPI("/hook/post-tooluse", {
      sessionId: session_id,
      toolName: tool_name,
      title,
      content,
      metadata: {
        tool_input:
          typeof tool_input === "object" ? JSON.stringify(tool_input) : null,
      },
    });

    if (!response.ok) {
      log(`[cnthub] Failed to record tool use: ${response.status}`);
      process.exit(0);
    }

    // 成功時は静かに終了（大量のログを避けるため）
    process.exit(0);
  } catch (error) {
    if (error.name === "AbortError") {
      logError("[cnthub] Request timeout");
    } else {
      logError(`[cnthub] PostToolUse hook error: ${getErrorMessage(error)}`);
    }
    process.exit(0);
  }
}

main();
