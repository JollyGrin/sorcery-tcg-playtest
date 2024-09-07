import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function SortableItem(props: {
  id: string;
  gridIndex: number;
  index: number;
  children: ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    animateLayoutChanges: () => false,
    id: props.id,
    data: {
      gridIndex: props.gridIndex,
      index: props.index,
    },
  });

  // const style = {};
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  // const style = {
  //   transform: CSS.Transform.toString(transform),
  //   transition,
  // };

  return (
    <li
      ref={setNodeRef}
      style={{ ...style, listStyle: "none", opacity: isDragging ? 0.5 : 1 }}
      {...attributes}
      {...listeners}
    >
      {props.children}
    </li>
  );
}
