/**
 * useWebSocket Hook
 *
 * WebSocket接続とセッション管理を提供するReact Hook。
 * sessionIdが変更されると自動的にセッションに参加/離脱。
 */

import { useEffect, useCallback } from "react";
import { useWebSocketStore } from "../stores/websocket";
import type { Message } from "@claude-cnthub/shared";
import type { ConnectionState } from "../lib/websocket";

// ==================== 型定義 ====================

interface UseWebSocketOptions {
  /** 自動接続を有効にするか（デフォルト: true） */
  autoConnect?: boolean;
  /** WebSocket URL（指定しない場合は環境変数から取得） */
  url?: string;
}

interface UseWebSocketReturn {
  /** 接続状態 */
  connectionState: ConnectionState;

  /** 接続中かどうか */
  isConnected: boolean;

  /** 接続中（connecting）かどうか */
  isConnecting: boolean;

  /** 現在のセッションID */
  currentSessionId: string | null;

  /** セッション内のメッセージ */
  messages: Message[];

  /** 他ユーザーがタイピング中かどうか */
  isOtherTyping: boolean;

  /** 最後のエラーメッセージ */
  error: string | null;

  /** メッセージを送信 */
  sendMessage: (content: string) => void;

  /** タイピング状態を設定 */
  setTyping: (isTyping: boolean) => void;

  /** 手動で接続 */
  connect: () => void;

  /** 手動で切断 */
  disconnect: () => void;

  /** エラーをクリア */
  clearError: () => void;
}

// ==================== Hook ====================

/**
 * WebSocket接続を管理するHook
 *
 * @param sessionId - 参加するセッションID（変更時に自動で参加/離脱）
 * @param options - 接続オプション
 * @returns WebSocket操作関数と状態
 *
 * @example
 * ```tsx
 * function ChatRoom({ sessionId }: { sessionId: string }) {
 *   const {
 *     messages,
 *     sendMessage,
 *     isConnected,
 *     isOtherTyping,
 *   } = useWebSocket(sessionId);
 *
 *   return (
 *     <div>
 *       {messages.map(msg => <Message key={msg.messageId} {...msg} />)}
 *       {isOtherTyping && <TypingIndicator />}
 *       <MessageInput onSend={sendMessage} disabled={!isConnected} />
 *     </div>
 *   );
 * }
 * ```
 */
export function useWebSocket(
  sessionId?: string,
  options: UseWebSocketOptions = {}
): UseWebSocketReturn {
  const { autoConnect = true, url } = options;

  // Zustand storeから状態とアクションを取得
  const connectionState = useWebSocketStore((s) => s.connectionState);
  const currentSessionId = useWebSocketStore((s) => s.currentSessionId);
  const messages = useWebSocketStore((s) => s.messages);
  const typingSessionId = useWebSocketStore((s) => s.typingSessionId);
  const lastError = useWebSocketStore((s) => s.lastError);

  const storeConnect = useWebSocketStore((s) => s.connect);
  const storeDisconnect = useWebSocketStore((s) => s.disconnect);
  const joinSession = useWebSocketStore((s) => s.joinSession);
  const leaveSession = useWebSocketStore((s) => s.leaveSession);
  const storeSendMessage = useWebSocketStore((s) => s.sendMessage);
  const storeSetTyping = useWebSocketStore((s) => s.setTyping);
  const clearError = useWebSocketStore((s) => s.clearError);

  // 派生状態
  const isConnected = connectionState === "connected";
  const isConnecting = connectionState === "connecting";
  const isOtherTyping = typingSessionId !== null;

  // 自動接続
  useEffect(() => {
    if (autoConnect && connectionState === "disconnected") {
      storeConnect(url);
    }
  }, [autoConnect, connectionState, storeConnect, url]);

  // sessionId変更時の自動参加/離脱
  useEffect(() => {
    if (!sessionId) {
      return;
    }

    // 新しいセッションに参加
    if (sessionId !== currentSessionId) {
      joinSession(sessionId);
    }

    // クリーンアップ: コンポーネントアンマウント時に離脱
    return () => {
      // キャプチャしたsessionIdを使って離脱
      // storeの最新状態を取得して比較
      const storeState = useWebSocketStore.getState();
      if (storeState.currentSessionId === sessionId) {
        leaveSession();
      }
    };
  }, [sessionId, currentSessionId, joinSession, leaveSession]);

  // メッセージ送信（メモ化）
  const sendMessage = useCallback(
    (content: string) => {
      storeSendMessage(content);
    },
    [storeSendMessage]
  );

  // タイピング状態設定（メモ化）
  const setTyping = useCallback(
    (isTyping: boolean) => {
      storeSetTyping(isTyping);
    },
    [storeSetTyping]
  );

  // 接続（メモ化）
  const connect = useCallback(() => {
    storeConnect(url);
  }, [storeConnect, url]);

  // 切断（メモ化）
  const disconnect = useCallback(() => {
    storeDisconnect();
  }, [storeDisconnect]);

  return {
    connectionState,
    isConnected,
    isConnecting,
    currentSessionId,
    messages,
    isOtherTyping,
    error: lastError,
    sendMessage,
    setTyping,
    connect,
    disconnect,
    clearError,
  };
}
