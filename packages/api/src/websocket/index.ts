/**
 * WebSocket サーバー（Bunネイティブ実装）
 *
 * リアルタイムメッセージ通信を提供。
 * セッションごとにルームを作成し、メッセージの送受信をブロードキャスト。
 *
 * プロトコル:
 * クライアント → サーバー (JSON):
 * - { type: "join", sessionId: string }
 * - { type: "leave", sessionId: string }
 * - { type: "message", sessionId: string, content: string }
 * - { type: "typing", sessionId: string, isTyping: boolean }
 *
 * サーバー → クライアント (JSON):
 * - { type: "joined", sessionId: string, messages: Message[] }
 * - { type: "left", sessionId: string }
 * - { type: "new-message", message: Message }
 * - { type: "typing", sessionId: string, isTyping: boolean }
 * - { type: "error", message: string }
 */

import type { ServerWebSocket } from "bun";
import type { Message, MessageType } from "@claude-cnthub/shared";
import { createMessage, getSessionMessages } from "../repositories/message";
import { getSession } from "../repositories/session";
import { config } from "../config";

// ==================== セキュリティ設定 ====================

/** WebSocketクローズコード */
const WS_CLOSE_CODES = {
  NORMAL: 1000,
  POLICY_VIOLATION: 1008,
} as const;

/** セキュリティ制限（config.tsから取得） */
const LIMITS = {
  MAX_PAYLOAD_SIZE: config.websocket.maxPayloadSize,
  MAX_MESSAGE_LENGTH: config.websocket.maxMessageLength,
  MAX_SESSION_ID_LENGTH: 100,
  RATE_LIMIT_WINDOW_MS: config.websocket.rateLimitWindowMs,
  MAX_MESSAGES_PER_WINDOW: config.websocket.maxMessagesPerWindow,
} as const;

// ==================== バリデーション ====================

/** セッションID形式の検証（sess-プレフィックス付きUUID） */
function validateSessionId(sessionId: unknown): sessionId is string {
  if (typeof sessionId !== "string") return false;
  if (sessionId.length === 0 || sessionId.length > LIMITS.MAX_SESSION_ID_LENGTH)
    return false;
  // sess-{uuid} または {uuid} 形式を許可
  return /^(sess-)?[a-f0-9-]{36}$/i.test(sessionId);
}

/** メッセージ内容の検証 */
function validateContent(content: unknown): content is string {
  if (typeof content !== "string") return false;
  if (content.length === 0) return false;
  if (content.length > LIMITS.MAX_MESSAGE_LENGTH) return false;
  return true;
}

// ==================== レート制限 ====================

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimits = new Map<string, RateLimitEntry>();

function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(clientId);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(clientId, {
      count: 1,
      resetAt: now + LIMITS.RATE_LIMIT_WINDOW_MS,
    });
    return true;
  }

  if (entry.count >= LIMITS.MAX_MESSAGES_PER_WINDOW) {
    return false;
  }

  entry.count++;
  return true;
}

// ==================== 型定義 ====================

/**
 * WebSocket クライアントデータ
 *
 * 各接続に紐づくメタデータ
 */
export interface WSClientData {
  sessionId?: string;
  clientId: string;
}

/**
 * クライアント → サーバー メッセージ型
 */
type ClientMessage =
  | { type: "join"; sessionId: string }
  | { type: "leave"; sessionId: string }
  | { type: "message"; sessionId: string; content: string }
  | { type: "typing"; sessionId: string; isTyping: boolean };

/**
 * サーバー → クライアント メッセージ型
 */
type ServerMessage =
  | { type: "joined"; sessionId: string; messages: Message[] }
  | { type: "left"; sessionId: string }
  | { type: "new-message"; message: Message }
  | { type: "typing"; sessionId: string; isTyping: boolean }
  | { type: "error"; message: string }
  | { type: "edge_created"; edge: EdgeEvent }
  | { type: "edge_deleted"; edgeId: string; remainingContext?: string }
  | { type: "tokens_updated"; tokens: TokensUpdatedEvent };

/**
 * Edge イベント型
 */
interface EdgeEvent {
  edgeId: string;
  sourceSessionId: string;
  targetClaudeSessionId: string;
  createdAt: string;
}

/**
 * トークン更新イベント型
 */
interface TokensUpdatedEvent {
  sessionId: string;
  inputTokens: number;
  outputTokens: number;
}

// セッションごとのクライアント管理
// sessionId → Set<WebSocket>
const sessionClients = new Map<string, Set<ServerWebSocket<WSClientData>>>();

// 全クライアント管理（クリーンアップ用）
const allClients = new Set<ServerWebSocket<WSClientData>>();

// クライアントID生成用カウンター
let clientIdCounter = 0;

/**
 * WebSocket ハンドラー（Bun.serve の websocket オプションに渡す）
 */
export const websocketHandler = {
  /**
   * 接続確立時
   */
  open(ws: ServerWebSocket<WSClientData>) {
    ws.data.clientId = `ws_${++clientIdCounter}`;
    allClients.add(ws);
    console.log(`[WebSocket] Client connected: ${ws.data.clientId}`);
  },

  /**
   * メッセージ受信時
   */
  message(ws: ServerWebSocket<WSClientData>, message: string | Buffer) {
    // ペイロードサイズチェック
    const messageSize =
      typeof message === "string" ? message.length : message.length;
    if (messageSize > LIMITS.MAX_PAYLOAD_SIZE) {
      console.warn(
        `[WebSocket] Rejected oversized message: ${messageSize} bytes`
      );
      sendError(ws, "Message too large");
      return;
    }

    // レート制限チェック
    if (!checkRateLimit(ws.data.clientId)) {
      sendError(ws, "Rate limit exceeded");
      return;
    }

    try {
      const data = JSON.parse(
        typeof message === "string" ? message : message.toString()
      ) as ClientMessage;

      switch (data.type) {
        case "join":
          handleJoin(ws, data.sessionId);
          break;
        case "leave":
          handleLeave(ws, data.sessionId);
          break;
        case "message":
          handleMessage(ws, data.sessionId, data.content);
          break;
        case "typing":
          handleTyping(ws, data.sessionId, data.isTyping);
          break;
        default:
          sendError(ws, "Unknown message type");
      }
    } catch (error) {
      console.error("[WebSocket] Error parsing message:", error);
      sendError(ws, "Invalid message format");
    }
  },

  /**
   * 接続終了時
   */
  close(ws: ServerWebSocket<WSClientData>) {
    // セッションから離脱
    if (ws.data.sessionId) {
      removeFromSession(ws, ws.data.sessionId);
    }
    allClients.delete(ws);
    console.log(`[WebSocket] Client disconnected: ${ws.data.clientId}`);
  },
};

/**
 * セッション参加ハンドラー
 */
function handleJoin(ws: ServerWebSocket<WSClientData>, sessionId: string) {
  // 入力バリデーション
  if (!validateSessionId(sessionId)) {
    sendError(ws, "Invalid session ID format");
    return;
  }

  try {
    // セッション存在確認
    const session = getSession(sessionId);
    if (!session) {
      // セキュリティ: セッションの存在を明示しない
      sendError(ws, "Unable to join session");
      console.warn(`[WebSocket] Session not found: ${sessionId}`);
      return;
    }

    // 前のセッションから離脱
    if (ws.data.sessionId && ws.data.sessionId !== sessionId) {
      removeFromSession(ws, ws.data.sessionId);
    }

    // セッションに追加
    ws.data.sessionId = sessionId;
    addToSession(ws, sessionId);

    // 既存メッセージを取得して送信
    const { items: messages } = getSessionMessages(sessionId);
    const response: ServerMessage = { type: "joined", sessionId, messages };
    ws.send(JSON.stringify(response));

    console.log(`[WebSocket] ${ws.data.clientId} joined session ${sessionId}`);
  } catch (error) {
    console.error("[WebSocket] Error in handleJoin:", error);
    sendError(ws, "Internal server error");
  }
}

/**
 * セッション離脱ハンドラー
 */
function handleLeave(ws: ServerWebSocket<WSClientData>, sessionId: string) {
  removeFromSession(ws, sessionId);
  ws.data.sessionId = undefined;

  const response: ServerMessage = { type: "left", sessionId };
  ws.send(JSON.stringify(response));

  console.log(`[WebSocket] ${ws.data.clientId} left session ${sessionId}`);
}

/**
 * メッセージ送信ハンドラー
 */
function handleMessage(
  ws: ServerWebSocket<WSClientData>,
  sessionId: string,
  content: string
) {
  // 入力バリデーション
  if (!validateSessionId(sessionId)) {
    sendError(ws, "Invalid session ID format");
    return;
  }

  if (!validateContent(content)) {
    sendError(ws, "Invalid message content (empty or too long)");
    return;
  }

  try {
    // セッション存在確認
    const session = getSession(sessionId);
    if (!session) {
      sendError(ws, "Unable to send message");
      console.warn(`[WebSocket] Session not found: ${sessionId}`);
      return;
    }

    // メッセージを保存
    const message = createMessage({
      sessionId,
      type: "user",
      content,
    });

    // セッション内の全クライアントに送信
    broadcastToSession(sessionId, { type: "new-message", message });

    console.log(
      `[WebSocket] Message sent to ${sessionId}: ${content.slice(0, 50)}...`
    );
  } catch (error) {
    console.error("[WebSocket] Error in handleMessage:", error);
    sendError(ws, "Failed to send message");
  }
}

/**
 * 入力中表示ハンドラー
 */
function handleTyping(
  ws: ServerWebSocket<WSClientData>,
  sessionId: string,
  isTyping: boolean
) {
  // 自分以外に送信
  broadcastToSession(sessionId, { type: "typing", sessionId, isTyping }, ws);
}

/**
 * セッションにクライアントを追加
 */
function addToSession(ws: ServerWebSocket<WSClientData>, sessionId: string) {
  let clients = sessionClients.get(sessionId);
  if (!clients) {
    clients = new Set();
    sessionClients.set(sessionId, clients);
  }
  clients.add(ws);
}

/**
 * セッションからクライアントを削除
 */
function removeFromSession(
  ws: ServerWebSocket<WSClientData>,
  sessionId: string
) {
  const clients = sessionClients.get(sessionId);
  if (clients) {
    clients.delete(ws);
    if (clients.size === 0) {
      sessionClients.delete(sessionId);
    }
  }
}

/**
 * セッション内の全クライアントにブロードキャスト
 *
 * @param exclude 除外するクライアント（自分に送らない場合）
 */
function broadcastToSession(
  sessionId: string,
  message: ServerMessage,
  exclude?: ServerWebSocket<WSClientData>
) {
  const clients = sessionClients.get(sessionId);
  if (!clients) return;

  const json = JSON.stringify(message);
  for (const client of clients) {
    if (client !== exclude) {
      client.send(json);
    }
  }
}

/**
 * エラーメッセージを送信
 */
function sendError(ws: ServerWebSocket<WSClientData>, message: string) {
  const response: ServerMessage = { type: "error", message };
  ws.send(JSON.stringify(response));
}

/**
 * 外部からセッションにメッセージを送信
 *
 * AI応答を送信する場合などに使用。
 */
export function emitToSession(
  sessionId: string,
  type: MessageType,
  content: string,
  metadata?: Record<string, unknown>
): Message | null {
  const session = getSession(sessionId);
  if (!session) {
    console.warn(`[WebSocket] Session not found: ${sessionId}`);
    return null;
  }

  // メッセージを保存
  const message = createMessage({
    sessionId,
    type,
    content,
    metadata,
  });

  // ブロードキャスト
  broadcastToSession(sessionId, { type: "new-message", message });

  return message;
}

/**
 * 接続中のクライアント数を取得
 */
export function getClientCount(): number {
  return allClients.size;
}

/**
 * セッションごとのクライアント数を取得
 */
export function getSessionClientCount(sessionId: string): number {
  return sessionClients.get(sessionId)?.size ?? 0;
}

/**
 * 全クライアントにブロードキャスト
 *
 * Edge作成/削除イベントなど、全ユーザーに通知が必要な場合に使用
 */
export function broadcastToAll(message: ServerMessage): void {
  const json = JSON.stringify(message);
  for (const client of allClients) {
    try {
      client.send(json);
    } catch (error) {
      console.error("[WebSocket] Failed to send to client:", error);
    }
  }
}

/**
 * Edge作成イベントを全クライアントにブロードキャスト
 */
export function emitEdgeCreated(edge: {
  edgeId: string;
  sourceSessionId: string;
  targetClaudeSessionId: string;
  createdAt: Date;
}): void {
  const event: EdgeEvent = {
    edgeId: edge.edgeId,
    sourceSessionId: edge.sourceSessionId,
    targetClaudeSessionId: edge.targetClaudeSessionId,
    createdAt: edge.createdAt.toISOString(),
  };
  broadcastToAll({ type: "edge_created", edge: event });
  console.log(
    `[WebSocket] Edge created: ${edge.sourceSessionId} -> ${edge.targetClaudeSessionId}`
  );
}

/**
 * Edge削除イベントを全クライアントにブロードキャスト
 *
 * @param edgeId - 削除されたEdgeのID
 * @param remainingContext - 残りのセッションのpending context（/clear通知用）
 */
export function emitEdgeDeleted(
  edgeId: string,
  remainingContext?: string
): void {
  broadcastToAll({ type: "edge_deleted", edgeId, remainingContext });
  console.log(`[WebSocket] Edge deleted: ${edgeId}`);
}

/**
 * トークン更新イベントを全クライアントにブロードキャスト
 *
 * @param sessionId - セッションID（cnthub形式）
 * @param inputTokens - 入力トークン数
 * @param outputTokens - 出力トークン数
 */
export function emitTokensUpdated(
  sessionId: string,
  inputTokens: number,
  outputTokens: number
): void {
  broadcastToAll({
    type: "tokens_updated",
    tokens: { sessionId, inputTokens, outputTokens },
  });
}
