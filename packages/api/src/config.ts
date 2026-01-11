/**
 * アプリケーション設定
 *
 * 環境変数の一元管理と型安全な設定を提供。
 * 起動時にZodでバリデーションを実行。
 */

import { z } from "zod";

/**
 * 設定スキーマ
 *
 * 環境変数からの設定を型安全に取得。
 * デフォルト値は開発環境向けに設定。
 */
const configSchema = z.object({
  /** API サーバー設定 */
  api: z.object({
    port: z.coerce.number().default(3048),
    nodeEnv: z
      .enum(["development", "production", "test"])
      .default("development"),
  }),

  /** データベース設定 */
  database: z.object({
    path: z
      .string()
      .default(
        `${process.env.HOME || process.env.USERPROFILE || ""}/.claude-cnthub/data.db`
      ),
  }),

  /** WebSocket 設定 */
  websocket: z.object({
    allowedOrigins: z
      .string()
      .default(
        "http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173,http://127.0.0.1:3000"
      )
      .transform((s) => s.split(",")),
    maxPayloadSize: z.coerce.number().default(1024 * 1024), // 1MB
    maxMessageLength: z.coerce.number().default(100000), // 100KB
    rateLimitWindowMs: z.coerce.number().default(60000), // 1分
    maxMessagesPerWindow: z.coerce.number().default(100),
  }),

  /** ロギング設定 */
  logging: z.object({
    level: z.enum(["debug", "info", "warn", "error"]).default("info"),
    enabled: z.coerce.boolean().default(true),
  }),
});

export type Config = z.infer<typeof configSchema>;

/**
 * 環境変数から設定を読み込み
 */
export function loadConfig(): Config {
  return configSchema.parse({
    api: {
      port: process.env.API_PORT,
      nodeEnv: process.env.NODE_ENV,
    },
    database: {
      path: process.env.DATABASE_PATH,
    },
    websocket: {
      allowedOrigins: process.env.WS_ALLOWED_ORIGINS,
      maxPayloadSize: process.env.WS_MAX_PAYLOAD_SIZE,
      maxMessageLength: process.env.WS_MAX_MESSAGE_LENGTH,
      rateLimitWindowMs: process.env.WS_RATE_LIMIT_WINDOW_MS,
      maxMessagesPerWindow: process.env.WS_MAX_MESSAGES_PER_WINDOW,
    },
    logging: {
      level: process.env.LOG_LEVEL,
      enabled: process.env.LOG_ENABLED,
    },
  });
}

/**
 * グローバル設定インスタンス
 *
 * アプリケーション起動時に一度だけ読み込まれる。
 * 各モジュールからはこのインスタンスを参照する。
 */
export const config = loadConfig();
