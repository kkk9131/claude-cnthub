export interface SessionSummary {
  summaryId: string;
  sessionId: string;
  shortSummary: string;
  detailedSummary: string;
  keyDecisions: string[];
  filesModified: string[];
  toolsUsed: string[];
  topics: string[];
  originalTokenCount: number;
  summaryTokenCount: number;
  compressionRatio: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchResult {
  sessionId: string;
  sessionName: string;
  summary: string;
  relevanceScore: number;
  matchedContent: string;
  createdAt: Date;
}

export interface InjectionContext {
  relevantSummaries: SessionSummary[];
  workItemContext?: WorkItemContext;
  totalTokens: number;
  formattedContext: string;
}

export interface WorkItemContext {
  workItemId: string;
  name: string;
  description?: string;
  relatedSessions: string[];
  progressPercentage: number;
}

export interface ProgressEntry {
  entryId: string;
  workItemId: string;
  sessionId: string;
  entryType: "milestone" | "progress" | "blocker" | "decision";
  summary: string;
  details?: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface WorkItemProgress {
  workItemId: string;
  overallProgress: number;
  currentPhase?: string;
  timeline: ProgressEntry[];
  blockers: ProgressEntry[];
  recentMilestones: ProgressEntry[];
}

// ==================== Memory API 型定義 ====================

/**
 * 観測記録の種類
 */
export type ObservationType =
  | "tool_use"
  | "decision"
  | "error"
  | "learning"
  | "note"
  | "file_change";

/**
 * メモリ追加リクエスト
 */
export interface MemoryAddRequest {
  sessionId: string;
  type: ObservationType;
  title: string;
  content: string;
  metadata?: Record<string, unknown>;
}

/**
 * メモリ追加レスポンス
 */
export interface MemoryAddResponse {
  id: string;
  sessionId: string;
  type: ObservationType;
  title: string;
  createdAt: string;
}

/**
 * メモリ検索結果
 */
export interface MemorySearchResult {
  id: string;
  sessionId: string;
  type: string;
  title: string;
  content: string;
  relevanceScore: number;
  createdAt: string;
}

/**
 * メモリ検索レスポンス
 */
export interface MemorySearchResponse {
  results: MemorySearchResult[];
  totalCount: number;
  query: string;
}

/**
 * 最近のセッション情報
 */
export interface RecentSession {
  id: string;
  name: string;
  status: string;
  tags?: string[];
}

/**
 * 関連メモリ情報
 */
export interface RelevantMemory {
  id: string;
  type: string;
  title: string;
  summary?: string;
}

/**
 * メモリコンテキストレスポンス
 */
export interface MemoryContextResponse {
  project?: {
    path: string;
  };
  recentSessions: RecentSession[];
  relevantMemories: RelevantMemory[];
  dynamicFacts?: Record<string, unknown>;
}
