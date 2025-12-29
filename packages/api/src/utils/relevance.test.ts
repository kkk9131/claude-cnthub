/**
 * 関連度スコア計算ユーティリティのテスト
 */

import { describe, test, expect } from "vitest";
import { distanceToRelevanceScore, MAX_COSINE_DISTANCE } from "./relevance";

describe("relevance utility", () => {
  describe("MAX_COSINE_DISTANCE", () => {
    test("コサイン距離の最大値は2", () => {
      expect(MAX_COSINE_DISTANCE).toBe(2);
    });
  });

  describe("distanceToRelevanceScore", () => {
    test("距離0は関連度1.0（完全一致）", () => {
      expect(distanceToRelevanceScore(0)).toBe(1);
    });

    test("距離2は関連度0.0（完全に反対）", () => {
      expect(distanceToRelevanceScore(2)).toBe(0);
    });

    test("距離1は関連度0.5（中間）", () => {
      expect(distanceToRelevanceScore(1)).toBe(0.5);
    });

    test("距離0.5は関連度0.75", () => {
      expect(distanceToRelevanceScore(0.5)).toBe(0.75);
    });

    test("距離1.5は関連度0.25", () => {
      expect(distanceToRelevanceScore(1.5)).toBe(0.25);
    });

    test("負の距離でも0以上の値を返す", () => {
      expect(distanceToRelevanceScore(-0.5)).toBe(1);
    });

    test("距離2を超えても0を返す（負にならない）", () => {
      expect(distanceToRelevanceScore(3)).toBe(0);
    });
  });
});
