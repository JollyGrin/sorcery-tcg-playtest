import { useDraggable } from "@dnd-kit/core";
import { CSSProperties, ReactNode } from "react";

export const DragItem = (props: {
  children: ReactNode;
  gridIndex: number;
  index: number;
  style?: CSSProperties;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.gridIndex}-${props.index}`,
    data: {
      gridIndex: props.gridIndex,
      index: props.index,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...props?.style }}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
};
