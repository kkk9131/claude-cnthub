/**
 * DroppableZone コンポーネント
 *
 * ドロップ可能なゾーンをラップするコンポーネント。
 * useDroppable フックを使用してドロップ機能を実装。
 * ドラッグオーバー時の視覚的フィードバックを提供。
 */

import { useMemo } from "react";
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
  ariaLabel,
}: DroppableZoneProps) {
  const { isOver, setNodeRef, active } = useDroppable({
    id,
    data,
    disabled,
  });

  // ドラッグ中のアイテムが受け入れ可能かチェック（メモ化で再計算を抑制）
  const isAcceptable = useMemo(() => {
    if (!active || !data?.accepts) return true;
    const draggedType = active.data.current?.type;
    if (!draggedType) return true;
    return data.accepts.includes(draggedType);
  }, [active, data?.accepts]);

  // ドロップ状態に応じたクラス名（メモ化で再計算を抑制）
  const stateClasses = useMemo(
    () =>
      [
        isOver && isAcceptable ? "drop-over" : "",
        isOver && !isAcceptable ? "drop-rejected" : "",
        disabled ? "drop-disabled" : "",
        isOver && activeClassName ? activeClassName : "",
      ]
        .filter(Boolean)
        .join(" "),
    [isOver, isAcceptable, disabled, activeClassName]
  );

  // デフォルトのaria-label
  const acceptsText = data?.accepts?.join(", ") ?? "any items";
  const defaultAriaLabel = `Drop zone for ${acceptsText}`;

  return (
    <div
      ref={setNodeRef}
      className={`droppable-zone ${stateClasses} ${className}`.trim()}
      data-droppable-id={id}
      data-drop-over={isOver}
      data-drop-acceptable={isAcceptable}
      aria-dropeffect={disabled ? "none" : "move"}
      aria-label={ariaLabel ?? defaultAriaLabel}
      role="region"
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
