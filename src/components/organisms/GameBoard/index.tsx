import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { GameLayout } from "./Layout";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { closestCorners, DndContext, DragOverlay } from "@dnd-kit/core";
import { useHandleDrag } from "./useHandleDrag";
import { SorceryCard } from "@/types/card";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { SortableItem } from "@/components/molecules/SortItem";
import { Box } from "styled-system/jsx";

type GameCard = SorceryCard & { id: string }; // for game position
type Cards = GameCard[][];
export const GameBoard = ({
  gridItems,
  setGridItems,
}: {
  setGridItems(state: Cards): void;
  gridItems: Cards;
}) => {
  const { handleDragEnd, handleDragStart, activeId, activeCard } =
    useHandleDrag({
      gridItems,
      setGridItems,
    });

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <GameLayout>
        {gridItems?.map((cards, gridIndex) => (
          <DroppableGridItem
            key={"grid-" + gridIndex}
            id={gridIndex.toString()}
          >
            <SortableContext
              id={`grid-${gridIndex}`}
              items={cards.map(
                (_, cardIndex) => `card-${gridIndex}-${cardIndex}`,
              )}
              strategy={rectSortingStrategy}
            >
              {cards.map((card, cardIndex) => (
                <SortableItem
                  key={`card-${gridIndex}-${cardIndex}`}
                  id={`card-${gridIndex}-${cardIndex}`}
                  gridIndex={gridIndex}
                  index={cardIndex}
                >
                  {card.type === "site" && <CardAtlas img={card.img} />}
                  {card.type !== "site" && <CardImage img={card.img} />}
                </SortableItem>
              ))}
            </SortableContext>
          </DroppableGridItem>
        ))}
      </GameLayout>
      <DragOverlay>
        {activeId ? (
          <Box opacity={0.8}>
            {activeCard?.type === "site" && <CardAtlas img={activeCard?.img} />}
            {activeCard?.type !== "site" && <CardImage img={activeCard?.img} />}
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
