/**
 * ProjectCreateModal コンポーネント
 *
 * 新規プロジェクト作成用のモーダルダイアログ。
 */

import { useState, useEffect, useRef } from "react";
import type { CreateProjectRequest } from "@claude-cnthub/shared";
import type { ProjectCreateModalProps, ProjectFormErrors } from "./types";
import { validateProjectForm } from "./utils";
import { FolderIcon } from "../icons";

export function ProjectCreateModal({
  isOpen,
  onClose,
  onCreate,
  isCreating = false,
}: ProjectCreateModalProps) {
  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<ProjectFormErrors>({});
  const nameInputRef = useRef<HTMLInputElement>(null);

  // モーダルが開いた時にフォームをリセットしフォーカス
  useEffect(() => {
    if (isOpen) {
      setName("");
      setPath("");
      setDescription("");
      setErrors({});
      // 少し遅延させてフォーカス
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  // フォーム送信ハンドラ
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data: CreateProjectRequest = {
      name: name.trim(),
      path: path.trim(),
      description: description.trim() || undefined,
    };

    const validation = validateProjectForm(data);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onCreate(data);
  };

  // 入力時にエラーをクリア
  const handleNameChange = (value: string) => {
    setName(value);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: undefined }));
    }
  };

  const handlePathChange = (value: string) => {
    setPath(value);
    if (errors.path) {
      setErrors((prev) => ({ ...prev, path: undefined }));
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* モーダル本体 */}
      <div className="relative w-full max-w-md mx-4 bg-[var(--bg-surface)] rounded-xl shadow-2xl border border-[var(--border-subtle)]">
        {/* ヘッダー */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-elevated)]">
            <FolderIcon className="w-5 h-5 text-[var(--accent-primary)]" />
          </div>
          <div>
            <h2
              id="modal-title"
              className="text-lg font-semibold text-[var(--text-primary)]"
            >
              New Project
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Create a new project to organize your sessions
            </p>
          </div>
        </div>

        {/* フォーム */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {/* プロジェクト名 */}
          <div>
            <label
              htmlFor="project-name"
              className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
            >
              Project Name <span className="text-red-400">*</span>
            </label>
            <input
              ref={nameInputRef}
              id="project-name"
              type="text"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="My Awesome Project"
              className={`input w-full ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
              disabled={isCreating}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          {/* プロジェクトパス */}
          <div>
            <label
              htmlFor="project-path"
              className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
            >
              Project Path <span className="text-red-400">*</span>
            </label>
            <input
              id="project-path"
              type="text"
              value={path}
              onChange={(e) => handlePathChange(e.target.value)}
              placeholder="/Users/you/projects/my-project"
              className={`input w-full font-mono text-sm ${errors.path ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : ""}`}
              disabled={isCreating}
              aria-invalid={!!errors.path}
              aria-describedby={errors.path ? "path-error" : undefined}
            />
            {errors.path && (
              <p id="path-error" className="mt-1 text-xs text-red-400">
                {errors.path}
              </p>
            )}
            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Absolute path to the project directory
            </p>
          </div>

          {/* 説明 */}
          <div>
            <label
              htmlFor="project-description"
              className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5"
            >
              Description
            </label>
            <textarea
              id="project-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your project (optional)"
              rows={2}
              className="input w-full resize-none"
              disabled={isCreating}
            />
          </div>

          {/* ボタン */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg
                       text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]
                       transition-colors focus:outline-none focus:ring-2
                       focus:ring-[var(--border-subtle)]"
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-lg
                       bg-[var(--accent-primary)] text-white
                       hover:opacity-90 transition-opacity
                       focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]
                       focus:ring-offset-2 focus:ring-offset-[var(--bg-surface)]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
