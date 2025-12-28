/**
 * ロギングミドルウェア
 *
 * リクエスト/レスポンスのログを出力
 */

import type { MiddlewareHandler } from "hono";

/**
 * ログレベル
 */
type LogLevel = "debug" | "info" | "warn" | "error";

/**
 * ログ出力設定
 */
interface LoggerOptions {
  /** 有効化フラグ */
  enabled?: boolean;
  /** 最小ログレベル */
  level?: LogLevel;
  /** タイムスタンプ形式 */
  timestamp?: boolean;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

/**
 * ステータスコードに応じた色付け（端末用）
 */
function colorStatus(status: number): string {
  if (status >= 500) return `\x1b[31m${status}\x1b[0m`; // 赤
  if (status >= 400) return `\x1b[33m${status}\x1b[0m`; // 黄
  if (status >= 300) return `\x1b[36m${status}\x1b[0m`; // シアン
  return `\x1b[32m${status}\x1b[0m`; // 緑
}

/**
 * メソッドに応じた色付け
 */
function colorMethod(method: string): string {
  const colors: Record<string, string> = {
    GET: "\x1b[32m", // 緑
    POST: "\x1b[34m", // 青
    PUT: "\x1b[33m", // 黄
    PATCH: "\x1b[33m", // 黄
    DELETE: "\x1b[31m", // 赤
  };
  const color = colors[method] || "\x1b[0m";
  return `${color}${method}\x1b[0m`;
}

/**
 * ロギングミドルウェア
 */
export function logger(options: LoggerOptions = {}): MiddlewareHandler {
  const { enabled = true, level = "info", timestamp = true } = options;

  const minLevel = LOG_LEVELS[level];

  return async (c, next) => {
    if (!enabled || LOG_LEVELS.info < minLevel) {
      await next();
      return;
    }

    const start = Date.now();
    const method = c.req.method;
    const path = c.req.path;

    await next();

    const duration = Date.now() - start;
    const status = c.res.status;

    const time = timestamp ? `[${new Date().toISOString()}] ` : "";
    const methodColored = colorMethod(method);
    const statusColored = colorStatus(status);

    console.log(
      `${time}${methodColored} ${path} ${statusColored} ${duration}ms`
    );
  };
}

/**
 * シンプルなコンソールロガー
 */
export const log = {
  debug: (message: string, data?: unknown) => {
    if (process.env.LOG_LEVEL === "debug") {
      console.log(`[DEBUG] ${message}`, data ?? "");
    }
  },
  info: (message: string, data?: unknown) => {
    console.log(`[INFO] ${message}`, data ?? "");
  },
  warn: (message: string, data?: unknown) => {
    console.warn(`[WARN] ${message}`, data ?? "");
  },
  error: (message: string, error?: unknown) => {
    console.error(`[ERROR] ${message}`, error ?? "");
  },
};
