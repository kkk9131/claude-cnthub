/**
 * DnD コンポーネントの型定義
 */

import type {
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import type { ReactNode } from "react";

/**
 * ドラッグ可能なアイテムのデータ構造
 */
export interface DraggableData {
  /** アイテムの一意識別子 */
  id: string;
  /** アイテムの種類（TreeViewと統合するため） */
  type: "project" | "session" | "merge";
  /** 追加データ */
  data?: Record<string, unknown>;
}

/**
 * ドロップゾーンのデータ構造
 */
export interface DroppableData {
  /** ゾーンの一意識別子 */
  id: string;
  /** 受け入れ可能なアイテムタイプ */
  accepts?: Array<"project" | "session" | "merge">;
}

/**
 * DnDProvider のProps
 */
export interface DnDProviderProps {
  /** 子要素 */
  children: ReactNode;
  /** ドラッグ開始時のコールバック */
  onDragStart?: (event: DragStartEvent) => void;
  /** ドラッグ中のコールバック */
  onDragOver?: (event: DragOverEvent) => void;
  /** ドラッグ終了時のコールバック */
  onDragEnd?: (event: DragEndEvent) => void;
}

/**
 * DraggableItem のProps
 */
export interface DraggableItemProps {
  /** ドラッグ可能なアイテムのID */
  id: string;
  /** ドラッグデータ */
  data: DraggableData;
  /** 子要素（ドラッグハンドルとして機能） */
  children: ReactNode;
  /** 無効化 */
  disabled?: boolean;
  /** カスタムクラス名 */
  className?: string;
}

/**
 * DroppableZone のProps
 */
export interface DroppableZoneProps {
  /** ドロップゾーンのID */
  id: string;
  /** ドロップゾーンのデータ */
  data?: DroppableData;
  /** 子要素 */
  children: ReactNode;
  /** 無効化 */
  disabled?: boolean;
  /** カスタムクラス名 */
  className?: string;
  /** ドラッグオーバー時のクラス名 */
  activeClassName?: string;
}

/**
 * ドラッグオーバーレイのProps
 */
export interface DragOverlayProps {
  /** 子要素（ドラッグ中に表示される要素） */
  children?: ReactNode;
}
