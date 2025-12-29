/**
 * レート制限ミドルウェア
 *
 * 指定した時間枠内でのリクエスト数を制限する。
 * ローカル専用アプリだが、AI API呼び出しの過剰使用を防ぐ。
 *
 * 実装: インメモリのスライディングウィンドウ方式
 */

import type { MiddlewareHandler } from "hono";

/**
 * レート制限オプション
 */
export interface RateLimitOptions {
  /** 時間枠（ミリ秒）- デフォルト: 60000 (1分) */
  windowMs?: number;
  /** 時間枠内の最大リクエスト数 - デフォルト: 30 */
  maxRequests?: number;
  /** 制限時のメッセージ */
  message?: string;
}

/** リクエスト履歴（クライアントIP → タイムスタンプ配列） */
const requestHistory = new Map<string, number[]>();

/** クリーンアップ間隔（5分） */
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;

// 定期的に古いエントリをクリーンアップ
let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function startCleanup(windowMs: number) {
  if (cleanupTimer) return;

  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, timestamps] of requestHistory.entries()) {
      const validTimestamps = timestamps.filter((t) => now - t < windowMs);
      if (validTimestamps.length === 0) {
        requestHistory.delete(key);
      } else {
        requestHistory.set(key, validTimestamps);
      }
    }
  }, CLEANUP_INTERVAL_MS);
}

/**
 * レート制限ミドルウェアを作成
 *
 * @param options - レート制限オプション
 * @returns Hono ミドルウェア
 */
export function rateLimit(options: RateLimitOptions = {}): MiddlewareHandler {
  const {
    windowMs = 60000,
    maxRequests = 30,
    message = "Too many requests, please try again later",
  } = options;

  startCleanup(windowMs);

  return async (c, next) => {
    // クライアント識別子（ローカルなのでIPで十分）
    const clientId =
      c.req.header("x-forwarded-for") ||
      c.req.header("x-real-ip") ||
      "localhost";

    const now = Date.now();
    const timestamps = requestHistory.get(clientId) || [];

    // 時間枠内のリクエストのみ保持
    const validTimestamps = timestamps.filter((t) => now - t < windowMs);

    if (validTimestamps.length >= maxRequests) {
      // レート制限超過
      const oldestRequest = Math.min(...validTimestamps);
      const retryAfter = Math.ceil((oldestRequest + windowMs - now) / 1000);

      c.header("Retry-After", String(retryAfter));
      c.header("X-RateLimit-Limit", String(maxRequests));
      c.header("X-RateLimit-Remaining", "0");
      c.header(
        "X-RateLimit-Reset",
        String(Math.ceil((oldestRequest + windowMs) / 1000))
      );

      return c.json(
        {
          error: "Rate limit exceeded",
          message,
          retryAfter,
        },
        429
      );
    }

    // リクエストを記録
    validTimestamps.push(now);
    requestHistory.set(clientId, validTimestamps);

    // レート制限ヘッダーを設定
    c.header("X-RateLimit-Limit", String(maxRequests));
    c.header(
      "X-RateLimit-Remaining",
      String(maxRequests - validTimestamps.length)
    );

    await next();
  };
}

/**
 * テスト用: リクエスト履歴をクリア
 * @internal
 */
export function _clearRateLimitHistory(): void {
  requestHistory.clear();
}
