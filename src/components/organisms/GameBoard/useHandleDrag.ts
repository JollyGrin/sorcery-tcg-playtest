import { GameCard } from "@/types/card";
import { findContainer, resolveOverTarget } from "@/utils/actions/grid";
import {
  closestCenter,
  closestCorners,
  CollisionDetection,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useRef, useState } from "react";
import { LAYOUT_HEIGHTS } from "./constants";

type Cards = GameCard[][];

const footerHeight = parseInt(LAYOUT_HEIGHTS.footer, 10);

const collision: CollisionDetection = (props) => {
  // Access the current translated Y position of the dragged item
  const currentY = props?.active?.rect?.current?.translated?.top;

  // Get the height of the viewport
  const viewportHeight = window.innerHeight;

  // Check if the current Y position is within the footer area
  const isInFooter = currentY && currentY > viewportHeight - footerHeight;

  // If the item is in the footer, use closestCenter for the footer
  if (isInFooter) {
    return closestCenter(props);
  }

  return closestCorners(props);
};

const announcements = {
  onDragStart({ active }: { active: { id: string | number } }) {
    return `Picked up card ${active.id}.`;
  },
  onDragOver({
    active,
    over,
  }: {
    active: { id: string | number };
    over: { id: string | number } | null;
  }) {
    if (over) {
      return `Card ${active.id} is over ${over.id}.`;
    }
    return `Card ${active.id} is no longer over a drop zone.`;
  },
  onDragEnd({
    active,
    over,
  }: {
    active: { id: string | number };
    over: { id: string | number } | null;
  }) {
    if (over) {
      return `Card ${active.id} was dropped on ${over.id}.`;
    }
    return `Card ${active.id} was dropped.`;
  },
  onDragCancel({ active }: { active: { id: string | number } }) {
    return `Dragging of card ${active.id} was cancelled.`;
  },
};

export const useHandleDrag = ({
  gridItems,
  setGridItems,
}: {
  gridItems: Cards;
  setGridItems(state: Cards): void;
}) => {
  const [activeId, setActiveId] = useState<string | number | undefined>(
    undefined,
  );

  // Keep a mutable ref to gridItems so event handlers always read fresh state
  const gridItemsRef = useRef(gridItems);
  gridItemsRef.current = gridItems;

  // Frozen card data captured at drag start — used for stable DragOverlay
  const activeCardRef = useRef<GameCard | null>(null);

  // Deep clone of gridItems at drag start — used to restore on cancel
  const snapshotRef = useRef<Cards | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates,
  });

  const sensors = useSensors(pointerSensor, touchSensor, keyboardSensor);

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id);

    // Freeze the active card for DragOverlay
    const gridIdx = active.data.current?.gridIndex;
    const cardIdx = active.data.current?.index;
    if (gridIdx != null && cardIdx != null) {
      activeCardRef.current =
        gridItemsRef.current[gridIdx]?.[cardIdx] ?? null;
    } else {
      // Fallback: search by id
      const container = findContainer(gridItemsRef.current, active.id);
      if (container !== -1) {
        activeCardRef.current =
          gridItemsRef.current[container].find(
            (c) => c.id === String(active.id),
          ) ?? null;
      }
    }

    // Deep clone for cancel restoration
    snapshotRef.current = gridItemsRef.current.map((arr) =>
      arr.map((card) => ({ ...card })),
    );
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || over.id === active.id) return;

    const prev = gridItemsRef.current;

    // Determine the active card's current container.
    // For DragItem-originated drags (auras), active.id is like "20-0" — not a card id.
    // In that case, use the data attributes.
    let activeContainer = findContainer(prev, active.id);
    let activeCardIndex = -1;

    if (activeContainer !== -1) {
      activeCardIndex = prev[activeContainer].findIndex(
        (c) => c.id === String(active.id),
      );
    } else if (active.data.current?.gridIndex != null) {
      // DragItem fallback (auras)
      activeContainer = active.data.current.gridIndex;
      activeCardIndex = active.data.current.index;
    }

    if (activeContainer === -1 || activeCardIndex === -1) return;

    const { containerIndex: overContainer, cardIndex: overCardIndex } =
      resolveOverTarget(prev, over.id);

    if (overContainer === -1) return;

    // Same container — SortableContext handles visual reorder internally
    if (activeContainer === overContainer) return;

    // Cross-container move
    const next = prev.map((arr) => [...arr]);
    const [movedCard] = next[activeContainer].splice(activeCardIndex, 1);

    if (overCardIndex >= 0) {
      // Insert at the hovered card's position
      next[overContainer].splice(overCardIndex, 0, movedCard);
    } else {
      // Hovering over an empty container — push
      next[overContainer].push(movedCard);
    }

    setGridItems(next);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(undefined);
    activeCardRef.current = null;
    snapshotRef.current = null;

    if (!over || over.id === active.id) return;

    const prev = gridItemsRef.current;

    // Find containers for both active and over
    let activeContainer = findContainer(prev, active.id);
    if (activeContainer === -1 && active.data.current?.gridIndex != null) {
      activeContainer = active.data.current.gridIndex;
    }

    const { containerIndex: overContainer, cardIndex: overCardIndex } =
      resolveOverTarget(prev, over.id);

    if (activeContainer === -1 || overContainer === -1) return;

    // Same container — reorder with arrayMove
    if (activeContainer === overContainer) {
      const activeCardIndex = prev[activeContainer].findIndex(
        (c) => c.id === String(active.id),
      );
      const targetIndex =
        overCardIndex >= 0
          ? overCardIndex
          : prev[overContainer].length - 1;

      if (activeCardIndex !== -1 && activeCardIndex !== targetIndex) {
        const next = prev.map((arr) => [...arr]);
        next[activeContainer] = arrayMove(
          next[activeContainer],
          activeCardIndex,
          targetIndex,
        );
        setGridItems(next);
      }
    }
    // Cross-container moves are already handled by onDragOver
  }

  function handleDragCancel() {
    setActiveId(undefined);

    // Restore snapshot
    if (snapshotRef.current) {
      setGridItems(snapshotRef.current);
    }

    activeCardRef.current = null;
    snapshotRef.current = null;
  }

  return {
    collision,
    sensors,
    onDragStart: handleDragStart,
    onDragOver: handleDragOver,
    onDragEnd: handleDragEnd,
    onDragCancel: handleDragCancel,
    activeId,
    activeCard: activeCardRef.current,
    accessibility: { announcements },
  };
};
