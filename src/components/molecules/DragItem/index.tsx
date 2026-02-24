import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties, ReactNode } from "react";

export const DragItem = (props: {
  children: ReactNode;
  gridIndex: number;
  index: number;
  style?: CSSProperties;
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `${props.gridIndex}-${props.index}`,
      data: {
        gridIndex: props.gridIndex,
        index: props.index,
      },
    });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        ...props?.style,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.4 : 1,
        transition: "opacity 150ms ease",
      }}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
};
