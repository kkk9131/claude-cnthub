/**
 * Skills 修正エージェントのテスト
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { optimizeSkills, type SkillsOptimizeResult } from "./skills-optimizer";
import type { SkillAnalysis } from "./skills-reader";

describe("skills-optimizer", () => {
  const testDir = "/tmp/skills-optimizer-test";
  const claudeDir = join(testDir, ".claude");
  const skillsDir = join(claudeDir, "skills");
  const refsDir = join(claudeDir, "references");
  const examplesDir = join(claudeDir, "examples");

  beforeEach(() => {
    mkdirSync(skillsDir, { recursive: true });
    mkdirSync(refsDir, { recursive: true });
    mkdirSync(examplesDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  describe("optimizeSkills", () => {
    it("should return optimized content for skills exceeding 30 lines", async () => {
      const longContent = Array.from(
        { length: 40 },
        (_, i) => `Detail ${i + 1}`
      ).join("\n");
      const originalContent = `# my-skill

description: A skill that does something
trigger: /my-skill

## Details

${longContent}
`;
      writeFileSync(join(skillsDir, "my-skill.md"), originalContent);

      const analysis: SkillAnalysis = {
        path: join(skillsDir, "my-skill.md"),
        skillName: "my-skill",
        content: originalContent,
        lineCount: originalContent.split("\n").length,
        sections: ["Details"],
        existingReferences: [],
        issues: ["スキル「my-skill」は47行で、目標の30行を超えています"],
        extractionCandidates: [
          {
            content: `## Details\n\n${longContent}`,
            targetPath: "references/my-skill-details.md",
            type: "reference",
            reason: "分離推奨",
          },
        ],
        trigger: "/my-skill",
        description: "A skill that does something",
      };

      const result = await optimizeSkills([analysis], testDir);

      expect(result.length).toBe(1);
      expect(result[0].success).toBe(true);
      expect(result[0].lineCountAfter).toBeLessThan(result[0].lineCountBefore);
    });

    it("should create reference files for extracted content", async () => {
      const longContent = Array.from(
        { length: 25 },
        (_, i) => `Step ${i + 1}`
      ).join("\n");
      const originalContent = `# commit-skill

description: Git commit helper
trigger: /commit

## Usage

${longContent}
`;
      writeFileSync(join(skillsDir, "commit-skill.md"), originalContent);

      const analysis: SkillAnalysis = {
        path: join(skillsDir, "commit-skill.md"),
        skillName: "commit-skill",
        content: originalContent,
        lineCount: originalContent.split("\n").length,
        sections: ["Usage"],
        existingReferences: [],
        issues: [],
        extractionCandidates: [
          {
            content: `## Usage\n\n${longContent}`,
            targetPath: "references/commit-skill-usage.md",
            type: "reference",
            reason: "分離推奨",
          },
        ],
        trigger: "/commit",
        description: "Git commit helper",
      };

      const result = await optimizeSkills([analysis], testDir);

      expect(result[0].extractedFiles.length).toBeGreaterThan(0);
      expect(result[0].extractedFiles[0].path).toContain("references/");
    });

    it("should add reference: line to optimized skill", async () => {
      const longContent = Array.from(
        { length: 20 },
        (_, i) => `Example ${i + 1}`
      ).join("\n");
      const originalContent = `# example-skill

description: Example skill
trigger: /example

## Examples

${longContent}
`;
      writeFileSync(join(skillsDir, "example-skill.md"), originalContent);

      const analysis: SkillAnalysis = {
        path: join(skillsDir, "example-skill.md"),
        skillName: "example-skill",
        content: originalContent,
        lineCount: originalContent.split("\n").length,
        sections: ["Examples"],
        existingReferences: [],
        issues: [],
        extractionCandidates: [
          {
            content: `## Examples\n\n${longContent}`,
            targetPath: "examples/example-skill-examples.md",
            type: "example",
            reason: "分離推奨",
          },
        ],
        trigger: "/example",
        description: "Example skill",
      };

      const result = await optimizeSkills([analysis], testDir);

      expect(
        result[0].optimizedContent.includes("example:") ||
          result[0].optimizedContent.includes("→ 詳細:")
      ).toBe(true);
    });

    it("should handle multiple skills", async () => {
      const longContent = Array.from(
        { length: 20 },
        (_, i) => `Line ${i + 1}`
      ).join("\n");

      writeFileSync(
        join(skillsDir, "skill1.md"),
        `# skill1\n\n## Details\n\n${longContent}`
      );
      writeFileSync(
        join(skillsDir, "skill2.md"),
        `# skill2\n\n## Details\n\n${longContent}`
      );

      const analyses: SkillAnalysis[] = [
        {
          path: join(skillsDir, "skill1.md"),
          skillName: "skill1",
          content: `# skill1\n\n## Details\n\n${longContent}`,
          lineCount: 24,
          sections: ["Details"],
          existingReferences: [],
          issues: [],
          extractionCandidates: [
            {
              content: `## Details\n\n${longContent}`,
              targetPath: "references/skill1-details.md",
              type: "reference",
              reason: "分離推奨",
            },
          ],
        },
        {
          path: join(skillsDir, "skill2.md"),
          skillName: "skill2",
          content: `# skill2\n\n## Details\n\n${longContent}`,
          lineCount: 24,
          sections: ["Details"],
          existingReferences: [],
          issues: [],
          extractionCandidates: [
            {
              content: `## Details\n\n${longContent}`,
              targetPath: "references/skill2-details.md",
              type: "reference",
              reason: "分離推奨",
            },
          ],
        },
      ];

      const result = await optimizeSkills(analyses, testDir);

      expect(result.length).toBe(2);
      expect(result[0].success).toBe(true);
      expect(result[1].success).toBe(true);
    });

    it("should preserve skills that are already within limits", async () => {
      const shortContent = `# short-skill

description: A short skill
trigger: /short
`;
      writeFileSync(join(skillsDir, "short-skill.md"), shortContent);

      const analysis: SkillAnalysis = {
        path: join(skillsDir, "short-skill.md"),
        skillName: "short-skill",
        content: shortContent,
        lineCount: shortContent.split("\n").length,
        sections: [],
        existingReferences: [],
        issues: [],
        extractionCandidates: [],
        trigger: "/short",
        description: "A short skill",
      };

      const result = await optimizeSkills([analysis], testDir);

      expect(result[0].success).toBe(true);
      expect(result[0].optimizedContent).toBe(shortContent);
      expect(result[0].extractedFiles.length).toBe(0);
    });
  });
});
