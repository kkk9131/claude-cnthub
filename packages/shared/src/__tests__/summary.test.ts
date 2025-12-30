import { describe, it, expect } from "vitest";
import type {
  ChangeDiff,
  ErrorEntry,
  DecisionEntry,
  ExtendedSessionSummary,
  ExtendedSummaryInput,
  SummaryLevel,
} from "../types/summary";

describe("Summary Type Definitions (L-04)", () => {
  describe("ChangeDiff", () => {
    it("should allow valid change diff for file creation", () => {
      const change: ChangeDiff = {
        filePath: "packages/api/src/routes/sessions-index.ts",
        changeType: "create",
        summary: "Added Level 0 index API endpoint",
        additions: 150,
        deletions: 0,
      };

      expect(change.filePath).toContain("sessions-index.ts");
      expect(change.changeType).toBe("create");
      expect(change.additions).toBe(150);
    });

    it("should allow valid change diff for file modification", () => {
      const change: ChangeDiff = {
        filePath: "packages/shared/src/index.ts",
        changeType: "modify",
        summary: "Added exports for new types",
        additions: 5,
        deletions: 2,
      };

      expect(change.changeType).toBe("modify");
      expect(change.additions).toBe(5);
      expect(change.deletions).toBe(2);
    });

    it("should allow valid change diff for file deletion", () => {
      const change: ChangeDiff = {
        filePath: "packages/api/src/deprecated.ts",
        changeType: "delete",
        summary: "Removed deprecated module",
        deletions: 200,
      };

      expect(change.changeType).toBe("delete");
      expect(change.deletions).toBe(200);
    });

    it("should allow valid change diff for file rename", () => {
      const change: ChangeDiff = {
        filePath: "packages/api/src/routes/index-api.ts",
        changeType: "rename",
        summary: "Renamed from sessions-index.ts for clarity",
      };

      expect(change.changeType).toBe("rename");
      expect(change.additions).toBeUndefined();
    });

    it("should support all change types", () => {
      const changeTypes = ["create", "modify", "delete", "rename"] as const;

      changeTypes.forEach((type) => {
        const change: ChangeDiff = {
          filePath: `/path/to/${type}.ts`,
          changeType: type,
          summary: `Test ${type} operation`,
        };
        expect(change.changeType).toBe(type);
      });
    });
  });

  describe("ErrorEntry", () => {
    it("should allow valid build error entry", () => {
      const error: ErrorEntry = {
        errorId: "err_build_001",
        errorType: "build",
        message: "TypeScript compilation failed: Cannot find module 'xyz'",
        timestamp: new Date("2024-01-15T10:30:00Z"),
        resolved: true,
        resolution: "Added missing dependency via bun add xyz",
      };

      expect(error.errorType).toBe("build");
      expect(error.resolved).toBe(true);
      expect(error.resolution).toContain("bun add");
    });

    it("should allow valid test error entry", () => {
      const error: ErrorEntry = {
        errorId: "err_test_001",
        errorType: "test",
        message: "Test failed: expected 200 but received 404",
        timestamp: new Date(),
        resolved: false,
      };

      expect(error.errorType).toBe("test");
      expect(error.resolved).toBe(false);
      expect(error.resolution).toBeUndefined();
    });

    it("should support all error types", () => {
      const errorTypes = ["build", "test", "runtime", "lint", "other"] as const;

      errorTypes.forEach((type) => {
        const error: ErrorEntry = {
          errorId: `err_${type}_001`,
          errorType: type,
          message: `Test ${type} error`,
          timestamp: new Date(),
          resolved: false,
        };
        expect(error.errorType).toBe(type);
      });
    });

    it("should track resolution when error is resolved", () => {
      const error: ErrorEntry = {
        errorId: "err_lint_001",
        errorType: "lint",
        message: "ESLint: Unused variable 'x'",
        timestamp: new Date(),
        resolved: true,
        resolution: "Removed unused variable",
      };

      expect(error.resolved).toBe(true);
      expect(error.resolution).toBeDefined();
    });
  });

  describe("DecisionEntry", () => {
    it("should allow valid architecture decision", () => {
      const decision: DecisionEntry = {
        decisionId: "dec_arch_001",
        title: "Use Level-based Disclosure System",
        description: "Implement a 3-level disclosure system for session data",
        rationale:
          "Reduces initial load time and improves UX by loading data on demand",
        category: "architecture",
        timestamp: new Date("2024-01-15T09:00:00Z"),
        alternatives: ["Load all data at once", "Use infinite scroll only"],
      };

      expect(decision.category).toBe("architecture");
      expect(decision.alternatives).toHaveLength(2);
      expect(decision.rationale).toContain("demand");
    });

    it("should allow valid implementation decision", () => {
      const decision: DecisionEntry = {
        decisionId: "dec_impl_001",
        title: "Use Zod for API validation",
        description: "All API endpoints use Zod schemas for input validation",
        category: "implementation",
        timestamp: new Date(),
      };

      expect(decision.category).toBe("implementation");
      expect(decision.rationale).toBeUndefined();
      expect(decision.alternatives).toBeUndefined();
    });

    it("should allow valid library decision", () => {
      const decision: DecisionEntry = {
        decisionId: "dec_lib_001",
        title: "Choose Hono over Express",
        description: "Using Hono for API framework",
        rationale: "Better TypeScript support and Bun compatibility",
        category: "library",
        timestamp: new Date(),
        alternatives: ["Express", "Fastify", "Elysia"],
      };

      expect(decision.category).toBe("library");
      expect(decision.alternatives).toContain("Express");
    });

    it("should support all decision categories", () => {
      const categories = [
        "architecture",
        "implementation",
        "library",
        "design",
        "other",
      ] as const;

      categories.forEach((category) => {
        const decision: DecisionEntry = {
          decisionId: `dec_${category}_001`,
          title: `Test ${category} decision`,
          description: `Description for ${category} decision`,
          category,
          timestamp: new Date(),
        };
        expect(decision.category).toBe(category);
      });
    });
  });

  describe("ExtendedSessionSummary", () => {
    it("should include all base summary fields plus extended fields", () => {
      const summary: ExtendedSessionSummary = {
        summaryId: "sum_001",
        sessionId: "sess_001",
        shortSummary: "Implemented Phase 6 disclosure system",
        detailedSummary:
          "Added Level 0 and Level 1 APIs. Implemented auto-tagging and auto-naming services. Created comprehensive test suite.",
        keyDecisions: ["Use 3-level system", "Zod for validation"],
        filesModified: [
          "packages/api/src/routes/sessions.ts",
          "packages/shared/src/types/session-index.ts",
        ],
        toolsUsed: ["Bash", "Read", "Write", "Edit"],
        topics: ["api", "disclosure", "phase6"],
        originalTokenCount: 50000,
        summaryTokenCount: 1000,
        compressionRatio: 0.02,
        createdAt: new Date(),
        updatedAt: new Date(),
        // Extended fields (Phase 6)
        changes: [
          {
            filePath: "packages/api/src/routes/sessions-index.ts",
            changeType: "create",
            summary: "Added Level 0 API",
            additions: 100,
          },
        ],
        errors: [
          {
            errorId: "err_001",
            errorType: "test",
            message: "Initial test failure",
            timestamp: new Date(),
            resolved: true,
            resolution: "Fixed assertion",
          },
        ],
        decisions: [
          {
            decisionId: "dec_001",
            title: "3-Level Disclosure",
            description: "Use 3-level disclosure for progressive data loading",
            category: "architecture",
            timestamp: new Date(),
          },
        ],
      };

      // Base fields
      expect(summary.summaryId).toBe("sum_001");
      expect(summary.shortSummary).toContain("Phase 6");
      expect(summary.compressionRatio).toBe(0.02);

      // Extended fields
      expect(summary.changes).toHaveLength(1);
      expect(summary.errors).toHaveLength(1);
      expect(summary.decisions).toHaveLength(1);
      expect(summary.errors[0].resolved).toBe(true);
    });

    it("should allow empty extended fields arrays", () => {
      const summary: ExtendedSessionSummary = {
        summaryId: "sum_002",
        sessionId: "sess_002",
        shortSummary: "Quick fix session",
        detailedSummary: "Minor bug fix with no major changes",
        keyDecisions: [],
        filesModified: ["src/fix.ts"],
        toolsUsed: ["Edit"],
        topics: ["bugfix"],
        originalTokenCount: 5000,
        summaryTokenCount: 200,
        compressionRatio: 0.04,
        createdAt: new Date(),
        updatedAt: new Date(),
        changes: [],
        errors: [],
        decisions: [],
      };

      expect(summary.changes).toEqual([]);
      expect(summary.errors).toEqual([]);
      expect(summary.decisions).toEqual([]);
    });
  });

  describe("ExtendedSummaryInput", () => {
    it("should allow creating input with optional extended fields", () => {
      const input: ExtendedSummaryInput = {
        sessionId: "sess_001",
        shortSummary: "Test session",
        detailedSummary: "Detailed test session summary",
        keyDecisions: [],
        filesModified: [],
        toolsUsed: [],
        topics: [],
        originalTokenCount: 1000,
        summaryTokenCount: 100,
        compressionRatio: 0.1,
      };

      expect(input.sessionId).toBe("sess_001");
      expect(input.changes).toBeUndefined();
      expect(input.errors).toBeUndefined();
      expect(input.decisions).toBeUndefined();
    });

    it("should allow creating input with extended fields", () => {
      const input: ExtendedSummaryInput = {
        sessionId: "sess_002",
        shortSummary: "Extended session",
        detailedSummary: "Session with all extended fields",
        keyDecisions: ["Decision 1"],
        filesModified: ["file1.ts"],
        toolsUsed: ["Tool1"],
        topics: ["topic1"],
        originalTokenCount: 2000,
        summaryTokenCount: 200,
        compressionRatio: 0.1,
        changes: [
          {
            filePath: "file1.ts",
            changeType: "create",
            summary: "New file",
          },
        ],
        errors: [],
        decisions: [
          {
            decisionId: "dec_001",
            title: "Test decision",
            description: "Test description",
            category: "other",
            timestamp: new Date(),
          },
        ],
      };

      expect(input.changes).toHaveLength(1);
      expect(input.errors).toEqual([]);
      expect(input.decisions).toHaveLength(1);
    });
  });

  describe("SummaryLevel", () => {
    it("should support level 0 (index only)", () => {
      const level: SummaryLevel = 0;
      expect(level).toBe(0);
    });

    it("should support level 1 (basic summary)", () => {
      const level: SummaryLevel = 1;
      expect(level).toBe(1);
    });

    it("should support level 2 (detailed summary)", () => {
      const level: SummaryLevel = 2;
      expect(level).toBe(2);
    });

    it("should allow all valid summary levels", () => {
      const levels: SummaryLevel[] = [0, 1, 2];

      levels.forEach((level, index) => {
        expect(level).toBe(index);
      });
    });
  });
});
