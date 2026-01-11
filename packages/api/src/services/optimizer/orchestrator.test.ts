/**
 * オーケストレーターのテスト
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, writeFileSync, rmSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { runOptimization } from "./orchestrator";
import type { OptimizeRequest, AgentProgress } from "./types";

describe("orchestrator", () => {
  const testDir = "/tmp/orchestrator-test";
  const claudeDir = join(testDir, ".claude");
  const skillsDir = join(claudeDir, "skills");

  beforeEach(() => {
    mkdirSync(skillsDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe("runOptimization", () => {
    it("should optimize CLAUDE.md successfully", async () => {
      const longContent = Array.from(
        { length: 30 },
        (_, i) => `Rule ${i + 1}: Do something`
      ).join("\n");
      const content = `# Project

## Overview

A short overview.

## Detailed Rules

${longContent}
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), content);

      const request: OptimizeRequest = {
        projectPath: testDir,
        targets: ["claude-md"],
        dryRun: true,
      };

      const result = await runOptimization(request);

      expect(result.success).toBe(true);
      expect(result.changes.length).toBeGreaterThan(0);
    });

    it("should optimize Skills successfully", async () => {
      const longContent = Array.from(
        { length: 25 },
        (_, i) => `Step ${i + 1}`
      ).join("\n");
      const content = `# my-skill

description: A skill
trigger: /my-skill

## Details

${longContent}
`;
      writeFileSync(join(skillsDir, "my-skill.md"), content);

      const request: OptimizeRequest = {
        projectPath: testDir,
        targets: ["skills"],
        dryRun: true,
      };

      const result = await runOptimization(request);

      expect(result.success).toBe(true);
    });

    it("should optimize both CLAUDE.md and Skills", async () => {
      const longRules = Array.from(
        { length: 25 },
        (_, i) => `Rule ${i + 1}`
      ).join("\n");
      writeFileSync(
        join(claudeDir, "CLAUDE.md"),
        `# Project\n\n## Rules\n\n${longRules}`
      );

      const longSkill = Array.from(
        { length: 20 },
        (_, i) => `Step ${i + 1}`
      ).join("\n");
      writeFileSync(
        join(skillsDir, "test.md"),
        `# test\n\n## Details\n\n${longSkill}`
      );

      const request: OptimizeRequest = {
        projectPath: testDir,
        targets: ["claude-md", "skills"],
        dryRun: true,
      };

      const result = await runOptimization(request);

      expect(result.success).toBe(true);
    });

    it("should report progress during optimization", async () => {
      writeFileSync(
        join(claudeDir, "CLAUDE.md"),
        "# Project\n\n## Overview\n\nShort content."
      );

      const progressUpdates: AgentProgress[][] = [];

      const request: OptimizeRequest = {
        projectPath: testDir,
        targets: ["claude-md"],
        dryRun: true,
      };

      await runOptimization(request, {
        onProgress: (progress) => {
          progressUpdates.push([...progress]);
        },
      });

      expect(progressUpdates.length).toBeGreaterThan(0);
    });

    it("should retry on evaluation failure up to max retries", async () => {
      // 極端に長いコンテンツ（リトライが必要になる）
      const veryLongContent = Array.from(
        { length: 200 },
        (_, i) => `Line ${i + 1}: Very detailed content here`
      ).join("\n");
      writeFileSync(join(claudeDir, "CLAUDE.md"), veryLongContent);

      const request: OptimizeRequest = {
        projectPath: testDir,
        targets: ["claude-md"],
        dryRun: true,
      };

      const result = await runOptimization(request, { maxRetries: 2 });

      // リトライしても失敗する場合があるが、retryCountが記録される
      expect(result.retryCount).toBeLessThanOrEqual(2);
    });

    it("should not modify files in dryRun mode", async () => {
      const originalContent = `# Project

## Rules

Some rules here.
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), originalContent);

      const request: OptimizeRequest = {
        projectPath: testDir,
        targets: ["claude-md"],
        dryRun: true,
      };

      await runOptimization(request);

      // 元のファイルが変更されていないことを確認
      const currentContent = readFileSync(
        join(claudeDir, "CLAUDE.md"),
        "utf-8"
      );
      expect(currentContent).toBe(originalContent);
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

      const request: OptimizeRequest = {
        projectPath: testDir,
        targets: ["claude-md"],
        dryRun: true,
      };

      const result = await runOptimization(request);

      if (result.changes.length > 0) {
        const change = result.changes[0];
        expect(change.lineCountBefore).toBeGreaterThan(0);
        expect(change.lineCountAfter).toBeGreaterThan(0);
      }
    });

    it("should handle empty targets gracefully", async () => {
      const request: OptimizeRequest = {
        projectPath: testDir,
        targets: [],
        dryRun: true,
      };

      const result = await runOptimization(request);

      expect(result.success).toBe(true);
      expect(result.changes.length).toBe(0);
    });

    it("should handle missing CLAUDE.md gracefully", async () => {
      const request: OptimizeRequest = {
        projectPath: testDir,
        targets: ["claude-md"],
        dryRun: true,
      };

      const result = await runOptimization(request);

      expect(result.success).toBe(true);
      expect(result.changes.length).toBe(0);
    });
  });
});
