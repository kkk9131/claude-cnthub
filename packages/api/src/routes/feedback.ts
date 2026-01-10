/**
 * フィードバック API ルート
 *
 * ユーザーからのフィードバック（バグ報告、機能要望など）を受け付ける
 *
 * エンドポイント:
 * - POST /feedback - フィードバック送信
 * - GET  /feedback - フィードバック一覧（開発者向け）
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

// フィードバック保存先ディレクトリ
const FEEDBACK_DIR = join(homedir(), ".claude-cnthub");

// フィードバックの種類
const FeedbackTypeSchema = z.enum([
  "bug",
  "feature_request",
  "improvement",
  "other",
]);

// フィードバック作成スキーマ
const CreateFeedbackSchema = z.object({
  type: FeedbackTypeSchema,
  content: z
    .string()
    .min(10, "内容は10文字以上で入力してください")
    .max(1000, "内容は1000文字以内で入力してください"),
});

// フィードバックデータの型
interface Feedback {
  id: string;
  type: z.infer<typeof FeedbackTypeSchema>;
  content: string;
  createdAt: string;
}

// フィードバック保存先
const FEEDBACK_FILE = join(FEEDBACK_DIR, "feedback.json");

// フィードバックを読み込む
function loadFeedback(): Feedback[] {
  if (!existsSync(FEEDBACK_FILE)) {
    return [];
  }
  try {
    const data = readFileSync(FEEDBACK_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// フィードバックを保存する
function saveFeedback(feedbacks: Feedback[]): void {
  if (!existsSync(FEEDBACK_DIR)) {
    mkdirSync(FEEDBACK_DIR, { recursive: true });
  }
  writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbacks, null, 2));
}

// IDを生成
function generateId(): string {
  return `fb_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export const feedbackRouter = new Hono();

/**
 * POST /feedback - フィードバック送信
 */
feedbackRouter.post(
  "/",
  zValidator("json", CreateFeedbackSchema, (result, c) => {
    if (!result.success) {
      return c.json(
        {
          error: {
            code: "VALIDATION_ERROR",
            message: "入力内容に問題があります",
            details: result.error.flatten().fieldErrors,
          },
        },
        400
      );
    }
  }),
  async (c) => {
    const body = c.req.valid("json");

    const feedback: Feedback = {
      id: generateId(),
      type: body.type,
      content: body.content,
      createdAt: new Date().toISOString(),
    };

    const feedbacks = loadFeedback();
    feedbacks.push(feedback);
    saveFeedback(feedbacks);

    console.log(`[Feedback] New feedback received: ${feedback.type}`);

    return c.json(
      {
        success: true,
        id: feedback.id,
        message: "フィードバックを受け付けました",
      },
      201
    );
  }
);

/**
 * GET /feedback - フィードバック一覧（開発者向け）
 */
feedbackRouter.get("/", async (c) => {
  const feedbacks = loadFeedback();

  return c.json({
    items: feedbacks.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    total: feedbacks.length,
  });
});
