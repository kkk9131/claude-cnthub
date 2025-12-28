/**
 * Hono アプリケーション（テスト用エクスポート）
 *
 * index.ts からインポートされる共通のアプリケーションインスタンス
 */

import { Hono } from "hono";
import { cors } from "hono/cors";

import { errorHandler, notFoundHandler } from "./middleware/error-handler";
import { logger } from "./middleware/logger";

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

  // Sessions API (TODO: 実装)
  newApp.get("/api/sessions", (c) => {
    return c.json({ message: "Sessions list - not implemented yet" });
  });

  newApp.post("/api/sessions", (c) => {
    return c.json({ message: "Create session - not implemented yet" }, 201);
  });

  newApp.get("/api/sessions/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ message: `Get session ${id} - not implemented yet` });
  });

  newApp.patch("/api/sessions/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ message: `Update session ${id} - not implemented yet` });
  });

  newApp.delete("/api/sessions/:id", (c) => {
    const id = c.req.param("id");
    return c.json({ message: `Delete session ${id} - not implemented yet` });
  });

  // Messages API (TODO: 実装)
  newApp.post("/api/sessions/:id/messages", (c) => {
    const id = c.req.param("id");
    return c.json(
      { message: `Send message to ${id} - not implemented yet` },
      202
    );
  });

  newApp.get("/api/sessions/:id/messages", (c) => {
    const id = c.req.param("id");
    return c.json({
      message: `Get messages for ${id} - not implemented yet`,
    });
  });

  // Memory API (TODO: 実装)
  newApp.post("/api/memory/sessions/:id/summarize", (c) => {
    const id = c.req.param("id");
    return c.json({
      message: `Summarize session ${id} - not implemented yet`,
    });
  });

  newApp.get("/api/memory/sessions/:id/summary", (c) => {
    const id = c.req.param("id");
    return c.json({
      message: `Get summary for ${id} - not implemented yet`,
    });
  });

  newApp.get("/api/memory/search", (c) => {
    const q = c.req.query("q");
    return c.json({ message: `Search '${q}' - not implemented yet` });
  });

  // 404 ハンドラ
  newApp.notFound(notFoundHandler);

  return newApp;
}

// デフォルトのアプリケーションインスタンス
export const app = createApp();
