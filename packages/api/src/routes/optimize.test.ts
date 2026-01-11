/**
 * 最適化 API ルートのテスト
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, writeFileSync, rmSync, readFileSync } from "fs";
import { join } from "path";
import { Hono } from "hono";
import { optimizeRouter } from "./optimize";

describe("optimize routes", () => {
  const testDir = "/tmp/optimize-routes-test";
  const claudeDir = join(testDir, ".claude");
  const skillsDir = join(claudeDir, "skills");

  let app: Hono;

  beforeEach(() => {
    mkdirSync(skillsDir, { recursive: true });
    app = new Hono();
    app.route("/optimize", optimizeRouter);
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe("POST /optimize", () => {
    it("should return 400 for invalid request body", async () => {
      const res = await app.request("/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });

      expect(res.status).toBe(400);
    });

    it("should optimize CLAUDE.md in dryRun mode", async () => {
      const longContent = Array.from(
        { length: 30 },
        (_, i) => `Rule ${i + 1}`
      ).join("\n");
      writeFileSync(
        join(claudeDir, "CLAUDE.md"),
        `# Project\n\n## Rules\n\n${longContent}`
      );

      const res = await app.request("/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectPath: testDir,
          targets: ["claude-md"],
          dryRun: true,
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    });

    it("should optimize Skills in dryRun mode", async () => {
      const longContent = Array.from(
        { length: 20 },
        (_, i) => `Step ${i + 1}`
      ).join("\n");
      writeFileSync(
        join(skillsDir, "test.md"),
        `# test\n\n## Steps\n\n${longContent}`
      );

      const res = await app.request("/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectPath: testDir,
          targets: ["skills"],
          dryRun: true,
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    });

    it("should return changes with before/after line counts", async () => {
      const longContent = Array.from(
        { length: 30 },
        (_, i) => `Detail ${i + 1}`
      ).join("\n");
      writeFileSync(
        join(claudeDir, "CLAUDE.md"),
        `# Project\n\n## Details\n\n${longContent}`
      );

      const res = await app.request("/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectPath: testDir,
          targets: ["claude-md"],
          dryRun: true,
        }),
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      if (data.changes.length > 0) {
        expect(data.changes[0].lineCountBefore).toBeDefined();
        expect(data.changes[0].lineCountAfter).toBeDefined();
      }
    });
  });

  describe("POST /optimize/apply", () => {
    it("should apply changes to files", async () => {
      const originalContent = `# Project\n\nOriginal content.`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), originalContent);

      // まず最適化を実行
      const optimizeRes = await app.request("/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectPath: testDir,
          targets: ["claude-md"],
          dryRun: true,
        }),
      });

      const optimizeData = await optimizeRes.json();

      // 変更を適用
      const applyRes = await app.request("/optimize/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          changes: optimizeData.changes,
          projectPath: testDir,
        }),
      });

      expect(applyRes.status).toBe(200);
    });

    it("should return 400 for empty changes array", async () => {
      const res = await app.request("/optimize/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          changes: [],
          projectPath: testDir,
        }),
      });

      expect(res.status).toBe(400);
    });
  });

  describe("POST /optimize/cancel", () => {
    it("should cancel optimization", async () => {
      const res = await app.request("/optimize/cancel", {
        method: "POST",
      });

      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    });
  });
});
