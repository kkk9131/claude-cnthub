/**
 * WebSocket Store
 *
 * WebSocket接続状態とメッセージをZustandで管理。
 * コンポーネント間で共有可能なリアルタイム通信状態を提供。
 */

import { create } from "zustand";
import type { Message } from "@claude-cnthub/shared";
import {
  wsClient,
  type ConnectionState,
  type EdgeEvent,
} from "../lib/websocket";

// ==================== 型定義 ====================

interface WebSocketState {
  /** 接続状態 */
  connectionState: ConnectionState;

  /** 現在参加中のセッションID */
  currentSessionId: string | null;

  /** セッション内のメッセージ */
  messages: Message[];

  /** タイピング中のセッションID（他ユーザー） */
  typingSessionId: string | null;

  /** 最後のエラーメッセージ */
  lastError: string | null;

  /** 最後に作成されたEdge（NodeEditorで購読） */
  lastEdgeCreated: EdgeEvent | null;

  /** 最後に削除されたEdge情報 */
  lastEdgeDeleted: { edgeId: string; remainingContext?: string } | null;
}

interface WebSocketActions {
  /** WebSocket接続を開始 */
  connect: (url?: string) => void;

  /** WebSocket接続を切断 */
  disconnect: () => void;

  /** セッションに参加 */
  joinSession: (sessionId: string) => void;

  /** セッションから離脱 */
  leaveSession: () => void;

  /** メッセージを送信 */
  sendMessage: (content: string) => void;

  /** タイピング状態を送信 */
  setTyping: (isTyping: boolean) => void;

  /** エラーをクリア */
  clearError: () => void;

  /** Edgeイベントをクリア */
  clearEdgeEvents: () => void;

  /** ストアをリセット */
  reset: () => void;
}

type WebSocketStore = WebSocketState & WebSocketActions;

// ==================== 初期状態 ====================

const initialState: WebSocketState = {
  connectionState: "disconnected",
  currentSessionId: null,
  messages: [],
  typingSessionId: null,
  lastError: null,
  lastEdgeCreated: null,
  lastEdgeDeleted: null,
};

// ==================== 定数 ====================

const LIMITS = {
  MAX_MESSAGES: 1000, // メモリ対策: 古いメッセージを削除
  CONNECTION_TIMEOUT_MS: 5000, // 接続タイムアウト
  CONNECTION_CHECK_INTERVAL_MS: 100,
} as const;

// ==================== デフォルトURL ====================

const getDefaultWsUrl = (): string => {
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = import.meta.env.VITE_API_HOST || "localhost:3001";
  return `${protocol}//${host}`;
};

// ==================== 接続待機タイマー管理 ====================

let connectionCheckTimer: ReturnType<typeof setTimeout> | null = null;

function clearConnectionCheckTimer(): void {
  if (connectionCheckTimer) {
    clearTimeout(connectionCheckTimer);
    connectionCheckTimer = null;
  }
}

// ==================== ストア作成 ====================

export const useWebSocketStore = create<WebSocketStore>((set, get) => {
  // WebSocketクライアントのコールバックを設定
  wsClient.onConnectionChange = (state) => {
    set({ connectionState: state });
  };

  wsClient.onJoined = (sessionId, messages) => {
    set({
      currentSessionId: sessionId,
      messages,
      lastError: null,
    });
  };

  wsClient.onLeft = () => {
    set({
      currentSessionId: null,
      messages: [],
      typingSessionId: null,
    });
  };

  wsClient.onMessage = (message) => {
    set((state) => {
      const newMessages = [...state.messages, message];
      // メモリ対策: 古いメッセージを削除
      if (newMessages.length > LIMITS.MAX_MESSAGES) {
        return { messages: newMessages.slice(-LIMITS.MAX_MESSAGES) };
      }
      return { messages: newMessages };
    });
  };

  wsClient.onTyping = (sessionId, isTyping) => {
    set({
      typingSessionId: isTyping ? sessionId : null,
    });
  };

  wsClient.onError = (error) => {
    set({ lastError: error });
  };

  wsClient.onEdgeCreated = (edge) => {
    set({ lastEdgeCreated: edge });
  };

  wsClient.onEdgeDeleted = (edgeId, remainingContext) => {
    set({ lastEdgeDeleted: { edgeId, remainingContext } });
  };

  return {
    ...initialState,

    connect: (url?: string) => {
      const wsUrl = url || getDefaultWsUrl();
      wsClient.connect(wsUrl);
    },

    disconnect: () => {
      clearConnectionCheckTimer();
      wsClient.disconnect();
      set(initialState);
    },

    joinSession: (sessionId: string) => {
      const { connectionState } = get();

      // 既存のタイマーをクリア
      clearConnectionCheckTimer();

      if (connectionState !== "connected") {
        // 未接続なら接続してから参加
        const wsUrl = getDefaultWsUrl();
        wsClient.connect(wsUrl);

        // 接続完了後に参加（タイムアウト付き）
        let attempts = 0;
        const maxAttempts = Math.floor(
          LIMITS.CONNECTION_TIMEOUT_MS / LIMITS.CONNECTION_CHECK_INTERVAL_MS
        );

        const checkAndJoin = () => {
          if (wsClient.getConnectionState() === "connected") {
            wsClient.joinSession(sessionId);
            connectionCheckTimer = null;
          } else if (attempts < maxAttempts) {
            attempts++;
            connectionCheckTimer = setTimeout(
              checkAndJoin,
              LIMITS.CONNECTION_CHECK_INTERVAL_MS
            );
          } else {
            // タイムアウト
            console.error("[WebSocketStore] Connection timeout");
            set({ lastError: "Connection timeout" });
            connectionCheckTimer = null;
          }
        };
        connectionCheckTimer = setTimeout(
          checkAndJoin,
          LIMITS.CONNECTION_CHECK_INTERVAL_MS
        );
      } else {
        wsClient.joinSession(sessionId);
      }
    },

    leaveSession: () => {
      const { currentSessionId } = get();
      if (currentSessionId) {
        wsClient.leaveSession(currentSessionId);
      }
      set({
        currentSessionId: null,
        messages: [],
        typingSessionId: null,
      });
    },

    sendMessage: (content: string) => {
      const { currentSessionId, connectionState } = get();

      if (connectionState !== "connected") {
        set({ lastError: "Not connected to server" });
        return;
      }

      if (!currentSessionId) {
        set({ lastError: "Not in a session" });
        return;
      }

      wsClient.sendMessage(currentSessionId, content);
    },

    setTyping: (isTyping: boolean) => {
      const { currentSessionId, connectionState } = get();

      if (connectionState !== "connected" || !currentSessionId) {
        return;
      }

      wsClient.sendTyping(currentSessionId, isTyping);
    },

    clearError: () => {
      set({ lastError: null });
    },

    clearEdgeEvents: () => {
      set({ lastEdgeCreated: null, lastEdgeDeleted: null });
    },

    reset: () => {
      clearConnectionCheckTimer();
      wsClient.disconnect();
      set(initialState);
    },
  };
});
