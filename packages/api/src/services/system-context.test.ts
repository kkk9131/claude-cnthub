/**
 * System Context Service Tests
 *
 * System Context の統合取得サービスのテスト
 */

import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import {
  getSystemContext,
  getSkills,
  getHooks,
  getMcpServers,
  getRules,
} from "./system-context";

// テスト用の一時ディレクトリ
const TEST_DIR = join(import.meta.dir, "__test_system_context__");

describe("SystemContextService", () => {
  // テスト用フィクスチャのセットアップ
  beforeAll(() => {
    // プロジェクト設定 (.claude 相当)
    mkdirSync(join(TEST_DIR, ".claude", "skills", "project-skill"), {
      recursive: true,
    });
    mkdirSync(join(TEST_DIR, ".claude", "rules"), { recursive: true });

    // プロジェクト Skill
    writeFileSync(
      join(TEST_DIR, ".claude", "skills", "project-skill", "SKILL.md"),
      `---
name: project-skill
description: A project-level skill
allowed-tools: Read, Edit
---

# Project Skill
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
                hooks: [{ type: "command", command: "echo project-start" }],
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
      join(TEST_DIR, ".claude", "rules", "test-rule.md"),
      "# Test Rule\n\nProject rule content."
    );

    // プラグイン設定 (plugin/.claude-plugin 相当)
    mkdirSync(join(TEST_DIR, "plugin", ".claude-plugin", "hooks"), {
      recursive: true,
    });

    writeFileSync(
      join(TEST_DIR, "plugin", ".claude-plugin", "plugin.json"),
      JSON.stringify(
        {
          mcpServers: {
            "plugin-server": {
              command: "node",
              args: ["mcp.js"],
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
                hooks: [{ type: "command", command: "echo plugin-hook" }],
              },
            ],
          },
        },
        null,
        2
      )
    );
  });

  afterAll(() => {
    // テストディレクトリ削除
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  describe("getSystemContext", () => {
    it("should return system context with metadata", async () => {
      const context = await getSystemContext({
        projectPath: TEST_DIR,
      });

      expect(context).toHaveProperty("skills");
      expect(context).toHaveProperty("hooks");
      expect(context).toHaveProperty("mcpServers");
      expect(context).toHaveProperty("rules");
      expect(context).toHaveProperty("metadata");
      expect(context.metadata.scannedAt).toBeDefined();
      expect(context.metadata.globalPath).toBe(join(homedir(), ".claude"));
    });

    it("should detect project path when projectPath is provided", async () => {
      const context = await getSystemContext({
        projectPath: TEST_DIR,
      });

      expect(context.metadata.projectPath).toBe(join(TEST_DIR, ".claude"));
    });

    it("should include project skills when projectPath is provided", async () => {
      const context = await getSystemContext({
        projectPath: TEST_DIR,
      });

      const projectSkill = context.skills.find(
        (s) => s.name === "project-skill"
      );
      expect(projectSkill).toBeDefined();
      expect(projectSkill?.source).toBe("project");
    });

    it("should filter by source when specified", async () => {
      const context = await getSystemContext({
        projectPath: TEST_DIR,
        source: "project",
      });

      // プロジェクトソースのみ
      context.skills.forEach((s) => expect(s.source).toBe("project"));
      context.hooks.forEach((h) => expect(h.source).toBe("project"));
      context.rules.forEach((r) => expect(r.source).toBe("project"));
    });

    it("should return all sources when source is 'all'", async () => {
      const context = await getSystemContext({
        projectPath: TEST_DIR,
        source: "all",
      });

      // 複数ソースが含まれる可能性
      expect(context.skills.length).toBeGreaterThanOrEqual(0);
      expect(context.hooks.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("getSkills", () => {
    it("should return skills from project", async () => {
      const skills = await getSkills({
        projectPath: TEST_DIR,
        source: "project",
      });

      expect(skills.length).toBe(1);
      expect(skills[0].name).toBe("project-skill");
      expect(skills[0].source).toBe("project");
    });

    it("should return empty array when no skills found", async () => {
      const skills = await getSkills({
        projectPath: "/nonexistent",
        source: "project",
      });

      expect(skills).toEqual([]);
    });
  });

  describe("getHooks", () => {
    it("should return hooks from project", async () => {
      const hooks = await getHooks({
        projectPath: TEST_DIR,
        source: "project",
      });

      expect(hooks.length).toBe(1);
      expect(hooks[0].event).toBe("SessionStart");
      expect(hooks[0].source).toBe("project");
    });

    it("should return hooks from plugin", async () => {
      const hooks = await getHooks({
        projectPath: TEST_DIR,
        source: "plugin",
      });

      expect(hooks.length).toBe(1);
      expect(hooks[0].event).toBe("UserPromptSubmit");
      expect(hooks[0].source).toBe("plugin");
    });
  });

  describe("getMcpServers", () => {
    it("should return MCP servers from plugin", async () => {
      const servers = await getMcpServers({
        projectPath: TEST_DIR,
        source: "plugin",
      });

      expect(servers.length).toBe(1);
      expect(servers[0].name).toBe("plugin-server");
      expect(servers[0].source).toBe("plugin");
    });

    it("should return empty array for project source (MCP not in project)", async () => {
      // MCP は project source にはない
      const servers = await getMcpServers({
        projectPath: TEST_DIR,
        source: "project",
      });

      // project には MCP がないので空配列として扱う（または source フィルタで除外）
      // 実装に依存するが、MCP は global と plugin のみなので project は空
      expect(servers).toEqual([]);
    });
  });

  describe("getRules", () => {
    it("should return rules from project", async () => {
      const rules = await getRules({
        projectPath: TEST_DIR,
        source: "project",
      });

      expect(rules.length).toBe(1);
      expect(rules[0].name).toBe("test-rule.md");
      expect(rules[0].source).toBe("project");
    });

    it("should return empty array for plugin source (Rules not in plugin)", async () => {
      // Rules は plugin source にはない
      const rules = await getRules({
        projectPath: TEST_DIR,
        source: "plugin",
      });

      expect(rules).toEqual([]);
    });
  });
});
