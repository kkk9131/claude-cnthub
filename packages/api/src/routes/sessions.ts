/**
 * セッション API ルート
 *
 * セッションのCRUD操作を提供。
 *
 * エンドポイント:
 * - POST   /sessions     - セッション作成
 * - GET    /sessions     - セッション一覧
 * - GET    /sessions/:id - セッション詳細
 * - PATCH  /sessions/:id - セッション更新
 * - DELETE /sessions/:id - セッション削除
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  CreateSessionSchema,
  UpdateSessionSchema,
  ListSessionsSchema,
} from "../schemas";
import {
  createSession,
  getSessionById,
  listSessions,
  updateSession,
  deleteSession,
  listSessionIndex,
  getSessionSummary,
} from "../repositories/session";
import { messagesRouter } from "./messages";

const sessionsRouter = new Hono();

/**
 * GET /sessions/index - セッションインデックス一覧（Level 0）
 *
 * 軽量なインデックス情報のみを返す。
 * 詳細情報はオンデマンドで取得。
 */
sessionsRouter.get(
  "/index",
  zValidator("query", ListSessionsSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Validation Error",
          details: result.error.flatten().fieldErrors,
        },
        400
      );
    }
  }),
  async (c) => {
    const query = c.req.valid("query");

    const result = listSessionIndex({
      page: query.page,
      limit: query.limit,
      status: query.status,
      projectId: query.projectId,
      workItemId: query.workItemId,
    });

    return c.json(result);
  }
);

/**
 * POST /sessions - セッション作成
 */
sessionsRouter.post(
  "/",
  zValidator("json", CreateSessionSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Validation Error",
          details: result.error.flatten().fieldErrors,
        },
        400
      );
    }
  }),
  async (c) => {
    const data = c.req.valid("json");

    const session = createSession({
      name: data.name,
      workingDir: data.workingDir,
      task: data.task,
      workItemId: data.workItemId,
      projectId: data.projectId,
      continueChat: data.continueChat,
      dangerouslySkipPermissions: data.dangerouslySkipPermissions,
    });

    return c.json(session, 201);
  }
);

/**
 * GET /sessions - セッション一覧
 */
sessionsRouter.get(
  "/",
  zValidator("query", ListSessionsSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Validation Error",
          details: result.error.flatten().fieldErrors,
        },
        400
      );
    }
  }),
  async (c) => {
    const query = c.req.valid("query");

    const result = listSessions({
      page: query.page,
      limit: query.limit,
      status: query.status,
      projectId: query.projectId,
      workItemId: query.workItemId,
      includeDeleted: query.includeDeleted,
    });

    return c.json(result);
  }
);

/**
 * GET /sessions/:id - セッション詳細
 */
sessionsRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const session = getSessionById(id);

  if (!session) {
    return c.json({ error: "Session not found", sessionId: id }, 404);
  }

  return c.json(session);
});

/**
 * PATCH /sessions/:id - セッション更新
 */
sessionsRouter.patch(
  "/:id",
  zValidator("json", UpdateSessionSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: "Validation Error",
          details: result.error.flatten().fieldErrors,
        },
        400
      );
    }
  }),
  async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");

    // 存在確認
    const existing = getSessionById(id);
    if (!existing) {
      return c.json({ error: "Session not found", sessionId: id }, 404);
    }

    const updated = updateSession(id, data);
    return c.json(updated);
  }
);

/**
 * DELETE /sessions/:id - セッション削除（論理削除）
 */
sessionsRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const deleted = deleteSession(id);

  if (!deleted) {
    return c.json({ error: "Session not found", sessionId: id }, 404);
  }

  // 204 No Content
  return c.body(null, 204);
});

/**
 * GET /sessions/:id/summary - セッション要約詳細（Level 1）
 *
 * 拡張された要約情報を返す。
 * changes, errors, decisions を含む。
 */
sessionsRouter.get("/:id/summary", async (c) => {
  const id = c.req.param("id");

  // セッションの存在確認
  const session = getSessionById(id);
  if (!session) {
    return c.json({ error: "Session not found", sessionId: id }, 404);
  }

  // 要約取得
  const summary = getSessionSummary(id);
  if (!summary) {
    return c.json({ error: "Summary not found", sessionId: id }, 404);
  }

  return c.json(summary);
});

/**
 * Messages サブルート
 * /sessions/:sessionId/messages/*
 */
sessionsRouter.route("/:sessionId/messages", messagesRouter);

export { sessionsRouter };
