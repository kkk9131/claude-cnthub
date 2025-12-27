// Server Ports
export const API_PORT = 3001;
export const WEB_PORT = 5173;
export const HOOK_SERVER_PORT = 37778;

// Database
export const DEFAULT_DATABASE_PATH = "~/.claude-cnthub/data.db";

// Session Status
export const SESSION_STATUS = {
  IDLE: "idle",
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error",
} as const;

// Message Types
export const MESSAGE_TYPE = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
  TOOL_USE: "tool_use",
  TOOL_RESULT: "tool_result",
  THINKING: "thinking",
  ERROR: "error",
} as const;

// Work Item Status
export const WORK_ITEM_STATUS = {
  PLANNING: "planning",
  IN_PROGRESS: "in_progress",
  REVIEW: "review",
  COMPLETED: "completed",
  BLOCKED: "blocked",
} as const;

// Progress Entry Types
export const PROGRESS_ENTRY_TYPE = {
  MILESTONE: "milestone",
  PROGRESS: "progress",
  BLOCKER: "blocker",
  DECISION: "decision",
} as const;

// Vector Embedding
export const EMBEDDING_DIMENSIONS = 384;

// Context Injection
export const DEFAULT_MAX_CONTEXT_TOKENS = 800;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Hook Events
export const HOOK_EVENT = {
  SESSION_START: "SessionStart",
  POST_TOOL_USE: "PostToolUse",
  STOP: "Stop",
  SESSION_END: "SessionEnd",
} as const;

// WebSocket Events
export const WS_EVENT = {
  MESSAGE: "message",
  STATUS_UPDATE: "status_update",
  PROCESS_STARTED: "process_started",
  PROCESS_EXIT: "process_exit",
  ERROR: "error",
  SUMMARY_GENERATED: "summary_generated",
} as const;

// Error Codes
export const ERROR_CODE = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  SESSION_NOT_FOUND: "SESSION_NOT_FOUND",
  WORK_ITEM_NOT_FOUND: "WORK_ITEM_NOT_FOUND",
  PROJECT_NOT_FOUND: "PROJECT_NOT_FOUND",
  SESSION_BUSY: "SESSION_BUSY",
  SUMMARIZATION_FAILED: "SUMMARIZATION_FAILED",
  SEARCH_FAILED: "SEARCH_FAILED",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;
