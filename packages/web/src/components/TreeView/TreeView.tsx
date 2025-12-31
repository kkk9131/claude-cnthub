import { useState, useCallback, useMemo } from "react";
import type { TreeViewProps, TreeNodeData } from "./types";
import { TreeBranch } from "./TreeBranch";

/**
 * 可視状態のノードIDをフラットリストで取得
 */
function getVisibleNodeIds(
  nodes: TreeNodeData[],
  expandedNodes: Set<string>
): string[] {
  const ids: string[] = [];
  const traverse = (nodeList: TreeNodeData[]) => {
    for (const node of nodeList) {
      ids.push(node.id);
      if (
        node.children &&
        node.children.length > 0 &&
        expandedNodes.has(node.id)
      ) {
        traverse(node.children);
      }
    }
  };
  traverse(nodes);
  return ids;
}

/**
 * ツリー構造でデータを表示するメインコンポーネント
 *
 * セッション・マージをツリー形式で表示する。
 * 展開/折りたたみ、ノード選択機能を提供。
 */
export function TreeView({
  data,
  onNodeSelect,
  onNodeExpand,
  selectedId,
  className = "",
}: TreeViewProps) {
  // 展開状態を管理（Set<nodeId>）
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(() => {
    // 初期状態で全てのノードを展開
    const initialExpanded = new Set<string>();
    const collectIds = (nodes: TreeNodeData[]) => {
      for (const node of nodes) {
        if (node.children && node.children.length > 0) {
          initialExpanded.add(node.id);
          collectIds(node.children);
        }
      }
    };
    collectIds(data);
    return initialExpanded;
  });

  // フォーカス状態を管理
  const [focusedId, setFocusedId] = useState<string | undefined>(undefined);

  // 可視ノードのフラットリストを計算
  const flatNodeIds = useMemo(
    () => getVisibleNodeIds(data, expandedNodes),
    [data, expandedNodes]
  );

  const handleFocusChange = useCallback((nodeId: string) => {
    setFocusedId(nodeId);
    // フォーカス対象の DOM 要素にフォーカスを移動
    const element = document.querySelector(
      `[data-node-id="${nodeId}"]`
    ) as HTMLElement;
    element?.focus();
  }, []);

  const handleExpand = useCallback(
    (node: TreeNodeData, isExpanded: boolean) => {
      setExpandedNodes((prev) => {
        const next = new Set(prev);
        if (isExpanded) {
          next.add(node.id);
        } else {
          next.delete(node.id);
        }
        return next;
      });
      onNodeExpand?.(node, isExpanded);
    },
    [onNodeExpand]
  );

  const handleSelect = useCallback(
    (node: TreeNodeData) => {
      onNodeSelect?.(node);
    },
    [onNodeSelect]
  );

  // 空データの場合
  if (!data || data.length === 0) {
    return (
      <div
        className={`text-[var(--text-muted)] text-sm py-4 text-center ${className}`}
        role="tree"
        aria-label="Empty tree"
      >
        No items to display
      </div>
    );
  }

  return (
    <nav
      className={`tree-view ${className}`}
      role="tree"
      aria-label="Tree navigation"
    >
      <TreeBranch
        children={data}
        depth={0}
        onSelect={handleSelect}
        onExpand={handleExpand}
        selectedId={selectedId}
        expandedNodes={expandedNodes}
        focusedId={focusedId}
        onFocusChange={handleFocusChange}
        flatNodeIds={flatNodeIds}
      />
    </nav>
  );
}

/**
 * 全ノードを折りたたむユーティリティ
 */
export function collapseAll(): Set<string> {
  return new Set();
}

/**
 * 全ノードを展開するユーティリティ
 */
export function expandAll(data: TreeNodeData[]): Set<string> {
  const expanded = new Set<string>();
  const collectIds = (nodes: TreeNodeData[]) => {
    for (const node of nodes) {
      if (node.children && node.children.length > 0) {
        expanded.add(node.id);
        collectIds(node.children);
      }
    }
  };
  collectIds(data);
  return expanded;
}
