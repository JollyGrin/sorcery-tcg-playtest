import { useDraggable } from "@dnd-kit/core";
import { ReactNode } from "react";

export const DragItem = (props: {
  children: ReactNode;
  gridIndex: number;
  index: number;
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
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
};
