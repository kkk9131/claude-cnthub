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
  | { type: "error"; message: string };

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
  // セッション存在確認
  const session = getSession(sessionId);
  if (!session) {
    sendError(ws, `Session not found: ${sessionId}`);
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
  // セッション存在確認
  const session = getSession(sessionId);
  if (!session) {
    sendError(ws, `Session not found: ${sessionId}`);
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
