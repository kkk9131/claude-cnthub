/**
 * DraggableItem コンポーネント
 *
 * ドラッグ可能なアイテムをラップするコンポーネント。
 * useDraggable フックを使用してドラッグ機能を実装。
 * アクセシビリティ属性を自動的に付与。
 */

import { useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type { DraggableItemProps } from "./types";

/**
 * ドラッグ可能なアイテムコンポーネント
 *
 * @example
 * ```tsx
 * <DraggableItem id="item-1" data={{ id: "item-1", type: "session" }}>
 *   <div>Drag me!</div>
 * </DraggableItem>
 * ```
 */
export function DraggableItem({
  id,
  data,
  children,
  disabled = false,
  className = "",
  ariaLabel,
}: DraggableItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data,
      disabled,
    });

  // ドラッグ中の変形スタイル（メモ化で再計算を抑制）
  const style = useMemo(
    () => ({
      transform: CSS.Translate.toString(transform),
      opacity: isDragging ? 0.5 : 1,
      cursor: disabled ? "default" : "grab",
    }),
    [transform, isDragging, disabled]
  );

  // ドラッグ状態に応じたクラス名（メモ化で再計算を抑制）
  const stateClasses = useMemo(
    () =>
      [isDragging ? "dragging" : "", disabled ? "drag-disabled" : ""]
        .filter(Boolean)
        .join(" "),
    [isDragging, disabled]
  );

  // デフォルトのaria-label
  const defaultAriaLabel = `Draggable ${data.type} item: ${id}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable-item ${stateClasses} ${className}`.trim()}
      {...listeners}
      {...attributes}
      data-draggable-id={id}
      data-draggable-type={data.type}
      aria-grabbed={isDragging}
      aria-disabled={disabled}
      aria-label={ariaLabel ?? defaultAriaLabel}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </div>
  );
}

/**
 * ドラッグ中のアイテムかどうかを判定するユーティリティ
 */
export function isDraggingItem(
  activeId: string | null,
  itemId: string
): boolean {
  return activeId === itemId;
}
