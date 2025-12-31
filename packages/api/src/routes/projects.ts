/**
 * プロジェクト API ルート
 *
 * プロジェクトのCRUD操作を提供。
 *
 * エンドポイント:
 * - GET    /projects     - プロジェクト一覧
 * - GET    /projects/:id - プロジェクト詳細
 * - POST   /projects     - プロジェクト作成
 * - PUT    /projects/:id - プロジェクト更新
 * - DELETE /projects/:id - プロジェクト削除
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
  PaginationSchema,
} from "../schemas";
import {
  createProject,
  getProjectById,
  listProjects,
  updateProject,
  deleteProject,
} from "../repositories/project";
import type { ProjectListResponse } from "@claude-cnthub/shared";

const projectsRouter = new Hono();

/**
 * GET /projects - プロジェクト一覧
 */
projectsRouter.get(
  "/",
  zValidator("query", PaginationSchema, (result, c) => {
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

    const result = listProjects({
      page: query.page,
      limit: query.limit,
    });

    // ProjectListResponse形式に変換
    const response: ProjectListResponse = {
      projects: result.items,
      pagination: result.pagination,
    };

    return c.json(response);
  }
);

/**
 * POST /projects - プロジェクト作成
 */
projectsRouter.post(
  "/",
  zValidator("json", CreateProjectSchema, (result, c) => {
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

    try {
      const project = createProject({
        name: data.name,
        path: data.path,
        description: data.description,
      });

      return c.json(project, 201);
    } catch (error) {
      // 重複エラーの処理
      if (
        error instanceof Error &&
        error.message === "Project with this path already exists"
      ) {
        return c.json({ error: "Project with this path already exists" }, 409);
      }
      throw error;
    }
  }
);

/**
 * GET /projects/:id - プロジェクト詳細
 */
projectsRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const project = getProjectById(id);

  if (!project) {
    return c.json({ error: "Project not found", projectId: id }, 404);
  }

  return c.json(project);
});

/**
 * PUT /projects/:id - プロジェクト更新
 */
projectsRouter.put(
  "/:id",
  zValidator("json", UpdateProjectSchema, (result, c) => {
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

    const updated = updateProject(id, data);

    if (!updated) {
      return c.json({ error: "Project not found", projectId: id }, 404);
    }

    return c.json(updated);
  }
);

/**
 * DELETE /projects/:id - プロジェクト削除
 */
projectsRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  const deleted = deleteProject(id);

  if (!deleted) {
    return c.json({ error: "Project not found", projectId: id }, 404);
  }

  // 204 No Content
  return c.body(null, 204);
});

export { projectsRouter };
