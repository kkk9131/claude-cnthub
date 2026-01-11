/**
 * エラーハンドリングミドルウェア
 *
 * アプリケーション全体のエラーを捕捉し、統一されたフォーマットで返却
 */

import type { Context, MiddlewareHandler } from "hono";
import { HTTPException } from "hono/http-exception";
import { ZodError } from "zod";

/**
 * アプリケーションエラーコード
 */
export const ErrorCode = {
  VALIDATION_ERROR: "VALIDATION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  SESSION_NOT_FOUND: "SESSION_NOT_FOUND",
  WORK_ITEM_NOT_FOUND: "WORK_ITEM_NOT_FOUND",
  PROJECT_NOT_FOUND: "PROJECT_NOT_FOUND",
  MESSAGE_NOT_FOUND: "MESSAGE_NOT_FOUND",
  SUMMARY_NOT_FOUND: "SUMMARY_NOT_FOUND",
  SESSION_BUSY: "SESSION_BUSY",
  SUMMARIZATION_FAILED: "SUMMARIZATION_FAILED",
  DATABASE_ERROR: "DATABASE_ERROR",
  INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];

/**
 * アプリケーションエラー
 */
export class AppError extends Error {
  constructor(
    public readonly code: ErrorCodeType,
    message: string,
    public readonly status: number = 500,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * エラーレスポンス形式
 */
interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

/**
 * Zodバリデーションエラーを整形
 */
function formatZodError(error: ZodError): Record<string, unknown> {
  return {
    issues: error.errors.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    })),
  };
}

/**
 * エラーハンドリングミドルウェア
 */
export function errorHandler(): MiddlewareHandler {
  return async (c: Context, next) => {
    try {
      await next();
    } catch (error) {
      console.error("Error caught in middleware:", error);

      let response: ErrorResponse;
      let status: number;

      if (error instanceof AppError) {
        status = error.status;
        response = {
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
          },
        };
      } else if (error instanceof ZodError) {
        status = 400;
        response = {
          error: {
            code: ErrorCode.VALIDATION_ERROR,
            message: "Validation failed",
            details: formatZodError(error),
          },
        };
      } else if (error instanceof HTTPException) {
        status = error.status;
        response = {
          error: {
            code:
              status === 404
                ? "NOT_FOUND"
                : status === 400
                  ? ErrorCode.VALIDATION_ERROR
                  : ErrorCode.INTERNAL_ERROR,
            message: error.message,
          },
        };
      } else {
        status = 500;
        response = {
          error: {
            code: ErrorCode.INTERNAL_ERROR,
            message:
              error instanceof Error ? error.message : "Internal server error",
          },
        };
      }

      return c.json(response, status as 400 | 404 | 409 | 500);
    }
  };
}

/**
 * 404ハンドラ
 */
export function notFoundHandler(c: Context): Response {
  const response: ErrorResponse = {
    error: {
      code: "NOT_FOUND",
      message: `Route ${c.req.method} ${c.req.path} not found`,
    },
  };
  return c.json(response, 404);
}
