/**
 * リポジトリ共通ユーティリティ
 *
 * 全リポジトリで共有するヘルパー関数と型定義
 */

import { randomUUID } from "crypto";

/**
 * ページネーションオプション
 */
export interface PaginationOptions {
  /** ページ番号（1始まり） */
  page?: number;
  /** 1ページあたりの件数 */
  limit?: number;
}

/**
 * ページネーション情報
 */
export interface PaginationInfo {
  /** 現在のページ */
  page: number;
  /** 1ページあたりの件数 */
  limit: number;
  /** 総件数 */
  total: number;
  /** 総ページ数 */
  totalPages: number;
  /** 次ページの有無 */
  hasNext: boolean;
  /** 前ページの有無 */
  hasPrev: boolean;
}

/**
 * ページネーション結果
 */
export interface PaginatedResult<T> {
  /** 結果アイテム */
  items: T[];
  /** ページネーション情報 */
  pagination: PaginationInfo;
}

/**
 * ユニークIDを生成
 *
 * 形式: prefix-uuid
 * 例: sess-550e8400-e29b-41d4-a716-446655440000
 */
export function generateId(prefix?: string): string {
  const uuid = randomUUID();
  return prefix ? `${prefix}-${uuid}` : uuid;
}

/**
 * 現在時刻をISO 8601形式で取得
 */
export function now(): string {
  return new Date().toISOString();
}

/**
 * ページネーション情報を計算
 */
export function calculatePagination(
  total: number,
  page: number,
  limit: number
): PaginationInfo {
  const totalPages = Math.ceil(total / limit);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}

/**
 * DBレコード（snake_case）をエンティティ（camelCase）に変換
 *
 * 日付フィールドはDateオブジェクトに変換
 */
export function rowToEntity<T>(
  row: Record<string, unknown>,
  dateFields: string[] = ["created_at", "updated_at"]
): T {
  const entity: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(row)) {
    // snake_case を camelCase に変換
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );

    // 日付フィールドはDateオブジェクトに変換
    if (dateFields.includes(key) && typeof value === "string") {
      entity[camelKey] = new Date(value);
    } else {
      entity[camelKey] = value;
    }
  }

  return entity as T;
}
