/**
 * CLAUDE.md 参照エージェントのテスト
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { readClaudeMd, type ClaudeMdAnalysis } from "./claude-md-reader";

describe("claude-md-reader", () => {
  const testDir = "/tmp/claude-md-reader-test";
  const claudeDir = join(testDir, ".claude");

  beforeEach(() => {
    // テスト用ディレクトリを作成
    mkdirSync(claudeDir, { recursive: true });
  });

  afterEach(() => {
    // テスト用ディレクトリを削除
    rmSync(testDir, { recursive: true, force: true });
  });

  describe("readClaudeMd", () => {
    it("should return analysis with correct line count", async () => {
      const content = `# Project

## Description

This is a test project.

## Rules

- Rule 1
- Rule 2
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), content);

      const result = await readClaudeMd(testDir);

      expect(result.lineCount).toBe(11);
      expect(result.path).toBe(join(claudeDir, "CLAUDE.md"));
    });

    it("should extract sections from CLAUDE.md", async () => {
      const content = `# Project

## Description

Description content.

## Tech Stack

- Bun
- TypeScript

## Rules

Follow these rules.
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), content);

      const result = await readClaudeMd(testDir);

      expect(result.sections).toContain("Description");
      expect(result.sections).toContain("Tech Stack");
      expect(result.sections).toContain("Rules");
    });

    it("should detect existing reference links", async () => {
      const content = `# Project

## Rules

- Rule 1 → 詳細: rules/rule1.md
- Rule 2 → 詳細: references/rule2.md
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), content);

      const result = await readClaudeMd(testDir);

      expect(result.existingReferences).toContain("rules/rule1.md");
      expect(result.existingReferences).toContain("references/rule2.md");
    });

    it("should identify issues when line count exceeds 100", async () => {
      // 150行のコンテンツを生成
      const lines = Array.from({ length: 150 }, (_, i) => `Line ${i + 1}`);
      const content = lines.join("\n");
      writeFileSync(join(claudeDir, "CLAUDE.md"), content);

      const result = await readClaudeMd(testDir);

      expect(result.lineCount).toBe(150);
      expect(result.issues.length).toBeGreaterThan(0);
      expect(result.issues.some((i) => i.includes("100"))).toBe(true);
    });

    it("should suggest extraction candidates for long sections", async () => {
      // 長いセクションを含むコンテンツ
      const longSection = Array.from(
        { length: 30 },
        (_, i) => `Detail line ${i + 1}`
      ).join("\n");
      const content = `# Project

## Overview

Short overview.

## Detailed Rules

${longSection}
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), content);

      const result = await readClaudeMd(testDir);

      expect(result.extractionCandidates.length).toBeGreaterThan(0);
      const candidate = result.extractionCandidates[0];
      expect(candidate.type).toBe("rule");
      expect(candidate.targetPath).toContain("rules/");
    });

    it("should return empty analysis when CLAUDE.md does not exist", async () => {
      const result = await readClaudeMd(testDir);

      expect(result.lineCount).toBe(0);
      expect(result.sections).toEqual([]);
      expect(result.existingReferences).toEqual([]);
      expect(result.extractionCandidates).toEqual([]);
    });

    it("should handle reference: format in content", async () => {
      const content = `# Skill

description: A skill
reference: references/skill-detail.md
example: examples/skill-usage.md
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), content);

      const result = await readClaudeMd(testDir);

      expect(result.existingReferences).toContain("references/skill-detail.md");
      expect(result.existingReferences).toContain("examples/skill-usage.md");
    });
  });
});
