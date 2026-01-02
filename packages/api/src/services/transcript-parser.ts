/**
 * Transcript Parser
 *
 * Claude Code のトランスクリプトファイル（JSONL）を解析し、
 * Message 型に変換する。
 *
 * トランスクリプト形式:
 * - JSONL（1行1JSON）
 * - 各行に type, message, timestamp などが含まれる
 * - sidechain（エージェント呼び出し）は除外
 */

import { readFileSync, existsSync, realpathSync } from "fs";
import { resolve, join, sep } from "path";
import type { Message, MessageType } from "@claude-cnthub/shared";
import { generateId } from "../repositories/base";
import { hookLogger as log } from "../utils/logger";

/**
 * トランスクリプトエントリの型定義
 */
interface TranscriptEntry {
  type: "user" | "assistant" | "system" | "error";
  message?: {
    role: "user" | "assistant";
    content: string | ContentBlock[];
  };
  isSidechain?: boolean;
  uuid?: string;
  timestamp?: string;
  toolUseResult?: {
    tool_use_id?: string;
    type?: string;
    content?: string;
    result?: string;
  };
}

interface ContentBlock {
  type: "text" | "tool_use" | "tool_result";
  text?: string;
  id?: string;
  name?: string;
  input?: Record<string, unknown>;
  content?: string;
}

/**
 * トランスクリプトパス検証結果
 */
export interface TranscriptValidationResult {
  valid: boolean;
  error?: string;
  resolvedPath?: string;
}

/**
 * トランスクリプトパスを検証
 *
 * セキュリティ:
 * - ~/.claude 配下のみ許可
 * - シンボリックリンク攻撃を防止
 * - .jsonl 拡張子のみ許可
 */
export function validateTranscriptPath(
  filePath: string
): TranscriptValidationResult {
  if (!filePath || typeof filePath !== "string") {
    return { valid: false, error: "Invalid file path" };
  }

  const homeDir = process.env.HOME || process.env.USERPROFILE || "";

  // セキュリティ: HOME未定義時は全パスが許可されるのを防止
  if (!homeDir) {
    return { valid: false, error: "HOME directory not defined" };
  }

  const allowedBase = join(homeDir, ".claude");
  const normalized = resolve(filePath);

  // 論理パスでの初期チェック
  if (!normalized.startsWith(allowedBase + sep) && normalized !== allowedBase) {
    return { valid: false, error: "Path outside allowed directory" };
  }

  if (!normalized.endsWith(".jsonl")) {
    return { valid: false, error: "Invalid file extension" };
  }

  // ファイル存在確認とシンボリックリンク検証
  if (!existsSync(normalized)) {
    return { valid: false, error: "File does not exist" };
  }

  try {
    const realPath = realpathSync(normalized);
    const realAllowedBase = existsSync(allowedBase)
      ? realpathSync(allowedBase)
      : allowedBase;

    if (
      !realPath.startsWith(realAllowedBase + sep) &&
      realPath !== realAllowedBase
    ) {
      return {
        valid: false,
        error: "Symlink points outside allowed directory",
      };
    }

    return { valid: true, resolvedPath: realPath };
  } catch {
    return { valid: false, error: "Failed to resolve path" };
  }
}

/**
 * コンテンツブロックからテキストを抽出
 */
function extractTextFromContent(content: string | ContentBlock[]): string {
  if (typeof content === "string") {
    return content;
  }

  return content
    .map((block) => {
      if (block.type === "text" && block.text) {
        return block.text;
      }
      if (block.type === "tool_use" && block.name) {
        return JSON.stringify({
          tool: block.name,
          input: block.input,
        });
      }
      if (block.type === "tool_result" && block.content) {
        return block.content;
      }
      return "";
    })
    .filter(Boolean)
    .join("\n");
}

/**
 * メッセージタイプを決定
 */
function determineMessageType(
  entry: TranscriptEntry,
  content: string | ContentBlock[]
): MessageType {
  if (entry.type === "error") {
    return "error";
  }

  if (entry.type === "system") {
    return "system";
  }

  if (entry.message?.role === "user") {
    return "user";
  }

  if (entry.message?.role === "assistant") {
    // アシスタントメッセージ内にツール使用があるか確認
    if (Array.isArray(content)) {
      const hasToolUse = content.some((block) => block.type === "tool_use");
      if (hasToolUse) {
        return "tool_use";
      }
    }
    return "assistant";
  }

  if (entry.toolUseResult) {
    return "tool_result";
  }

  return "assistant";
}

/**
 * トランスクリプトファイルを読み込み、Message 配列に変換
 *
 * @param transcriptPath - トランスクリプトファイルパス
 * @param sessionId - セッションID
 * @returns パースされた Message 配列
 */
export function parseTranscript(
  transcriptPath: string,
  sessionId: string
): Message[] {
  const validation = validateTranscriptPath(transcriptPath);
  if (!validation.valid || !validation.resolvedPath) {
    log.warn("Invalid transcript path", { error: validation.error });
    return [];
  }

  try {
    const content = readFileSync(validation.resolvedPath, "utf-8");
    const lines = content.split("\n").filter((line) => line.trim());

    const messages: Message[] = [];

    for (const line of lines) {
      try {
        const entry = JSON.parse(line) as TranscriptEntry;

        // sidechain（エージェント呼び出し）は除外
        if (entry.isSidechain) {
          continue;
        }

        // メッセージがない場合はスキップ
        if (!entry.message && !entry.toolUseResult && entry.type !== "error") {
          continue;
        }

        const rawContent =
          entry.message?.content ?? entry.toolUseResult?.content ?? "";
        const textContent = extractTextFromContent(rawContent);

        // 空のコンテンツはスキップ
        if (!textContent.trim()) {
          continue;
        }

        const messageType = determineMessageType(entry, rawContent);
        const messageId = generateId("msg");

        messages.push({
          messageId,
          sessionId,
          type: messageType,
          content: textContent,
          compressed: false,
          timestamp: entry.timestamp ? new Date(entry.timestamp) : new Date(),
        });
      } catch {
        // 個々の行のパースエラーは無視して続行
        continue;
      }
    }

    return messages;
  } catch (error) {
    log.error("Failed to read transcript", {
      error: error instanceof Error ? error.message : String(error),
    });
    return [];
  }
}

/**
 * トランスクリプトから会話テキストを抽出
 * 要約生成用のシンプルなテキスト形式
 *
 * @param transcriptPath - トランスクリプトファイルパス
 * @returns 会話テキスト
 */
export function extractConversationText(transcriptPath: string): string {
  const messages = parseTranscript(transcriptPath, "temp");

  return messages
    .map((msg) => {
      const role = msg.type === "user" ? "User" : "Assistant";
      if (msg.type === "tool_use" || msg.type === "tool_result") {
        return `[Tool: ${msg.type}]\n${msg.content}`;
      }
      return `${role}: ${msg.content}`;
    })
    .join("\n\n");
}

/**
 * JSONL コンテンツを直接パースする（テスト用）
 *
 * @param content - JSONL 形式の文字列
 * @param sessionId - セッションID
 * @returns パースされた Message 配列
 * @internal
 */
export function parseTranscriptContent(
  content: string,
  sessionId: string
): Message[] {
  const lines = content.split("\n").filter((line) => line.trim());
  const messages: Message[] = [];

  for (const line of lines) {
    try {
      const entry = JSON.parse(line) as TranscriptEntry;

      // sidechain（エージェント呼び出し）は除外
      if (entry.isSidechain) {
        continue;
      }

      // メッセージがない場合はスキップ
      if (!entry.message && !entry.toolUseResult && entry.type !== "error") {
        continue;
      }

      const rawContent =
        entry.message?.content ?? entry.toolUseResult?.content ?? "";
      const textContent = extractTextFromContent(rawContent);

      // 空のコンテンツはスキップ
      if (!textContent.trim()) {
        continue;
      }

      const messageType = determineMessageType(entry, rawContent);
      const messageId = generateId("msg");

      messages.push({
        messageId,
        sessionId,
        type: messageType,
        content: textContent,
        compressed: false,
        timestamp: entry.timestamp ? new Date(entry.timestamp) : new Date(),
      });
    } catch {
      // 個々の行のパースエラーは無視して続行
      continue;
    }
  }

  return messages;
}
