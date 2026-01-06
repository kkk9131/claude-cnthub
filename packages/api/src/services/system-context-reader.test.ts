/**
 * System Context Reader Tests
 *
 * Claude Code の設定ファイルを読み取るサービスのテスト
 */

import { describe, it, expect, beforeAll, afterAll } from "bun:test";
import { mkdirSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join } from "node:path";
import {
  parseSkillFrontMatter,
  readSkillsFromDir,
  readHooksFromSettings,
  readHooksFromHooksJson,
  readMcpServersFromJson,
  readRulesFromDir,
} from "./system-context-reader";

// テスト用の一時ディレクトリ
const TEST_DIR = join(import.meta.dir, "__test_fixtures__");

describe("SystemContextReader", () => {
  // テスト用フィクスチャのセットアップ
  beforeAll(() => {
    // テストディレクトリ作成
    mkdirSync(join(TEST_DIR, "skills", "test-skill"), { recursive: true });
    mkdirSync(join(TEST_DIR, "rules"), { recursive: true });

    // SKILL.md フィクスチャ
    writeFileSync(
      join(TEST_DIR, "skills", "test-skill", "SKILL.md"),
      `---
name: test-skill
description: A test skill for unit testing
allowed-tools: Read, Edit, Write
---

# Test Skill

This is a test skill.
`
    );

    // settings.json フィクスチャ（hooks 含む）
    writeFileSync(
      join(TEST_DIR, "settings.json"),
      JSON.stringify(
        {
          permissions: {
            allow: ["Read", "Glob"],
          },
          hooks: {
            SessionStart: [
              {
                hooks: [
                  {
                    type: "command",
                    command: "echo hello",
                    timeout: 5000,
                  },
                ],
              },
            ],
            PostToolUse: [
              {
                matcher: "Write|Edit",
                hooks: [
                  {
                    type: "command",
                    command: "node post-edit.js",
                  },
                ],
              },
            ],
          },
        },
        null,
        2
      )
    );

    // hooks.json フィクスチャ（プラグイン用）
    writeFileSync(
      join(TEST_DIR, "hooks.json"),
      JSON.stringify(
        {
          hooks: {
            UserPromptSubmit: [
              {
                hooks: [
                  {
                    type: "command",
                    command: "node prompt-hook.js",
                    timeout: 10000,
                  },
                ],
              },
            ],
          },
        },
        null,
        2
      )
    );

    // plugin.json フィクスチャ（MCP Servers）
    writeFileSync(
      join(TEST_DIR, "plugin.json"),
      JSON.stringify(
        {
          mcpServers: {
            "test-server": {
              command: "node",
              args: ["server.js"],
              env: {
                API_URL: "http://localhost:3000",
              },
            },
          },
        },
        null,
        2
      )
    );

    // mcp.json フィクスチャ（グローバル MCP）
    writeFileSync(
      join(TEST_DIR, "mcp.json"),
      JSON.stringify(
        {
          mcpServers: {
            "global-server": {
              command: "bun",
              args: ["run", "mcp.ts"],
            },
          },
        },
        null,
        2
      )
    );

    // rules/*.md フィクスチャ
    writeFileSync(
      join(TEST_DIR, "rules", "workflow.md"),
      `# Workflow Rules

## Overview

This is a test workflow rule.

## Details

More content here.
`
    );
  });

  afterAll(() => {
    // テストディレクトリ削除
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true, force: true });
    }
  });

  describe("parseSkillFrontMatter", () => {
    it("should parse valid front-matter from SKILL.md content", () => {
      const content = `---
name: my-skill
description: My awesome skill
allowed-tools: Read, Edit, Write
---

# Content
`;
      const result = parseSkillFrontMatter(content);

      expect(result.name).toBe("my-skill");
      expect(result.description).toBe("My awesome skill");
      expect(result.allowedTools).toEqual(["Read", "Edit", "Write"]);
    });

    it("should return empty values for content without front-matter", () => {
      const content = "# Just a heading\n\nSome content.";
      const result = parseSkillFrontMatter(content);

      expect(result.name).toBe("");
      expect(result.description).toBe("");
      expect(result.allowedTools).toEqual([]);
    });

    it("should handle allowed-tools with various formats", () => {
      const content = `---
name: test
description: test
allowed-tools: Read,Edit, Write, Glob
---
`;
      const result = parseSkillFrontMatter(content);

      expect(result.allowedTools).toEqual(["Read", "Edit", "Write", "Glob"]);
    });

    it("should handle missing allowed-tools field", () => {
      const content = `---
name: test
description: test description
---
`;
      const result = parseSkillFrontMatter(content);

      expect(result.name).toBe("test");
      expect(result.description).toBe("test description");
      expect(result.allowedTools).toEqual([]);
    });
  });

  describe("readSkillsFromDir", () => {
    it("should read skills from directory", async () => {
      const skills = await readSkillsFromDir(
        join(TEST_DIR, "skills"),
        "project"
      );

      expect(skills.length).toBe(1);
      expect(skills[0].name).toBe("test-skill");
      expect(skills[0].description).toBe("A test skill for unit testing");
      expect(skills[0].source).toBe("project");
      expect(skills[0].allowedTools).toEqual(["Read", "Edit", "Write"]);
    });

    it("should return empty array for non-existent directory", async () => {
      const skills = await readSkillsFromDir("/nonexistent/path", "project");

      expect(skills).toEqual([]);
    });

    it("should handle directory without SKILL.md files", async () => {
      mkdirSync(join(TEST_DIR, "empty-skills"), { recursive: true });
      const skills = await readSkillsFromDir(
        join(TEST_DIR, "empty-skills"),
        "project"
      );

      expect(skills).toEqual([]);
    });
  });

  describe("readHooksFromSettings", () => {
    it("should read hooks from settings.json", async () => {
      const hooks = await readHooksFromSettings(
        join(TEST_DIR, "settings.json"),
        "global"
      );

      expect(hooks.length).toBe(2);

      const sessionStartHook = hooks.find((h) => h.event === "SessionStart");
      expect(sessionStartHook).toBeDefined();
      expect(sessionStartHook?.command).toBe("echo hello");
      expect(sessionStartHook?.timeout).toBe(5000);
      expect(sessionStartHook?.source).toBe("global");

      const postToolUseHook = hooks.find((h) => h.event === "PostToolUse");
      expect(postToolUseHook).toBeDefined();
      expect(postToolUseHook?.matcher).toBe("Write|Edit");
      expect(postToolUseHook?.command).toBe("node post-edit.js");
    });

    it("should return empty array for non-existent file", async () => {
      const hooks = await readHooksFromSettings(
        "/nonexistent/settings.json",
        "global"
      );

      expect(hooks).toEqual([]);
    });

    it("should return empty array for settings without hooks", async () => {
      const noHooksPath = join(TEST_DIR, "no-hooks-settings.json");
      writeFileSync(noHooksPath, JSON.stringify({ permissions: {} }));

      const hooks = await readHooksFromSettings(noHooksPath, "global");

      expect(hooks).toEqual([]);
    });
  });

  describe("readHooksFromHooksJson", () => {
    it("should read hooks from hooks.json (plugin format)", async () => {
      const hooks = await readHooksFromHooksJson(
        join(TEST_DIR, "hooks.json"),
        "plugin"
      );

      expect(hooks.length).toBe(1);
      expect(hooks[0].event).toBe("UserPromptSubmit");
      expect(hooks[0].command).toBe("node prompt-hook.js");
      expect(hooks[0].timeout).toBe(10000);
      expect(hooks[0].source).toBe("plugin");
    });

    it("should return empty array for non-existent file", async () => {
      const hooks = await readHooksFromHooksJson(
        "/nonexistent/hooks.json",
        "plugin"
      );

      expect(hooks).toEqual([]);
    });
  });

  describe("readMcpServersFromJson", () => {
    it("should read MCP servers from plugin.json", async () => {
      const servers = await readMcpServersFromJson(
        join(TEST_DIR, "plugin.json"),
        "plugin"
      );

      expect(servers.length).toBe(1);
      expect(servers[0].name).toBe("test-server");
      expect(servers[0].command).toBe("node");
      expect(servers[0].args).toEqual(["server.js"]);
      expect(servers[0].env).toEqual({ API_URL: "http://localhost:3000" });
      expect(servers[0].source).toBe("plugin");
    });

    it("should read MCP servers from mcp.json", async () => {
      const servers = await readMcpServersFromJson(
        join(TEST_DIR, "mcp.json"),
        "global"
      );

      expect(servers.length).toBe(1);
      expect(servers[0].name).toBe("global-server");
      expect(servers[0].command).toBe("bun");
      expect(servers[0].args).toEqual(["run", "mcp.ts"]);
      expect(servers[0].source).toBe("global");
    });

    it("should return empty array for non-existent file", async () => {
      const servers = await readMcpServersFromJson(
        "/nonexistent/mcp.json",
        "global"
      );

      expect(servers).toEqual([]);
    });

    it("should return empty array for JSON without mcpServers", async () => {
      const noMcpPath = join(TEST_DIR, "no-mcp.json");
      writeFileSync(noMcpPath, JSON.stringify({ other: {} }));

      const servers = await readMcpServersFromJson(noMcpPath, "global");

      expect(servers).toEqual([]);
    });
  });

  describe("readRulesFromDir", () => {
    it("should read rules from directory", async () => {
      const rules = await readRulesFromDir(join(TEST_DIR, "rules"), "project");

      expect(rules.length).toBe(1);
      expect(rules[0].name).toBe("workflow.md");
      expect(rules[0].source).toBe("project");
      expect(rules[0].content).toContain("# Workflow Rules");
    });

    it("should return empty array for non-existent directory", async () => {
      const rules = await readRulesFromDir("/nonexistent/rules", "project");

      expect(rules).toEqual([]);
    });

    it("should limit content length for large files", async () => {
      const longContent = "# Long Rule\n\n" + "x".repeat(2000);
      writeFileSync(join(TEST_DIR, "rules", "long-rule.md"), longContent);

      const rules = await readRulesFromDir(join(TEST_DIR, "rules"), "project");
      const longRule = rules.find((r) => r.name === "long-rule.md");

      expect(longRule).toBeDefined();
      // コンテンツは1000文字程度に制限される
      expect(longRule!.content.length).toBeLessThanOrEqual(1100);
    });
  });
});
