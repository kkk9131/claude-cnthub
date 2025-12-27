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
