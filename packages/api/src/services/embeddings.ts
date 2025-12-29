/**
 * Embedding 生成サービス
 *
 * Voyage AI を使用してテキストのベクトル表現を生成する。
 * セマンティック検索の基盤となるサービス。
 *
 * 利用モデル: voyage-3.5 (1024次元、コード対応)
 *
 * グレースフルデグラデーション:
 * - APIキー未設定時は警告を出してスキップ
 * - API失敗時もアプリケーションは継続動作
 */

import { VoyageAIClient } from "voyageai";

/** Embedding 次元数（voyage-3.5） */
export const EMBEDDING_DIMENSION = 1024;

/** Voyage AI クライアント（遅延初期化） */
let voyageClient: VoyageAIClient | null = null;

/**
 * Voyage AI クライアントを取得
 *
 * 環境変数 VOYAGE_API_KEY が設定されている場合のみ初期化
 */
function getClient(): VoyageAIClient | null {
  if (voyageClient) return voyageClient;

  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) {
    console.warn(
      "[Embeddings] VOYAGE_API_KEY not set. Embedding generation disabled."
    );
    return null;
  }

  voyageClient = new VoyageAIClient({ apiKey });
  return voyageClient;
}

/**
 * Embedding 生成結果
 */
export interface EmbeddingResult {
  /** 生成されたベクトル（1024次元） */
  embedding: number[];
  /** 使用トークン数 */
  totalTokens: number;
}

/**
 * テキストから Embedding を生成
 *
 * @param text - 埋め込み対象のテキスト
 * @returns Embedding 結果（null = 生成失敗またはAPIキー未設定）
 */
export async function generateEmbedding(
  text: string
): Promise<EmbeddingResult | null> {
  const client = getClient();
  if (!client) return null;

  if (!text || text.trim().length === 0) {
    return null;
  }

  try {
    const result = await client.embed({
      input: [text],
      model: "voyage-3.5",
      inputType: "document",
    });

    if (!result.data || result.data.length === 0) {
      console.error("[Embeddings] No embedding data in response");
      return null;
    }

    return {
      embedding: result.data[0].embedding,
      totalTokens: result.usage?.totalTokens ?? 0,
    };
  } catch (error) {
    console.error("[Embeddings] Failed to generate embedding:", error);
    return null;
  }
}

/**
 * 検索クエリ用 Embedding を生成
 *
 * inputType を "query" に設定して検索最適化
 *
 * @param queryText - 検索クエリテキスト
 * @returns Embedding 結果
 */
export async function generateQueryEmbedding(
  queryText: string
): Promise<EmbeddingResult | null> {
  const client = getClient();
  if (!client) return null;

  if (!queryText || queryText.trim().length === 0) {
    return null;
  }

  try {
    const result = await client.embed({
      input: [queryText],
      model: "voyage-3.5",
      inputType: "query",
    });

    if (!result.data || result.data.length === 0) {
      console.error("[Embeddings] No embedding data in response");
      return null;
    }

    return {
      embedding: result.data[0].embedding,
      totalTokens: result.usage?.totalTokens ?? 0,
    };
  } catch (error) {
    console.error("[Embeddings] Failed to generate query embedding:", error);
    return null;
  }
}

/**
 * 複数テキストを一括で Embedding 化（バッチ処理）
 *
 * @param texts - 埋め込み対象テキスト配列
 * @returns Embedding 配列（失敗した項目は null）
 */
export async function generateEmbeddings(
  texts: string[]
): Promise<(EmbeddingResult | null)[]> {
  const client = getClient();
  if (!client) {
    return texts.map(() => null);
  }

  if (texts.length === 0) {
    return [];
  }

  // 空文字列をフィルタ
  const validTexts = texts.map((t) => (t && t.trim().length > 0 ? t : null));
  const indicesToProcess = validTexts
    .map((t, i) => (t !== null ? i : -1))
    .filter((i) => i >= 0);

  if (indicesToProcess.length === 0) {
    return texts.map(() => null);
  }

  try {
    const result = await client.embed({
      input: indicesToProcess.map((i) => validTexts[i]!),
      model: "voyage-3.5",
      inputType: "document",
    });

    // 結果を元の配列インデックスにマッピング
    const results: (EmbeddingResult | null)[] = texts.map(() => null);
    const tokensPerItem = Math.ceil(
      (result.usage?.totalTokens ?? 0) / indicesToProcess.length
    );

    result.data?.forEach((item, idx) => {
      const originalIndex = indicesToProcess[idx];
      results[originalIndex] = {
        embedding: item.embedding,
        totalTokens: tokensPerItem,
      };
    });

    return results;
  } catch (error) {
    console.error("[Embeddings] Batch embedding failed:", error);
    return texts.map(() => null);
  }
}

/**
 * Embedding サービスが利用可能か確認
 */
export function isEmbeddingAvailable(): boolean {
  return !!process.env.VOYAGE_API_KEY;
}

/**
 * テスト用: クライアントをリセット
 * @internal
 */
export function _resetClient(): void {
  voyageClient = null;
}
