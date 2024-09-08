import { CSSProperties, ReactNode } from "react";
import { css } from "styled-system/css";
import { Box } from "styled-system/jsx";
import { useDroppable } from "@dnd-kit/core";

export const DroppableGridItem = (props: {
  children: ReactNode;
  id: string;
  gridIndex: number;
  style?: CSSProperties;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-" + props.id,
    data: { gridIndex: props.gridIndex },
  });

  return (
    <div
      data-testid={"droppable-" + props.id}
      ref={setNodeRef}
      style={props.style}
      className={css({
        h: "100%",
        w: "100%",
        position: "relative",
      })}
    >
      {props.children}
      <Box
        position="absolute"
        top={0}
        w="100%"
        h="100%"
        bg={isOver ? "green.200" : "gray.200"}
        zIndex={-1000}
      />
    </div>
  );
};
