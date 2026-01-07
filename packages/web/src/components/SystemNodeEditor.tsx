/**
 * System Context ノードエディタ (SYS-07)
 *
 * React Flow ベースの System Context ノードビュー
 * - Skills, Hooks, MCP Servers, Rules を可視化
 * - ソース別（global, project, plugin）でグループ化
 */

import { useCallback, useEffect, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type {
  SystemSkill,
  SystemHook,
  SystemMcpServer,
  SystemRule,
} from "@claude-cnthub/shared";

// localStorage キー
const STORAGE_KEY_POSITIONS = "cnthub-system-node-positions";

// 永続化データの型
interface StoredPositions {
  [nodeId: string]: { x: number; y: number };
}

// ノードサイズ
const SKILL_NODE_WIDTH = 200;
const SKILL_NODE_HEIGHT = 80;
const HOOK_NODE_WIDTH = 200;
const HOOK_NODE_HEIGHT = 70;
const MCP_NODE_WIDTH = 200;
const MCP_NODE_HEIGHT = 70;
const RULE_NODE_WIDTH = 200;
const RULE_NODE_HEIGHT = 80;
const GROUP_NODE_WIDTH = 250;
const GROUP_NODE_HEIGHT = 50;

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

// ソース別の色
const sourceColors = {
  global: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/50",
    text: "text-blue-400",
  },
  project: {
    bg: "bg-green-500/10",
    border: "border-green-500/50",
    text: "text-green-400",
  },
  plugin: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/50",
    text: "text-purple-400",
  },
};

// カテゴリ別の色
const categoryColors = {
  skill: { bg: "bg-[var(--color-primary-500)]", icon: "S" },
  hook: { bg: "bg-amber-500", icon: "H" },
  mcp: { bg: "bg-cyan-500", icon: "M" },
  rule: { bg: "bg-emerald-500", icon: "R" },
};

interface SkillNodeData {
  skill: SystemSkill;
  onClick?: () => void;
  [key: string]: unknown;
}

interface HookNodeData {
  hook: SystemHook;
  onClick?: () => void;
  [key: string]: unknown;
}

interface McpNodeData {
  mcp: SystemMcpServer;
  onClick?: () => void;
  [key: string]: unknown;
}

interface RuleNodeData {
  rule: SystemRule;
  onClick?: () => void;
  [key: string]: unknown;
}

interface GroupNodeData {
  label: string;
  category: "skill" | "hook" | "mcp" | "rule";
  count: number;
  [key: string]: unknown;
}

// Skill ノードコンポーネント
function SkillNode({ data }: { data: SkillNodeData }) {
  const { skill, onClick } = data;
  const colors = sourceColors[skill.source] || sourceColors.global;

  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 ${colors.bg} border ${colors.border} rounded-lg w-[200px] cursor-pointer hover:brightness-110 transition-all`}
    >
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-[var(--color-primary-500)]"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-[var(--color-primary-500)]"
      />
      <div className="flex items-center gap-2">
        <div
          className={`w-6 h-6 ${categoryColors.skill.bg} rounded flex items-center justify-center text-white text-xs font-bold`}
        >
          {categoryColors.skill.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--text-primary)] truncate">
            {skill.name}
          </div>
          <div className={`text-xs ${colors.text}`}>{skill.source}</div>
        </div>
      </div>
      {skill.description && (
        <div className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2">
          {skill.description}
        </div>
      )}
    </div>
  );
}

// Hook ノードコンポーネント
function HookNode({ data }: { data: HookNodeData }) {
  const { hook, onClick } = data;
  const colors = sourceColors[hook.source] || sourceColors.global;

  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 ${colors.bg} border ${colors.border} rounded-lg w-[200px] cursor-pointer hover:brightness-110 transition-all`}
    >
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-amber-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-amber-500"
      />
      <div className="flex items-center gap-2">
        <div
          className={`w-6 h-6 ${categoryColors.hook.bg} rounded flex items-center justify-center text-white text-xs font-bold`}
        >
          {categoryColors.hook.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--text-primary)] truncate">
            {hook.event}
          </div>
          <div className={`text-xs ${colors.text}`}>{hook.source}</div>
        </div>
      </div>
      {hook.matcher && (
        <div className="mt-1 text-xs text-[var(--text-muted)] truncate font-mono">
          {hook.matcher}
        </div>
      )}
    </div>
  );
}

// MCP Server ノードコンポーネント
function McpNode({ data }: { data: McpNodeData }) {
  const { mcp, onClick } = data;
  const colors = sourceColors[mcp.source] || sourceColors.global;

  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 ${colors.bg} border ${colors.border} rounded-lg w-[200px] cursor-pointer hover:brightness-110 transition-all`}
    >
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-cyan-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-cyan-500"
      />
      <div className="flex items-center gap-2">
        <div
          className={`w-6 h-6 ${categoryColors.mcp.bg} rounded flex items-center justify-center text-white text-xs font-bold`}
        >
          {categoryColors.mcp.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--text-primary)] truncate">
            {mcp.name}
          </div>
          <div className={`text-xs ${colors.text}`}>{mcp.source}</div>
        </div>
      </div>
      <div className="mt-1 text-xs text-[var(--text-muted)] truncate font-mono">
        {mcp.command}
      </div>
    </div>
  );
}

// Rule ノードコンポーネント
function RuleNode({ data }: { data: RuleNodeData }) {
  const { rule, onClick } = data;
  const colors = sourceColors[rule.source] || sourceColors.global;

  return (
    <div
      onClick={onClick}
      className={`px-3 py-2 ${colors.bg} border ${colors.border} rounded-lg w-[200px] cursor-pointer hover:brightness-110 transition-all`}
    >
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-emerald-500"
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-emerald-500"
      />
      <div className="flex items-center gap-2">
        <div
          className={`w-6 h-6 ${categoryColors.rule.bg} rounded flex items-center justify-center text-white text-xs font-bold`}
        >
          {categoryColors.rule.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-[var(--text-primary)] truncate">
            {rule.name}
          </div>
          <div className={`text-xs ${colors.text}`}>{rule.source}</div>
        </div>
      </div>
      {rule.content && (
        <div className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2 font-mono">
          {rule.content.slice(0, 100)}...
        </div>
      )}
    </div>
  );
}

// グループノードコンポーネント
function GroupNode({ data }: { data: GroupNodeData }) {
  const colors = categoryColors[data.category];

  return (
    <div
      className={`px-4 py-3 ${colors.bg} rounded-xl shadow-lg w-[250px] text-white text-center`}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-lg font-bold">{data.label}</span>
        <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
          {data.count}
        </span>
      </div>
    </div>
  );
}

// ノードタイプ登録
const nodeTypes: NodeTypes = {
  skill: SkillNode,
  hook: HookNode,
  mcp: McpNode,
  rule: RuleNode,
  group: GroupNode,
};

interface SystemNodeEditorProps {
  skills?: SystemSkill[];
  hooks?: SystemHook[];
  mcpServers?: SystemMcpServer[];
  rules?: SystemRule[];
  onSkillClick?: (skill: SystemSkill) => void;
  onHookClick?: (hook: SystemHook) => void;
  onMcpClick?: (mcp: SystemMcpServer) => void;
  onRuleClick?: (rule: SystemRule) => void;
}

export function SystemNodeEditor({
  skills = [],
  hooks = [],
  mcpServers = [],
  rules = [],
  onSkillClick,
  onHookClick,
  onMcpClick,
  onRuleClick,
}: SystemNodeEditorProps) {
  // ノードとエッジを生成
  const { initialNodes, initialEdges } = useMemo(() => {
    const storedPositions = loadPositions();
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // グリッド配置の計算
    const baseX = 50;
    const baseY = 80;
    const columnWidth = 280;
    const rowHeight = 100;

    // Skills 列
    const skillsX = baseX;
    nodes.push({
      id: "group-skills",
      type: "group",
      position: storedPositions["group-skills"] || { x: skillsX, y: baseY },
      data: { label: "Skills", category: "skill", count: skills.length },
    });

    skills.forEach((skill, index) => {
      const nodeId = `skill-${skill.name}`;
      nodes.push({
        id: nodeId,
        type: "skill",
        position: storedPositions[nodeId] || {
          x: skillsX,
          y: baseY + GROUP_NODE_HEIGHT + 20 + index * rowHeight,
        },
        data: { skill, onClick: () => onSkillClick?.(skill) },
      });
    });

    // Hooks 列
    const hooksX = baseX + columnWidth;
    nodes.push({
      id: "group-hooks",
      type: "group",
      position: storedPositions["group-hooks"] || { x: hooksX, y: baseY },
      data: { label: "Hooks", category: "hook", count: hooks.length },
    });

    hooks.forEach((hook, index) => {
      const nodeId = `hook-${hook.event}-${index}`;
      nodes.push({
        id: nodeId,
        type: "hook",
        position: storedPositions[nodeId] || {
          x: hooksX,
          y: baseY + GROUP_NODE_HEIGHT + 20 + index * rowHeight,
        },
        data: { hook, onClick: () => onHookClick?.(hook) },
      });
    });

    // MCP Servers 列
    const mcpX = baseX + columnWidth * 2;
    nodes.push({
      id: "group-mcp",
      type: "group",
      position: storedPositions["group-mcp"] || { x: mcpX, y: baseY },
      data: { label: "MCP Servers", category: "mcp", count: mcpServers.length },
    });

    mcpServers.forEach((mcp, index) => {
      const nodeId = `mcp-${mcp.name}`;
      nodes.push({
        id: nodeId,
        type: "mcp",
        position: storedPositions[nodeId] || {
          x: mcpX,
          y: baseY + GROUP_NODE_HEIGHT + 20 + index * rowHeight,
        },
        data: { mcp, onClick: () => onMcpClick?.(mcp) },
      });
    });

    // Rules 列
    const rulesX = baseX + columnWidth * 3;
    nodes.push({
      id: "group-rules",
      type: "group",
      position: storedPositions["group-rules"] || { x: rulesX, y: baseY },
      data: { label: "Rules", category: "rule", count: rules.length },
    });

    rules.forEach((rule, index) => {
      const nodeId = `rule-${rule.name}`;
      nodes.push({
        id: nodeId,
        type: "rule",
        position: storedPositions[nodeId] || {
          x: rulesX,
          y: baseY + GROUP_NODE_HEIGHT + 20 + index * rowHeight,
        },
        data: { rule, onClick: () => onRuleClick?.(rule) },
      });
    });

    return { initialNodes: nodes, initialEdges: edges };
  }, [
    skills,
    hooks,
    mcpServers,
    rules,
    onSkillClick,
    onHookClick,
    onMcpClick,
    onRuleClick,
  ]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // データ更新時にノードを再生成
  useEffect(() => {
    setNodes(initialNodes);
  }, [initialNodes, setNodes]);

  // ノード位置変更時に保存
  const handleNodesChange = useCallback(
    (changes: Parameters<typeof onNodesChange>[0]) => {
      onNodesChange(changes);

      // 位置変更があれば保存
      const positionChanges = changes.filter(
        (c) => c.type === "position" && "position" in c && c.position
      );
      if (positionChanges.length > 0) {
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

  return (
    <div className="w-full h-full bg-[var(--bg-base)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        proOptions={{ hideAttribution: true }}
        className="bg-[var(--bg-base)]"
      >
        <Controls className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg" />
        <MiniMap
          className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-lg"
          nodeColor={(node) => {
            if (node.type === "skill") return "#d97757";
            if (node.type === "hook") return "#f59e0b";
            if (node.type === "mcp") return "#06b6d4";
            if (node.type === "rule") return "#10b981";
            return "#6b7280";
          }}
          maskColor="rgba(15, 15, 14, 0.8)"
        />
      </ReactFlow>
    </div>
  );
}
