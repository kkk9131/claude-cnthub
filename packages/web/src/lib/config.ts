/**
 * アプリケーション設定
 *
 * 環境変数から設定を読み込む。
 */

/** API ベース URL */
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001";

/** WebSocket URL */
export const WS_URL =
  import.meta.env.VITE_WS_URL ||
  API_BASE_URL.replace(/^http/, "ws");
