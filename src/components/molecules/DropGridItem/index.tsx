import { CSSProperties, ReactNode, useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Modal } from "@/components/atoms/Modal";
import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { cn } from "@/lib/utils";

export const DroppableGridItem = (props: {
  contextMenu?: ReactNode;
  children: ReactNode;
  id: string;
  gridIndex: number;
  style?: CSSProperties;
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-" + props.id,
    data: { gridIndex: props.gridIndex },
  });

  const [isOpen, setIsOpen] = useState(false);

  const isGrid = props.gridIndex <= GRIDS.GRID_20;
  return (
    <div
      data-testid={"droppable-" + props.id}
      ref={setNodeRef}
      style={props.style}
      className="h-full w-full relative"
      onContextMenu={(e) => {
        e.preventDefault();
        setIsOpen(true);
      }}
    >
      {props.children}
      {isOver && (
        <div className="absolute inset-0 border-2 border-green-400 rounded z-10 pointer-events-none" />
      )}
      <div
        className={cn(
          "absolute top-0 w-full h-full -z-[1000]",
          isOver ? "bg-green-200" : "bg-gray-200",
        )}
      >
        <p
          style={{
            position: "absolute",
            opacity: 0.25,
            bottom: "0.75rem",
            left: "calc(50% - 1rem)",
          }}
        >
          {props.gridIndex <= 19 ? props.gridIndex + 1 : ""}
        </p>
      </div>
      <Modal
        wrapperProps={{
          open: isGrid && isOpen,
          onOpenChange: () => setIsOpen(false),
        }}
        content={props?.contextMenu}
      />
    </div>
  );
};
