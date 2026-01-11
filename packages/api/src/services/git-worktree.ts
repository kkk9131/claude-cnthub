/**
 * Git Worktree サービス
 *
 * セッション分岐時にgit worktreeを作成・管理する
 */

import { spawn } from "bun";
import { join, dirname } from "path";
import { existsSync } from "fs";

/**
 * Worktree作成結果
 */
export interface WorktreeResult {
  success: boolean;
  worktreePath?: string;
  branchName?: string;
  error?: string;
}

/**
 * git コマンドを実行
 */
async function execGit(
  args: string[],
  cwd: string
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  const proc = spawn(["git", ...args], {
    cwd,
    stdout: "pipe",
    stderr: "pipe",
  });

  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();
  const exitCode = await proc.exited;

  return { stdout: stdout.trim(), stderr: stderr.trim(), exitCode };
}

/**
 * 指定されたディレクトリがgitリポジトリかどうかを確認
 */
export async function isGitRepository(workingDir: string): Promise<boolean> {
  try {
    const result = await execGit(
      ["rev-parse", "--is-inside-work-tree"],
      workingDir
    );
    return result.exitCode === 0 && result.stdout === "true";
  } catch {
    return false;
  }
}

/**
 * gitリポジトリのルートディレクトリを取得
 */
export async function getGitRoot(workingDir: string): Promise<string | null> {
  try {
    const result = await execGit(["rev-parse", "--show-toplevel"], workingDir);
    if (result.exitCode === 0) {
      return result.stdout;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * 現在のブランチ名を取得
 */
export async function getCurrentBranch(
  workingDir: string
): Promise<string | null> {
  try {
    const result = await execGit(["branch", "--show-current"], workingDir);
    if (result.exitCode === 0) {
      return result.stdout || null;
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * worktreeを作成
 *
 * @param workingDir - 元のリポジトリのパス
 * @param sessionId - セッションID（worktreeとブランチ名に使用）
 * @returns Worktree作成結果
 */
export async function createWorktree(
  workingDir: string,
  sessionId: string
): Promise<WorktreeResult> {
  // gitリポジトリか確認
  const isRepo = await isGitRepository(workingDir);
  if (!isRepo) {
    return {
      success: false,
      error: "Not a git repository. Run this command inside a git repository.",
    };
  }

  // gitルートを取得
  const gitRoot = await getGitRoot(workingDir);
  if (!gitRoot) {
    return {
      success: false,
      error: "Could not determine git repository root.",
    };
  }

  // worktreeパスとブランチ名を決定
  const branchName = `fork/${sessionId}`;
  const worktreePath = join(dirname(gitRoot), `worktree-${sessionId}`);

  // 既存のworktreeをチェック
  if (existsSync(worktreePath)) {
    return {
      success: false,
      error: `Worktree path already exists: ${worktreePath}`,
    };
  }

  // 現在のブランチを取得（ベースブランチとして使用）
  const currentBranch = await getCurrentBranch(gitRoot);
  if (!currentBranch) {
    // detached HEAD の場合は現在のコミットを使用
    const result = await execGit(["rev-parse", "HEAD"], gitRoot);
    if (result.exitCode !== 0) {
      return {
        success: false,
        error: "Could not determine current commit.",
      };
    }
  }

  // worktreeを作成（新しいブランチも同時に作成）
  const createResult = await execGit(
    ["worktree", "add", "-b", branchName, worktreePath],
    gitRoot
  );

  if (createResult.exitCode !== 0) {
    // ブランチが既に存在する場合は、ブランチを作成せずにworktreeだけ作成
    if (createResult.stderr.includes("already exists")) {
      const retryResult = await execGit(
        ["worktree", "add", worktreePath, branchName],
        gitRoot
      );
      if (retryResult.exitCode !== 0) {
        return {
          success: false,
          error: `Failed to create worktree: ${retryResult.stderr}`,
        };
      }
    } else {
      return {
        success: false,
        error: `Failed to create worktree: ${createResult.stderr}`,
      };
    }
  }

  return {
    success: true,
    worktreePath,
    branchName,
  };
}

/**
 * worktreeを削除
 *
 * @param worktreePath - 削除するworktreeのパス
 * @param gitRoot - gitリポジトリのルート
 * @returns 成功したかどうか
 */
export async function removeWorktree(
  worktreePath: string,
  gitRoot: string
): Promise<{ success: boolean; error?: string }> {
  // worktreeを削除
  const result = await execGit(["worktree", "remove", worktreePath], gitRoot);

  if (result.exitCode !== 0) {
    // --force オプションで再試行
    const forceResult = await execGit(
      ["worktree", "remove", "--force", worktreePath],
      gitRoot
    );
    if (forceResult.exitCode !== 0) {
      return {
        success: false,
        error: `Failed to remove worktree: ${forceResult.stderr}`,
      };
    }
  }

  return { success: true };
}

/**
 * worktree一覧を取得
 *
 * @param gitRoot - gitリポジトリのルート
 * @returns worktreeの一覧
 */
export async function listWorktrees(
  gitRoot: string
): Promise<{ path: string; branch: string }[]> {
  const result = await execGit(["worktree", "list", "--porcelain"], gitRoot);

  if (result.exitCode !== 0) {
    return [];
  }

  const worktrees: { path: string; branch: string }[] = [];
  const lines = result.stdout.split("\n");
  let currentPath = "";
  let currentBranch = "";

  for (const line of lines) {
    if (line.startsWith("worktree ")) {
      currentPath = line.substring(9);
    } else if (line.startsWith("branch ")) {
      currentBranch = line.substring(7).replace("refs/heads/", "");
    } else if (line === "") {
      if (currentPath) {
        worktrees.push({ path: currentPath, branch: currentBranch });
      }
      currentPath = "";
      currentBranch = "";
    }
  }

  // 最後のworktree
  if (currentPath) {
    worktrees.push({ path: currentPath, branch: currentBranch });
  }

  return worktrees;
}
