/**
 * ID生成ユーティリティ
 *
 * claude-cnthub プロジェクトの ID 体系に従った ID 生成機能を提供
 *
 * ID形式: {prefix}_{4桁連番}
 * 例: ch_ss_0001, ch_mg_0042, ch_pj_0123, ch_ob_9999
 */

/**
 * エンティティタイプのプレフィックス定義
 */
export const ID_PREFIXES = {
  SESSION: "ch_ss",
  MERGE: "ch_mg",
  PROJECT: "ch_pj",
  OBSERVATION: "ch_ob",
} as const;

/**
 * エンティティタイプ
 */
export type EntityType = keyof typeof ID_PREFIXES;

/**
 * 連番の桁数
 */
export const ID_LENGTH = 4;

/**
 * 最小連番
 */
const MIN_SEQUENCE = 1;

/**
 * 最大連番
 */
const MAX_SEQUENCE = 9999;

/**
 * IDの正規表現パターン
 */
const ID_PATTERN = /^(ch_(?:ss|mg|pj|ob))_(\d{4})$/;

/**
 * パースされたIDの情報
 */
export interface ParsedId {
  entityType: EntityType;
  prefix: string;
  sequence: number;
}

/**
 * 連番を指定してIDを生成
 *
 * @param entityType エンティティタイプ
 * @param sequence 連番（1-9999）
 * @returns 生成されたID
 * @throws {Error} 連番が範囲外の場合
 * @throws {Error} 無効なエンティティタイプの場合
 */
export function generateSequentialId(
  entityType: EntityType,
  sequence: number
): string {
  // エンティティタイプの検証
  const prefix = ID_PREFIXES[entityType];
  if (!prefix) {
    throw new Error(`Invalid entity type: ${entityType}`);
  }

  // 連番の範囲チェック
  if (sequence < MIN_SEQUENCE || sequence > MAX_SEQUENCE) {
    throw new Error(
      `Sequence number must be between ${MIN_SEQUENCE} and ${MAX_SEQUENCE}`
    );
  }

  // 4桁のゼロ埋め
  const paddedSequence = String(sequence).padStart(ID_LENGTH, "0");

  return `${prefix}_${paddedSequence}`;
}

/**
 * IDをパースして情報を取得
 *
 * @param id パース対象のID
 * @returns パースされたID情報。無効なIDの場合はnull
 */
export function parseId(id: string): ParsedId | null {
  const match = id.match(ID_PATTERN);
  if (!match) {
    return null;
  }

  const [, prefix, sequenceStr] = match;
  const sequence = parseInt(sequenceStr, 10);

  // シーケンス0は無効
  if (sequence < MIN_SEQUENCE) {
    return null;
  }

  // プレフィックスからエンティティタイプを逆引き
  const entityType = (Object.keys(ID_PREFIXES) as EntityType[]).find(
    (key) => ID_PREFIXES[key] === prefix
  );

  if (!entityType) {
    return null;
  }

  return {
    entityType,
    prefix,
    sequence,
  };
}

/**
 * IDが有効かどうかを検証
 *
 * @param id 検証対象のID
 * @param expectedEntityType 期待するエンティティタイプ（オプション）
 * @returns 有効な場合true
 */
export function isValidId(
  id: string,
  expectedEntityType?: EntityType
): boolean {
  const parsed = parseId(id);
  if (!parsed) {
    return false;
  }

  if (expectedEntityType && parsed.entityType !== expectedEntityType) {
    return false;
  }

  return true;
}

/**
 * 既存のID配列から次の連番を取得
 *
 * @param existingIds 既存のID配列
 * @returns 次の連番
 * @throws {Error} 最大連番に達している場合
 */
export function getNextSequence(existingIds: string[]): number {
  if (existingIds.length === 0) {
    return MIN_SEQUENCE;
  }

  let maxSequence = 0;

  for (const id of existingIds) {
    const parsed = parseId(id);
    if (parsed && parsed.sequence > maxSequence) {
      maxSequence = parsed.sequence;
    }
  }

  if (maxSequence === 0) {
    return MIN_SEQUENCE;
  }

  if (maxSequence >= MAX_SEQUENCE) {
    throw new Error(`Maximum sequence number (${MAX_SEQUENCE}) reached`);
  }

  return maxSequence + 1;
}
