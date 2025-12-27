export type SessionStatus = "idle" | "processing" | "completed" | "error";

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
