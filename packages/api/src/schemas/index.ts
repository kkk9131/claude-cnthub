/**
 * Zod バリデーションスキーマ
 *
 * APIリクエスト/レスポンスの型定義とバリデーション
 */

import { z } from "zod";

// ==================== 共通 ====================

/**
 * ページネーションクエリ
 */
export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});

export type PaginationQuery = z.infer<typeof PaginationSchema>;

// ==================== Sessions ====================

/**
 * セッション作成リクエスト
 */
export const CreateSessionSchema = z.object({
  name: z.string().min(1).max(255),
  workingDir: z.string().min(1),
  task: z.string().optional(),
  workItemId: z.string().optional(),
  projectId: z.string().optional(),
  continueChat: z.boolean().default(false),
  dangerouslySkipPermissions: z.boolean().default(false),
  enableContextInjection: z.boolean().default(true),
});

export type CreateSessionRequest = z.infer<typeof CreateSessionSchema>;

/**
 * セッション更新リクエスト
 */
export const UpdateSessionSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  task: z.string().optional(),
  status: z.enum(["idle", "processing", "completed", "error"]).optional(),
  workItemId: z.string().nullable().optional(),
  projectId: z.string().nullable().optional(),
  error: z.string().nullable().optional(),
});

export type UpdateSessionRequest = z.infer<typeof UpdateSessionSchema>;

/**
 * セッション一覧クエリ
 */
export const ListSessionsSchema = PaginationSchema.extend({
  status: z.enum(["idle", "processing", "completed", "error"]).optional(),
  projectId: z.string().optional(),
  workItemId: z.string().optional(),
  includeDeleted: z.coerce.boolean().default(false),
});

export type ListSessionsQuery = z.infer<typeof ListSessionsSchema>;

/**
 * セッション名生成リクエスト (API-02)
 */
export const GenerateSessionNameSchema = z.object({
  message: z.string().min(1),
});

export type GenerateSessionNameRequest = z.infer<
  typeof GenerateSessionNameSchema
>;

// ==================== Messages ====================

/**
 * メッセージ送信リクエスト
 */
export const SendMessageSchema = z.object({
  content: z.string().min(1),
});

export type SendMessageRequest = z.infer<typeof SendMessageSchema>;

/**
 * メッセージ一覧クエリ
 */
export const ListMessagesSchema = PaginationSchema.extend({
  type: z
    .enum([
      "user",
      "assistant",
      "system",
      "tool_use",
      "tool_result",
      "thinking",
      "error",
    ])
    .optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export type ListMessagesQuery = z.infer<typeof ListMessagesSchema>;

// ==================== Memory ====================

/**
 * セマンティック検索クエリ
 */
export const SearchMemorySchema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().int().positive().max(50).default(10),
  projectId: z.string().optional(),
  from: z.coerce.date().optional(),
  to: z.coerce.date().optional(),
});

export type SearchMemoryQuery = z.infer<typeof SearchMemorySchema>;

/**
 * 要約一覧クエリ
 */
export const ListSummariesSchema = PaginationSchema;

export type ListSummariesQuery = z.infer<typeof ListSummariesSchema>;

// ==================== Work Items ====================

/**
 * Work Item 作成リクエスト
 */
export const CreateWorkItemSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  status: z
    .enum(["planning", "in_progress", "review", "completed", "blocked"])
    .default("planning"),
  projectId: z.string().optional(),
  tags: z.array(z.string()).default([]),
  priority: z.number().int().min(0).max(10).default(0),
});

export type CreateWorkItemRequest = z.infer<typeof CreateWorkItemSchema>;

/**
 * Work Item 更新リクエスト
 */
export const UpdateWorkItemSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().nullable().optional(),
  status: z
    .enum(["planning", "in_progress", "review", "completed", "blocked"])
    .optional(),
  projectId: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  priority: z.number().int().min(0).max(10).optional(),
});

export type UpdateWorkItemRequest = z.infer<typeof UpdateWorkItemSchema>;

/**
 * Work Item 一覧クエリ
 */
export const ListWorkItemsSchema = PaginationSchema.extend({
  status: z
    .enum(["planning", "in_progress", "review", "completed", "blocked"])
    .optional(),
  projectId: z.string().optional(),
});

export type ListWorkItemsQuery = z.infer<typeof ListWorkItemsSchema>;

// ==================== Projects ====================

/**
 * プロジェクト作成リクエスト
 */
export const CreateProjectSchema = z.object({
  name: z.string().min(1).max(255),
  path: z.string().min(1),
  description: z.string().optional(),
});

export type CreateProjectRequest = z.infer<typeof CreateProjectSchema>;

/**
 * プロジェクト更新リクエスト
 */
export const UpdateProjectSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  description: z.string().nullable().optional(),
});

export type UpdateProjectRequest = z.infer<typeof UpdateProjectSchema>;

// ==================== Hook ====================

/**
 * Claude Code フック受信
 */
export const HookEventSchema = z.object({
  event: z.string(),
  sessionId: z.string(),
  projectDir: z.string(),
  timestamp: z.string(),
  data: z.record(z.unknown()),
});

export type HookEvent = z.infer<typeof HookEventSchema>;

// ==================== Merges ====================

/**
 * マージ作成リクエスト
 */
export const CreateMergeSchema = z.object({
  sourceSessionIds: z
    .array(z.string())
    .min(2, "At least 2 sessions are required for merge"),
  projectId: z.string().optional(),
});

export type CreateMergeRequest = z.infer<typeof CreateMergeSchema>;

/**
 * マージ一覧クエリ
 */
export const ListMergesSchema = PaginationSchema.extend({
  status: z.enum(["pending", "processing", "completed", "error"]).optional(),
  projectId: z.string().optional(),
});

export type ListMergesQuery = z.infer<typeof ListMergesSchema>;
