/**
 * DnDProvider コンポーネント
 *
 * dnd-kit の DndContext をラップし、ドラッグ&ドロップ機能を提供する。
 * キーボードセンサー、ポインターセンサーを標準で有効化し、
 * アクセシビリティを考慮した実装。
 */

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import type { DnDProviderProps } from "./types";

/**
 * ドラッグ&ドロップ機能を提供するプロバイダーコンポーネント
 *
 * @example
 * ```tsx
 * <DnDProvider onDragEnd={handleDragEnd}>
 *   <DraggableItem id="1" data={{ id: "1", type: "session" }}>
 *     <div>Draggable Content</div>
 *   </DraggableItem>
 *   <DroppableZone id="zone-1">
 *     <div>Drop here</div>
 *   </DroppableZone>
 * </DnDProvider>
 * ```
 */
export function DnDProvider({
  children,
  onDragStart,
  onDragOver,
  onDragEnd,
}: DnDProviderProps) {
  // ポインター（マウス/タッチ）とキーボードの両方に対応
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // 軽いクリックとドラッグを区別するための最小移動距離
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      // ソート可能なキーボード座標を使用
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    onDragStart?.(event);
  };

  const handleDragOver = (event: DragOverEvent) => {
    onDragOver?.(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    onDragEnd?.(event);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {children}
    </DndContext>
  );
}
