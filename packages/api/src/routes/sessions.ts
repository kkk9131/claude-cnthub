/**
 * セッション API ルート
 *
 * セッションのCRUD操作を提供。
 *
 * エンドポイント:
 * - POST   /sessions              - セッション作成
 * - GET    /sessions              - セッション一覧
 * - POST   /sessions/bulk-delete  - セッション一括削除 (CLN-01)
 * - GET    /sessions/:id          - セッション詳細
 * - PATCH  /sessions/:id          - セッション更新
 * - DELETE /sessions/:id          - セッション削除
 * - POST   /sessions/:id/generate-name - セッション名生成 (API-02)
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  CreateSessionSchema,
  UpdateSessionSchema,
  ListSessionsSchema,
  GenerateSessionNameSchema,
  BulkDeleteSessionsSchema,
  ForkSessionSchema,
} from "../schemas";
import {
  createSession,
  getSessionById,
  listSessions,
  updateSession,
  deleteSession,
  listSessionIndex,
  getSessionSummary,
  getSessionByClaudeId,
  forkSession,
  listForks,
  updateSessionWorktreePath,
} from "../repositories/session";
import { findProjectByWorkingDir } from "../services/project-linking";
import { getSessionsTokenCounts } from "../repositories/observation";
import { generateNameFromMessage } from "../services/session-naming";
import { createWorktree } from "../services/git-worktree";
import { messagesRouter } from "./messages";
import { observationsRouter } from "./observations";

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
 *
 * projectId が指定されていない場合、workingDir からプロジェクトを自動判定する。
 * 判定ロジック:
 * - workingDir が既存プロジェクトの path に一致 → そのプロジェクトに紐付け
 * - workingDir が既存プロジェクトの path のサブディレクトリ → そのプロジェクトに紐付け
 * - マッチなし → プロジェクト紐付けなし（null）
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

    // projectId が明示的に指定されていない場合、workingDir から自動判定
    let resolvedProjectId = data.projectId;
    if (!resolvedProjectId && data.workingDir) {
      const matchedProject = findProjectByWorkingDir(data.workingDir);
      resolvedProjectId = matchedProject?.projectId ?? undefined;
    }

    const session = createSession({
      name: data.name,
      workingDir: data.workingDir,
      task: data.task,
      workItemId: data.workItemId,
      projectId: resolvedProjectId,
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

    // トークン数を一括取得して付与
    const sessionIds = result.items.map((s) => s.sessionId);
    const tokenCounts = getSessionsTokenCounts(sessionIds);

    const itemsWithTokens = result.items.map((session) => ({
      ...session,
      tokenCount: tokenCounts.get(session.sessionId) || 0,
    }));

    return c.json({
      ...result,
      items: itemsWithTokens,
    });
  }
);

/**
 * POST /sessions/bulk-delete - セッション一括削除 (CLN-01)
 *
 * テスト用セッションなど不要なセッションを一括で論理削除する。
 * 最大100件まで一度に削除可能。
 */
sessionsRouter.post(
  "/bulk-delete",
  zValidator("json", BulkDeleteSessionsSchema, (result, c) => {
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
    const { sessionIds } = c.req.valid("json");

    const results: { id: string; deleted: boolean }[] = [];
    let successCount = 0;
    let failCount = 0;

    for (const id of sessionIds) {
      const deleted = deleteSession(id);
      results.push({ id, deleted });
      if (deleted) {
        successCount++;
      } else {
        failCount++;
      }
    }

    return c.json({
      success: true,
      totalRequested: sessionIds.length,
      successCount,
      failCount,
      results,
    });
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
 * POST /sessions/:id/generate-name - セッション名生成 (API-02)
 *
 * 初回メッセージから AI でセッション名を生成する。
 * グレースフルデグラデーション: AI失敗時はメッセージの先頭50文字をフォールバック。
 */
sessionsRouter.post(
  "/:id/generate-name",
  zValidator("json", GenerateSessionNameSchema, (result, c) => {
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

    // セッション存在確認（cnthub ID または Claude UUID で検索）
    let session = getSessionById(id);
    if (!session) {
      // Claude UUID で再検索
      session = getSessionByClaudeId(id);
    }
    if (!session) {
      return c.json({ error: "Session not found", sessionId: id }, 404);
    }

    // AI でセッション名を生成
    const name = await generateNameFromMessage(data.message);

    return c.json({ name, sessionId: session.sessionId });
  }
);

/**
 * POST /sessions/:id/fork - セッション分岐
 *
 * 指定されたセッションを分岐し、新しいセッションを作成する。
 * 元のセッションは変更されない。
 */
sessionsRouter.post(
  "/:id/fork",
  zValidator("json", ForkSessionSchema, (result, c) => {
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

    try {
      // セッションを分岐
      const result = forkSession(id, {
        name: data.name,
        createWorktree: data.createWorktree,
        forkPoint: data.forkPoint,
      });

      // worktree作成が要求された場合
      if (data.createWorktree) {
        const worktreeResult = await createWorktree(
          result.parentSession.workingDir,
          result.forkedSession.sessionId
        );

        if (worktreeResult.success && worktreeResult.worktreePath) {
          // worktreeパスをセッションに保存
          const updatedSession = updateSessionWorktreePath(
            result.forkedSession.sessionId,
            worktreeResult.worktreePath
          );

          if (updatedSession) {
            return c.json(
              {
                ...result,
                forkedSession: updatedSession,
                worktreePath: worktreeResult.worktreePath,
                branchName: worktreeResult.branchName,
              },
              201
            );
          }
        } else {
          // worktree作成失敗（セッションは作成済み）
          return c.json(
            {
              ...result,
              worktreeError: worktreeResult.error,
            },
            201
          );
        }
      }

      return c.json(result, 201);
    } catch (error) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 404
      ) {
        return c.json({ error: "Session not found", sessionId: id }, 404);
      }
      throw error;
    }
  }
);

/**
 * GET /sessions/:id/forks - 分岐セッション一覧
 *
 * 指定されたセッションから分岐したセッション一覧を取得する。
 */
sessionsRouter.get("/:id/forks", async (c) => {
  const id = c.req.param("id");

  // セッションの存在確認
  const session = getSessionById(id);
  if (!session) {
    return c.json({ error: "Session not found", sessionId: id }, 404);
  }

  const forks = listForks(id);
  return c.json({ forks, parentSessionId: session.sessionId });
});

/**
 * Messages サブルート
 * /sessions/:sessionId/messages/*
 */
sessionsRouter.route("/:sessionId/messages", messagesRouter);

/**
 * Observations サブルート
 * /sessions/:sessionId/observations/*
 */
sessionsRouter.route("/:sessionId/observations", observationsRouter);

/**
 * Export エンドポイント（observationsRouter から直接アクセス可能にする）
 * /sessions/:sessionId/export
 */
sessionsRouter.route("/:sessionId", observationsRouter);

export { sessionsRouter };
