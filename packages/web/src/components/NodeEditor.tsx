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

interface ContextNodeData {
  label: string;
  sessionId?: string;
  sessionName?: string;
  status?: string;
  tokenCount?: number;
  connectedCount: number;
  observationCount: number;
  onExport?: () => void;
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

  return (
    <div
      className="px-6 py-4 bg-[var(--color-primary-600)] text-white rounded-xl shadow-lg min-w-[240px] text-center cursor-pointer hover:bg-[var(--color-primary-500)] transition-colors relative"
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

interface NodeEditorProps {
  sessions?: Session[];
  currentSessionData?: CurrentSessionData;
  onGetSession?: (sessionId: string) => void;
  onExportSession?: (sessionIds: string[]) => void;
}

export function NodeEditor({
  sessions = [],
  currentSessionData,
  onGetSession,
  onExportSession,
}: NodeEditorProps) {
  // 初期化時にlocalStorageから復元
  const storedPositions = useRef(loadPositions());
  const storedEdges = useRef(loadEdges());
  const storedConnected = useRef(loadConnectedSessions());

  const [connectedSessionIds, setConnectedSessionIds] = useState<string[]>(
    storedConnected.current
  );

  const observationCount = currentSessionData?.observationCount ?? 0;

  // コンテキストノードの初期位置を復元
  const contextPosition = storedPositions.current["context"] || {
    x: 400,
    y: 200,
  };

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([
    {
      id: "context",
      type: "context",
      position: contextPosition,
      data: {
        label: "現在のコンテキスト",
        connectedCount: storedConnected.current.length,
        observationCount: 0,
      },
    },
  ]);
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

  const handleExport = useCallback(() => {
    const totalCount = observationCount + connectedSessionIds.length;
    if (totalCount === 0) {
      console.log("[Viewer] Export: コンテキストがありません");
      return;
    }
    console.log(
      "[Viewer] Exportしますか? (" +
        observationCount +
        " observations + " +
        connectedSessionIds.length +
        " merged sessions)",
      {
        currentSession: currentSessionData?.session?.sessionId,
        connectedSessionIds,
      }
    );
    onExportSession?.(connectedSessionIds);
  }, [
    observationCount,
    connectedSessionIds,
    currentSessionData,
    onExportSession,
  ]);

  useEffect(() => {
    const session = currentSessionData?.session;
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "context") {
          return {
            ...node,
            data: {
              ...node.data,
              onExport: handleExport,
              observationCount,
              sessionId: session?.sessionId,
              sessionName: session?.name,
              status: session?.status,
              tokenCount: currentSessionData?.tokenCount,
            },
          };
        }
        return node;
      })
    );
  }, [handleExport, observationCount, currentSessionData, setNodes]);

  // セッション一覧からノードを生成（保存された位置を復元）
  useEffect(() => {
    setNodes((nds) => {
      const existingIds = new Set(nds.map((n) => n.id));
      const newSessionNodes: Node[] = [];
      const positions = storedPositions.current;

      sessions.forEach((session, index) => {
        const nodeId = "session-" + session.sessionId;
        if (!existingIds.has(nodeId)) {
          // 保存された位置があれば使用、なければデフォルト位置
          const savedPosition = positions[nodeId];
          const defaultPosition = {
            x: 50 + Math.floor(index / 5) * 200,
            y: 80 + (index % 5) * 100,
          };

          newSessionNodes.push({
            id: nodeId,
            type: "session",
            position: savedPosition || defaultPosition,
            data: {
              label: session.name,
              sessionId: session.sessionId,
              status: session.status,
              date: new Date(session.updatedAt).toLocaleDateString("ja-JP"),
              tokenCount: session.tokenCount,
            },
          });
        }
      });

      const validSessionIds = new Set(
        sessions.map((s) => "session-" + s.sessionId)
      );
      const filteredNodes = nds.filter(
        (n) => n.id === "context" || validSessionIds.has(n.id)
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

      if (params.source.startsWith("session-") && params.target === "context") {
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
            if (node.id === "context") {
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
      }
    },
    [connectedSessionIds, setEdges, setNodes, onGetSession]
  );

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
          if (node.id === "context") {
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

  return (
    <div className="w-full h-full bg-[var(--bg-base)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={onConnect}
        onEdgesDelete={onEdgeDelete}
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
