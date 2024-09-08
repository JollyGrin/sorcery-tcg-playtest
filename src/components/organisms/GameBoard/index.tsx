import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { GameLayout } from "./Layout";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import {
  closestCenter,
  closestCorners,
  CollisionDetection,
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { useHandleDrag } from "./useHandleDrag";
import { SorceryCard } from "@/types/card";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { SortableItem } from "@/components/molecules/SortItem";
import { Box } from "styled-system/jsx";

type GameCard = SorceryCard & { id: string }; // for game position
type Cards = GameCard[][];
export type GameStateActions = {
  gridItems: Cards;
  setGridItems(state: Cards): void;
};
export const GameBoard = ({ gridItems, setGridItems }: GameStateActions) => {
  const { handleDragEnd, handleDragStart, activeId, activeCard } =
    useHandleDrag({
      gridItems,
      setGridItems,
    });

  const collision: CollisionDetection = (props) => {
    // Access the current translated Y position of the dragged item
    const currentY = props?.active?.rect?.current?.translated?.top;

    // Get the height of the viewport
    const viewportHeight = window.innerHeight;

    // Check if the current Y position is within the bottom 170px of the page
    const isInFooter = currentY && currentY > viewportHeight - 170;

    // Check if the current Y position is within the bottom 170px of the page
    // If the item is in the bottom 170px, use closestCenter for the footer
    if (isInFooter) {
      return closestCenter(props);
    }

    return closestCorners(props);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={collision}
    >
      <GameLayout {...{ gridItems, setGridItems }}>
        {gridItems?.slice(0, 20)?.map((cards, gridIndex) => (
          <DroppableGridItem
            key={"grid-" + gridIndex}
            id={gridIndex.toString()}
            gridIndex={gridIndex}
          >
            <SortableContext
              id={`grid-${gridIndex}`}
              items={cards.map((card) => card.id)}
              strategy={rectSortingStrategy}
            >
              {cards.map((card, cardIndex) => (
                <SortableItem
                  key={`card-${gridIndex}-${cardIndex}`}
                  id={card.id}
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
          <Box opacity={0.5}>
            {activeCard?.type === "site" && <CardAtlas img={activeCard?.img} />}
            {activeCard?.type !== "site" && <CardImage img={activeCard?.img} />}
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
