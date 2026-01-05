/**
 * ノードエディタ (R-12: get/export 操作)
 *
 * React Flow ベースのノードエディタ
 * - 中心に「現在のコンテキスト」ノード
 * - セッションをドラッグ接続で get 操作
 * - エッジ削除で export 操作
 * - ノード位置・エッジ・接続状態をlocalStorageで永続化
 */

import { useCallback, useEffect, useState, useRef } from "react";
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

// 重ならない位置を見つける
function findNonOverlappingPosition(
  draggedNode: Node,
  allNodes: Node[]
): { x: number; y: number } {
  const pos = { ...draggedNode.position };
  const otherNodes = allNodes.filter((n) => n.id !== draggedNode.id);
  const tempNode = { ...draggedNode, position: pos };

  let hasCollision = true;
  let attempts = 0;
  const maxAttempts = 50;

  while (hasCollision && attempts < maxAttempts) {
    hasCollision = false;
    for (const other of otherNodes) {
      if (checkCollision(tempNode, other)) {
        hasCollision = true;
        pos.x += NODE_PADDING + 10;
        pos.y += NODE_PADDING + 10;
        tempNode.position = pos;
        break;
      }
    }
    attempts++;
  }

  return pos;
}

// グリッド配置で重ならない位置を計算
function calculateGridPosition(
  index: number,
  existingNodes: Node[],
  nodeType: "session" | "context"
): { x: number; y: number } {
  const cols = 4; // 4列のグリッド
  const rowSpacing = nodeType === "context" ? 180 : 100;
  const colSpacing = nodeType === "context" ? 280 : 220;
  const startX = nodeType === "context" ? 500 : 50;
  const startY = 80;

  // 基本的なグリッド位置
  let baseX = startX + (index % cols) * colSpacing;
  let baseY = startY + Math.floor(index / cols) * rowSpacing;

  // 既存ノードとの衝突をチェック
  const tempNode: Node = {
    id: "temp",
    type: nodeType,
    position: { x: baseX, y: baseY },
    data: {},
  };

  let attempts = 0;
  const maxAttempts = 100;

  while (attempts < maxAttempts) {
    let hasCollision = false;
    for (const other of existingNodes) {
      if (checkCollision(tempNode, other)) {
        hasCollision = true;
        break;
      }
    }

    if (!hasCollision) {
      return tempNode.position;
    }

    // 衝突した場合、次の位置を試す（スパイラル状に探索）
    const spiralIndex = attempts + 1;
    const spiralCol = spiralIndex % cols;
    const spiralRow = Math.floor(spiralIndex / cols);

    tempNode.position = {
      x: startX + spiralCol * colSpacing,
      y: startY + spiralRow * rowSpacing,
    };

    attempts++;
  }

  // 最大試行回数に達した場合、右下に配置
  return {
    x: startX + (attempts % cols) * colSpacing,
    y: startY + Math.floor(attempts / cols) * rowSpacing,
  };
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

interface SessionNodeData {
  label: string;
  sessionId?: string;
  status?: string;
  date?: string;
  tokenCount?: number;
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
  connectedCount: number;
  observationCount: number;
  onExport?: () => void;
  mergeStatus?: MergeStatus;
  mergedSummary?: MergedSummary;
  [key: string]: unknown;
}

// トークン数をフォーマット（1000以上は k 表記）
function formatTokenCount(count: number): string {
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "k";
  }
  return count.toString();
}

// セッションノードコンポーネント
function SessionNode({ data }: { data: SessionNodeData }) {
  return (
    <div className="px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg shadow-md min-w-[150px] relative">
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-[var(--color-primary-500)]"
      />
      {data.tokenCount !== undefined && (
        <div className="absolute -top-2 -right-2 bg-[var(--bg-elevated)] text-[var(--text-muted)] text-xs px-1.5 py-0.5 rounded-full border border-[var(--border-default)]">
          {formatTokenCount(data.tokenCount)}
        </div>
      )}
      <div className="text-sm font-medium text-[var(--text-primary)] truncate">
        {data.label}
      </div>
      {data.date && (
        <div className="text-xs text-[var(--text-muted)] mt-1">{data.date}</div>
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
      {data.tokenCount !== undefined && (
        <div className="absolute -top-2 -right-2 bg-white text-[var(--color-primary-600)] text-xs font-bold px-1.5 py-0.5 rounded-full border-2 border-[var(--color-primary-600)]">
          {formatTokenCount(data.tokenCount)}
        </div>
      )}
      <div className="text-sm font-bold truncate max-w-[220px]">
        {hasSession ? data.sessionName || data.sessionId : "セッション未接続"}
      </div>
      {hasSession && data.sessionId && (
        <div className="text-xs opacity-60 mt-1 font-mono">
          {data.sessionId}
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
}

interface DeleteTarget {
  type: "node" | "edge";
  id: string;
  name: string;
}

interface NodeEditorProps {
  sessions?: Session[];
  currentSessionsData?: CurrentSessionData[];
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
}

export function NodeEditor({
  sessions = [],
  currentSessionsData = [],
  onGetSession,
  onExportSession,
  onDeleteRequest,
  pendingDelete,
  onDeleteComplete,
  onMerge,
  mergeStatus = "idle",
  mergedSummary,
}: NodeEditorProps) {
  // 初期化時にlocalStorageから復元
  const storedPositions = useRef(loadPositions());
  const storedEdges = useRef(loadEdges());
  const storedConnected = useRef(loadConnectedSessions());

  const [connectedSessionIds, setConnectedSessionIds] = useState<string[]>(
    storedConnected.current
  );

  // 初期ノードは空（contextノードは動的に生成）
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(storedEdges.current);

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
              connectedCount: connectedSessionIds.length,
              observationCount: data.observationCount,
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
                  connectedCount: connectedSessionIds.length,
                  observationCount: data.observationCount,
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
  ]);

  // セッション一覧からノードを生成（保存された位置を復元、重複回避）
  useEffect(() => {
    setNodes((nds) => {
      const existingIds = new Set(nds.map((n) => n.id));
      const newSessionNodes: Node[] = [];
      const positions = storedPositions.current;

      // 新しいノードを追加する前の全ノード（重複チェック用）
      let allNodesForCollision = [...nds];
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
      const filteredNodes = nds.filter(
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
  }, [sessions, setNodes]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (!params.source || !params.target) return;

      // セッションノードから任意のcontextノードへの接続を許可
      if (
        params.source.startsWith("session-") &&
        params.target.startsWith("context-")
      ) {
        const sessionId = params.source.replace("session-", "");

        if (connectedSessionIds.includes(sessionId)) return;

        setEdges((eds) => {
          const newEdges = addEdge(params, eds);
          saveEdges(newEdges);
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
    (deletedEdges: Edge[]) => {
      const deletedSessionIds = deletedEdges
        .filter((edge) => edge.source.startsWith("session-"))
        .map((edge) => edge.source.replace("session-", ""));

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
    [connectedSessionIds, setNodes, setEdges]
  );

  // ノードクリック時（セッションノードの削除確認を表示）
  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      // コンテキストノードはクリックでexport（ContextNode内で処理）
      if (node.id.startsWith("context-")) return;

      // セッションノードは削除確認
      const sessionId = node.id.replace("session-", "");
      const session = sessions.find((s) => s.sessionId === sessionId);

      onDeleteRequest?.({
        type: "node",
        id: node.id,
        name: session?.name || sessionId,
      });
    },
    [sessions, onDeleteRequest]
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
    <div className="w-full h-full bg-[var(--bg-base)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgeDelete}
        onEdgeClick={onEdgeClick}
        onNodeClick={onNodeClick}
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
