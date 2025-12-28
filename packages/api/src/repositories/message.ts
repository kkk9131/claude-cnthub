/**
 * メッセージリポジトリ
 *
 * messages テーブルへのCRUD操作を提供
 */

import type { Message, MessageType } from "@claude-cnthub/shared";
import { query, queryOne, execute } from "../db";
import {
  generateId,
  now,
  calculatePagination,
  rowToEntity,
  type PaginationOptions,
  type PaginatedResult,
} from "./base";
import { AppError, ErrorCode } from "../middleware/error-handler";

/**
 * メッセージ作成データ
 */
interface CreateMessageData {
  sessionId: string;
  type: MessageType;
  content: string;
  compressed?: boolean;
  originalSize?: number;
  compressedSize?: number;
  metadata?: Record<string, unknown>;
}

/**
 * メッセージ一覧取得オプション
 */
interface ListMessagesOptions extends PaginationOptions {
  type?: MessageType;
  from?: Date;
  to?: Date;
}

/**
 * DBレコードからMessageエンティティへ変換
 */
function toMessage(row: Record<string, unknown>): Message {
  const message = rowToEntity<Message>(row, ["timestamp"]);
  // compressedはデフォルト値を設定
  message.compressed = message.compressed ?? false;
  // メタデータはJSON解析
  if (typeof row.metadata === "string" && row.metadata) {
    try {
      message.metadata = JSON.parse(row.metadata);
    } catch {
      message.metadata = undefined;
    }
  }
  return message;
}

/**
 * メッセージを作成
 */
export function createMessage(data: CreateMessageData): Message {
  try {
    const messageId = generateId("msg");
    const timestamp = now();

    execute(
      `INSERT INTO messages (
        message_id, session_id, type, content, compressed,
        original_size, compressed_size, metadata, timestamp
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      messageId,
      data.sessionId,
      data.type,
      data.content,
      data.compressed ? 1 : 0,
      data.originalSize ?? null,
      data.compressedSize ?? null,
      data.metadata ? JSON.stringify(data.metadata) : null,
      timestamp
    );

    return getMessageById(messageId)!;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to create message: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * メッセージをIDで取得
 */
export function getMessageById(messageId: string): Message | null {
  try {
    const row = queryOne<Record<string, unknown>>(
      "SELECT * FROM messages WHERE message_id = ?",
      messageId
    );

    return row ? toMessage(row) : null;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to get message: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションのメッセージ一覧を取得
 */
export function listMessages(
  sessionId: string,
  options: ListMessagesOptions = {}
): PaginatedResult<Message> {
  try {
    const { page = 1, limit = 50, type, from, to } = options;

    const conditions: string[] = ["session_id = ?"];
    const params: (string | number)[] = [sessionId];

    if (type) {
      conditions.push("type = ?");
      params.push(type);
    }

    if (from) {
      conditions.push("timestamp >= ?");
      params.push(from.toISOString());
    }

    if (to) {
      conditions.push("timestamp <= ?");
      params.push(to.toISOString());
    }

    const whereClause = `WHERE ${conditions.join(" AND ")}`;

    // 総件数取得
    const countResult = queryOne<{ count: number }>(
      `SELECT COUNT(*) as count FROM messages ${whereClause}`,
      ...params
    );
    const total = countResult?.count ?? 0;

    // データ取得
    const offset = (page - 1) * limit;
    const rows = query<Record<string, unknown>>(
      `SELECT * FROM messages ${whereClause} ORDER BY timestamp ASC LIMIT ? OFFSET ?`,
      ...params,
      limit,
      offset
    );

    return {
      items: rows.map(toMessage),
      pagination: calculatePagination(total, page, limit),
    };
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to list messages: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションのメッセージを取得（エイリアス）
 */
export function getSessionMessages(
  sessionId: string,
  options: ListMessagesOptions = {}
): PaginatedResult<Message> {
  return listMessages(sessionId, options);
}

/**
 * セッションの全メッセージを取得（要約用）
 */
export function getAllMessages(sessionId: string): Message[] {
  try {
    const rows = query<Record<string, unknown>>(
      "SELECT * FROM messages WHERE session_id = ? ORDER BY timestamp ASC",
      sessionId
    );

    return rows.map(toMessage);
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to get all messages: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * メッセージを削除
 */
export function deleteMessage(messageId: string): boolean {
  try {
    const result = execute(
      "DELETE FROM messages WHERE message_id = ?",
      messageId
    );

    return result.changes > 0;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to delete message: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}

/**
 * セッションの全メッセージを削除
 */
export function deleteAllMessages(sessionId: string): number {
  try {
    const result = execute(
      "DELETE FROM messages WHERE session_id = ?",
      sessionId
    );

    return result.changes;
  } catch (error) {
    throw new AppError(
      ErrorCode.DATABASE_ERROR,
      `Failed to delete all messages: ${error instanceof Error ? error.message : "Unknown error"}`,
      500
    );
  }
}
