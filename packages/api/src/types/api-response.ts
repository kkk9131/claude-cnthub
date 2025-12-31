/**
 * 統一 API レスポンス型定義
 *
 * 全エンドポイントで一貫したレスポンス形式を提供。
 */

/**
 * 成功レスポンス
 */
export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * エラーレスポンス
 */
export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: Record<string, string[] | undefined>;
}

/**
 * 警告付き成功レスポンス
 */
export interface ApiWarningResponse<T> {
  success: true;
  data: T;
  warning: string;
}

/**
 * 汎用レスポンス型
 */
export type ApiResponse<T> =
  | ApiSuccessResponse<T>
  | ApiErrorResponse
  | ApiWarningResponse<T>;

// ==================== Hook API レスポンス型 ====================

/**
 * セッション開始レスポンス
 */
export interface SessionStartResponse {
  id: string;
  action: "created" | "resumed";
}

/**
 * セッション停止レスポンス
 */
export interface SessionStopResponse {
  sessionId: string;
  summary: string | null;
  detailedSummary: string | null;
  warning?: string;
}

/**
 * セッション終了レスポンス
 */
export interface SessionEndResponse {
  sessionId: string;
  status: "completed" | "error";
}

// ==================== ヘルパー関数 ====================

/**
 * 成功レスポンスを作成
 */
export function createSuccessResponse<T>(data: T): ApiSuccessResponse<T> {
  return { success: true, data };
}

/**
 * エラーレスポンスを作成
 */
export function createErrorResponse(
  error: string,
  details?: Record<string, string[] | undefined>
): ApiErrorResponse {
  return { success: false, error, details };
}

/**
 * 警告付き成功レスポンスを作成
 */
export function createWarningResponse<T>(
  data: T,
  warning: string
): ApiWarningResponse<T> {
  return { success: true, data, warning };
}
