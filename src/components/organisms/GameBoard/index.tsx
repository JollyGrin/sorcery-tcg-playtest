import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { GameLayout } from "./Layout";
import { DragItem } from "@/components/molecules/DragItem";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { closestCenter, DndContext } from "@dnd-kit/core";
import { useHandleDrag } from "./useHandleDrag";
import { SorceryCard } from "@/types/card";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { SortableCardList } from "./SortableCardList";

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

  const handleSortEnd = (newCards: GameCard[], gridIndex: number) => {
    const updatedGridItems = [...gridItems];
    updatedGridItems[gridIndex] = newCards;
    setGridItems(updatedGridItems); // Update the overall grid items state
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <GameLayout>
        {gridItems?.map((cards, gridIndex) => (
          <DroppableGridItem
            key={"grid-" + gridIndex}
            id={gridIndex.toString()}
          >
            <SortableCardList
              cards={cards}
              gridIndex={gridIndex}
              onSortEnd={handleSortEnd}
            />
            {/* <SortableContext */}
            {/*   id={`grid-${gridIndex}`} */}
            {/*   items={cards.map( */}
            {/*     (_, cardIndex) => `card-${gridIndex}-${cardIndex}`, */}
            {/*   )} */}
            {/*   strategy={rectSortingStrategy} */}
            {/* > */}
            {/*   {cards.map((card, cardIndex) => ( */}
            {/*     <DragItem */}
            {/*       key={`card-${gridIndex}-${cardIndex}`} */}
            {/*       gridIndex={gridIndex} */}
            {/*       index={cardIndex} */}
            {/*     > */}
            {/*       {card.type === "site" && <CardAtlas img={card.img} />} */}
            {/*       {card.type !== "site" && <CardImage img={card.img} />} */}
            {/*     </DragItem> */}
            {/*   ))} */}
            {/* </SortableContext> */}
          </DroppableGridItem>
        ))}
      </GameLayout>
    </DndContext>
  );
};
