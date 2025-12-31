/**
 * DnD コンポーネントのテスト
 *
 * TDD: テストファーストで実装を検証
 */

import { describe, it, expect, vi } from "vitest";
import type {
  DraggableData,
  DroppableData,
  DnDProviderProps,
  DraggableItemProps,
  DroppableZoneProps,
} from "../types";
import { isDraggingItem } from "../DraggableItem";
import { isZoneActive, canAcceptDrop } from "../DroppableZone";

describe("DnD Types", () => {
  describe("DraggableData", () => {
    it("必須プロパティを持つ構造を作成できる", () => {
      const data: DraggableData = {
        id: "item-1",
        type: "session",
      };

      expect(data.id).toBe("item-1");
      expect(data.type).toBe("session");
    });

    it("すべてのタイプを設定できる", () => {
      const projectData: DraggableData = { id: "p-1", type: "project" };
      const sessionData: DraggableData = { id: "s-1", type: "session" };
      const mergeData: DraggableData = { id: "m-1", type: "merge" };

      expect(projectData.type).toBe("project");
      expect(sessionData.type).toBe("session");
      expect(mergeData.type).toBe("merge");
    });

    it("追加データを持てる", () => {
      const data: DraggableData = {
        id: "item-1",
        type: "session",
        data: { label: "Test Session", createdAt: "2024-01-01" },
      };

      expect(data.data?.label).toBe("Test Session");
      expect(data.data?.createdAt).toBe("2024-01-01");
    });
  });

  describe("DroppableData", () => {
    it("必須プロパティを持つ構造を作成できる", () => {
      const data: DroppableData = {
        id: "zone-1",
      };

      expect(data.id).toBe("zone-1");
    });

    it("受け入れ可能なタイプを指定できる", () => {
      const data: DroppableData = {
        id: "zone-1",
        accepts: ["session", "merge"],
      };

      expect(data.accepts).toContain("session");
      expect(data.accepts).toContain("merge");
      expect(data.accepts).not.toContain("project");
    });
  });
});

describe("DnDProvider", () => {
  describe("型定義", () => {
    it("必須プロパティchildrenを持つ", () => {
      const props: DnDProviderProps = {
        children: null,
      };

      expect(props.children).toBeNull();
    });

    it("すべてのコールバックを設定できる", () => {
      const onDragStart = vi.fn();
      const onDragOver = vi.fn();
      const onDragEnd = vi.fn();

      const props: DnDProviderProps = {
        children: null,
        onDragStart,
        onDragOver,
        onDragEnd,
      };

      expect(props.onDragStart).toBe(onDragStart);
      expect(props.onDragOver).toBe(onDragOver);
      expect(props.onDragEnd).toBe(onDragEnd);
    });
  });
});

describe("DraggableItem", () => {
  describe("型定義", () => {
    it("必須プロパティを持つ", () => {
      const props: DraggableItemProps = {
        id: "draggable-1",
        data: { id: "item-1", type: "session" },
        children: null,
      };

      expect(props.id).toBe("draggable-1");
      expect(props.data.type).toBe("session");
    });

    it("オプショナルプロパティを設定できる", () => {
      const props: DraggableItemProps = {
        id: "draggable-1",
        data: { id: "item-1", type: "session" },
        children: null,
        disabled: true,
        className: "custom-class",
      };

      expect(props.disabled).toBe(true);
      expect(props.className).toBe("custom-class");
    });
  });
});

describe("DroppableZone", () => {
  describe("型定義", () => {
    it("必須プロパティを持つ", () => {
      const props: DroppableZoneProps = {
        id: "droppable-1",
        children: null,
      };

      expect(props.id).toBe("droppable-1");
    });

    it("すべてのオプショナルプロパティを設定できる", () => {
      const props: DroppableZoneProps = {
        id: "droppable-1",
        data: { id: "zone-1", accepts: ["session"] },
        children: null,
        disabled: false,
        className: "drop-zone",
        activeClassName: "drop-zone-active",
      };

      expect(props.data?.accepts).toContain("session");
      expect(props.disabled).toBe(false);
      expect(props.activeClassName).toBe("drop-zone-active");
    });
  });
});

describe("DnD Integration", () => {
  describe("TreeViewとの統合", () => {
    it("TreeNodeDataと互換性のあるデータ構造", () => {
      // TreeView の type と DnD の type が同じ
      const treeNodeType = "session" as const;
      const dragData: DraggableData = {
        id: "node-1",
        type: treeNodeType,
      };

      expect(dragData.type).toBe("session");
    });
  });

  describe("アクセシビリティ", () => {
    it("キーボード操作用のプロパティが定義されている", () => {
      // dnd-kit は内部的にキーボード操作をサポート
      // ここでは型が正しく定義されていることを確認
      const props: DraggableItemProps = {
        id: "accessible-item",
        data: { id: "item", type: "session" },
        children: null,
        disabled: false,
      };

      expect(props.disabled).toBe(false);
    });
  });
});

describe("Utility Functions", () => {
  describe("isDraggingItem", () => {
    it("アクティブIDと一致する場合trueを返す", () => {
      expect(isDraggingItem("item-1", "item-1")).toBe(true);
    });

    it("アクティブIDと一致しない場合falseを返す", () => {
      expect(isDraggingItem("item-1", "item-2")).toBe(false);
    });

    it("アクティブIDがnullの場合falseを返す", () => {
      expect(isDraggingItem(null, "item-1")).toBe(false);
    });
  });

  describe("isZoneActive", () => {
    it("オーバーIDと一致する場合trueを返す", () => {
      expect(isZoneActive("zone-1", "zone-1")).toBe(true);
    });

    it("オーバーIDと一致しない場合falseを返す", () => {
      expect(isZoneActive("zone-1", "zone-2")).toBe(false);
    });

    it("オーバーIDがnullの場合falseを返す", () => {
      expect(isZoneActive(null, "zone-1")).toBe(false);
    });
  });

  describe("canAcceptDrop", () => {
    it("acceptsが未定義の場合trueを返す", () => {
      expect(canAcceptDrop(undefined, "session")).toBe(true);
    });

    it("acceptsが空配列の場合trueを返す", () => {
      expect(canAcceptDrop([], "session")).toBe(true);
    });

    it("acceptsにタイプが含まれる場合trueを返す", () => {
      expect(canAcceptDrop(["session", "merge"], "session")).toBe(true);
      expect(canAcceptDrop(["session", "merge"], "merge")).toBe(true);
    });

    it("acceptsにタイプが含まれない場合falseを返す", () => {
      expect(canAcceptDrop(["session"], "project")).toBe(false);
      expect(canAcceptDrop(["merge"], "session")).toBe(false);
    });

    it("全タイプを受け入れる設定", () => {
      const allTypes: Array<"project" | "session" | "merge"> = [
        "project",
        "session",
        "merge",
      ];
      expect(canAcceptDrop(allTypes, "project")).toBe(true);
      expect(canAcceptDrop(allTypes, "session")).toBe(true);
      expect(canAcceptDrop(allTypes, "merge")).toBe(true);
    });
  });
});
