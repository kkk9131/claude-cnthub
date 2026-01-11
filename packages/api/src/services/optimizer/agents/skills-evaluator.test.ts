/**
 * Skills 評価エージェントのテスト
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { evaluateSkills, type SkillEvaluation } from "./skills-evaluator";
import type { SkillOptimizeResult } from "./skills-optimizer";

describe("skills-evaluator", () => {
  const testDir = "/tmp/skills-evaluator-test";
  const claudeDir = join(testDir, ".claude");
  const refsDir = join(claudeDir, "references");
  const examplesDir = join(claudeDir, "examples");

  beforeEach(() => {
    mkdirSync(claudeDir, { recursive: true });
    mkdirSync(refsDir, { recursive: true });
    mkdirSync(examplesDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe("evaluateSkills", () => {
    it("should pass when all skills are within 30 lines", async () => {
      const content = Array.from(
        { length: 20 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");

      const optimizeResults: SkillOptimizeResult[] = [
        {
          success: true,
          skillName: "test-skill",
          optimizedContent: content,
          extractedFiles: [],
          lineCountBefore: 50,
          lineCountAfter: 20,
        },
      ];

      const result = await evaluateSkills(optimizeResults, testDir);

      expect(result.length).toBe(1);
      expect(result[0].passed).toBe(true);
      expect(result[0].lineCount).toBe(20);
    });

    it("should fail when skill exceeds 30 lines", async () => {
      const content = Array.from(
        { length: 40 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");

      const optimizeResults: SkillOptimizeResult[] = [
        {
          success: true,
          skillName: "long-skill",
          optimizedContent: content,
          extractedFiles: [],
          lineCountBefore: 50,
          lineCountAfter: 40,
        },
      ];

      const result = await evaluateSkills(optimizeResults, testDir);

      expect(result[0].passed).toBe(false);
      expect(result[0].issues.some((i) => i.includes("30"))).toBe(true);
    });

    it("should validate reference links", async () => {
      writeFileSync(join(refsDir, "skill-detail.md"), "# Skill Detail");

      const content = `# skill

description: A skill
reference: references/skill-detail.md
`;

      const optimizeResults: SkillOptimizeResult[] = [
        {
          success: true,
          skillName: "skill-with-ref",
          optimizedContent: content,
          extractedFiles: [
            {
              path: "references/skill-detail.md",
              content: "# Skill Detail",
              referenceType: "reference",
            },
          ],
          lineCountBefore: 30,
          lineCountAfter: 5,
        },
      ];

      const result = await evaluateSkills(optimizeResults, testDir);

      expect(result[0].passed).toBe(true);
      expect(result[0].invalidReferences.length).toBe(0);
    });

    it("should fail when reference links are invalid", async () => {
      const content = `# skill

description: A skill
reference: references/non-existent.md
`;

      const optimizeResults: SkillOptimizeResult[] = [
        {
          success: true,
          skillName: "skill-bad-ref",
          optimizedContent: content,
          extractedFiles: [],
          lineCountBefore: 30,
          lineCountAfter: 5,
        },
      ];

      const result = await evaluateSkills(optimizeResults, testDir);

      expect(result[0].passed).toBe(false);
      expect(result[0].invalidReferences).toContain(
        "references/non-existent.md"
      );
    });

    it("should evaluate multiple skills independently", async () => {
      const shortContent = Array.from(
        { length: 10 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");
      const longContent = Array.from(
        { length: 40 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");

      const optimizeResults: SkillOptimizeResult[] = [
        {
          success: true,
          skillName: "short-skill",
          optimizedContent: shortContent,
          extractedFiles: [],
          lineCountBefore: 10,
          lineCountAfter: 10,
        },
        {
          success: true,
          skillName: "long-skill",
          optimizedContent: longContent,
          extractedFiles: [],
          lineCountBefore: 50,
          lineCountAfter: 40,
        },
      ];

      const result = await evaluateSkills(optimizeResults, testDir);

      expect(result.length).toBe(2);
      expect(result[0].passed).toBe(true); // short-skill
      expect(result[1].passed).toBe(false); // long-skill
    });

    it("should return target line count of 30", async () => {
      const content = "# skill\n\nShort content.";

      const optimizeResults: SkillOptimizeResult[] = [
        {
          success: true,
          skillName: "test",
          optimizedContent: content,
          extractedFiles: [],
          lineCountBefore: 5,
          lineCountAfter: 3,
        },
      ];

      const result = await evaluateSkills(optimizeResults, testDir);

      expect(result[0].targetLineCount).toBe(30);
    });

    it("should provide suggestions when failing", async () => {
      const content = Array.from(
        { length: 35 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");

      const optimizeResults: SkillOptimizeResult[] = [
        {
          success: true,
          skillName: "needs-work",
          optimizedContent: content,
          extractedFiles: [],
          lineCountBefore: 50,
          lineCountAfter: 35,
        },
      ];

      const result = await evaluateSkills(optimizeResults, testDir);

      expect(result[0].passed).toBe(false);
      expect(result[0].suggestions.length).toBeGreaterThan(0);
    });
  });
});
