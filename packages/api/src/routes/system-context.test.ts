/**
 * System Context API テスト
 *
 * Claude Code の System Context を取得する API のテスト
 */

import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createApp } from "../app";

// テスト用の一時ディレクトリ
const TEST_DIR = join(import.meta.dir, "__test_api_system_context__");

// アプリインスタンス
let app: ReturnType<typeof createApp>;

// テスト用のHTTPリクエストヘルパー
async function request(
  method: string,
  path: string,
  body?: unknown
): Promise<Response & { json: () => Promise<unknown> }> {
  const init: RequestInit = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) {
    init.body = JSON.stringify(body);
  }
  return app.request(path, init);
}

describe("System Context API", () => {
  // テスト用フィクスチャのセットアップ
  beforeAll(async () => {
    // プロジェクト設定 (.claude 相当)
    mkdirSync(join(TEST_DIR, ".claude", "skills", "api-test-skill"), {
      recursive: true,
    });
    mkdirSync(join(TEST_DIR, ".claude", "rules"), { recursive: true });

    // プロジェクト Skill
    writeFileSync(
      join(TEST_DIR, ".claude", "skills", "api-test-skill", "SKILL.md"),
      `---
name: api-test-skill
description: A skill for API testing
allowed-tools: Read
---

# API Test Skill
`
    );

    // プロジェクト settings.json
    writeFileSync(
      join(TEST_DIR, ".claude", "settings.json"),
      JSON.stringify(
        {
          hooks: {
            SessionStart: [
              {
                hooks: [{ type: "command", command: "echo api-test" }],
              },
            ],
          },
        },
        null,
        2
      )
    );

    // プロジェクト rules
    writeFileSync(
      join(TEST_DIR, ".claude", "rules", "api-rule.md"),
      "# API Test Rule\n\nTest content."
    );

    // プラグイン設定
    mkdirSync(join(TEST_DIR, "plugin", ".claude-plugin", "hooks"), {
      recursive: true,
    });

    writeFileSync(
      join(TEST_DIR, "plugin", ".claude-plugin", "plugin.json"),
      JSON.stringify(
        {
          mcpServers: {
            "api-test-server": {
              command: "node",
              args: ["test.js"],
            },
          },
        },
        null,
        2
      )
    );

    writeFileSync(
      join(TEST_DIR, "plugin", ".claude-plugin", "hooks", "hooks.json"),
      JSON.stringify(
        {
          hooks: {
            UserPromptSubmit: [
              {
                hooks: [{ type: "command", command: "echo plugin" }],
              },
            ],
          },
        },
        null,
        2
      )
    );

    // インメモリDBを使用
    process.env.DATABASE_PATH = ":memory:";

    // マイグレーション実行
    const { runMigrations } = await import("../db");
    await runMigrations();

    app = createApp();
  });

  afterAll(async () => {
    // テストディレクトリ削除
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }

    // DB接続クローズ
    const { closeDatabase } = await import("../db");
    closeDatabase();
  });

  // ===== GET /api/system-context =====
  describe("GET /api/system-context", () => {
    it("should return system context with all components", async () => {
      const res = await request(
        "GET",
        `/api/system-context?projectPath=${encodeURIComponent(TEST_DIR)}`
      );
      const json = (await res.json()) as {
        skills: unknown[];
        hooks: unknown[];
        mcpServers: unknown[];
        rules: unknown[];
        metadata: { scannedAt: string };
      };

      expect(res.status).toBe(200);
      expect(json).toHaveProperty("skills");
      expect(json).toHaveProperty("hooks");
      expect(json).toHaveProperty("mcpServers");
      expect(json).toHaveProperty("rules");
      expect(json).toHaveProperty("metadata");
      expect(json.metadata.scannedAt).toBeDefined();
    });

    it("should filter by source=project", async () => {
      const res = await request(
        "GET",
        `/api/system-context?projectPath=${encodeURIComponent(TEST_DIR)}&source=project`
      );
      const json = (await res.json()) as {
        skills: Array<{ source: string }>;
        hooks: Array<{ source: string }>;
        rules: Array<{ source: string }>;
      };

      expect(res.status).toBe(200);

      // プロジェクトソースのみ
      json.skills.forEach((s) => expect(s.source).toBe("project"));
      json.hooks.forEach((h) => expect(h.source).toBe("project"));
      json.rules.forEach((r) => expect(r.source).toBe("project"));
    });

    it("should return 400 for invalid source value", async () => {
      const res = await request("GET", "/api/system-context?source=invalid");

      expect(res.status).toBe(400);
    });
  });

  // ===== GET /api/system-context/skills =====
  describe("GET /api/system-context/skills", () => {
    it("should return skills list", async () => {
      const res = await request(
        "GET",
        `/api/system-context/skills?projectPath=${encodeURIComponent(TEST_DIR)}&source=project`
      );
      const json = (await res.json()) as {
        skills: Array<{ name: string; source: string }>;
      };

      expect(res.status).toBe(200);
      expect(json).toHaveProperty("skills");
      expect(Array.isArray(json.skills)).toBe(true);

      const testSkill = json.skills.find((s) => s.name === "api-test-skill");
      expect(testSkill).toBeDefined();
      expect(testSkill?.source).toBe("project");
    });
  });

  // ===== GET /api/system-context/hooks =====
  describe("GET /api/system-context/hooks", () => {
    it("should return hooks list", async () => {
      const res = await request(
        "GET",
        `/api/system-context/hooks?projectPath=${encodeURIComponent(TEST_DIR)}&source=project`
      );
      const json = (await res.json()) as {
        hooks: Array<{ event: string; source: string }>;
      };

      expect(res.status).toBe(200);
      expect(json).toHaveProperty("hooks");
      expect(Array.isArray(json.hooks)).toBe(true);

      const sessionStartHook = json.hooks.find(
        (h) => h.event === "SessionStart"
      );
      expect(sessionStartHook).toBeDefined();
      expect(sessionStartHook?.source).toBe("project");
    });

    it("should return plugin hooks", async () => {
      const res = await request(
        "GET",
        `/api/system-context/hooks?projectPath=${encodeURIComponent(TEST_DIR)}&source=plugin`
      );
      const json = (await res.json()) as {
        hooks: Array<{ event: string; source: string }>;
      };

      expect(res.status).toBe(200);

      const pluginHook = json.hooks.find((h) => h.event === "UserPromptSubmit");
      expect(pluginHook).toBeDefined();
      expect(pluginHook?.source).toBe("plugin");
    });
  });

  // ===== GET /api/system-context/mcp =====
  describe("GET /api/system-context/mcp", () => {
    it("should return MCP servers list", async () => {
      const res = await request(
        "GET",
        `/api/system-context/mcp?projectPath=${encodeURIComponent(TEST_DIR)}&source=plugin`
      );
      const json = (await res.json()) as {
        mcpServers: Array<{ name: string; source: string }>;
      };

      expect(res.status).toBe(200);
      expect(json).toHaveProperty("mcpServers");
      expect(Array.isArray(json.mcpServers)).toBe(true);

      const testServer = json.mcpServers.find(
        (s) => s.name === "api-test-server"
      );
      expect(testServer).toBeDefined();
      expect(testServer?.source).toBe("plugin");
    });
  });

  // ===== GET /api/system-context/rules =====
  describe("GET /api/system-context/rules", () => {
    it("should return rules list", async () => {
      const res = await request(
        "GET",
        `/api/system-context/rules?projectPath=${encodeURIComponent(TEST_DIR)}&source=project`
      );
      const json = (await res.json()) as {
        rules: Array<{ name: string; source: string; content: string }>;
      };

      expect(res.status).toBe(200);
      expect(json).toHaveProperty("rules");
      expect(Array.isArray(json.rules)).toBe(true);

      const testRule = json.rules.find((r) => r.name === "api-rule.md");
      expect(testRule).toBeDefined();
      expect(testRule?.source).toBe("project");
      expect(testRule?.content).toContain("# API Test Rule");
    });
  });
});
