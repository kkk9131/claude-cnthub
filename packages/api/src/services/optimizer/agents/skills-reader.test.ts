/**
 * Skills 参照エージェントのテスト
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, writeFileSync, rmSync } from "fs";
import { join } from "path";
import { readSkills, type SkillAnalysis } from "./skills-reader";

describe("skills-reader", () => {
  const testDir = "/tmp/skills-reader-test";
  const skillsDir = join(testDir, ".claude", "skills");

  beforeEach(() => {
    // テスト用ディレクトリを作成
    mkdirSync(skillsDir, { recursive: true });
  });

  afterEach(() => {
    // テスト用ディレクトリを削除
    rmSync(testDir, { recursive: true, force: true });
  });

  describe("readSkills", () => {
    it("should return analysis for each skill file", async () => {
      writeFileSync(
        join(skillsDir, "commit.md"),
        `# commit

description: Git commit skill
trigger: /commit
`
      );
      writeFileSync(
        join(skillsDir, "review.md"),
        `# review

description: Code review skill
trigger: /review
`
      );

      const result = await readSkills(testDir);

      expect(result.length).toBe(2);
      expect(result.map((s) => s.skillName)).toContain("commit");
      expect(result.map((s) => s.skillName)).toContain("review");
    });

    it("should calculate line count for each skill", async () => {
      const content = `# test-skill

description: A test skill

## Usage

Use this skill when testing.

## Details

More details here.
`;
      writeFileSync(join(skillsDir, "test-skill.md"), content);

      const result = await readSkills(testDir);

      expect(result[0].lineCount).toBe(12);
    });

    it("should detect existing references in skill files", async () => {
      const content = `# skill-with-refs

description: A skill with references
reference: references/skill-detail.md
example: examples/skill-usage.md
`;
      writeFileSync(join(skillsDir, "skill-with-refs.md"), content);

      const result = await readSkills(testDir);

      expect(result[0].existingReferences).toContain(
        "references/skill-detail.md"
      );
      expect(result[0].existingReferences).toContain("examples/skill-usage.md");
    });

    it("should identify issues when line count exceeds 30", async () => {
      // 50行のコンテンツを生成
      const lines = Array.from({ length: 50 }, (_, i) => `Line ${i + 1}`);
      const content = lines.join("\n");
      writeFileSync(join(skillsDir, "long-skill.md"), content);

      const result = await readSkills(testDir);

      expect(result[0].lineCount).toBe(50);
      expect(result[0].issues.length).toBeGreaterThan(0);
      expect(result[0].issues.some((i) => i.includes("30"))).toBe(true);
    });

    it("should suggest extraction candidates for long content", async () => {
      const longContent = Array.from(
        { length: 40 },
        (_, i) => `Detail ${i + 1}`
      ).join("\n");
      const content = `# complex-skill

description: A complex skill

## Detailed Implementation

${longContent}
`;
      writeFileSync(join(skillsDir, "complex-skill.md"), content);

      const result = await readSkills(testDir);

      expect(result[0].extractionCandidates.length).toBeGreaterThan(0);
    });

    it("should return empty array when skills directory does not exist", async () => {
      rmSync(skillsDir, { recursive: true, force: true });

      const result = await readSkills(testDir);

      expect(result).toEqual([]);
    });

    it("should ignore non-markdown files", async () => {
      writeFileSync(join(skillsDir, "skill.md"), "# skill\n");
      writeFileSync(join(skillsDir, "readme.txt"), "Not a skill");
      writeFileSync(join(skillsDir, ".hidden.md"), "# hidden\n");

      const result = await readSkills(testDir);

      expect(result.length).toBe(1);
      expect(result[0].skillName).toBe("skill");
    });

    it("should extract trigger from skill content", async () => {
      const content = `# my-skill

description: My skill
trigger: /my-skill, /ms
`;
      writeFileSync(join(skillsDir, "my-skill.md"), content);

      const result = await readSkills(testDir);

      expect(result[0].trigger).toBe("/my-skill, /ms");
    });
  });
});
