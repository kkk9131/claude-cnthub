/**
 * TreeView コンポーネントの型定義
 */

/**
 * ツリーノードのデータ構造
 */
export interface TreeNodeData {
  /** ノードの一意識別子 */
  id: string;
  /** 表示ラベル */
  label: string;
  /** ノードの種類 */
  type: "project" | "session" | "merge";
  /** 子ノード */
  children?: TreeNodeData[];
  /** 展開状態（内部状態管理用） */
  isExpanded?: boolean;
  /** 追加のメタデータ */
  metadata?: Record<string, unknown>;
}

/**
 * TreeView コンポーネントのProps
 */
export interface TreeViewProps {
  /** ツリーデータ */
  data: TreeNodeData[];
  /** ノード選択時のコールバック */
  onNodeSelect?: (node: TreeNodeData) => void;
  /** ノード展開/折りたたみ時のコールバック */
  onNodeExpand?: (node: TreeNodeData, isExpanded: boolean) => void;
  /** 選択中のノードID */
  selectedId?: string;
  /** カスタムクラス名 */
  className?: string;
}

/**
 * TreeNode コンポーネントのProps
 */
export interface TreeNodeProps {
  /** ノードデータ */
  node: TreeNodeData;
  /** ネストの深さ（インデント計算用） */
  depth: number;
  /** ノード選択時のコールバック */
  onSelect?: (node: TreeNodeData) => void;
  /** ノード展開/折りたたみ時のコールバック */
  onExpand?: (node: TreeNodeData, isExpanded: boolean) => void;
  /** 選択中のノードID */
  selectedId?: string;
  /** 展開状態のMap */
  expandedNodes: Set<string>;
  /** フォーカス中のノードID */
  focusedId?: string;
  /** フォーカス変更時のコールバック */
  onFocusChange?: (nodeId: string) => void;
  /** フラットなノードIDリスト（キーボードナビゲーション用） */
  flatNodeIds?: string[];
}

/**
 * TreeBranch コンポーネントのProps
 */
export interface TreeBranchProps {
  /** 子ノードの配列 */
  children: TreeNodeData[];
  /** ネストの深さ */
  depth: number;
  /** ノード選択時のコールバック */
  onSelect?: (node: TreeNodeData) => void;
  /** ノード展開/折りたたみ時のコールバック */
  onExpand?: (node: TreeNodeData, isExpanded: boolean) => void;
  /** 選択中のノードID */
  selectedId?: string;
  /** 展開状態のMap */
  expandedNodes: Set<string>;
  /** フォーカス中のノードID */
  focusedId?: string;
  /** フォーカス変更時のコールバック */
  onFocusChange?: (nodeId: string) => void;
  /** フラットなノードIDリスト（キーボードナビゲーション用） */
  flatNodeIds?: string[];
}
