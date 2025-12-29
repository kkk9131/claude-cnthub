/**
 * Hono アプリケーション（テスト用エクスポート）
 *
 * index.ts からインポートされる共通のアプリケーションインスタンス
 */

import { Hono } from "hono";
import { cors } from "hono/cors";

import { errorHandler, notFoundHandler } from "./middleware/error-handler";
import { logger } from "./middleware/logger";
import { sessionsRouter } from "./routes/sessions";
import { memoryRouter } from "./routes/memory";
import searchRouter from "./routes/search";

/**
 * アプリケーションを作成（テスト用にファクトリ関数として提供）
 */
export function createApp(): Hono {
  const newApp = new Hono();

  // CORSを有効化（ローカル開発用）
  newApp.use(
    "*",
    cors({
      origin: ["http://localhost:5173", "http://localhost:3000"],
      credentials: true,
    })
  );

  // ロギング（テスト時は無効化可能）
  if (process.env.NODE_ENV !== "test") {
    newApp.use("*", logger({ enabled: true, timestamp: true }));
  }

  // エラーハンドリング
  newApp.use("*", errorHandler());

  // ヘルスチェック
  newApp.get("/health", (c) => {
    return c.json({
      status: "ok",
      timestamp: new Date().toISOString(),
    });
  });

  // Sessions API（Messages APIを含む）
  newApp.route("/api/sessions", sessionsRouter);

  // Memory API
  newApp.route("/api/memory", memoryRouter);

  // Search API（セマンティック検索）
  newApp.route("/api/search", searchRouter);

  // 404 ハンドラ
  newApp.notFound(notFoundHandler);

  return newApp;
}

// デフォルトのアプリケーションインスタンス
export const app = createApp();
