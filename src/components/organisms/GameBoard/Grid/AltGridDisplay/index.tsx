import { GridItem } from "@/types/card";
import { Box } from "styled-system/jsx";
import { GridDisplayCard } from "./GridDisplayCard";
import { GridDisplayReversedCard } from "./GridDisplayReversedCard";

export const AltGridDisplay = ({
  cards = [],
  myName,
  ...props
}: Partial<{
  cards: GridItem;
  myName: string;
  gridIndex: number;
  onMouseOver(): void;
  onMouseLeave(): void;
}>) => {
  const cardsLength = cards?.length ?? 0;
  const spellsLength = cards.filter((card) => card.type !== "site").length ?? 0;

  return (
    <Box
      zIndex={0}
      bg="radial-gradient(circle, rgba(224,224,224,1) 0%, rgba(0,0,0,0) 100%)"
      position="relative"
      {...props}
    >
      <p
        style={{
          position: "absolute",
          bottom: "0.75rem",
          left: "calc(50% - 1rem)",
          opacity: 0.1,
        }}
      >
        {props.gridIndex}
      </p>
      {cards?.map((card, index) => {
        const isMe = card.playerName === myName;
        const Display = isMe ? GridDisplayCard : GridDisplayReversedCard;
        return (
          <Display
            key={card.img + index}
            length={{ spells: spellsLength, cards: cardsLength }}
            {...{ card, index }}
          />
        );
      })}
    </Box>
  );
};
