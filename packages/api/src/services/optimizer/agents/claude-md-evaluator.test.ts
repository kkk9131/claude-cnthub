/**
 * CLAUDE.md 評価エージェントのテスト
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import {
  evaluateClaudeMd,
  type ClaudeMdEvaluation,
} from "./claude-md-evaluator";
import type { ClaudeMdOptimizeResult } from "./claude-md-optimizer";

describe("claude-md-evaluator", () => {
  const testDir = "/tmp/claude-md-evaluator-test";
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

  describe("evaluateClaudeMd", () => {
    it("should pass when line count is within 100 lines", async () => {
      const content = Array.from(
        { length: 50 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");

      const optimizeResult: ClaudeMdOptimizeResult = {
        success: true,
        optimizedContent: content,
        extractedFiles: [],
        lineCountBefore: 150,
        lineCountAfter: 50,
      };

      const result = await evaluateClaudeMd(optimizeResult, testDir);

      expect(result.passed).toBe(true);
      expect(result.lineCount).toBe(50);
      expect(result.issues.length).toBe(0);
    });

    it("should fail when line count exceeds 100 lines", async () => {
      const content = Array.from(
        { length: 120 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");

      const optimizeResult: ClaudeMdOptimizeResult = {
        success: true,
        optimizedContent: content,
        extractedFiles: [],
        lineCountBefore: 150,
        lineCountAfter: 120,
      };

      const result = await evaluateClaudeMd(optimizeResult, testDir);

      expect(result.passed).toBe(false);
      expect(result.lineCount).toBe(120);
      expect(result.issues.some((i) => i.includes("100"))).toBe(true);
    });

    it("should pass when all reference links are valid", async () => {
      // 参照先ファイルを作成
      writeFileSync(join(rulesDir, "test-rule.md"), "# Test Rule");
      writeFileSync(join(refsDir, "test-ref.md"), "# Test Reference");

      const content = `# Project

## Rules

→ 詳細: rules/test-rule.md

## References

→ 詳細: references/test-ref.md
`;

      const optimizeResult: ClaudeMdOptimizeResult = {
        success: true,
        optimizedContent: content,
        extractedFiles: [
          {
            path: "rules/test-rule.md",
            content: "# Test Rule",
            referenceType: "rule",
          },
          {
            path: "references/test-ref.md",
            content: "# Test Reference",
            referenceType: "reference",
          },
        ],
        lineCountBefore: 100,
        lineCountAfter: 10,
      };

      const result = await evaluateClaudeMd(optimizeResult, testDir);

      expect(result.passed).toBe(true);
      expect(result.invalidReferences.length).toBe(0);
    });

    it("should fail when reference links are invalid", async () => {
      const content = `# Project

## Rules

→ 詳細: rules/non-existent.md
`;

      const optimizeResult: ClaudeMdOptimizeResult = {
        success: true,
        optimizedContent: content,
        extractedFiles: [],
        lineCountBefore: 100,
        lineCountAfter: 6,
      };

      const result = await evaluateClaudeMd(optimizeResult, testDir);

      expect(result.passed).toBe(false);
      expect(result.invalidReferences.length).toBeGreaterThan(0);
      expect(result.invalidReferences).toContain("rules/non-existent.md");
    });

    it("should provide suggestions for improvement", async () => {
      const content = Array.from(
        { length: 110 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");

      const optimizeResult: ClaudeMdOptimizeResult = {
        success: true,
        optimizedContent: content,
        extractedFiles: [],
        lineCountBefore: 150,
        lineCountAfter: 110,
      };

      const result = await evaluateClaudeMd(optimizeResult, testDir);

      expect(result.passed).toBe(false);
      expect(result.suggestions.length).toBeGreaterThan(0);
    });

    it("should return target line count", async () => {
      const content = "# Project\n\nShort content.";

      const optimizeResult: ClaudeMdOptimizeResult = {
        success: true,
        optimizedContent: content,
        extractedFiles: [],
        lineCountBefore: 5,
        lineCountAfter: 3,
      };

      const result = await evaluateClaudeMd(optimizeResult, testDir);

      expect(result.targetLineCount).toBe(100);
    });

    it("should fail when optimization itself failed", async () => {
      const optimizeResult: ClaudeMdOptimizeResult = {
        success: false,
        optimizedContent: "",
        extractedFiles: [],
        lineCountBefore: 150,
        lineCountAfter: 150,
        error: "Optimization failed",
      };

      const result = await evaluateClaudeMd(optimizeResult, testDir);

      expect(result.passed).toBe(false);
      expect(result.issues.some((i) => i.includes("失敗"))).toBe(true);
    });
  });
});
