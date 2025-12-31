/**
 * ProjectSwitcher ユーティリティ関数
 */

import type { CreateProjectRequest } from "@claude-cnthub/shared";
import type { ValidationResult, ProjectFormErrors } from "./types";

/**
 * プロジェクト作成フォームをバリデート
 */
export function validateProjectForm(
  data: CreateProjectRequest
): ValidationResult {
  const errors: ProjectFormErrors = {};

  // 名前のバリデーション
  if (!data.name || data.name.trim() === "") {
    errors.name = "Project name is required";
  }

  // パスのバリデーション
  if (!data.path || data.path.trim() === "") {
    errors.path = "Project path is required";
  } else if (!data.path.startsWith("/")) {
    errors.path = "Path must be an absolute path";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * プロジェクトパスをフォーマット
 * ホームディレクトリを~に置換し、長すぎる場合は省略する
 */
export function formatProjectPath(
  path: string,
  homeDir: string,
  maxLength: number = 40
): string {
  // ホームディレクトリを~に置換
  let formattedPath = path;
  if (path.startsWith(homeDir)) {
    formattedPath = "~" + path.slice(homeDir.length);
  }

  // 長すぎる場合は末尾を表示
  if (formattedPath.length > maxLength) {
    return "..." + formattedPath.slice(-maxLength);
  }

  return formattedPath;
}

/**
 * プロジェクト名を省略
 */
export function truncateProjectName(
  name: string,
  maxLength: number = 25
): string {
  if (name.length <= maxLength) {
    return name;
  }
  return name.slice(0, maxLength) + "...";
}
