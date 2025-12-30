import { describe, it, expect } from "vitest";
import type {
  SessionIndex,
  SessionIndexListResponse,
  SessionIndexFilter,
} from "../types/session-index";
import type { SessionStatus } from "../types/session";

describe("SessionIndex Type Definitions (L-01)", () => {
  describe("SessionIndex", () => {
    it("should allow valid session index object with all required fields", () => {
      const sessionIndex: SessionIndex = {
        id: "sess_abc123",
        sessionName: "Phase 6 Implementation",
        status: "completed",
        tags: ["phase6", "disclosure-system", "api"],
        summaryPreview: "Implemented Level 0 and Level 1 disclosure APIs...",
        createdAt: new Date("2024-01-15T10:00:00Z"),
        updatedAt: new Date("2024-01-15T12:30:00Z"),
      };

      expect(sessionIndex.id).toBe("sess_abc123");
      expect(sessionIndex.sessionName).toBe("Phase 6 Implementation");
      expect(sessionIndex.status).toBe("completed");
      expect(sessionIndex.tags).toHaveLength(3);
      expect(sessionIndex.tags).toContain("phase6");
      expect(sessionIndex.summaryPreview).toContain("Level 0");
    });

    it("should allow empty tags array", () => {
      const sessionIndex: SessionIndex = {
        id: "sess_empty",
        sessionName: "New Session",
        status: "idle",
        tags: [],
        summaryPreview: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(sessionIndex.tags).toEqual([]);
      expect(sessionIndex.summaryPreview).toBe("");
    });

    it("should support all session statuses", () => {
      const statuses: SessionStatus[] = [
        "idle",
        "processing",
        "completed",
        "error",
      ];

      statuses.forEach((status) => {
        const sessionIndex: SessionIndex = {
          id: `sess_${status}`,
          sessionName: `Session with ${status} status`,
          status,
          tags: [],
          summaryPreview: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        expect(sessionIndex.status).toBe(status);
      });
    });

    it("should validate sessionName (SN) as string", () => {
      const sessionIndex: SessionIndex = {
        id: "sess_sn_test",
        sessionName: "Auto-generated: API Integration for Phase 6",
        status: "completed",
        tags: ["auto-named"],
        summaryPreview: "Session focused on API integration...",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(typeof sessionIndex.sessionName).toBe("string");
      expect(sessionIndex.sessionName.length).toBeGreaterThan(0);
    });
  });

  describe("SessionIndexListResponse", () => {
    it("should contain sessions array and pagination info", () => {
      const response: SessionIndexListResponse = {
        sessions: [
          {
            id: "sess_1",
            sessionName: "Session 1",
            status: "completed",
            tags: ["tag1"],
            summaryPreview: "Summary 1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: "sess_2",
            sessionName: "Session 2",
            status: "idle",
            tags: ["tag2"],
            summaryPreview: "Summary 2",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        pagination: {
          total: 100,
          page: 1,
          totalPages: 10,
          hasNext: true,
          hasPrev: false,
        },
      };

      expect(response.sessions).toHaveLength(2);
      expect(response.pagination.total).toBe(100);
      expect(response.pagination.page).toBe(1);
      expect(response.pagination.hasNext).toBe(true);
      expect(response.pagination.hasPrev).toBe(false);
    });

    it("should handle empty sessions list", () => {
      const response: SessionIndexListResponse = {
        sessions: [],
        pagination: {
          total: 0,
          page: 1,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      };

      expect(response.sessions).toEqual([]);
      expect(response.pagination.total).toBe(0);
    });
  });

  describe("SessionIndexFilter", () => {
    it("should allow filtering by status", () => {
      const filter: SessionIndexFilter = {
        status: "completed",
      };

      expect(filter.status).toBe("completed");
    });

    it("should allow filtering by multiple tags", () => {
      const filter: SessionIndexFilter = {
        tags: ["phase6", "api", "tdd"],
      };

      expect(filter.tags).toHaveLength(3);
      expect(filter.tags).toContain("phase6");
    });

    it("should allow filtering by projectId and workItemId", () => {
      const filter: SessionIndexFilter = {
        projectId: "proj_123",
        workItemId: "wi_456",
      };

      expect(filter.projectId).toBe("proj_123");
      expect(filter.workItemId).toBe("wi_456");
    });

    it("should allow text search query", () => {
      const filter: SessionIndexFilter = {
        query: "disclosure system",
      };

      expect(filter.query).toBe("disclosure system");
    });

    it("should allow combining multiple filter options", () => {
      const filter: SessionIndexFilter = {
        status: "completed",
        tags: ["phase6"],
        projectId: "proj_123",
        query: "api",
      };

      expect(filter.status).toBe("completed");
      expect(filter.tags).toContain("phase6");
      expect(filter.projectId).toBe("proj_123");
      expect(filter.query).toBe("api");
    });

    it("should allow empty filter (all optional)", () => {
      const filter: SessionIndexFilter = {};

      expect(Object.keys(filter)).toHaveLength(0);
    });
  });
});
