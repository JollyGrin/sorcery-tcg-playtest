import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { useState } from "react";
import { SorceryCard } from "@/types/card";
import { SortableItem } from "@/components/molecules/SortableItem";

type GameCard = SorceryCard & { id: string };

interface SortableCardListProps {
  cards: GameCard[];
  gridIndex: number;
}

export const SortableCardList = ({
  cards,
  gridIndex,
}: SortableCardListProps) => {
  const [localCards, setLocalCards] = useState(cards);

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
          {/* <DragItem */}
          {/*   key={`card-${gridIndex}-${cardIndex}`} */}
          {/*   gridIndex={gridIndex} */}
          {/*   index={cardIndex} */}
          {/* > */}
          {card.type === "site" && <CardAtlas img={card.img} />}
          {card.type !== "site" && <CardImage img={card.img} />}
          {/* </DragItem> */}
        </SortableItem>
      ))}
    </SortableContext>
  );
};
