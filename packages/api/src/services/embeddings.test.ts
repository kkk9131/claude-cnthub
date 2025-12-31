/**
 * Embedding サービスのテスト
 *
 * ローカルモデル (Transformers.js) と Voyage AI の両方をテスト
 */

import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";

// 他のテストファイルのモックの影響を受けないようにリセット
vi.unmock("./embeddings");

import {
  generateEmbedding,
  generateQueryEmbedding,
  generateEmbeddings,
  isEmbeddingAvailable,
  getActiveProvider,
  getEmbeddingDimension,
  getEmbeddingInfo,
  EMBEDDING_DIMENSION,
  EMBEDDING_DIMENSIONS,
  _resetClient,
} from "./embeddings";

// 環境変数を保存・復元するためのヘルパー
let originalVoyageApiKey: string | undefined;

describe("Embedding Service", () => {
  beforeEach(() => {
    originalVoyageApiKey = process.env.VOYAGE_API_KEY;
    _resetClient(); // 各テスト前にクライアントをリセット
  });

  afterEach(() => {
    if (originalVoyageApiKey !== undefined) {
      process.env.VOYAGE_API_KEY = originalVoyageApiKey;
    } else {
      delete process.env.VOYAGE_API_KEY;
    }
    _resetClient(); // 各テスト後もリセット
  });

  describe("isEmbeddingAvailable", () => {
    test("常に true を返す（ローカルモデルが利用可能）", () => {
      delete process.env.VOYAGE_API_KEY;
      expect(isEmbeddingAvailable()).toBe(true);
    });
  });

  describe("getActiveProvider", () => {
    test("APIキーがない場合は local を返す", () => {
      delete process.env.VOYAGE_API_KEY;
      expect(getActiveProvider()).toBe("local");
    });

    test("APIキーがある場合は voyage を返す", () => {
      process.env.VOYAGE_API_KEY = "voyage-test-key";
      expect(getActiveProvider()).toBe("voyage");
    });
  });

  describe("getEmbeddingDimension", () => {
    test("ローカルモデルの次元数は 384", () => {
      delete process.env.VOYAGE_API_KEY;
      expect(getEmbeddingDimension()).toBe(384);
    });

    test("Voyage AI の次元数は 1024", () => {
      process.env.VOYAGE_API_KEY = "voyage-test-key";
      expect(getEmbeddingDimension()).toBe(1024);
    });
  });

  describe("getEmbeddingInfo", () => {
    test("プロバイダー情報を正しく返す", () => {
      delete process.env.VOYAGE_API_KEY;
      const info = getEmbeddingInfo();
      expect(info.provider).toBe("local");
      expect(info.dimension).toBe(384);
      expect(info.available).toBe(true);
    });
  });

  describe("generateEmbedding", () => {
    test("APIキーが未設定の場合はローカルモデルで生成", async () => {
      delete process.env.VOYAGE_API_KEY;
      const result = await generateEmbedding("test text");
      expect(result).not.toBeNull();
      expect(result?.provider).toBe("local");
      expect(result?.dimension).toBe(384);
      expect(result?.embedding.length).toBe(384);
    });

    test("空文字列の場合は null を返す", async () => {
      delete process.env.VOYAGE_API_KEY;
      const result = await generateEmbedding("");
      expect(result).toBeNull();
    });

    test("空白のみの場合は null を返す", async () => {
      delete process.env.VOYAGE_API_KEY;
      const result = await generateEmbedding("   ");
      expect(result).toBeNull();
    });

    test("生成された埋め込みは正規化されている", async () => {
      delete process.env.VOYAGE_API_KEY;
      const result = await generateEmbedding("test text");
      expect(result).not.toBeNull();

      // 正規化されたベクトルの長さは約1.0
      const length = Math.sqrt(
        result!.embedding.reduce((sum, val) => sum + val * val, 0)
      );
      expect(length).toBeCloseTo(1.0, 1);
    });
  });

  describe("generateQueryEmbedding", () => {
    test("APIキーが未設定の場合はローカルモデルで生成", async () => {
      delete process.env.VOYAGE_API_KEY;
      const result = await generateQueryEmbedding("search query");
      expect(result).not.toBeNull();
      expect(result?.provider).toBe("local");
      expect(result?.dimension).toBe(384);
    });

    test("空文字列の場合は null を返す", async () => {
      delete process.env.VOYAGE_API_KEY;
      const result = await generateQueryEmbedding("");
      expect(result).toBeNull();
    });
  });

  describe("generateEmbeddings (batch)", () => {
    test("APIキーが未設定の場合はローカルモデルで生成", async () => {
      delete process.env.VOYAGE_API_KEY;
      const result = await generateEmbeddings(["text1", "text2", "text3"]);
      expect(result.length).toBe(3);
      expect(result[0]?.provider).toBe("local");
      expect(result[1]?.provider).toBe("local");
      expect(result[2]?.provider).toBe("local");
    });

    test("空配列の場合は空配列を返す", async () => {
      delete process.env.VOYAGE_API_KEY;
      const result = await generateEmbeddings([]);
      expect(result).toEqual([]);
    });

    test("空文字列を含む配列は対応する位置が null になる", async () => {
      delete process.env.VOYAGE_API_KEY;
      const result = await generateEmbeddings(["text1", "", "text3"]);
      expect(result.length).toBe(3);
      expect(result[0]).not.toBeNull();
      expect(result[1]).toBeNull();
      expect(result[2]).not.toBeNull();
    });
  });

  describe("EMBEDDING_DIMENSIONS", () => {
    test("Voyage AI の次元数は 1024", () => {
      expect(EMBEDDING_DIMENSIONS.voyage).toBe(1024);
    });

    test("ローカルモデルの次元数は 384", () => {
      expect(EMBEDDING_DIMENSIONS.local).toBe(384);
    });
  });

  describe("EMBEDDING_DIMENSION (後方互換)", () => {
    test("後方互換性のため 1024 を維持", () => {
      expect(EMBEDDING_DIMENSION).toBe(1024);
    });
  });
});
