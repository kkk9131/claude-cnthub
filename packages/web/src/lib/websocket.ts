/**
 * WebSocket クライアント
 *
 * サーバーとのリアルタイム通信を管理。
 * 自動再接続、セッション管理、メッセージ送受信を提供。
 */

import type { Message } from "@claude-cnthub/shared";

// ==================== 型定義 ====================

/**
 * クライアント → サーバー メッセージ型
 */
type ClientMessage =
  | { type: "join"; sessionId: string }
  | { type: "leave"; sessionId: string }
  | { type: "message"; sessionId: string; content: string }
  | { type: "typing"; sessionId: string; isTyping: boolean };

/**
 * Edge イベント型
 */
export interface EdgeEvent {
  edgeId: string;
  sourceSessionId: string;
  targetClaudeSessionId: string;
  createdAt: string;
}

/**
 * トークン更新イベント型
 */
export interface TokensUpdatedEvent {
  sessionId: string;
  inputTokens: number;
  outputTokens: number;
}

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
 * 接続状態
 */
export type ConnectionState = "disconnected" | "connecting" | "connected";

// ==================== 定数 ====================

/** WebSocketクローズコード */
const WS_CLOSE_CODES = {
  NORMAL: 1000,
} as const;

// ==================== 型ガード ====================

/**
 * ServerMessageの型ガード
 * 不正なメッセージを安全に検出
 */
function isServerMessage(data: unknown): data is ServerMessage {
  if (typeof data !== "object" || data === null) return false;

  const msg = data as Record<string, unknown>;
  if (typeof msg.type !== "string") return false;

  switch (msg.type) {
    case "joined":
      return typeof msg.sessionId === "string" && Array.isArray(msg.messages);
    case "left":
      return typeof msg.sessionId === "string";
    case "new-message":
      return typeof msg.message === "object" && msg.message !== null;
    case "typing":
      return (
        typeof msg.sessionId === "string" && typeof msg.isTyping === "boolean"
      );
    case "error":
      return typeof msg.message === "string";
    case "edge_created":
      return typeof msg.edge === "object" && msg.edge !== null;
    case "edge_deleted":
      return typeof msg.edgeId === "string";
    case "tokens_updated":
      return typeof msg.tokens === "object" && msg.tokens !== null;
    default:
      return false;
  }
}

/**
 * WebSocketクライアント設定
 */
export interface WebSocketClientConfig {
  /** 再接続の最大試行回数 */
  maxReconnectAttempts?: number;
  /** 再接続の基本遅延（ミリ秒） */
  reconnectBaseDelay?: number;
  /** 再接続の最大遅延（ミリ秒） */
  reconnectMaxDelay?: number;
}

// ==================== デフォルト設定 ====================

const DEFAULT_CONFIG: Required<WebSocketClientConfig> = {
  maxReconnectAttempts: 5,
  reconnectBaseDelay: 1000,
  reconnectMaxDelay: 30000,
};

// ==================== WebSocketClient クラス ====================

/**
 * WebSocket接続管理クラス
 *
 * サーバーとのWebSocket接続を管理し、
 * セッションへの参加/離脱、メッセージ送受信を提供。
 */
export class WebSocketClient {
  private ws: WebSocket | null = null;
  private url: string = "";
  private config: Required<WebSocketClientConfig>;
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private currentSessionId: string | null = null;
  private connectionState: ConnectionState = "disconnected";

  // ==================== イベントコールバック ====================

  /** セッション参加成功時 */
  onJoined: ((sessionId: string, messages: Message[]) => void) | null = null;

  /** セッション離脱時 */
  onLeft: ((sessionId: string) => void) | null = null;

  /** 新規メッセージ受信時 */
  onMessage: ((message: Message) => void) | null = null;

  /** タイピング状態変更時 */
  onTyping: ((sessionId: string, isTyping: boolean) => void) | null = null;

  /** エラー発生時 */
  onError: ((error: string) => void) | null = null;

  /** 接続状態変更時 */
  onConnectionChange: ((state: ConnectionState) => void) | null = null;

  /** Edge作成時 */
  onEdgeCreated: ((edge: EdgeEvent) => void) | null = null;

  /** Edge削除時 */
  onEdgeDeleted: ((edgeId: string, remainingContext?: string) => void) | null =
    null;

  /** トークン更新時 */
  onTokensUpdated: ((tokens: TokensUpdatedEvent) => void) | null = null;

  // ==================== コンストラクタ ====================

  constructor(config: WebSocketClientConfig = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  // ==================== 接続管理 ====================

  /**
   * WebSocket接続を開始
   */
  connect(url: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      console.warn("[WebSocket] Already connected");
      return;
    }

    this.url = url;
    this.setConnectionState("connecting");
    this.createConnection();
  }

  /**
   * WebSocket接続を切断
   */
  disconnect(): void {
    this.clearReconnectTimer();
    this.reconnectAttempts = 0;

    if (this.ws) {
      this.ws.close(1000, "Client disconnect");
      this.ws = null;
    }

    this.currentSessionId = null;
    this.setConnectionState("disconnected");
  }

  /**
   * 現在の接続状態を取得
   */
  getConnectionState(): ConnectionState {
    return this.connectionState;
  }

  /**
   * 現在のセッションIDを取得
   */
  getCurrentSessionId(): string | null {
    return this.currentSessionId;
  }

  // ==================== セッション操作 ====================

  /**
   * セッションに参加
   */
  joinSession(sessionId: string): void {
    if (!this.isConnected()) {
      console.error("[WebSocket] Not connected");
      this.onError?.("Not connected to server");
      return;
    }

    // 別のセッションに参加中なら離脱
    if (this.currentSessionId && this.currentSessionId !== sessionId) {
      this.leaveSession(this.currentSessionId);
    }

    this.send({ type: "join", sessionId });
    this.currentSessionId = sessionId;
  }

  /**
   * セッションから離脱
   */
  leaveSession(sessionId: string): void {
    if (!this.isConnected()) {
      return;
    }

    this.send({ type: "leave", sessionId });

    if (this.currentSessionId === sessionId) {
      this.currentSessionId = null;
    }
  }

  // ==================== メッセージ送信 ====================

  /**
   * メッセージを送信
   */
  sendMessage(sessionId: string, content: string): void {
    if (!this.isConnected()) {
      console.error("[WebSocket] Not connected");
      this.onError?.("Not connected to server");
      return;
    }

    this.send({ type: "message", sessionId, content });
  }

  /**
   * タイピング状態を送信
   */
  sendTyping(sessionId: string, isTyping: boolean): void {
    if (!this.isConnected()) {
      return;
    }

    this.send({ type: "typing", sessionId, isTyping });
  }

  // ==================== プライベートメソッド ====================

  private createConnection(): void {
    try {
      this.ws = new WebSocket(this.url);

      this.ws.onopen = () => {
        console.log("[WebSocket] Connected");
        this.reconnectAttempts = 0;
        this.setConnectionState("connected");

        // 前のセッションに再参加
        if (this.currentSessionId) {
          this.send({ type: "join", sessionId: this.currentSessionId });
        }
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(event.data);
      };

      this.ws.onclose = (event) => {
        console.log(`[WebSocket] Closed: ${event.code} ${event.reason}`);
        this.ws = null;
        this.setConnectionState("disconnected");

        // 正常終了でなければ再接続を試みる
        if (event.code !== WS_CLOSE_CODES.NORMAL) {
          this.scheduleReconnect();
        }
      };

      this.ws.onerror = (event) => {
        const errorMsg =
          event instanceof ErrorEvent
            ? event.message
            : "Unknown connection error";

        console.error("[WebSocket] Error:", {
          type: event.type,
          message: errorMsg,
          url: this.url,
          readyState: this.ws?.readyState,
        });

        this.onError?.(errorMsg);
      };
    } catch (error) {
      console.error("[WebSocket] Failed to create connection:", error);
      this.setConnectionState("disconnected");
      this.scheduleReconnect();
    }
  }

  private handleMessage(data: string): void {
    try {
      const parsed = JSON.parse(data);

      // 型ガードで検証
      if (!isServerMessage(parsed)) {
        console.error("[WebSocket] Invalid message format:", parsed);
        this.onError?.("Invalid message from server");
        return;
      }

      const message = parsed;

      switch (message.type) {
        case "joined":
          this.onJoined?.(message.sessionId, message.messages);
          break;
        case "left":
          this.onLeft?.(message.sessionId);
          break;
        case "new-message":
          this.onMessage?.(message.message);
          break;
        case "typing":
          this.onTyping?.(message.sessionId, message.isTyping);
          break;
        case "error":
          this.onError?.(message.message);
          break;
        case "edge_created":
          this.onEdgeCreated?.(message.edge);
          break;
        case "edge_deleted":
          this.onEdgeDeleted?.(message.edgeId, message.remainingContext);
          break;
        case "tokens_updated":
          this.onTokensUpdated?.(message.tokens);
          break;
      }
    } catch (error) {
      console.error("[WebSocket] Failed to parse message:", error);
      this.onError?.("Failed to parse server message");
    }
  }

  private send(message: ClientMessage): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  private isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }

  private setConnectionState(state: ConnectionState): void {
    if (this.connectionState !== state) {
      this.connectionState = state;
      this.onConnectionChange?.(state);
    }
  }

  private scheduleReconnect(): void {
    if (this.reconnectAttempts >= this.config.maxReconnectAttempts) {
      console.log("[WebSocket] Max reconnect attempts reached");
      this.onError?.("Failed to reconnect after maximum attempts");
      return;
    }

    // Exponential backoff
    const delay = Math.min(
      this.config.reconnectBaseDelay * Math.pow(2, this.reconnectAttempts),
      this.config.reconnectMaxDelay
    );

    console.log(
      `[WebSocket] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts + 1})`
    );

    this.reconnectTimer = setTimeout(() => {
      this.reconnectAttempts++;
      this.setConnectionState("connecting");
      this.createConnection();
    }, delay);
  }

  private clearReconnectTimer(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }
}

// ==================== シングルトンインスタンス ====================

/** デフォルトのWebSocketクライアントインスタンス */
export const wsClient = new WebSocketClient();
