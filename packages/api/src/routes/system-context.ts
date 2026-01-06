/**
 * System Context API ルート
 *
 * Claude Code の System Context（Skills, Hooks, MCP Servers, Rules）を取得するAPI
 *
 * エンドポイント:
 * - GET /system-context          - 全体取得
 * - GET /system-context/skills   - Skills 一覧
 * - GET /system-context/hooks    - Hooks 一覧
 * - GET /system-context/mcp      - MCP Servers 一覧
 * - GET /system-context/rules    - Rules 一覧
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { SystemContextQuerySchema } from "../schemas";
import {
  getSystemContext,
  getSkills,
  getHooks,
  getMcpServers,
  getRules,
} from "../services/system-context";

const systemContextRouter = new Hono();

/**
 * GET /system-context - System Context 全体取得
 */
systemContextRouter.get(
  "/",
  zValidator("query", SystemContextQuerySchema, (result, c) => {
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
    const context = await getSystemContext({
      projectPath: query.projectPath,
      source: query.source,
    });
    return c.json(context);
  }
);

/**
 * GET /system-context/skills - Skills 一覧
 */
systemContextRouter.get(
  "/skills",
  zValidator("query", SystemContextQuerySchema, (result, c) => {
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
    const skills = await getSkills({
      projectPath: query.projectPath,
      source: query.source,
    });
    return c.json({ skills });
  }
);

/**
 * GET /system-context/hooks - Hooks 一覧
 */
systemContextRouter.get(
  "/hooks",
  zValidator("query", SystemContextQuerySchema, (result, c) => {
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
    const hooks = await getHooks({
      projectPath: query.projectPath,
      source: query.source,
    });
    return c.json({ hooks });
  }
);

/**
 * GET /system-context/mcp - MCP Servers 一覧
 */
systemContextRouter.get(
  "/mcp",
  zValidator("query", SystemContextQuerySchema, (result, c) => {
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
    const mcpServers = await getMcpServers({
      projectPath: query.projectPath,
      source: query.source,
    });
    return c.json({ mcpServers });
  }
);

/**
 * GET /system-context/rules - Rules 一覧
 */
systemContextRouter.get(
  "/rules",
  zValidator("query", SystemContextQuerySchema, (result, c) => {
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
    const rules = await getRules({
      projectPath: query.projectPath,
      source: query.source,
    });
    return c.json({ rules });
  }
);

export { systemContextRouter };
