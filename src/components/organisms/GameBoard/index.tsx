import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { HStack } from "styled-system/jsx";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { GameLayout } from "./Layout";
import { DragItem } from "@/components/molecules/DragItem";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { useHandleDrag } from "./useHandleDrag";

const nav = `100px`;
const footer = `50px`;
const body = `calc(100vh - ${nav} - ${footer})`;

export const GameBoard = ({ gridItems }: { gridItems: { id: string }[][] }) => {
  const { handleDragEnd } = useHandleDrag({ gridItems, setGridItems });
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <GameLayout>
        {gridItems?.map((cards, gridIndex) => (
          <DroppableGridItem key={"grid-" + gridIndex} id={"grid-" + gridIndex}>
            <SortableContext
              id={`grid-${gridIndex}`}
              items={cards.map((_, i) => `${gridIndex}-${i}`)}
              strategy={rectSortingStrategy}
            >
              {cards.map((_, cardIndex) => (
                <DragItem
                  key={`card-${gridIndex}-${cardIndex}`}
                  gridIndex={gridIndex}
                  index={cardIndex}
                >
                  <CardAtlas />
                </DragItem>
              ))}
            </SortableContext>
          </DroppableGridItem>
        ))}
      </GameLayout>
    </DndContext>
  );
};
