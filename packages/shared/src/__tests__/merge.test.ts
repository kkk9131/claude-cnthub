/**
 * Merge 型定義テスト
 *
 * 型の構造とバリデーションロジックをテスト
 */

import { describe, it, expect } from "vitest";
import type {
  Merge,
  MergeStatus,
  CreateMergeRequest,
  MergeListResponse,
} from "../types/merge";

describe("Merge Types", () => {
  describe("Merge interface", () => {
    it("必須プロパティを持つオブジェクトを作成できる", () => {
      const merge: Merge = {
        mergeId: "merge_test123",
        sourceSessionIds: ["sess_1", "sess_2"],
        resultSummary: "Combined summary of sessions",
        status: "completed",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
      };

      expect(merge.mergeId).toBe("merge_test123");
      expect(merge.sourceSessionIds).toEqual(["sess_1", "sess_2"]);
      expect(merge.resultSummary).toBe("Combined summary of sessions");
      expect(merge.status).toBe("completed");
      expect(merge.createdAt).toBeInstanceOf(Date);
      expect(merge.updatedAt).toBeInstanceOf(Date);
    });

    it("オプショナルプロパティを含むオブジェクトを作成できる", () => {
      const merge: Merge = {
        mergeId: "merge_test456",
        sourceSessionIds: ["sess_1", "sess_2", "sess_3"],
        resultSummary: "Combined summary",
        resultDetailedSummary: "Detailed combined summary with all context",
        status: "completed",
        projectId: "proj_001",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
      };

      expect(merge.resultDetailedSummary).toBe(
        "Detailed combined summary with all context"
      );
      expect(merge.projectId).toBe("proj_001");
    });

    it("エラー状態のマージを作成できる", () => {
      const merge: Merge = {
        mergeId: "merge_error",
        sourceSessionIds: ["sess_1"],
        resultSummary: "",
        status: "error",
        error: "Failed to merge: insufficient sessions",
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-01T00:00:00Z"),
      };

      expect(merge.status).toBe("error");
      expect(merge.error).toBe("Failed to merge: insufficient sessions");
    });
  });

  describe("MergeStatus type", () => {
    it("有効なステータス値を持つことができる", () => {
      const statuses: MergeStatus[] = [
        "pending",
        "processing",
        "completed",
        "error",
      ];

      expect(statuses).toContain("pending");
      expect(statuses).toContain("processing");
      expect(statuses).toContain("completed");
      expect(statuses).toContain("error");
      expect(statuses.length).toBe(4);
    });
  });

  describe("CreateMergeRequest interface", () => {
    it("必須プロパティのみでリクエストを作成できる", () => {
      const request: CreateMergeRequest = {
        sourceSessionIds: ["sess_1", "sess_2"],
      };

      expect(request.sourceSessionIds.length).toBe(2);
      expect(request.projectId).toBeUndefined();
    });

    it("projectIdを含むリクエストを作成できる", () => {
      const request: CreateMergeRequest = {
        sourceSessionIds: ["sess_1", "sess_2", "sess_3"],
        projectId: "proj_001",
      };

      expect(request.sourceSessionIds.length).toBe(3);
      expect(request.projectId).toBe("proj_001");
    });
  });

  describe("MergeListResponse interface", () => {
    it("空の一覧レスポンスを作成できる", () => {
      const response: MergeListResponse = {
        items: [],
        pagination: {
          total: 0,
          page: 1,
          totalPages: 0,
          hasNext: false,
          hasPrev: false,
        },
      };

      expect(response.items).toEqual([]);
      expect(response.pagination.total).toBe(0);
      expect(response.pagination.hasNext).toBe(false);
    });

    it("複数のマージを含むレスポンスを作成できる", () => {
      const merges: Merge[] = [
        {
          mergeId: "merge_1",
          sourceSessionIds: ["sess_1", "sess_2"],
          resultSummary: "Summary 1",
          status: "completed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          mergeId: "merge_2",
          sourceSessionIds: ["sess_3", "sess_4"],
          resultSummary: "Summary 2",
          status: "completed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const response: MergeListResponse = {
        items: merges,
        pagination: {
          total: 10,
          page: 1,
          totalPages: 5,
          hasNext: true,
          hasPrev: false,
        },
      };

      expect(response.items.length).toBe(2);
      expect(response.pagination.total).toBe(10);
      expect(response.pagination.hasNext).toBe(true);
    });
  });
});
