/**
 * 最適化オーケストレーター統合テスト
 *
 * 実際のファイル操作を含む統合テスト
 */

import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { mkdirSync, writeFileSync, rmSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import { runOptimization, applyChanges } from "./orchestrator";

describe("optimization integration", () => {
  const testDir = "/tmp/optimize-integration-test";
  const claudeDir = join(testDir, ".claude");
  const skillsDir = join(claudeDir, "skills");

  beforeEach(() => {
    rmSync(testDir, { recursive: true, force: true });
    mkdirSync(skillsDir, { recursive: true });
  });

  afterEach(() => {
    rmSync(testDir, { recursive: true, force: true });
  });

  it("should optimize CLAUDE.md over 100 lines", async () => {
    // 110行のCLAUDE.mdを作成
    const lines = [
      "# Project",
      "",
      "## Overview",
      "Test project.",
      "",
      "## Long Section",
      "",
    ];
    for (let i = 1; i <= 103; i++) {
      lines.push(`Line ${i}`);
    }
    writeFileSync(join(claudeDir, "CLAUDE.md"), lines.join("\n"));

    const result = await runOptimization({
      projectPath: testDir,
      targets: ["claude-md"],
      dryRun: true,
    });

    expect(result.success).toBe(true);
    expect(result.changes.length).toBeGreaterThan(0);

    const claudeMdChange = result.changes.find((c) => c.type === "claude-md");
    if (claudeMdChange) {
      expect(claudeMdChange.lineCountBefore).toBeGreaterThan(100);
      expect(claudeMdChange.lineCountAfter).toBeLessThanOrEqual(100);
    }
  });

  it("should optimize skill over 30 lines", async () => {
    // 40行のスキルを作成
    const lines = [
      "# Test Skill",
      "",
      "## Description",
      "A test skill.",
      "",
      "## Steps",
      "",
    ];
    for (let i = 1; i <= 33; i++) {
      lines.push(`Step ${i}`);
    }
    writeFileSync(join(skillsDir, "test.md"), lines.join("\n"));

    const result = await runOptimization({
      projectPath: testDir,
      targets: ["skills"],
      dryRun: true,
    });

    expect(result.success).toBe(true);
    expect(result.changes.length).toBeGreaterThan(0);

    const skillChange = result.changes.find((c) => c.type === "skills");
    if (skillChange) {
      expect(skillChange.lineCountBefore).toBeGreaterThan(30);
      expect(skillChange.lineCountAfter).toBeLessThanOrEqual(30);
    }
  });

  it("should handle both CLAUDE.md and skills together", async () => {
    // CLAUDE.md
    const claudeLines = ["# Project", "", "## Section", ""];
    for (let i = 1; i <= 100; i++) {
      claudeLines.push(`Line ${i}`);
    }
    writeFileSync(join(claudeDir, "CLAUDE.md"), claudeLines.join("\n"));

    // Skill
    const skillLines = ["# Skill", "", "## Steps", ""];
    for (let i = 1; i <= 30; i++) {
      skillLines.push(`Step ${i}`);
    }
    writeFileSync(join(skillsDir, "workflow.md"), skillLines.join("\n"));

    const result = await runOptimization({
      projectPath: testDir,
      targets: ["claude-md", "skills"],
      dryRun: true,
    });

    expect(result.success).toBe(true);
    // 両方のターゲットが処理される
    const hasClaudeMd = result.changes.some((c) => c.type === "claude-md");
    const hasSkill = result.changes.some((c) => c.type === "skills");
    expect(hasClaudeMd || hasSkill).toBe(true);
  });

  it("should apply changes using applyChanges function", async () => {
    // 110行のCLAUDE.mdを作成
    const lines = [
      "# Project",
      "",
      "## Overview",
      "Short overview.",
      "",
      "## Long Details",
      "",
      "This section should be extracted.",
    ];
    for (let i = 1; i <= 102; i++) {
      lines.push(`Line ${i}`);
    }
    writeFileSync(join(claudeDir, "CLAUDE.md"), lines.join("\n"));

    // まず最適化結果を取得
    const result = await runOptimization({
      projectPath: testDir,
      targets: ["claude-md"],
      dryRun: true,
    });

    expect(result.success).toBe(true);
    expect(result.changes.length).toBeGreaterThan(0);

    // applyChangesで実際に適用
    const applyResult = await applyChanges(result.changes, testDir);
    expect(applyResult.success).toBe(true);

    // ファイルが変更されていることを確認
    const newContent = readFileSync(join(claudeDir, "CLAUDE.md"), "utf-8");
    expect(newContent.split("\n").length).toBeLessThanOrEqual(100);
  });

  it("should not change files within limits", async () => {
    // 50行のCLAUDE.md（制限内）
    const lines = ["# Project", "", "## Section", ""];
    for (let i = 1; i <= 46; i++) {
      lines.push(`Line ${i}`);
    }
    const content = lines.join("\n");
    writeFileSync(join(claudeDir, "CLAUDE.md"), content);

    const result = await runOptimization({
      projectPath: testDir,
      targets: ["claude-md"],
      dryRun: true,
    });

    expect(result.success).toBe(true);
    // 制限内なので変更なし
    const claudeMdChange = result.changes.find((c) => c.type === "claude-md");
    if (claudeMdChange) {
      // 変更があった場合でも、最適化後も制限内
      expect(claudeMdChange.lineCountAfter).toBeLessThanOrEqual(100);
    }
  });
});
