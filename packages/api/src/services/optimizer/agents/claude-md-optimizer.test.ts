/**
 * CLAUDE.md 修正エージェントのテスト
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, writeFileSync, rmSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import {
  optimizeClaudeMd,
  type ClaudeMdOptimizeResult,
} from "./claude-md-optimizer";
import type { ClaudeMdAnalysis } from "./claude-md-reader";

describe("claude-md-optimizer", () => {
  const testDir = "/tmp/claude-md-optimizer-test";
  const claudeDir = join(testDir, ".claude");
  const rulesDir = join(claudeDir, "rules");
  const refsDir = join(claudeDir, "references");

  beforeEach(() => {
    mkdirSync(claudeDir, { recursive: true });
    mkdirSync(rulesDir, { recursive: true });
    mkdirSync(refsDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe("optimizeClaudeMd", () => {
    it("should return optimized content with reduced line count", async () => {
      // 150行のコンテンツを作成
      const longContent = Array.from(
        { length: 30 },
        (_, i) => `Detail line ${i + 1}`
      ).join("\n");
      const originalContent = `# Project

## Overview

Short overview.

## Detailed Rules

${longContent}

## Another Section

Content here.
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), originalContent);

      const analysis: ClaudeMdAnalysis = {
        path: join(claudeDir, "CLAUDE.md"),
        content: originalContent,
        lineCount: originalContent.split("\n").length,
        sections: ["Overview", "Detailed Rules", "Another Section"],
        existingReferences: [],
        issues: ["行数が39行で、目標の100行を超えています"],
        extractionCandidates: [
          {
            content: `## Detailed Rules\n\n${longContent}`,
            targetPath: "rules/detailed-rules.md",
            type: "rule",
            reason: "セクションが長いため分離を推奨",
          },
        ],
      };

      const result = await optimizeClaudeMd(analysis, testDir);

      expect(result.success).toBe(true);
      expect(result.optimizedContent.split("\n").length).toBeLessThan(
        originalContent.split("\n").length
      );
    });

    it("should create extracted files in correct directories", async () => {
      const longContent = Array.from(
        { length: 25 },
        (_, i) => `Rule ${i + 1}`
      ).join("\n");
      const originalContent = `# Project

## Rules

${longContent}
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), originalContent);

      const analysis: ClaudeMdAnalysis = {
        path: join(claudeDir, "CLAUDE.md"),
        content: originalContent,
        lineCount: originalContent.split("\n").length,
        sections: ["Rules"],
        existingReferences: [],
        issues: [],
        extractionCandidates: [
          {
            content: `## Rules\n\n${longContent}`,
            targetPath: "rules/detailed-rules.md",
            type: "rule",
            reason: "分離推奨",
          },
        ],
      };

      const result = await optimizeClaudeMd(analysis, testDir);

      expect(result.extractedFiles.length).toBeGreaterThan(0);
      const extractedFile = result.extractedFiles[0];
      expect(extractedFile.path).toContain("rules/");
    });

    it("should add reference links to optimized content", async () => {
      const longContent = Array.from(
        { length: 25 },
        (_, i) => `Detail ${i + 1}`
      ).join("\n");
      const originalContent = `# Project

## Detailed Section

${longContent}
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), originalContent);

      const analysis: ClaudeMdAnalysis = {
        path: join(claudeDir, "CLAUDE.md"),
        content: originalContent,
        lineCount: originalContent.split("\n").length,
        sections: ["Detailed Section"],
        existingReferences: [],
        issues: [],
        extractionCandidates: [
          {
            content: `## Detailed Section\n\n${longContent}`,
            targetPath: "references/detailed-section.md",
            type: "reference",
            reason: "分離推奨",
          },
        ],
      };

      const result = await optimizeClaudeMd(analysis, testDir);

      expect(result.optimizedContent).toContain("→ 詳細:");
      expect(result.optimizedContent).toContain(
        "references/detailed-section.md"
      );
    });

    it("should preserve content that is already within limits", async () => {
      const shortContent = `# Project

## Overview

A short project description.
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), shortContent);

      const analysis: ClaudeMdAnalysis = {
        path: join(claudeDir, "CLAUDE.md"),
        content: shortContent,
        lineCount: shortContent.split("\n").length,
        sections: ["Overview"],
        existingReferences: [],
        issues: [],
        extractionCandidates: [],
      };

      const result = await optimizeClaudeMd(analysis, testDir);

      expect(result.success).toBe(true);
      expect(result.optimizedContent).toBe(shortContent);
      expect(result.extractedFiles.length).toBe(0);
    });

    it("should handle multiple extraction candidates", async () => {
      const rules = Array.from({ length: 15 }, (_, i) => `Rule ${i + 1}`).join(
        "\n"
      );
      const refs = Array.from(
        { length: 15 },
        (_, i) => `Reference ${i + 1}`
      ).join("\n");
      const originalContent = `# Project

## Rules

${rules}

## References

${refs}
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), originalContent);

      const analysis: ClaudeMdAnalysis = {
        path: join(claudeDir, "CLAUDE.md"),
        content: originalContent,
        lineCount: originalContent.split("\n").length,
        sections: ["Rules", "References"],
        existingReferences: [],
        issues: [],
        extractionCandidates: [
          {
            content: `## Rules\n\n${rules}`,
            targetPath: "rules/rules.md",
            type: "rule",
            reason: "分離推奨",
          },
          {
            content: `## References\n\n${refs}`,
            targetPath: "references/references.md",
            type: "reference",
            reason: "分離推奨",
          },
        ],
      };

      const result = await optimizeClaudeMd(analysis, testDir);

      expect(result.extractedFiles.length).toBe(2);
    });

    it("should return line count before and after optimization", async () => {
      const longContent = Array.from(
        { length: 50 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");
      const originalContent = `# Project

## Long Section

${longContent}
`;
      writeFileSync(join(claudeDir, "CLAUDE.md"), originalContent);

      const analysis: ClaudeMdAnalysis = {
        path: join(claudeDir, "CLAUDE.md"),
        content: originalContent,
        lineCount: originalContent.split("\n").length,
        sections: ["Long Section"],
        existingReferences: [],
        issues: [],
        extractionCandidates: [
          {
            content: `## Long Section\n\n${longContent}`,
            targetPath: "references/long-section.md",
            type: "reference",
            reason: "分離推奨",
          },
        ],
      };

      const result = await optimizeClaudeMd(analysis, testDir);

      expect(result.lineCountBefore).toBe(originalContent.split("\n").length);
      expect(result.lineCountAfter).toBeLessThan(result.lineCountBefore);
    });
  });
});
