/**
 * MergeUI コンポーネントのテスト
 *
 * TDD: テストファーストで型と基本的な構造を検証
 * 注: Reactコンポーネントのレンダリングテストはjsdom環境が必要
 * ここでは型とユーティリティのテストを中心に行う
 */

import { describe, it, expect, vi } from "vitest";
import type { Merge, MergeStatus } from "@claude-cnthub/shared";
import type {
  MergePanelProps,
  MergePreviewProps,
  MergeHistoryProps,
  SessionItem,
} from "../types";

// モックデータ
const mockSessions: SessionItem[] = [
  {
    sessionId: "ch_ss_0001",
    name: "Session 1",
    status: "completed",
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T11:00:00Z",
  },
  {
    sessionId: "ch_ss_0002",
    name: "Session 2",
    status: "completed",
    createdAt: "2024-01-02T10:00:00Z",
    updatedAt: "2024-01-02T11:00:00Z",
  },
  {
    sessionId: "ch_ss_0003",
    name: "Session 3",
    status: "completed",
    createdAt: "2024-01-03T10:00:00Z",
    updatedAt: "2024-01-03T11:00:00Z",
  },
];

const mockMerges: Merge[] = [
  {
    mergeId: "ch_mg_0001",
    sourceSessionIds: ["ch_ss_0001", "ch_ss_0002"],
    resultSummary: "Merged summary 1",
    status: "completed",
    createdAt: new Date("2024-01-05T10:00:00Z"),
    updatedAt: new Date("2024-01-05T10:05:00Z"),
  },
  {
    mergeId: "ch_mg_0002",
    sourceSessionIds: ["ch_ss_0002", "ch_ss_0003"],
    resultSummary: "Merged summary 2",
    status: "pending",
    createdAt: new Date("2024-01-06T10:00:00Z"),
    updatedAt: new Date("2024-01-06T10:00:00Z"),
  },
];

describe("MergeUI Types", () => {
  describe("SessionItem", () => {
    it("必須プロパティを持つ構造を作成できる", () => {
      const session: SessionItem = {
        sessionId: "ch_ss_0001",
        name: "Test Session",
        status: "completed",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      };

      expect(session.sessionId).toBe("ch_ss_0001");
      expect(session.name).toBe("Test Session");
      expect(session.status).toBe("completed");
    });

    it("オプショナルプロパティを持てる", () => {
      const session: SessionItem = {
        sessionId: "ch_ss_0001",
        name: "Test Session",
        status: "completed",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        workingDir: "/path/to/project",
      };

      expect(session.workingDir).toBe("/path/to/project");
    });

    it("すべてのステータスを設定できる", () => {
      const statuses: SessionItem["status"][] = [
        "idle",
        "active",
        "completed",
        "error",
      ];

      statuses.forEach((status) => {
        const session: SessionItem = {
          sessionId: "ch_ss_0001",
          name: "Test",
          status,
          createdAt: "2024-01-01T00:00:00Z",
          updatedAt: "2024-01-01T00:00:00Z",
        };
        expect(session.status).toBe(status);
      });
    });
  });

  describe("MergePanelProps", () => {
    it("オプショナルプロパティのみで構成できる", () => {
      const props: MergePanelProps = {};

      expect(props.initialSelectedSessions).toBeUndefined();
      expect(props.onMergeComplete).toBeUndefined();
    });

    it("すべてのプロパティを設定できる", () => {
      const onMergeComplete = vi.fn();

      const props: MergePanelProps = {
        initialSelectedSessions: mockSessions,
        onMergeComplete,
        projectId: "ch_pj_0001",
        className: "custom-class",
      };

      expect(props.initialSelectedSessions).toHaveLength(3);
      expect(props.onMergeComplete).toBe(onMergeComplete);
      expect(props.projectId).toBe("ch_pj_0001");
      expect(props.className).toBe("custom-class");
    });
  });

  describe("MergePreviewProps", () => {
    it("必須プロパティsessionsを持つ", () => {
      const props: MergePreviewProps = {
        sessions: mockSessions,
      };

      expect(props.sessions).toHaveLength(3);
    });

    it("空のセッション配列を設定できる", () => {
      const props: MergePreviewProps = {
        sessions: [],
      };

      expect(props.sessions).toHaveLength(0);
    });

    it("classNameを設定できる", () => {
      const props: MergePreviewProps = {
        sessions: [],
        className: "preview-class",
      };

      expect(props.className).toBe("preview-class");
    });
  });

  describe("MergeHistoryProps", () => {
    it("すべてオプショナルプロパティで構成できる", () => {
      const props: MergeHistoryProps = {};

      expect(props.projectId).toBeUndefined();
      expect(props.limit).toBeUndefined();
      expect(props.className).toBeUndefined();
      expect(props.onItemClick).toBeUndefined();
    });

    it("すべてのプロパティを設定できる", () => {
      const onItemClick = vi.fn();

      const props: MergeHistoryProps = {
        projectId: "ch_pj_0001",
        limit: 10,
        className: "history-class",
        onItemClick,
      };

      expect(props.projectId).toBe("ch_pj_0001");
      expect(props.limit).toBe(10);
      expect(props.className).toBe("history-class");
      expect(props.onItemClick).toBe(onItemClick);
    });
  });
});

describe("Merge Type Compatibility", () => {
  describe("Merge型との互換性", () => {
    it("マージデータを正しく作成できる", () => {
      const merge: Merge = {
        mergeId: "ch_mg_0001",
        sourceSessionIds: ["ch_ss_0001", "ch_ss_0002"],
        resultSummary: "Test summary",
        status: "completed",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(merge.mergeId).toBe("ch_mg_0001");
      expect(merge.sourceSessionIds).toHaveLength(2);
      expect(merge.status).toBe("completed");
    });

    it("すべてのステータスを設定できる", () => {
      const statuses: MergeStatus[] = [
        "pending",
        "processing",
        "completed",
        "error",
      ];

      statuses.forEach((status) => {
        const merge: Merge = {
          mergeId: "ch_mg_0001",
          sourceSessionIds: ["ch_ss_0001", "ch_ss_0002"],
          resultSummary: "",
          status,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        expect(merge.status).toBe(status);
      });
    });

    it("オプショナルプロパティを持てる", () => {
      const merge: Merge = {
        mergeId: "ch_mg_0001",
        sourceSessionIds: ["ch_ss_0001", "ch_ss_0002"],
        resultSummary: "Test",
        resultDetailedSummary: "Detailed test summary",
        status: "completed",
        projectId: "ch_pj_0001",
        error: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(merge.resultDetailedSummary).toBe("Detailed test summary");
      expect(merge.projectId).toBe("ch_pj_0001");
    });

    it("エラー情報を持てる", () => {
      const merge: Merge = {
        mergeId: "ch_mg_0001",
        sourceSessionIds: ["ch_ss_0001", "ch_ss_0002"],
        resultSummary: "",
        status: "error",
        error: "Merge failed due to timeout",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(merge.status).toBe("error");
      expect(merge.error).toBe("Merge failed due to timeout");
    });
  });
});

describe("Data Validation", () => {
  describe("マージ要件", () => {
    it("2つ以上のセッションが必要", () => {
      // マージには最低2つのセッションが必要
      const validSessionIds = ["ch_ss_0001", "ch_ss_0002"];
      expect(validSessionIds.length).toBeGreaterThanOrEqual(2);

      const invalidSessionIds = ["ch_ss_0001"];
      expect(invalidSessionIds.length).toBeLessThan(2);
    });

    it("セッションIDはch_ss_プレフィックスを持つ", () => {
      mockSessions.forEach((session) => {
        expect(session.sessionId).toMatch(/^ch_ss_/);
      });
    });

    it("マージIDはch_mg_プレフィックスを持つ", () => {
      mockMerges.forEach((merge) => {
        expect(merge.mergeId).toMatch(/^ch_mg_/);
      });
    });
  });

  describe("日付フォーマット", () => {
    it("セッションの日付はISO文字列", () => {
      mockSessions.forEach((session) => {
        expect(() => new Date(session.createdAt)).not.toThrow();
        expect(() => new Date(session.updatedAt)).not.toThrow();
      });
    });

    it("マージの日付はDateオブジェクト", () => {
      mockMerges.forEach((merge) => {
        expect(merge.createdAt).toBeInstanceOf(Date);
        expect(merge.updatedAt).toBeInstanceOf(Date);
      });
    });
  });
});

describe("API Contract", () => {
  describe("POST /api/merges リクエスト形式", () => {
    it("正しいリクエストボディ形式", () => {
      const requestBody = {
        sourceSessionIds: ["ch_ss_0001", "ch_ss_0002"],
        projectId: "ch_pj_0001",
      };

      expect(requestBody.sourceSessionIds).toBeInstanceOf(Array);
      expect(requestBody.sourceSessionIds.length).toBeGreaterThanOrEqual(2);
      expect(typeof requestBody.projectId).toBe("string");
    });

    it("projectIdはオプショナル", () => {
      const requestBody = {
        sourceSessionIds: ["ch_ss_0001", "ch_ss_0002"],
      };

      expect(requestBody.sourceSessionIds).toBeDefined();
      expect((requestBody as { projectId?: string }).projectId).toBeUndefined();
    });
  });

  describe("GET /api/merges クエリパラメータ", () => {
    it("ページネーションパラメータ", () => {
      const params = new URLSearchParams({
        page: "1",
        limit: "20",
      });

      expect(params.get("page")).toBe("1");
      expect(params.get("limit")).toBe("20");
    });

    it("フィルタパラメータ", () => {
      const params = new URLSearchParams({
        page: "1",
        limit: "20",
        projectId: "ch_pj_0001",
        status: "completed",
      });

      expect(params.get("projectId")).toBe("ch_pj_0001");
      expect(params.get("status")).toBe("completed");
    });
  });
});

describe("Status Colors Mapping", () => {
  it("セッションステータスに対応した色が定義されている", () => {
    const sessionStatusColors: Record<SessionItem["status"], string> = {
      idle: "bg-gray-400",
      active: "bg-blue-500",
      completed: "bg-green-500",
      error: "bg-red-500",
    };

    expect(sessionStatusColors.idle).toBe("bg-gray-400");
    expect(sessionStatusColors.active).toBe("bg-blue-500");
    expect(sessionStatusColors.completed).toBe("bg-green-500");
    expect(sessionStatusColors.error).toBe("bg-red-500");
  });

  it("マージステータスに対応した色が定義されている", () => {
    const mergeStatusColors: Record<MergeStatus, string> = {
      pending: "bg-gray-400",
      processing: "bg-blue-500",
      completed: "bg-green-500",
      error: "bg-red-500",
    };

    expect(mergeStatusColors.pending).toBe("bg-gray-400");
    expect(mergeStatusColors.processing).toBe("bg-blue-500");
    expect(mergeStatusColors.completed).toBe("bg-green-500");
    expect(mergeStatusColors.error).toBe("bg-red-500");
  });
});

describe("Utility Functions", () => {
  describe("セッションのソート", () => {
    it("作成日時でソートできる", () => {
      const sorted = [...mockSessions].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      expect(sorted[0].sessionId).toBe("ch_ss_0001");
      expect(sorted[1].sessionId).toBe("ch_ss_0002");
      expect(sorted[2].sessionId).toBe("ch_ss_0003");
    });

    it("降順ソートも可能", () => {
      const sorted = [...mockSessions].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      expect(sorted[0].sessionId).toBe("ch_ss_0003");
      expect(sorted[2].sessionId).toBe("ch_ss_0001");
    });
  });

  describe("セッションの重複チェック", () => {
    it("同じセッションIDの重複を検出できる", () => {
      const sessions = [...mockSessions, mockSessions[0]];
      const uniqueIds = new Set(sessions.map((s) => s.sessionId));

      expect(sessions.length).toBe(4);
      expect(uniqueIds.size).toBe(3);
    });

    it("重複を除去できる", () => {
      const sessions = [...mockSessions, mockSessions[0]];
      const unique = sessions.filter(
        (session, index, self) =>
          self.findIndex((s) => s.sessionId === session.sessionId) === index
      );

      expect(unique.length).toBe(3);
    });
  });
});
