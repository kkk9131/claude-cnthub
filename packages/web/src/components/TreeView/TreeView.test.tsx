/**
 * TreeView コンポーネントのテスト
 *
 * TDD: テストファーストで実装を検証
 */

import { describe, it, expect, vi } from "vitest";
import type { TreeNodeData } from "./types";
import { collapseAll, expandAll } from "./TreeView";

// テスト用のサンプルデータ
const sampleTreeData: TreeNodeData[] = [
  {
    id: "project-1",
    label: "Project Alpha",
    type: "project",
    children: [
      {
        id: "session-1",
        label: "Session 1",
        type: "session",
        metadata: { createdAt: "2024-01-01" },
      },
      {
        id: "session-2",
        label: "Session 2",
        type: "session",
        children: [
          {
            id: "merge-1",
            label: "Merge Summary",
            type: "merge",
          },
        ],
      },
    ],
  },
  {
    id: "project-2",
    label: "Project Beta",
    type: "project",
  },
];

describe("TreeView", () => {
  describe("types", () => {
    it("TreeNodeDataは正しい構造を持つ", () => {
      const node: TreeNodeData = {
        id: "test-1",
        label: "Test Node",
        type: "session",
      };

      expect(node.id).toBe("test-1");
      expect(node.label).toBe("Test Node");
      expect(node.type).toBe("session");
    });

    it("TreeNodeDataはchildrenを持てる", () => {
      const node: TreeNodeData = {
        id: "parent",
        label: "Parent",
        type: "project",
        children: [
          { id: "child-1", label: "Child 1", type: "session" },
          { id: "child-2", label: "Child 2", type: "session" },
        ],
      };

      expect(node.children).toHaveLength(2);
      expect(node.children?.[0].id).toBe("child-1");
    });

    it("TreeNodeDataはmetadataを持てる", () => {
      const node: TreeNodeData = {
        id: "test-1",
        label: "Test Node",
        type: "session",
        metadata: { createdAt: "2024-01-01", count: 5 },
      };

      expect(node.metadata?.createdAt).toBe("2024-01-01");
      expect(node.metadata?.count).toBe(5);
    });
  });

  describe("collapseAll", () => {
    it("空のSetを返す", () => {
      const result = collapseAll();
      expect(result.size).toBe(0);
    });
  });

  describe("expandAll", () => {
    it("子を持つノードのIDをすべて含むSetを返す", () => {
      const result = expandAll(sampleTreeData);

      // project-1とsession-2は子を持つ
      expect(result.has("project-1")).toBe(true);
      expect(result.has("session-2")).toBe(true);

      // これらは子を持たない
      expect(result.has("session-1")).toBe(false);
      expect(result.has("merge-1")).toBe(false);
      expect(result.has("project-2")).toBe(false);
    });

    it("空配列では空のSetを返す", () => {
      const result = expandAll([]);
      expect(result.size).toBe(0);
    });

    it("ネストが深い場合も全ての親ノードを展開する", () => {
      const deepNestedData: TreeNodeData[] = [
        {
          id: "level-0",
          label: "Level 0",
          type: "project",
          children: [
            {
              id: "level-1",
              label: "Level 1",
              type: "project",
              children: [
                {
                  id: "level-2",
                  label: "Level 2",
                  type: "project",
                  children: [
                    {
                      id: "level-3",
                      label: "Level 3",
                      type: "session",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];

      const result = expandAll(deepNestedData);

      expect(result.has("level-0")).toBe(true);
      expect(result.has("level-1")).toBe(true);
      expect(result.has("level-2")).toBe(true);
      expect(result.has("level-3")).toBe(false); // 子を持たない
    });
  });

  describe("node type icons", () => {
    it("projectタイプには正しいタイプが設定される", () => {
      const node: TreeNodeData = {
        id: "project-1",
        label: "Project",
        type: "project",
      };
      expect(node.type).toBe("project");
    });

    it("sessionタイプには正しいタイプが設定される", () => {
      const node: TreeNodeData = {
        id: "session-1",
        label: "Session",
        type: "session",
      };
      expect(node.type).toBe("session");
    });

    it("mergeタイプには正しいタイプが設定される", () => {
      const node: TreeNodeData = {
        id: "merge-1",
        label: "Merge",
        type: "merge",
      };
      expect(node.type).toBe("merge");
    });
  });

  describe("sample data structure", () => {
    it("サンプルデータの構造が正しい", () => {
      expect(sampleTreeData).toHaveLength(2);
      expect(sampleTreeData[0].id).toBe("project-1");
      expect(sampleTreeData[0].children).toHaveLength(2);
      expect(sampleTreeData[1].id).toBe("project-2");
      expect(sampleTreeData[1].children).toBeUndefined();
    });

    it("ネストされた子ノードにアクセスできる", () => {
      const project1 = sampleTreeData[0];
      const session2 = project1.children?.[1];
      const merge1 = session2?.children?.[0];

      expect(merge1?.id).toBe("merge-1");
      expect(merge1?.type).toBe("merge");
    });
  });
});
