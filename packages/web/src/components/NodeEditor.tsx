/**
 * ノードエディタ (R-12: get/export 操作)
 *
 * React Flow ベースのノードエディタ
 * - 中心に「現在のコンテキスト」ノード
 * - セッションをドラッグ接続で get 操作
 * - エッジ削除で export 操作
 * - ノード位置・エッジ・接続状態をlocalStorageで永続化
 */

import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type Connection,
  type NodeTypes,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

// localStorage キー
const STORAGE_KEY_POSITIONS = "cnthub-node-positions";
const STORAGE_KEY_EDGES = "cnthub-edges";
const STORAGE_KEY_CONNECTED = "cnthub-connected-sessions";

// API URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3048";

// Edge API response type
interface EdgeApiResponse {
  edgeId: string;
  sourceSessionId: string;
  targetClaudeSessionId: string;
  createdAt: string;
}

// Edge-to-backend mapping
interface EdgeMapping {
  [reactFlowEdgeId: string]: string; // reactFlowEdgeId -> backendEdgeId
}

// 永続化データの型
interface StoredPositions {
  [nodeId: string]: { x: number; y: number };
}

// ノードサイズ（衝突検出用）
const SESSION_NODE_WIDTH = 180;
const SESSION_NODE_HEIGHT = 70;
const CONTEXT_NODE_WIDTH = 260;
const CONTEXT_NODE_HEIGHT = 140;
const NODE_PADDING = 20;

// ノードタイプに応じたサイズを取得
function getNodeSize(node: Node): { width: number; height: number } {
  if (node.type === "context") {
    return { width: CONTEXT_NODE_WIDTH, height: CONTEXT_NODE_HEIGHT };
  }
  return { width: SESSION_NODE_WIDTH, height: SESSION_NODE_HEIGHT };
}

// 2つのノードが重なっているかチェック（左上隅ベースの位置から計算）
function checkCollision(node1: Node, node2: Node): boolean {
  const size1 = getNodeSize(node1);
  const size2 = getNodeSize(node2);

  const center1 = {
    x: node1.position.x + size1.width / 2,
    y: node1.position.y + size1.height / 2,
  };
  const center2 = {
    x: node2.position.x + size2.width / 2,
    y: node2.position.y + size2.height / 2,
  };

  const minDistX = (size1.width + size2.width) / 2 + NODE_PADDING;
  const minDistY = (size1.height + size2.height) / 2 + NODE_PADDING;

  const distX = Math.abs(center1.x - center2.x);
  const distY = Math.abs(center1.y - center2.y);

  return distX < minDistX && distY < minDistY;
}

// 重ならない位置を見つける（8方向探索）
function findNonOverlappingPosition(
  draggedNode: Node,
  allNodes: Node[]
): { x: number; y: number } {
  const pos = { ...draggedNode.position };
  const otherNodes = allNodes.filter((n) => n.id !== draggedNode.id);
  const tempNode = { ...draggedNode, position: pos };

  // 現在位置で衝突がなければそのまま返す
  const initialCollision = otherNodes.some((other) =>
    checkCollision(tempNode, other)
  );
  if (!initialCollision) {
    return pos;
  }

  // 8方向探索（右、下、左、上、右下、右上、左下、左上）
  const directions = [
    { dx: 1, dy: 0 }, // 右
    { dx: 0, dy: 1 }, // 下
    { dx: -1, dy: 0 }, // 左
    { dx: 0, dy: -1 }, // 上
    { dx: 1, dy: 1 }, // 右下
    { dx: 1, dy: -1 }, // 右上
    { dx: -1, dy: 1 }, // 左下
    { dx: -1, dy: -1 }, // 左上
  ];

  const step = NODE_PADDING + 20;

  for (let distance = 1; distance <= 10; distance++) {
    for (const dir of directions) {
      const testPos = {
        x: pos.x + dir.dx * step * distance,
        y: pos.y + dir.dy * step * distance,
      };
      tempNode.position = testPos;

      const hasCollision = otherNodes.some((other) =>
        checkCollision(tempNode, other)
      );

      if (!hasCollision) {
        return testPos;
      }
    }
  }

  // 見つからない場合は右にオフセット
  return { x: pos.x + step * 3, y: pos.y };
}

// グリッド配置で重ならない位置を計算（8方向探索）
function calculateGridPosition(
  index: number,
  existingNodes: Node[],
  nodeType: "session" | "context"
): { x: number; y: number } {
  const cols = 4;
  const rowSpacing = nodeType === "context" ? 180 : 100;
  const colSpacing = nodeType === "context" ? 280 : 220;
  const startX = nodeType === "context" ? 500 : 50;
  const startY = 80;

  // 基本的なグリッド位置
  const baseX = startX + (index % cols) * colSpacing;
  const baseY = startY + Math.floor(index / cols) * rowSpacing;

  const tempNode: Node = {
    id: "temp",
    type: nodeType,
    position: { x: baseX, y: baseY },
    data: {},
  };

  // まず基本位置で衝突チェック
  const hasInitialCollision = existingNodes.some((other) =>
    checkCollision(tempNode, other)
  );
  if (!hasInitialCollision) {
    return { x: baseX, y: baseY };
  }

  // 8方向探索
  const directions = [
    { dx: 1, dy: 0 },
    { dx: 0, dy: 1 },
    { dx: -1, dy: 0 },
    { dx: 0, dy: -1 },
    { dx: 1, dy: 1 },
    { dx: 1, dy: -1 },
    { dx: -1, dy: 1 },
    { dx: -1, dy: -1 },
  ];

  const step = nodeType === "context" ? 100 : 60;

  for (let distance = 1; distance <= 15; distance++) {
    for (const dir of directions) {
      const testPos = {
        x: baseX + dir.dx * step * distance,
        y: baseY + dir.dy * step * distance,
      };
      tempNode.position = testPos;

      const hasCollision = existingNodes.some((other) =>
        checkCollision(tempNode, other)
      );

      if (!hasCollision && testPos.x >= 0 && testPos.y >= 0) {
        return testPos;
      }
    }
  }

  // 見つからない場合は下に配置
  return { x: baseX, y: baseY + rowSpacing * (index + 1) };
}

// localStorage ヘルパー関数
function loadPositions(): StoredPositions {
  try {
    const data = localStorage.getItem(STORAGE_KEY_POSITIONS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function savePositions(positions: StoredPositions): void {
  try {
    localStorage.setItem(STORAGE_KEY_POSITIONS, JSON.stringify(positions));
  } catch {
    // ignore
  }
}

function loadEdges(): Edge[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_EDGES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveEdges(edges: Edge[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_EDGES, JSON.stringify(edges));
  } catch {
    // ignore
  }
}

function loadConnectedSessions(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY_CONNECTED);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveConnectedSessions(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONNECTED, JSON.stringify(ids));
  } catch {
    // ignore
  }
}

// Edge API functions
async function createEdgeApi(
  sourceSessionId: string,
  targetClaudeSessionId: string
): Promise<EdgeApiResponse | null> {
  try {
    const response = await fetch(`${API_URL}/api/edges`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sourceSessionId, targetClaudeSessionId }),
    });
    if (!response.ok) {
      console.warn("[NodeEditor] Failed to create edge:", response.status);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn("[NodeEditor] Error creating edge:", error);
    return null;
  }
}

async function deleteEdgeApi(edgeId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/edges/${edgeId}`, {
      method: "DELETE",
    });
    return response.ok || response.status === 404;
  } catch (error) {
    console.warn("[NodeEditor] Error deleting edge:", error);
    return false;
  }
}

async function loadEdgesFromApi(
  claudeSessionId: string
): Promise<EdgeApiResponse[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/edges/by-target/${claudeSessionId}`
    );
    if (!response.ok) return [];
    const data = await response.json();
    return data.edges || [];
  } catch (error) {
    console.warn("[NodeEditor] Error loading edges:", error);
    return [];
  }
}

interface SessionNodeData {
  label: string;
  sessionId?: string;
  status?: string;
  date?: string;
  tokenCount?: number;
  inputTokens?: number;
  outputTokens?: number;
  projectName?: string;
  isHovered?: boolean;
  onClick?: () => void;
  theme?: "dark" | "light";
  /** 問題があるかどうか */
  hasIssues?: boolean;
  /** 問題タイプ */
  issueType?: string;
  /** 重要度 */
  importance?: string;
  /** カテゴリ */
  category?: string;
  [key: string]: unknown;
}

interface MergedSummary {
  shortSummary: string;
  detailedSummary: string;
  keyDecisions?: string[];
  topics?: string[];
  sessionCount: number;
  totalOriginalTokens: number;
  mergedTokens: number;
  compressionRatio: number;
}

type MergeStatus = "idle" | "merging" | "completed" | "error";

interface ContextNodeData {
  label: string;
  sessionId?: string;
  sessionName?: string;
  status?: string;
  tokenCount?: number;
  inputTokens?: number;
  outputTokens?: number;
  connectedCount: number;
  observationCount: number;
  projectName?: string;
  onExport?: () => void;
  mergeStatus?: MergeStatus;
  mergedSummary?: MergedSummary;
  [key: string]: unknown;
}

// トークン数をフォーマット（M/k 表記）
function formatTokenCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
}

// 問題タイプのラベル
const ISSUE_TYPE_LABELS: Record<string, string> = {
  error_loop: "エラーの繰り返し",
  edit_loop: "編集ループ",
  test_failure_loop: "テスト失敗ループ",
  rollback: "ロールバック",
  other: "その他の問題",
};

// 重要度のスタイル
const IMPORTANCE_STYLES: Record<string, string> = {
  high: "bg-red-500/20 text-red-400 border-red-500/50",
  medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  low: "bg-gray-500/20 text-gray-400 border-gray-500/50",
};

const CATEGORY_ICONS: Record<string, string> = {
  feature: "F",
  bugfix: "B",
  refactor: "R",
  exploration: "E",
  other: "O",
};

// カテゴリのラベル
const CATEGORY_LABELS: Record<string, string> = {
  feature: "機能追加",
  bugfix: "バグ修正",
  refactor: "リファクタ",
  exploration: "調査",
  other: "その他",
};

// セッションノードコンポーネント
function SessionNode({ data }: { data: SessionNodeData }) {
  const isDark = data.theme !== "light";
  const labelClass = isDark ? "text-white" : "text-[var(--text-primary)]";
  const baseStyle = isDark
    ? {
        backgroundColor: "#1a1a19",
        borderColor: "#3a3a39",
        color: "#f5f5f1",
      }
    : {
        backgroundColor: "#ffffff",
        borderColor: "#e8e6dc",
        color: "#141413",
      };
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        data.onClick?.();
      }
    },
    [data]
  );

  const issueLabel = data.issueType
    ? ISSUE_TYPE_LABELS[data.issueType] || data.issueType
    : "問題あり";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={data.onClick}
      onKeyDown={handleKeyDown}
      aria-label={`Session: ${data.label}${data.projectName ? ` - Project: ${data.projectName}` : ""}${data.hasIssues ? ` - ${issueLabel}` : ""}`}
      style={baseStyle}
      className={
        "session-node group px-4 py-3 bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--border-subtle)] rounded-lg shadow-md w-[180px] h-[70px] relative transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-400)] focus:ring-offset-2 focus:ring-offset-[var(--bg-base)] " +
        (data.hasIssues ? "border-red-500/50 bg-red-500/10 " : "") +
        (data.isHovered
          ? "border-[var(--color-primary-400)] bg-[var(--color-primary-400)]/10 ring-2 ring-[var(--color-primary-400)]/50 scale-105"
          : data.hasIssues
            ? ""
            : "hover:bg-[var(--color-primary-400)]/10 hover:border-[var(--color-primary-400)] hover:shadow-lg")
      }
    >
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-[var(--color-primary-500)]"
        aria-hidden="true"
      />
      {/* バグアイコン */}
      {data.hasIssues && (
        <div
          className="absolute -top-2 -left-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center cursor-help"
          title={issueLabel}
        >
          <span role="img" aria-label="問題あり">
            {"\u{1F41B}"}
          </span>
        </div>
      )}
      {/* トークン数表示 */}
      {(data.inputTokens !== undefined || data.outputTokens !== undefined) && (
        <div
          className="absolute -top-2 -right-2 bg-[var(--bg-elevated)] text-[var(--text-muted)] text-[10px] px-1.5 py-0.5 rounded-full border border-[var(--border-default)] whitespace-nowrap"
          aria-label={`Input: ${data.inputTokens || 0}, Output: ${data.outputTokens || 0}`}
        >
          in:{formatTokenCount(data.inputTokens || 0)} / out:
          {formatTokenCount(data.outputTokens || 0)}
        </div>
      )}
      <div className={`text-sm font-semibold truncate ${labelClass}`}>
        {data.label}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="flex items-center gap-2 min-w-0">
          {data.date && (
            <span className="text-xs text-[var(--text-secondary)]">
              {data.date}
            </span>
          )}
          {data.projectName && (
            <span
              className="px-1.5 py-0.5 bg-[var(--bg-elevated)] rounded text-[10px] text-[var(--text-primary)] truncate max-w-[70px]"
              title={data.projectName}
            >
              {data.projectName}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 ml-auto shrink-0">
          {/* 重要度: アイコン表示 */}
          {data.importance && data.importance !== "medium" && (
            <span
              className={`w-4 h-4 rounded border text-[9px] font-bold flex items-center justify-center ${IMPORTANCE_STYLES[data.importance] || ""}`}
              title={`重要度: ${data.importance}`}
              aria-label={`重要度: ${data.importance}`}
            >
              {data.importance === "high" ? "H" : "L"}
            </span>
          )}
          {/* カテゴリ: アイコン表示 */}
          {data.category && (
            <span
              className="w-4 h-4 rounded bg-[var(--bg-elevated)] text-[9px] font-semibold text-[var(--text-secondary)] flex items-center justify-center"
              title={CATEGORY_LABELS[data.category] || data.category}
              aria-label={CATEGORY_LABELS[data.category] || data.category}
            >
              {CATEGORY_ICONS[data.category] ||
                CATEGORY_LABELS[data.category]?.[0] ||
                "O"}
            </span>
          )}
        </div>
      </div>

      {/* Hover detail */}
      {(data.category || (data.importance && data.importance !== "medium")) && (
        <div className="absolute left-0 right-0 top-full mt-1 z-20 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity">
          <div className="px-2 py-1 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[10px] text-[var(--text-primary)] shadow-lg flex items-center gap-2">
            {data.importance && data.importance !== "medium" && (
              <span className="font-semibold">
                重要度: {data.importance === "high" ? "高" : "低"}
              </span>
            )}
            {data.category && (
              <span className="text-[var(--text-secondary)]">
                {CATEGORY_LABELS[data.category] || data.category}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// コンテキストノードコンポーネント（中心）- クリックで Export
function ContextNode({ data }: { data: ContextNodeData }) {
  const handleClick = useCallback(() => {
    data.onExport?.();
  }, [data]);

  const hasSession = !!data.sessionId;
  const isMerging = data.mergeStatus === "merging";
  const hasMergedSummary =
    data.mergeStatus === "completed" && data.mergedSummary;

  return (
    <div
      className={`px-6 py-4 text-white rounded-xl shadow-lg min-w-[240px] text-center cursor-pointer transition-colors relative ${
        isMerging
          ? "bg-[var(--color-primary-400)] animate-pulse"
          : "bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-500)]"
      }`}
      onClick={handleClick}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-[var(--color-cream-100)]"
      />
      {(data.inputTokens !== undefined || data.outputTokens !== undefined) && (
        <div className="absolute -top-2 -right-2 bg-white text-[var(--color-primary-600)] text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-[var(--color-primary-600)] whitespace-nowrap">
          in:{formatTokenCount(data.inputTokens || 0)} / out:
          {formatTokenCount(data.outputTokens || 0)}
        </div>
      )}
      <div className="text-sm font-bold truncate max-w-[220px]">
        {hasSession ? data.sessionName || data.sessionId : "セッション未接続"}
      </div>
      {hasSession && (
        <div className="flex items-center gap-2 mt-1">
          {data.projectName && (
            <span
              className="px-1.5 py-0.5 bg-white/20 rounded text-xs truncate max-w-[100px]"
              title={data.projectName}
            >
              {data.projectName}
            </span>
          )}
          {data.sessionId && (
            <span className="text-xs opacity-60 font-mono truncate">
              {data.sessionId}
            </span>
          )}
        </div>
      )}
      <div className="text-xs opacity-90 mt-3 flex justify-center gap-3">
        <span className="bg-white/20 px-2 py-0.5 rounded">
          {data.observationCount} obs
        </span>
        <span className="bg-white/20 px-2 py-0.5 rounded">
          +{data.connectedCount} merged
        </span>
      </div>

      {/* マージ状態表示 */}
      {isMerging && (
        <div className="text-xs mt-2 bg-white/30 px-2 py-1 rounded">
          🔄 要約を生成中...
        </div>
      )}
      {hasMergedSummary && (
        <div className="text-xs mt-2 bg-white/20 px-2 py-1 rounded text-left">
          <div className="font-bold mb-1">📝 統合要約:</div>
          <div className="line-clamp-2 opacity-90">
            {data.mergedSummary?.shortSummary}
          </div>
          <div className="opacity-60 mt-1">
            {data.mergedSummary?.sessionCount}セッション →{" "}
            {formatTokenCount(data.mergedSummary?.mergedTokens || 0)} tokens
          </div>
        </div>
      )}
      {data.mergeStatus === "error" && (
        <div className="text-xs mt-2 bg-red-500/30 px-2 py-1 rounded">
          ⚠️ マージ失敗
        </div>
      )}

      <div className="text-xs opacity-60 mt-2">クリックで Export</div>
    </div>
  );
}

// ノードタイプ登録
const nodeTypes: NodeTypes = {
  session: SessionNode,
  context: ContextNode,
};

interface Session {
  sessionId: string;
  name: string;
  status: string;
  updatedAt: string;
  tokenCount?: number;
  inputTokens?: number;
  outputTokens?: number;
  projectId?: string;
  /** 問題があるかどうか */
  hasIssues?: boolean;
  /** 問題タイプ */
  issueType?: string;
  /** 重要度 */
  importance?: string;
  /** カテゴリ */
  category?: string;
}

interface Project {
  projectId: string;
  name: string;
}

interface Observation {
  observationId: string;
  sessionId: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
}

interface CurrentSessionData {
  session: Session | null;
  observations: Observation[];
  observationCount: number;
  tokenCount: number;
  inputTokens?: number;
  outputTokens?: number;
}

interface DeleteTarget {
  type: "node" | "edge";
  id: string;
  name: string;
}

interface NodeEditorProps {
  sessions?: Session[];
  projects?: Project[];
  currentSessionsData?: CurrentSessionData[];
  theme?: "dark" | "light";
  onGetSession?: (sessionId: string) => void;
  onExportSession?: (sessionId: string) => void;
  onDeleteRequest?: (target: DeleteTarget) => void;
  pendingDelete?: { type: "node" | "edge"; id: string } | null;
  onDeleteComplete?: () => void;
  /** セッション接続時のマージ処理 */
  onMerge?: (sessionIds: string[]) => Promise<MergedSummary | null>;
  /** 現在のマージ状態 */
  mergeStatus?: MergeStatus;
  /** マージ済みの要約 */
  mergedSummary?: MergedSummary | null;
  /** セッション詳細表示 */
  onSessionDetail?: (sessionId: string) => void;
  /** サイドバーでホバー中のセッションID */
  hoveredSessionId?: string | null;
}

export function NodeEditor({
  sessions = [],
  projects = [],
  currentSessionsData = [],
  theme = "dark",
  onGetSession,
  onExportSession,
  onDeleteRequest,
  pendingDelete,
  onDeleteComplete,
  onMerge,
  mergeStatus = "idle",
  mergedSummary,
  onSessionDetail,
  hoveredSessionId,
}: NodeEditorProps) {
  // 初期化時にlocalStorageから復元
  const storedPositions = useRef(loadPositions());
  const storedEdges = useRef(loadEdges());
  const storedConnected = useRef(loadConnectedSessions());

  const [connectedSessionIds, setConnectedSessionIds] = useState<string[]>(
    storedConnected.current
  );

  // Backend edge ID mapping (reactFlowEdgeId -> backendEdgeId)
  const [edgeMapping, setEdgeMapping] = useState<EdgeMapping>({});
  const edgesLoadedRef = useRef<Set<string>>(new Set());

  // 初期ノードは空（contextノードは動的に生成）
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storedEdges.current);

  // プロジェクトIDから名前へのマップ（メモ化）
  const projectMap = useMemo(
    () => new Map(projects.map((p) => [p.projectId, p.name])),
    [projects]
  );

  // ノード位置変更時に保存
  const handleNodesChange = useCallback(
    (changes: Parameters<typeof onNodesChange>[0]) => {
      onNodesChange(changes);

      // 位置変更があれば保存
      const positionChanges = changes.filter(
        (c) => c.type === "position" && "position" in c && c.position
      );
      if (positionChanges.length > 0) {
        // 次のフレームで保存（state更新後）
        requestAnimationFrame(() => {
          setNodes((currentNodes) => {
            const positions: StoredPositions = {};
            currentNodes.forEach((n) => {
              positions[n.id] = n.position;
            });
            savePositions(positions);
            return currentNodes;
          });
        });
      }
    },
    [onNodesChange, setNodes]
  );

  // エッジ変更時に保存
  const handleEdgesChange = useCallback(
    (changes: Parameters<typeof onEdgesChange>[0]) => {
      onEdgesChange(changes);
      requestAnimationFrame(() => {
        setEdges((currentEdges) => {
          saveEdges(currentEdges);
          return currentEdges;
        });
      });
    },
    [onEdgesChange, setEdges]
  );

  // 各セッション用のexportハンドラを生成
  const createExportHandler = useCallback(
    (sessionId: string) => () => {
      console.log("[Viewer] Export session:", sessionId);
      onExportSession?.(sessionId);
    },
    [onExportSession]
  );

  // 複数の進行中セッション（contextノード）を生成・更新
  useEffect(() => {
    setNodes((nds) => {
      const positions = storedPositions.current;
      const existingContextIds = new Set(
        nds.filter((n) => n.id.startsWith("context-")).map((n) => n.id)
      );

      // 新しいcontextノードを生成
      const newContextNodes: Node[] = [];
      // 衝突検出用の既存ノードリスト
      let allNodesForCollision = [...nds];
      let newContextIndex = 0;

      currentSessionsData.forEach((data) => {
        const session = data.session;
        if (!session) return;

        const nodeId = `context-${session.sessionId}`;
        const savedPosition = positions[nodeId];
        // 保存された位置がなければ、衝突しない位置を計算
        const calculatedPosition = savedPosition
          ? savedPosition
          : calculateGridPosition(
              newContextIndex,
              allNodesForCollision,
              "context"
            );

        if (!existingContextIds.has(nodeId)) {
          const newNode: Node = {
            id: nodeId,
            type: "context",
            position: calculatedPosition,
            data: {
              label: "進行中セッション",
              sessionId: session.sessionId,
              sessionName: session.name,
              status: session.status,
              tokenCount: data.tokenCount,
              inputTokens: session.inputTokens ?? data.inputTokens,
              outputTokens: session.outputTokens ?? data.outputTokens,
              connectedCount: connectedSessionIds.length,
              observationCount: data.observationCount,
              projectName: session.projectId
                ? projectMap.get(session.projectId)
                : undefined,
              onExport: createExportHandler(session.sessionId),
              mergeStatus,
              mergedSummary,
            },
          };
          newContextNodes.push(newNode);
          // 次のノードの衝突チェック用に追加
          allNodesForCollision = [...allNodesForCollision, newNode];
          newContextIndex++;
        }
      });

      // 既存のcontextノードを更新
      const validContextIds = new Set(
        currentSessionsData
          .filter((d) => d.session)
          .map((d) => `context-${d.session!.sessionId}`)
      );

      const updatedNodes = nds
        .filter((n) => {
          // contextノードは有効なもののみ保持
          if (n.id.startsWith("context-")) {
            return validContextIds.has(n.id);
          }
          return true;
        })
        .map((node) => {
          if (node.id.startsWith("context-")) {
            const sessionId = node.id.replace("context-", "");
            const data = currentSessionsData.find(
              (d) => d.session?.sessionId === sessionId
            );
            if (data?.session) {
              return {
                ...node,
                data: {
                  ...node.data,
                  sessionId: data.session.sessionId,
                  sessionName: data.session.name,
                  status: data.session.status,
                  tokenCount: data.tokenCount,
                  inputTokens: data.session.inputTokens ?? data.inputTokens,
                  outputTokens: data.session.outputTokens ?? data.outputTokens,
                  connectedCount: connectedSessionIds.length,
                  observationCount: data.observationCount,
                  projectName: data.session.projectId
                    ? projectMap.get(data.session.projectId)
                    : undefined,
                  onExport: createExportHandler(data.session.sessionId),
                  mergeStatus,
                  mergedSummary,
                },
              };
            }
          }
          return node;
        });

      const result = [...updatedNodes, ...newContextNodes];

      // 新しいノードが追加されたら位置を保存
      if (newContextNodes.length > 0) {
        const allPositions: StoredPositions = {};
        result.forEach((n) => {
          allPositions[n.id] = n.position;
        });
        savePositions(allPositions);
      }

      return result;
    });
  }, [
    currentSessionsData,
    connectedSessionIds,
    createExportHandler,
    setNodes,
    mergeStatus,
    mergedSummary,
    projectMap,
  ]);

  // セッション一覧からノードを生成（保存された位置を復元、重複回避）
  useEffect(() => {
    setNodes((nds) => {
      const existingIds = new Set(nds.map((n) => n.id));
      const newSessionNodes: Node[] = [];
      const positions = storedPositions.current;

      // セッションデータをマップ化（既存ノード更新用）
      const sessionMap = new Map(
        sessions.map((s) => ["session-" + s.sessionId, s])
      );

      // 既存ノードを更新（名前やステータス、トークン数の変更を反映）
      const updatedNodes = nds.map((node) => {
        if (node.type === "session") {
          const session = sessionMap.get(node.id);
          if (session) {
            const projectName = session.projectId
              ? projectMap.get(session.projectId)
              : undefined;
            // 名前、プロジェクト、トークン数、分類情報が変わった場合は更新
            if (
              node.data.label !== session.name ||
              node.data.projectName !== projectName ||
              node.data.inputTokens !== session.inputTokens ||
              node.data.outputTokens !== session.outputTokens ||
              node.data.hasIssues !== session.hasIssues ||
              node.data.importance !== session.importance ||
              node.data.category !== session.category ||
              node.data.theme !== theme
            ) {
              return {
                ...node,
                data: {
                  ...node.data,
                  label: session.name,
                  status: session.status,
                  date: new Date(session.updatedAt).toLocaleDateString("ja-JP"),
                  tokenCount: session.tokenCount,
                  inputTokens: session.inputTokens,
                  outputTokens: session.outputTokens,
                  projectName,
                  hasIssues: session.hasIssues,
                  issueType: session.issueType,
                  importance: session.importance,
                  category: session.category,
                  theme,
                },
              };
            }
          }
        }
        return node;
      });

      // 新しいノードを追加する前の全ノード（重複チェック用）
      let allNodesForCollision = [...updatedNodes];
      let newNodeIndex = 0;

      sessions.forEach((session) => {
        const nodeId = "session-" + session.sessionId;
        if (!existingIds.has(nodeId)) {
          // 保存された位置があれば使用、なければ重複しない位置を計算
          const savedPosition = positions[nodeId];
          const calculatedPosition = savedPosition
            ? savedPosition
            : calculateGridPosition(
                newNodeIndex,
                allNodesForCollision,
                "session"
              );

          const projectName = session.projectId
            ? projectMap.get(session.projectId)
            : undefined;

          const newNode: Node = {
            id: nodeId,
            type: "session",
            position: calculatedPosition,
            data: {
              label: session.name,
              sessionId: session.sessionId,
              status: session.status,
              date: new Date(session.updatedAt).toLocaleDateString("ja-JP"),
              tokenCount: session.tokenCount,
              inputTokens: session.inputTokens,
              outputTokens: session.outputTokens,
              projectName,
              hasIssues: session.hasIssues,
              issueType: session.issueType,
              importance: session.importance,
              category: session.category,
              theme,
              onClick: () => onSessionDetail?.(session.sessionId),
            },
          };

          newSessionNodes.push(newNode);
          // 次のノードの衝突チェック用に追加
          allNodesForCollision = [...allNodesForCollision, newNode];
          newNodeIndex++;
        }
      });

      const validSessionIds = new Set(
        sessions.map((s) => "session-" + s.sessionId)
      );
      const filteredNodes = updatedNodes.filter(
        (n) => n.id.startsWith("context-") || validSessionIds.has(n.id)
      );

      const result = [...filteredNodes, ...newSessionNodes];

      // 新しいノードが追加されたら位置を保存
      if (newSessionNodes.length > 0) {
        const allPositions: StoredPositions = {};
        result.forEach((n) => {
          allPositions[n.id] = n.position;
        });
        savePositions(allPositions);
      }

      return result;
    });
  }, [sessions, projectMap, setNodes, theme, onSessionDetail]);

  // hoveredSessionId が変わったらノードの isHovered を更新
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.type === "session") {
          const sessionId = node.data.sessionId;
          const isHovered = sessionId === hoveredSessionId;
          if (node.data.isHovered !== isHovered) {
            return {
              ...node,
              data: { ...node.data, isHovered },
            };
          }
        }
        return node;
      })
    );
  }, [hoveredSessionId, setNodes]);

  // Load edges from API for each context node
  useEffect(() => {
    const loadEdgesForContextNodes = async () => {
      for (const data of currentSessionsData) {
        const session = data.session;
        if (!session) continue;

        const claudeSessionId = session.sessionId;

        // Skip if already loaded
        if (edgesLoadedRef.current.has(claudeSessionId)) continue;
        edgesLoadedRef.current.add(claudeSessionId);

        // Load edges from API
        const apiEdges = await loadEdgesFromApi(claudeSessionId);
        if (apiEdges.length === 0) continue;

        // Create React Flow edges and mapping
        const newEdges: Edge[] = [];
        const newMapping: EdgeMapping = {};
        const newConnectedIds: string[] = [];

        for (const apiEdge of apiEdges) {
          const reactFlowEdgeId = `reactflow__edge-session-${apiEdge.sourceSessionId}-context-${claudeSessionId}`;
          newEdges.push({
            id: reactFlowEdgeId,
            source: `session-${apiEdge.sourceSessionId}`,
            target: `context-${claudeSessionId}`,
          });
          newMapping[reactFlowEdgeId] = apiEdge.edgeId;
          newConnectedIds.push(apiEdge.sourceSessionId);
        }

        // Update state
        setEdges((eds) => {
          // Avoid duplicates
          const existingIds = new Set(eds.map((e) => e.id));
          const filtered = newEdges.filter((e) => !existingIds.has(e.id));
          const result = [...eds, ...filtered];
          saveEdges(result);
          return result;
        });

        setEdgeMapping((prev) => ({ ...prev, ...newMapping }));

        setConnectedSessionIds((prev) => {
          const combined = [...new Set([...prev, ...newConnectedIds])];
          saveConnectedSessions(combined);
          return combined;
        });
      }
    };

    loadEdgesForContextNodes();
  }, [currentSessionsData, setEdges]);

  const onConnect = useCallback(
    async (params: Connection) => {
      if (!params.source || !params.target) return;

      // セッションノードから任意のcontextノードへの接続を許可
      if (
        params.source.startsWith("session-") &&
        params.target.startsWith("context-")
      ) {
        const sessionId = params.source.replace("session-", "");
        const claudeSessionId = params.target.replace("context-", "");

        if (connectedSessionIds.includes(sessionId)) return;

        // Save edge to API
        const apiEdge = await createEdgeApi(sessionId, claudeSessionId);

        setEdges((eds) => {
          const newEdges = addEdge(params, eds);
          saveEdges(newEdges);

          // Store edge mapping if API call succeeded
          if (apiEdge) {
            const reactFlowEdgeId = newEdges.find(
              (e) => e.source === params.source && e.target === params.target
            )?.id;
            if (reactFlowEdgeId) {
              setEdgeMapping((prev) => ({
                ...prev,
                [reactFlowEdgeId]: apiEdge.edgeId,
              }));
            }
          }

          return newEdges;
        });

        const newConnectedIds = [...connectedSessionIds, sessionId];
        setConnectedSessionIds(newConnectedIds);
        saveConnectedSessions(newConnectedIds);

        setNodes((nds) =>
          nds.map((node) => {
            if (node.id.startsWith("context-")) {
              return {
                ...node,
                data: {
                  ...node.data,
                  connectedCount: newConnectedIds.length,
                },
              };
            }
            return node;
          })
        );

        onGetSession?.(sessionId);

        // 2つ以上のセッションが接続されたらマージをトリガー
        if (newConnectedIds.length >= 2 && onMerge) {
          onMerge(newConnectedIds);
        }
      }
    },
    [connectedSessionIds, setEdges, setNodes, onGetSession, onMerge]
  );

  // エッジ削除リクエスト（確認後に実際に削除）
  const handleEdgeDeleteRequest = useCallback(
    (edgeId: string) => {
      const edge = edges.find((e) => e.id === edgeId);
      if (!edge) return;

      const sessionId = edge.source.replace("session-", "");
      const session = sessions.find((s) => s.sessionId === sessionId);

      onDeleteRequest?.({
        type: "edge",
        id: edgeId,
        name: session?.name || sessionId,
      });
    },
    [edges, sessions, onDeleteRequest]
  );

  // エッジクリック時（削除確認を表示）
  const onEdgeClick = useCallback(
    (_event: React.MouseEvent, edge: Edge) => {
      handleEdgeDeleteRequest(edge.id);
    },
    [handleEdgeDeleteRequest]
  );

  // 実際のエッジ削除処理
  const onEdgeDelete = useCallback(
    async (deletedEdges: Edge[]) => {
      const deletedSessionIds = deletedEdges
        .filter((edge) => edge.source.startsWith("session-"))
        .map((edge) => edge.source.replace("session-", ""));

      // Delete edges from API
      for (const edge of deletedEdges) {
        const backendEdgeId = edgeMapping[edge.id];
        if (backendEdgeId) {
          await deleteEdgeApi(backendEdgeId);
          setEdgeMapping((prev) => {
            const next = { ...prev };
            delete next[edge.id];
            return next;
          });
        }
      }

      const newConnectedIds = connectedSessionIds.filter(
        (id) => !deletedSessionIds.includes(id)
      );
      setConnectedSessionIds(newConnectedIds);
      saveConnectedSessions(newConnectedIds);

      setEdges((currentEdges) => {
        saveEdges(currentEdges);
        return currentEdges;
      });

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id.startsWith("context-")) {
            return {
              ...node,
              data: {
                ...node.data,
                connectedCount: newConnectedIds.length,
              },
            };
          }
          return node;
        })
      );
    },
    [connectedSessionIds, setNodes, setEdges, edgeMapping]
  );

  // ノードドラッグ終了時に衝突検出と保存
  const onNodeDragStop = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      const updatedNodes = nodes.map((n) =>
        n.id === node.id ? { ...n, position: node.position } : n
      );

      const newPos = findNonOverlappingPosition(node, updatedNodes);
      if (newPos.x !== node.position.x || newPos.y !== node.position.y) {
        setNodes((nds) => {
          const result = nds.map((n) =>
            n.id === node.id ? { ...n, position: newPos } : n
          );
          // 位置を保存
          const positions: StoredPositions = {};
          result.forEach((n) => {
            positions[n.id] = n.position;
          });
          savePositions(positions);
          return result;
        });
      } else {
        // 衝突がなくても位置を保存
        const positions: StoredPositions = {};
        updatedNodes.forEach((n) => {
          positions[n.id] = n.position;
        });
        savePositions(positions);
      }
    },
    [nodes, setNodes]
  );

  // 外部からの削除リクエストを処理
  useEffect(() => {
    if (!pendingDelete) return;

    if (pendingDelete.type === "edge") {
      // エッジ削除
      const edgeToDelete = edges.find((e) => e.id === pendingDelete.id);
      if (edgeToDelete) {
        onEdgeDelete([edgeToDelete]);
        setEdges((eds) => eds.filter((e) => e.id !== pendingDelete.id));
      }
    } else if (pendingDelete.type === "node") {
      // ノード削除（セッションノードのみ、contextノードは削除不可）
      if (!pendingDelete.id.startsWith("context-")) {
        // 関連するエッジも削除
        const relatedEdges = edges.filter(
          (e) => e.source === pendingDelete.id || e.target === pendingDelete.id
        );
        if (relatedEdges.length > 0) {
          onEdgeDelete(relatedEdges);
          setEdges((eds) =>
            eds.filter(
              (e) =>
                e.source !== pendingDelete.id && e.target !== pendingDelete.id
            )
          );
        }

        // ノードを削除
        setNodes((nds) => nds.filter((n) => n.id !== pendingDelete.id));

        // 位置情報から削除
        const positions = loadPositions();
        delete positions[pendingDelete.id];
        savePositions(positions);
      }
    }

    onDeleteComplete?.();
  }, [
    pendingDelete,
    edges,
    onEdgeDelete,
    setEdges,
    setNodes,
    onDeleteComplete,
  ]);

  return (
    <div
      className={`w-full h-full bg-[var(--bg-base)] ${
        theme === "dark" ? "react-flow-theme-dark" : ""
      }`}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgeDelete}
        onEdgeClick={onEdgeClick}
        onNodeDragStop={onNodeDragStop}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-[var(--bg-base)]"
      >
        <Controls className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg" />
        <MiniMap
          className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg"
          nodeColor="#d97757"
          maskColor="rgba(15, 15, 14, 0.8)"
        />
      </ReactFlow>
    </div>
  );
}
