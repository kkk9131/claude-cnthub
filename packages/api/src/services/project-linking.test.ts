/**
 * プロジェクト自動紐付けサービス テスト
 *
 * セッション作成時に cwd からプロジェクトを自動判定するロジックのテスト
 */

import {
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "bun:test";
import { findProjectByWorkingDir } from "./project-linking";
import { createProject, deleteProject } from "../repositories/project";
import { runMigrations, resetDatabase, closeDatabase } from "../db";
import type { Project } from "@claude-cnthub/shared";

describe("project-linking service", () => {
  let testProject1: Project;
  let testProject2: Project;

  beforeAll(() => {
    resetDatabase();
    runMigrations();
  });

  afterAll(() => {
    closeDatabase();
  });

  beforeEach(() => {
    // テスト用プロジェクトを作成
    testProject1 = createProject({
      name: "Test Project 1",
      path: "/Users/test/projects/myproject",
      description: "Test project for auto-linking",
    });

    testProject2 = createProject({
      name: "Test Project 2",
      path: "/Users/test/other-projects/another",
      description: "Another test project",
    });
  });

  afterEach(() => {
    // テストデータのクリーンアップ
    if (testProject1?.projectId) {
      deleteProject(testProject1.projectId);
    }
    if (testProject2?.projectId) {
      deleteProject(testProject2.projectId);
    }
  });

  describe("findProjectByWorkingDir", () => {
    describe("exact match", () => {
      it("should return project when cwd exactly matches project path", () => {
        const result = findProjectByWorkingDir(
          "/Users/test/projects/myproject"
        );

        expect(result).not.toBeNull();
        expect(result?.projectId).toBe(testProject1.projectId);
        expect(result?.path).toBe("/Users/test/projects/myproject");
      });

      it("should return correct project when multiple projects exist", () => {
        const result = findProjectByWorkingDir(
          "/Users/test/other-projects/another"
        );

        expect(result).not.toBeNull();
        expect(result?.projectId).toBe(testProject2.projectId);
      });
    });

    describe("subdirectory match", () => {
      it("should return project when cwd is a subdirectory of project path", () => {
        const result = findProjectByWorkingDir(
          "/Users/test/projects/myproject/src/components"
        );

        expect(result).not.toBeNull();
        expect(result?.projectId).toBe(testProject1.projectId);
      });

      it("should return project for nested subdirectories", () => {
        const result = findProjectByWorkingDir(
          "/Users/test/projects/myproject/packages/api/src/routes"
        );

        expect(result).not.toBeNull();
        expect(result?.projectId).toBe(testProject1.projectId);
      });

      it("should return the most specific matching project (longest path)", () => {
        // Create a nested project
        const nestedProject = createProject({
          name: "Nested Project",
          path: "/Users/test/projects/myproject/packages/nested",
          description: "Nested project for specificity test",
        });

        try {
          // This should match the nested project, not the parent
          const result = findProjectByWorkingDir(
            "/Users/test/projects/myproject/packages/nested/src"
          );

          expect(result).not.toBeNull();
          expect(result?.projectId).toBe(nestedProject.projectId);
        } finally {
          deleteProject(nestedProject.projectId);
        }
      });
    });

    describe("no match", () => {
      it("should return null when cwd does not match any project", () => {
        const result = findProjectByWorkingDir("/Users/unknown/random/path");

        expect(result).toBeNull();
      });

      it("should return null when cwd is a parent of project path", () => {
        // /Users/test/projects is a parent of /Users/test/projects/myproject
        // but should NOT match
        const result = findProjectByWorkingDir("/Users/test/projects");

        expect(result).toBeNull();
      });

      it("should return null when path partially matches but is not a subdirectory", () => {
        // /Users/test/projects/myproject-extra is not a subdirectory of /Users/test/projects/myproject
        const result = findProjectByWorkingDir(
          "/Users/test/projects/myproject-extra"
        );

        expect(result).toBeNull();
      });

      it("should return null for empty cwd", () => {
        const result = findProjectByWorkingDir("");

        expect(result).toBeNull();
      });
    });

    describe("edge cases", () => {
      it("should handle trailing slashes in cwd", () => {
        const result = findProjectByWorkingDir(
          "/Users/test/projects/myproject/"
        );

        expect(result).not.toBeNull();
        expect(result?.projectId).toBe(testProject1.projectId);
      });

      it("should handle paths with trailing slashes in project path", () => {
        // Create a project with trailing slash
        const projectWithSlash = createProject({
          name: "Project With Slash",
          path: "/Users/test/trailing/slash",
          description: "Project for trailing slash test",
        });

        try {
          const result = findProjectByWorkingDir(
            "/Users/test/trailing/slash/subdir"
          );

          expect(result).not.toBeNull();
          expect(result?.projectId).toBe(projectWithSlash.projectId);
        } finally {
          deleteProject(projectWithSlash.projectId);
        }
      });

      it("should be case-sensitive on Unix-like systems", () => {
        // Create a project with specific casing
        const result = findProjectByWorkingDir(
          "/Users/test/projects/Myproject" // Capital M
        );

        // Should not match because /Users/test/projects/myproject is lowercase
        expect(result).toBeNull();
      });
    });
  });
});
