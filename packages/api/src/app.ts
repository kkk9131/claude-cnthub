/**
 * Hono アプリケーション（テスト用エクスポート）
 *
 * index.ts からインポートされる共通のアプリケーションインスタンス
 */

import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "hono/bun";

import { errorHandler, notFoundHandler } from "./middleware/error-handler";
import { logger } from "./middleware/logger";
import { sessionsRouter } from "./routes/sessions";
import { memoryRouter } from "./routes/memory";
import searchRouter from "./routes/search";
import { hooksRouter } from "./routes/hooks";
import { mergesRouter } from "./routes/merges";
import { memoriesRouter, legacyMemoriesRouter } from "./routes/memories";
import { projectsRouter } from "./routes/projects";
import { injectRouter } from "./routes/inject";

// Viewer UI の静的ファイルパスを解決
const VIEWER_UI_PATH = resolve(join(__dirname, "../../../plugin/ui"));

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

  // Hook API（プラグインからのイベント受信）
  newApp.route("/hook", hooksRouter);

  // Merges API（セッションマージ）
  newApp.route("/api/merges", mergesRouter);

  // Memories API（シンプルなメモリ管理）
  newApp.route("/api/memories", memoriesRouter);

  // Legacy Memories API（後方互換性のため維持）
  newApp.route("/memories", legacyMemoriesRouter);

  // Projects API（プロジェクト管理）
  newApp.route("/api/projects", projectsRouter);

  // Inject API（pending コンテキスト管理）
  newApp.route("/api/inject", injectRouter);

  // Viewer UI 静的配信 (R-10)
  // /viewer/* で plugin/ui/ の静的ファイルを配信
  if (existsSync(VIEWER_UI_PATH)) {
    // アセットファイル配信 (/viewer/assets/*)
    newApp.use(
      "/viewer/assets/*",
      serveStatic({
        root: VIEWER_UI_PATH,
        rewriteRequestPath: (path) => path.replace(/^\/viewer/, ""),
      })
    );

    // index.html へのフォールバック（SPA対応）
    newApp.get("/viewer", (c) => {
      return c.redirect("/viewer/");
    });

    newApp.get("/viewer/*", async (c) => {
      const indexPath = join(VIEWER_UI_PATH, "index.html");
      // パストラバーサル対策: VIEWER_UI_PATH 配下であることを確認
      const normalizedPath = resolve(indexPath);
      if (!normalizedPath.startsWith(resolve(VIEWER_UI_PATH))) {
        return c.notFound();
      }

      if (existsSync(normalizedPath)) {
        const file = Bun.file(normalizedPath);
        return new Response(file, {
          headers: { "Content-Type": "text/html" },
        });
      }
      return c.notFound();
    });
  }

  // 404 ハンドラ
  newApp.notFound(notFoundHandler);

  return newApp;
}

// デフォルトのアプリケーションインスタンス
export const app = createApp();
