import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { GameLayout } from "./Layout";
import { DragItem } from "@/components/molecules/DragItem";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { useHandleDrag } from "./useHandleDrag";
import { SorceryCard } from "@/types/card";

const nav = `100px`;
const footer = `50px`;
const body = `calc(100vh - ${nav} - ${footer})`;

type GameCard = SorceryCard & { id: string }; // for game position
type Cards = GameCard[][];
export const GameBoard = ({
  gridItems,
  setGridItems,
}: {
  setGridItems(state: Cards): void;
  gridItems: Cards;
}) => {
  const { handleDragEnd } = useHandleDrag({
    gridItems,
    setGridItems,
  });

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <GameLayout>
        {gridItems?.map((cards, gridIndex) => (
          <DroppableGridItem key={"grid-" + gridIndex} id={"grid-" + gridIndex}>
            <SortableContext
              id={`grid-${gridIndex}`}
              items={cards.map(
                (card, cardIndex) => `card-${gridIndex}-${cardIndex}`,
              )}
              strategy={rectSortingStrategy}
            >
              {cards.map((card, cardIndex) => (
                <DragItem
                  key={`card-${gridIndex}-${cardIndex}`}
                  gridIndex={gridIndex}
                  index={cardIndex}
                >
                  <CardAtlas img={card.img} />
                </DragItem>
              ))}
            </SortableContext>
          </DroppableGridItem>
        ))}
      </GameLayout>
    </DndContext>
  );
};
