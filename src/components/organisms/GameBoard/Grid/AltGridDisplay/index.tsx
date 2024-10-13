import { GridItem } from "@/types/card";
import { Box } from "styled-system/jsx";
import { getCardImage } from "../../constants";
import { CSSProperties } from "react";

export const AltGridDisplay = ({
  cards = [],
  ...props
}: Partial<{
  cards: GridItem;
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
      {cards?.map((card, index) => {
        const style = card.type === "site" ? siteProps : spellProps;
        const isTapped = card.isTapped
          ? {
              transform: "rotate(90deg)",
              filter: "saturate(0.5)",
            }
          : undefined;
        return (
          <img
            key={card.img + index}
            src={getCardImage(card?.img)}
            style={{
              position: "absolute",
              left: index * 0.5 + 2 + "rem",
              zIndex: cardsLength - index,
              transition: "all 0.25s ease",
              filter: "drop-shadow(0 0 2px rgba(0,0,0,0.25))",
              ...isTapped,
              ...style,
              top:
                card.type !== "site"
                  ? spellsLength - index + 0.5 + "rem"
                  : undefined,
            }}
          />
        );
      })}
    </Box>
  );
};

const spellProps: CSSProperties = {
  height: "10rem",
  width: "auto",
};
const siteProps: CSSProperties = {
  width: "7.5rem",
  height: "auto",
  transform: "rotate(90deg)",
  bottom: "-1.25rem",
  left: "2.55rem",
};
