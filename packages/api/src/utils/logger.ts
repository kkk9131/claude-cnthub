/**
 * 統一ロギングユーティリティ
 *
 * 全APIルートで一貫したログ出力形式を提供。
 * 本番環境ではJSON形式、開発環境では読みやすい形式で出力。
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  [key: string]: unknown;
}

interface Logger {
  debug: (message: string, context?: LogContext) => void;
  info: (message: string, context?: LogContext) => void;
  warn: (message: string, context?: LogContext) => void;
  error: (
    message: string,
    error?: Error | unknown,
    context?: LogContext
  ) => void;
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || "info";

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[currentLevel];
}

function formatTimestamp(): string {
  return new Date().toISOString();
}

function formatMessage(
  level: LogLevel,
  prefix: string,
  message: string,
  context?: LogContext
): string {
  const timestamp = formatTimestamp();
  const contextStr = context ? ` ${JSON.stringify(context)}` : "";
  return `[${timestamp}] [${level.toUpperCase()}] [${prefix}] ${message}${contextStr}`;
}

function formatError(error: Error | unknown): string {
  if (error instanceof Error) {
    return `${error.message}${error.stack ? `\n${error.stack}` : ""}`;
  }
  return String(error);
}

/**
 * プレフィックス付きロガーを作成
 * @param prefix - ログメッセージのプレフィックス（例: "Hook", "Session"）
 */
export function createLogger(prefix: string): Logger {
  return {
    debug: (message: string, context?: LogContext) => {
      if (shouldLog("debug")) {
        console.error(formatMessage("debug", prefix, message, context));
      }
    },

    info: (message: string, context?: LogContext) => {
      if (shouldLog("info")) {
        console.error(formatMessage("info", prefix, message, context));
      }
    },

    warn: (message: string, context?: LogContext) => {
      if (shouldLog("warn")) {
        console.error(formatMessage("warn", prefix, message, context));
      }
    },

    error: (message: string, error?: Error | unknown, context?: LogContext) => {
      if (shouldLog("error")) {
        const errorStr = error ? `: ${formatError(error)}` : "";
        console.error(
          formatMessage("error", prefix, message + errorStr, context)
        );
      }
    },
  };
}

// デフォルトロガー（汎用）
export const logger = createLogger("API");

// 特定用途のロガー
export const hookLogger = createLogger("Hook");
export const sessionLogger = createLogger("Session");
