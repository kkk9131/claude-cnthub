import { memo, useCallback } from "react";
import type { TreeNodeProps, TreeNodeData } from "./types";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  FolderIcon,
  DocumentIcon,
  GitMergeIcon,
} from "../icons";
import { TreeBranch } from "./TreeBranch";

/**
 * ノードタイプに応じたアイコンを返す
 */
function getNodeIcon(type: TreeNodeData["type"]) {
  switch (type) {
    case "project":
      return FolderIcon;
    case "session":
      return DocumentIcon;
    case "merge":
      return GitMergeIcon;
    default:
      return DocumentIcon;
  }
}

/**
 * 個別のツリーノードを表示するコンポーネント
 */
export const TreeNode = memo(function TreeNode({
  node,
  depth,
  onSelect,
  onExpand,
  selectedId,
  expandedNodes,
  focusedId,
  onFocusChange,
  flatNodeIds = [],
}: TreeNodeProps) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedId === node.id;

  const handleToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren) {
        onExpand?.(node, !isExpanded);
      }
    },
    [hasChildren, node, isExpanded, onExpand]
  );

  const handleSelect = useCallback(() => {
    onSelect?.(node);
  }, [node, onSelect]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect?.(node);
      } else if (e.key === "ArrowRight" && hasChildren && !isExpanded) {
        e.preventDefault();
        onExpand?.(node, true);
      } else if (e.key === "ArrowLeft" && hasChildren && isExpanded) {
        e.preventDefault();
        onExpand?.(node, false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const currentIndex = flatNodeIds.indexOf(node.id);
        if (currentIndex < flatNodeIds.length - 1) {
          onFocusChange?.(flatNodeIds[currentIndex + 1]);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const currentIndex = flatNodeIds.indexOf(node.id);
        if (currentIndex > 0) {
          onFocusChange?.(flatNodeIds[currentIndex - 1]);
        }
      } else if (e.key === "Home") {
        e.preventDefault();
        if (flatNodeIds.length > 0) {
          onFocusChange?.(flatNodeIds[0]);
        }
      } else if (e.key === "End") {
        e.preventDefault();
        if (flatNodeIds.length > 0) {
          onFocusChange?.(flatNodeIds[flatNodeIds.length - 1]);
        }
      }
    },
    [
      node,
      hasChildren,
      isExpanded,
      onSelect,
      onExpand,
      flatNodeIds,
      onFocusChange,
    ]
  );

  const NodeIcon = getNodeIcon(node.type);
  const paddingLeft = depth * 16 + 8;

  return (
    <li role="treeitem" aria-expanded={hasChildren ? isExpanded : undefined}>
      <div
        className={`
          flex items-center gap-1 py-1.5 px-2 cursor-pointer
          rounded-md transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--bg-base)]
          ${isSelected ? "bg-primary-500/20 text-primary-400" : "text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]"}
        `}
        style={{ paddingLeft: `${paddingLeft}px` }}
        onClick={handleSelect}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        data-node-id={node.id}
        aria-label={`${node.label}${hasChildren ? `, ${node.children?.length} items, ${isExpanded ? "expanded" : "collapsed"}` : ""}`}
      >
        {/* 展開/折りたたみボタン */}
        <button
          type="button"
          className={`
            w-4 h-4 flex items-center justify-center
            ${hasChildren ? "visible" : "invisible"}
          `}
          onClick={handleToggle}
          aria-label={
            hasChildren
              ? isExpanded
                ? `Collapse ${node.label}`
                : `Expand ${node.label}`
              : undefined
          }
          aria-hidden={!hasChildren}
          tabIndex={-1}
        >
          {isExpanded ? (
            <ChevronDownIcon className="w-3.5 h-3.5" />
          ) : (
            <ChevronRightIcon className="w-3.5 h-3.5" />
          )}
        </button>

        {/* ノードアイコン */}
        <NodeIcon
          className={`w-4 h-4 flex-shrink-0 ${
            node.type === "project"
              ? "text-yellow-500"
              : node.type === "merge"
                ? "text-purple-400"
                : "text-blue-400"
          }`}
        />

        {/* ラベル */}
        <span className="truncate text-sm">{node.label}</span>
      </div>

      {/* 子ノード */}
      {hasChildren && isExpanded && node.children && (
        <TreeBranch
          children={node.children}
          depth={depth + 1}
          onSelect={onSelect}
          onExpand={onExpand}
          selectedId={selectedId}
          expandedNodes={expandedNodes}
          focusedId={focusedId}
          onFocusChange={onFocusChange}
          flatNodeIds={flatNodeIds}
        />
      )}
    </li>
  );
});
