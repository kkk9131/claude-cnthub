export type SessionStatus = "idle" | "processing" | "completed" | "error";

/** セッション重要度 */
export type SessionImportance = "high" | "medium" | "low";

/** セッション分類カテゴリ */
export type SessionCategory =
  | "feature"
  | "bugfix"
  | "refactor"
  | "exploration"
  | "other";

/** 問題タイプ */
export type SessionIssueType =
  | "error_loop" // 同じエラーの繰り返し
  | "edit_loop" // 同じファイルを何度も編集
  | "test_failure_loop" // テスト失敗→修正→再失敗のループ
  | "rollback" // 変更のロールバック
  | "other";

export interface Session {
  sessionId: string;
  name: string;
  workingDir: string;
  task?: string;
  status: SessionStatus;
  claudeSessionId?: string;
  workItemId?: string;
  projectId?: string;
  continueChat: boolean;
  dangerouslySkipPermissions: boolean;
  error?: string;
  /** 入力トークン数の累計 */
  inputTokens: number;
  /** 出力トークン数の累計 */
  outputTokens: number;
  /** セッション重要度 */
  importance?: SessionImportance;
  /** セッション分類カテゴリ */
  category?: SessionCategory;
  /** 問題があるかどうか */
  hasIssues: boolean;
  /** 問題タイプ */
  issueType?: SessionIssueType;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSessionRequest {
  name: string;
  workingDir: string;
  task?: string;
  workItemId?: string;
  projectId?: string;
  continueChat?: boolean;
  dangerouslySkipPermissions?: boolean;
  enableContextInjection?: boolean;
}

export interface SessionListResponse {
  sessions: Session[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
