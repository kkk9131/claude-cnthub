/**
 * Projects API ルートテスト
 *
 * プロジェクトCRUD APIのテスト
 */

import {
  describe,
  test,
  expect,
  beforeAll,
  beforeEach,
  afterAll,
} from "bun:test";
import { createApp } from "../../app";
import { runMigrations, resetDatabase, closeDatabase } from "../../db";
import type { Project, ProjectListResponse } from "@claude-cnthub/shared";

const app = createApp();

describe("Projects API", () => {
  beforeAll(() => {
    resetDatabase();
    runMigrations();
  });

  afterAll(() => {
    closeDatabase();
  });

  describe("POST /api/projects", () => {
    test("should create a new project with required fields", async () => {
      const res = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Project",
          path: "/path/to/project",
        }),
      });

      expect(res.status).toBe(201);

      const project = (await res.json()) as Project;
      expect(project.projectId).toMatch(/^ch_pj_/);
      expect(project.name).toBe("Test Project");
      expect(project.path).toBe("/path/to/project");
      // description is null when not set (SQLite stores null for empty optional fields)
      expect(project.description).toBeNull();
      expect(project.createdAt).toBeDefined();
      expect(project.updatedAt).toBeDefined();
    });

    test("should create a project with optional description", async () => {
      const res = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Project with Description",
          path: "/path/to/project-desc",
          description: "This is a test project description",
        }),
      });

      expect(res.status).toBe(201);

      const project = (await res.json()) as Project;
      expect(project.description).toBe("This is a test project description");
    });

    test("should return 400 for missing required fields", async () => {
      const res = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Missing Path",
        }),
      });

      expect(res.status).toBe(400);
      const body = (await res.json()) as { error: string };
      expect(body.error).toBe("Validation Error");
    });

    test("should return 400 for empty name", async () => {
      const res = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          path: "/some/path",
        }),
      });

      expect(res.status).toBe(400);
    });

    test("should return 409 for duplicate path", async () => {
      // First create a project
      await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Original Project",
          path: "/unique/path/for/duplicate-test",
        }),
      });

      // Try to create another with the same path
      const res = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Duplicate Path Project",
          path: "/unique/path/for/duplicate-test",
        }),
      });

      expect(res.status).toBe(409);
      const body = (await res.json()) as { error: string };
      expect(body.error).toBe("Project with this path already exists");
    });
  });

  describe("GET /api/projects", () => {
    beforeEach(async () => {
      // Create test projects
      await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "List Test Project 1",
          path: `/path/to/list-test-${Date.now()}-1`,
        }),
      });
      await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "List Test Project 2",
          path: `/path/to/list-test-${Date.now()}-2`,
        }),
      });
    });

    test("should return a list of projects with pagination", async () => {
      const res = await app.request("/api/projects");

      expect(res.status).toBe(200);

      const body = (await res.json()) as ProjectListResponse;
      expect(body.projects).toBeDefined();
      expect(Array.isArray(body.projects)).toBe(true);
      expect(body.pagination).toBeDefined();
      expect(body.pagination.page).toBe(1);
      expect(body.pagination.total).toBeGreaterThan(0);
      expect(body.pagination.totalPages).toBeGreaterThanOrEqual(1);
      expect(typeof body.pagination.hasNext).toBe("boolean");
      expect(typeof body.pagination.hasPrev).toBe("boolean");
    });

    test("should support custom pagination parameters", async () => {
      const res = await app.request("/api/projects?page=1&limit=5");

      expect(res.status).toBe(200);

      const body = (await res.json()) as ProjectListResponse;
      expect(body.projects.length).toBeLessThanOrEqual(5);
    });

    test("should return projects sorted by updatedAt descending", async () => {
      const res = await app.request("/api/projects");

      expect(res.status).toBe(200);

      const body = (await res.json()) as ProjectListResponse;
      if (body.projects.length >= 2) {
        const firstDate = new Date(body.projects[0].updatedAt).getTime();
        const secondDate = new Date(body.projects[1].updatedAt).getTime();
        expect(firstDate).toBeGreaterThanOrEqual(secondDate);
      }
    });
  });

  describe("GET /api/projects/:id", () => {
    test("should return a project by ID", async () => {
      // Create a project first
      const createRes = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Get By ID Test",
          path: `/path/to/get-by-id-${Date.now()}`,
          description: "Project for get by ID test",
        }),
      });

      const created = (await createRes.json()) as Project;

      // Get the project
      const res = await app.request(`/api/projects/${created.projectId}`);

      expect(res.status).toBe(200);

      const project = (await res.json()) as Project;
      expect(project.projectId).toBe(created.projectId);
      expect(project.name).toBe("Get By ID Test");
      expect(project.description).toBe("Project for get by ID test");
    });

    test("should return 404 for non-existent project", async () => {
      const res = await app.request("/api/projects/ch_pj_nonexistent");

      expect(res.status).toBe(404);
      const body = (await res.json()) as { error: string };
      expect(body.error).toBe("Project not found");
    });
  });

  describe("PUT /api/projects/:id", () => {
    test("should update project name", async () => {
      // Create a project
      const createRes = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Original Name",
          path: `/path/to/update-name-${Date.now()}`,
        }),
      });

      const created = (await createRes.json()) as Project;

      // Update the project
      const res = await app.request(`/api/projects/${created.projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Updated Name",
        }),
      });

      expect(res.status).toBe(200);

      const updated = (await res.json()) as Project;
      expect(updated.name).toBe("Updated Name");
      // updatedAt should be greater than or equal (same millisecond is possible in fast tests)
      expect(new Date(updated.updatedAt).getTime()).toBeGreaterThanOrEqual(
        new Date(created.updatedAt).getTime()
      );
    });

    test("should update project description", async () => {
      // Create a project
      const createRes = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Description Update Test",
          path: `/path/to/update-desc-${Date.now()}`,
        }),
      });

      const created = (await createRes.json()) as Project;

      // Update the project
      const res = await app.request(`/api/projects/${created.projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: "New description",
        }),
      });

      expect(res.status).toBe(200);

      const updated = (await res.json()) as Project;
      expect(updated.description).toBe("New description");
    });

    test("should clear description when set to null", async () => {
      // Create a project with description
      const createRes = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Clear Description Test",
          path: `/path/to/clear-desc-${Date.now()}`,
          description: "Initial description",
        }),
      });

      const created = (await createRes.json()) as Project;

      // Update with null description
      const res = await app.request(`/api/projects/${created.projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: null,
        }),
      });

      expect(res.status).toBe(200);

      const updated = (await res.json()) as Project;
      expect(updated.description).toBeNull();
    });

    test("should return 404 for non-existent project", async () => {
      const res = await app.request("/api/projects/ch_pj_nonexistent", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Updated Name",
        }),
      });

      expect(res.status).toBe(404);
    });

    test("should return 400 for invalid update data", async () => {
      // Create a project
      const createRes = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Validation Test",
          path: `/path/to/validation-${Date.now()}`,
        }),
      });

      const created = (await createRes.json()) as Project;

      // Update with empty name
      const res = await app.request(`/api/projects/${created.projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
        }),
      });

      expect(res.status).toBe(400);
    });
  });

  describe("DELETE /api/projects/:id", () => {
    test("should delete a project", async () => {
      // Create a project
      const createRes = await app.request("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Delete Test",
          path: `/path/to/delete-${Date.now()}`,
        }),
      });

      const created = (await createRes.json()) as Project;

      // Delete the project
      const deleteRes = await app.request(
        `/api/projects/${created.projectId}`,
        {
          method: "DELETE",
        }
      );

      expect(deleteRes.status).toBe(204);

      // Verify it's deleted
      const getRes = await app.request(`/api/projects/${created.projectId}`);
      expect(getRes.status).toBe(404);
    });

    test("should return 404 for non-existent project", async () => {
      const res = await app.request("/api/projects/ch_pj_nonexistent", {
        method: "DELETE",
      });

      expect(res.status).toBe(404);
    });
  });
});
