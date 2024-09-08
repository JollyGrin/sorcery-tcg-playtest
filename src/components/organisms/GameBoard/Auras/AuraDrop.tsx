import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { ReactNode } from "react";

export const AuraDrop = ({
  gridIndex,
  children,
}: {
  gridIndex: number;
  children: ReactNode;
}) => {
  return (
    <DroppableGridItem id={gridIndex.toString()} gridIndex={gridIndex}>
      {children}
    </DroppableGridItem>
  );
};
