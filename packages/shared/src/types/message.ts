export type MessageType =
  | "user"
  | "assistant"
  | "system"
  | "tool_use"
  | "tool_result"
  | "thinking"
  | "error";

export interface Message {
  messageId: string;
  sessionId: string;
  type: MessageType;
  content: string;
  compressed: boolean;
  originalSize?: number;
  compressedSize?: number;
  metadata?: Record<string, unknown>;
  timestamp: Date;
}

export interface ToolUseMetadata {
  toolName: string;
  toolInput: Record<string, unknown>;
  toolResult?: string;
  duration?: number;
}

export interface SendMessageRequest {
  content: string;
}

export interface SendMessageResponse {
  messageId: string;
  status: "processing" | "completed" | "error";
}

export interface MessageListResponse {
  messages: Message[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
