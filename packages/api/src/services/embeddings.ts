/**
 * Embedding 生成サービス
 *
 * 2つのモード:
 * 1. Voyage AI (API): 高品質、1024次元、VOYAGE_API_KEY 必須
 * 2. Local (Transformers.js): APIキー不要、384次元、初回ロード遅い
 *
 * グレースフルデグラデーション:
 * - VOYAGE_API_KEY あり → Voyage AI を使用
 * - VOYAGE_API_KEY なし → ローカルモデルにフォールバック
 * - 両方失敗時もアプリケーションは継続動作
 */

import { VoyageAIClient } from "voyageai";

/** Embedding プロバイダーの種類 */
export type EmbeddingProvider = "voyage" | "local" | "none";

/** 各プロバイダーの次元数 */
export const EMBEDDING_DIMENSIONS = {
  voyage: 1024,
  local: 384,
} as const;

/** 現在アクティブな次元数（動的に決定） */
export function getEmbeddingDimension(): number {
  const provider = getActiveProvider();
  if (provider === "voyage") return EMBEDDING_DIMENSIONS.voyage;
  if (provider === "local") return EMBEDDING_DIMENSIONS.local;
  return 0;
}

/** 後方互換性のため維持（Voyage AI の次元数） */
export const EMBEDDING_DIMENSION = EMBEDDING_DIMENSIONS.voyage;

/** Voyage AI クライアント（遅延初期化） */
let voyageClient: VoyageAIClient | null = null;

/** ローカル埋め込みパイプライン（遅延初期化） */
let localPipeline: any = null;
let localPipelineLoading: Promise<any> | null = null;

/**
 * 現在アクティブなプロバイダーを取得
 */
export function getActiveProvider(): EmbeddingProvider {
  if (process.env.VOYAGE_API_KEY) return "voyage";
  // ローカルモデルは常に利用可能（初回ロードに時間がかかる）
  return "local";
}

/**
 * Voyage AI クライアントを取得
 */
function getVoyageClient(): VoyageAIClient | null {
  if (voyageClient) return voyageClient;

  const apiKey = process.env.VOYAGE_API_KEY;
  if (!apiKey) return null;

  voyageClient = new VoyageAIClient({ apiKey });
  return voyageClient;
}

/**
 * ローカル埋め込みパイプラインを取得（遅延ロード）
 */
async function getLocalPipeline(): Promise<any> {
  if (localPipeline) return localPipeline;

  // 既にロード中なら待機
  if (localPipelineLoading) return localPipelineLoading;

  localPipelineLoading = (async () => {
    try {
      console.log("[Embeddings] Loading local model (all-MiniLM-L6-v2)...");
      const { pipeline } = await import("@xenova/transformers");
      localPipeline = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
      );
      console.log("[Embeddings] Local model loaded successfully");
      return localPipeline;
    } catch (error) {
      console.error("[Embeddings] Failed to load local model:", error);
      localPipelineLoading = null;
      return null;
    }
  })();

  return localPipelineLoading;
}

/**
 * Embedding 生成結果
 */
export interface EmbeddingResult {
  /** 生成されたベクトル */
  embedding: number[];
  /** 使用トークン数（ローカルの場合は推定値） */
  totalTokens: number;
  /** 使用したプロバイダー */
  provider: EmbeddingProvider;
  /** ベクトル次元数 */
  dimension: number;
}

/**
 * Voyage AI で Embedding を生成
 */
async function generateVoyageEmbedding(
  text: string,
  inputType: "document" | "query"
): Promise<EmbeddingResult | null> {
  const client = getVoyageClient();
  if (!client) return null;

  try {
    const result = await client.embed({
      input: [text],
      model: "voyage-3.5",
      inputType,
    });

    if (!result.data || result.data.length === 0) {
      console.error("[Embeddings] No embedding data in Voyage response");
      return null;
    }

    return {
      embedding: result.data[0].embedding,
      totalTokens: result.usage?.totalTokens ?? 0,
      provider: "voyage",
      dimension: EMBEDDING_DIMENSIONS.voyage,
    };
  } catch (error) {
    console.error("[Embeddings] Voyage API failed:", error);
    return null;
  }
}

/**
 * ローカルモデルで Embedding を生成
 */
async function generateLocalEmbedding(
  text: string
): Promise<EmbeddingResult | null> {
  try {
    const pipe = await getLocalPipeline();
    if (!pipe) return null;

    const output = await pipe(text, {
      pooling: "mean",
      normalize: true,
    });

    // Tensor から配列に変換
    const embedding = Array.from(output.data as Float32Array);

    return {
      embedding,
      totalTokens: Math.ceil(text.length / 4), // 推定値
      provider: "local",
      dimension: EMBEDDING_DIMENSIONS.local,
    };
  } catch (error) {
    console.error("[Embeddings] Local embedding failed:", error);
    return null;
  }
}

/**
 * テキストから Embedding を生成
 *
 * @param text - 埋め込み対象のテキスト
 * @returns Embedding 結果（null = 生成失敗）
 */
export async function generateEmbedding(
  text: string
): Promise<EmbeddingResult | null> {
  if (!text || text.trim().length === 0) {
    return null;
  }

  // Voyage AI を優先
  if (process.env.VOYAGE_API_KEY) {
    const result = await generateVoyageEmbedding(text, "document");
    if (result) return result;
    console.warn("[Embeddings] Voyage failed, falling back to local model");
  }

  // ローカルモデルにフォールバック
  return generateLocalEmbedding(text);
}

/**
 * 検索クエリ用 Embedding を生成
 *
 * @param queryText - 検索クエリテキスト
 * @returns Embedding 結果
 */
export async function generateQueryEmbedding(
  queryText: string
): Promise<EmbeddingResult | null> {
  if (!queryText || queryText.trim().length === 0) {
    return null;
  }

  // Voyage AI を優先（クエリ最適化あり）
  if (process.env.VOYAGE_API_KEY) {
    const result = await generateVoyageEmbedding(queryText, "query");
    if (result) return result;
    console.warn("[Embeddings] Voyage failed, falling back to local model");
  }

  // ローカルモデルにフォールバック
  return generateLocalEmbedding(queryText);
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
  if (texts.length === 0) {
    return [];
  }

  // 空文字列をフィルタ
  const validTexts = texts.map((t) => (t && t.trim().length > 0 ? t : null));

  // Voyage AI でバッチ処理を試行
  if (process.env.VOYAGE_API_KEY) {
    const client = getVoyageClient();
    if (client) {
      try {
        const indicesToProcess = validTexts
          .map((t, i) => (t !== null ? i : -1))
          .filter((i) => i >= 0);

        if (indicesToProcess.length > 0) {
          const result = await client.embed({
            input: indicesToProcess.map((i) => validTexts[i]!),
            model: "voyage-3.5",
            inputType: "document",
          });

          const results: (EmbeddingResult | null)[] = texts.map(() => null);
          const tokensPerItem = Math.ceil(
            (result.usage?.totalTokens ?? 0) / indicesToProcess.length
          );

          result.data?.forEach((item, idx) => {
            const originalIndex = indicesToProcess[idx];
            results[originalIndex] = {
              embedding: item.embedding,
              totalTokens: tokensPerItem,
              provider: "voyage",
              dimension: EMBEDDING_DIMENSIONS.voyage,
            };
          });

          return results;
        }
      } catch (error) {
        console.error("[Embeddings] Voyage batch failed:", error);
        // フォールバックに進む
      }
    }
  }

  // ローカルモデルで個別処理
  const results: (EmbeddingResult | null)[] = [];
  for (const text of texts) {
    if (text && text.trim().length > 0) {
      results.push(await generateLocalEmbedding(text));
    } else {
      results.push(null);
    }
  }

  return results;
}

/**
 * Embedding サービスが利用可能か確認
 */
export function isEmbeddingAvailable(): boolean {
  // Voyage API またはローカルモデルのどちらかが使えれば true
  return true;
}

/**
 * 現在の埋め込みプロバイダー情報を取得
 */
export function getEmbeddingInfo(): {
  provider: EmbeddingProvider;
  dimension: number;
  available: boolean;
} {
  const provider = getActiveProvider();
  return {
    provider,
    dimension: getEmbeddingDimension(),
    available: true,
  };
}

/**
 * ローカルモデルを事前ロード（オプション）
 */
export async function preloadLocalModel(): Promise<boolean> {
  try {
    const pipe = await getLocalPipeline();
    return pipe !== null;
  } catch {
    return false;
  }
}

/**
 * テスト用: クライアントをリセット
 * @internal
 */
export function _resetClient(): void {
  voyageClient = null;
  localPipeline = null;
  localPipelineLoading = null;
}
