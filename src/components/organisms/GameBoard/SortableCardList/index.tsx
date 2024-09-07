import {
  SortableContext,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable"; // Allows us to move items within the array
import { DragItem } from "@/components/molecules/DragItem";
import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { useState } from "react";
import { SorceryCard } from "@/types/card";
import { SortableItem } from "@/components/molecules/SortableItem";

type GameCard = SorceryCard & { id: string };

interface SortableCardListProps {
  cards: GameCard[];
  gridIndex: number;
  onSortEnd: (newCards: GameCard[], gridIndex: number) => void; // Add callback for sorting
}

export const SortableCardList = ({
  cards,
  gridIndex,
  onSortEnd,
}: SortableCardListProps) => {
  const [localCards, setLocalCards] = useState(cards);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const oldIndex = localCards.findIndex(
      (_, i) => `card-${gridIndex}-${i}` === active.id,
    );
    const newIndex = localCards.findIndex(
      (_, i) => `card-${gridIndex}-${i}` === over.id,
    );

    if (oldIndex !== newIndex) {
      const newOrder = arrayMove(localCards, oldIndex, newIndex);
      setLocalCards(newOrder);
      onSortEnd(newOrder, gridIndex); // Notify the parent component of the change
    }
  };

  return (
    <SortableContext
      id={`grid-${gridIndex}`}
      items={localCards.map((_, cardIndex) => `card-${gridIndex}-${cardIndex}`)}
      strategy={verticalListSortingStrategy}
    >
      {localCards.map((card, cardIndex) => (
        <SortableItem
          key={`card-${gridIndex}-${cardIndex}`}
          id={`card-${gridIndex}-${cardIndex}`}
          gridIndex={gridIndex}
        >
          <DragItem
            key={`card-${gridIndex}-${cardIndex}`}
            gridIndex={gridIndex}
            index={cardIndex}
          >
            {card.type === "site" && <CardAtlas img={card.img} />}
            {card.type !== "site" && <CardImage img={card.img} />}
          </DragItem>
        </SortableItem>
      ))}
    </SortableContext>
  );
};
