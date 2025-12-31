import { memo } from "react";
import type { TreeBranchProps } from "./types";
import { TreeNode } from "./TreeNode";

/**
 * 子ノードのグループを表示するコンポーネント
 */
export const TreeBranch = memo(function TreeBranch({
  children,
  depth,
  onSelect,
  onExpand,
  selectedId,
  expandedNodes,
  focusedId,
  onFocusChange,
  flatNodeIds,
}: TreeBranchProps) {
  if (!children || children.length === 0) {
    return null;
  }

  return (
    <ul role="group" className="list-none m-0 p-0">
      {children.map((childNode) => (
        <TreeNode
          key={childNode.id}
          node={childNode}
          depth={depth}
          onSelect={onSelect}
          onExpand={onExpand}
          selectedId={selectedId}
          expandedNodes={expandedNodes}
          focusedId={focusedId}
          onFocusChange={onFocusChange}
          flatNodeIds={flatNodeIds}
        />
      ))}
    </ul>
  );
});
