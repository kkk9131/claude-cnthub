/**
 * Git Worktree サービステスト
 */

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdirSync, rmSync, existsSync } from "fs";
import { join } from "path";
import { spawn } from "bun";
import {
  isGitRepository,
  getGitRoot,
  getCurrentBranch,
  createWorktree,
  removeWorktree,
  listWorktrees,
} from "./git-worktree";

// テスト用の一時ディレクトリ
const TEST_DIR = "/tmp/git-worktree-test";
const TEST_REPO = join(TEST_DIR, "test-repo");
const SESSION_ID = "ch_ss_test";

/**
 * gitコマンド実行ヘルパー
 */
async function execGit(args: string[], cwd: string): Promise<void> {
  const proc = spawn(["git", ...args], {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
  });
  await proc.exited;
}

describe("Git Worktree Service", () => {
  beforeAll(async () => {
    // テストディレクトリをクリーンアップ
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true });
    }
    mkdirSync(TEST_DIR, { recursive: true });

    // テスト用gitリポジトリを作成
    mkdirSync(TEST_REPO, { recursive: true });
    await execGit(["init"], TEST_REPO);
    await execGit(["config", "user.email", "test@test.com"], TEST_REPO);
    await execGit(["config", "user.name", "Test User"], TEST_REPO);

    // 初期コミットを作成
    const testFile = join(TEST_REPO, "README.md");
    Bun.write(testFile, "# Test Repository\n");
    await execGit(["add", "."], TEST_REPO);
    await execGit(["commit", "-m", "Initial commit"], TEST_REPO);
  });

  afterAll(() => {
    // クリーンアップ
    if (existsSync(TEST_DIR)) {
      rmSync(TEST_DIR, { recursive: true });
    }
  });

  describe("isGitRepository", () => {
    it("gitリポジトリの場合はtrueを返す", async () => {
      const result = await isGitRepository(TEST_REPO);
      expect(result).toBe(true);
    });

    it("gitリポジトリでない場合はfalseを返す", async () => {
      const result = await isGitRepository(TEST_DIR);
      expect(result).toBe(false);
    });

    it("存在しないディレクトリの場合はfalseを返す", async () => {
      const result = await isGitRepository("/nonexistent/path");
      expect(result).toBe(false);
    });
  });

  describe("getGitRoot", () => {
    it("gitルートディレクトリを返す", async () => {
      const result = await getGitRoot(TEST_REPO);
      expect(result).toBe(TEST_REPO);
    });

    it("サブディレクトリからもgitルートを取得できる", async () => {
      const subDir = join(TEST_REPO, "subdir");
      mkdirSync(subDir, { recursive: true });

      const result = await getGitRoot(subDir);
      expect(result).toBe(TEST_REPO);
    });

    it("gitリポジトリでない場合はnullを返す", async () => {
      const result = await getGitRoot(TEST_DIR);
      expect(result).toBeNull();
    });
  });

  describe("getCurrentBranch", () => {
    it("現在のブランチ名を返す", async () => {
      const result = await getCurrentBranch(TEST_REPO);
      // main または master
      expect(["main", "master"]).toContain(result);
    });
  });

  describe("createWorktree", () => {
    it("worktreeを作成できる", async () => {
      const result = await createWorktree(TEST_REPO, SESSION_ID);

      expect(result.success).toBe(true);
      expect(result.worktreePath).toBeDefined();
      expect(result.branchName).toBe(`fork/${SESSION_ID}`);
      expect(existsSync(result.worktreePath!)).toBe(true);
    });

    it("gitリポジトリでない場合はエラーを返す", async () => {
      const result = await createWorktree(TEST_DIR, "test-session");

      expect(result.success).toBe(false);
      expect(result.error).toContain("Not a git repository");
    });

    it("既に存在するworktreeパスの場合はエラーを返す", async () => {
      // 同じセッションIDで再度作成を試みる
      const result = await createWorktree(TEST_REPO, SESSION_ID);

      expect(result.success).toBe(false);
      expect(result.error).toContain("already exists");
    });
  });

  describe("listWorktrees", () => {
    it("worktree一覧を取得できる", async () => {
      const worktrees = await listWorktrees(TEST_REPO);

      expect(worktrees.length).toBeGreaterThanOrEqual(2); // メイン + 作成したworktree
      const forkWorktree = worktrees.find((w) =>
        w.branch.includes(`fork/${SESSION_ID}`)
      );
      expect(forkWorktree).toBeDefined();
    });
  });

  describe("removeWorktree", () => {
    it("worktreeを削除できる", async () => {
      const worktreePath = join(TEST_DIR, `worktree-${SESSION_ID}`);
      const result = await removeWorktree(worktreePath, TEST_REPO);

      expect(result.success).toBe(true);
      expect(existsSync(worktreePath)).toBe(false);
    });
  });
});
