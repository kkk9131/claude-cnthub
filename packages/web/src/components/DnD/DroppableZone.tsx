/**
 * DroppableZone コンポーネント
 *
 * ドロップ可能なゾーンをラップするコンポーネント。
 * useDroppable フックを使用してドロップ機能を実装。
 * ドラッグオーバー時の視覚的フィードバックを提供。
 */

import { useDroppable } from "@dnd-kit/core";
import type { DroppableZoneProps } from "./types";

/**
 * ドロップ可能なゾーンコンポーネント
 *
 * @example
 * ```tsx
 * <DroppableZone
 *   id="zone-1"
 *   data={{ id: "zone-1", accepts: ["session", "merge"] }}
 *   activeClassName="bg-blue-500/20"
 * >
 *   <div>Drop items here</div>
 * </DroppableZone>
 * ```
 */
export function DroppableZone({
  id,
  data,
  children,
  disabled = false,
  className = "",
  activeClassName = "",
}: DroppableZoneProps) {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
    disabled,
  });

  // ドラッグ中のアイテムが受け入れ可能かチェック
  const canAccept = (): boolean => {
    if (!active || !data?.accepts) return true;
    const draggedType = active.data.current?.type;
    if (!draggedType) return true;
    return data.accepts.includes(draggedType);
  };

  const isAcceptable = canAccept();

  // ドロップ状態に応じたクラス名
  const stateClasses = [
    isOver && isAcceptable ? "drop-over" : "",
    isOver && !isAcceptable ? "drop-rejected" : "",
    disabled ? "drop-disabled" : "",
    isOver && activeClassName ? activeClassName : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={setNodeRef}
      className={`droppable-zone ${stateClasses} ${className}`.trim()}
      data-droppable-id={id}
      data-drop-over={isOver}
      data-drop-acceptable={isAcceptable}
      aria-dropeffect={disabled ? "none" : "move"}
    >
      {children}
    </div>
  );
}

/**
 * ドロップゾーンがアクティブかどうかを判定するユーティリティ
 */
export function isZoneActive(overId: string | null, zoneId: string): boolean {
  return overId === zoneId;
}

/**
 * ドラッグアイテムがドロップゾーンに受け入れ可能かチェック
 */
export function canAcceptDrop(
  accepts: Array<"project" | "session" | "merge"> | undefined,
  itemType: "project" | "session" | "merge"
): boolean {
  if (!accepts || accepts.length === 0) return true;
  return accepts.includes(itemType);
}
