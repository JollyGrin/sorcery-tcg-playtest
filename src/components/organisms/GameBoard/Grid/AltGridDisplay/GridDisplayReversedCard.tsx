import { GameCard } from "@/types/card";
import { CSSProperties } from "react";
import { getCardImage } from "../../constants";

export const GridDisplayReversedCard = (props: {
  card: GameCard;
  index: number;
  length: {
    spells: number;
    cards: number;
  };
}) => {
  const { img, type, isTapped: tapped } = props.card;
  const style = type === "site" ? siteProps : spellProps;
  const isTapped = tapped
    ? {
        transform: "rotate(270deg)",
        filter: "saturate(0.5)",
        left: props.length.spells - props.index + 0.5 + "rem",
      }
    : undefined;

  return (
    <img
      key={img + props.index}
      src={getCardImage(img)}
      style={{
        position: "absolute",
        left: props.index * 0.5 + 1 + "rem",
        zIndex: props.length.cards - props.index,
        transition: "all 0.25s ease",
        filter: "drop-shadow(0 0 2px rgba(0,0,0,0.25))",
        transform: "rotate(180deg)",
        ...isTapped,
        ...style,
        top: type !== "site" ? props.index + 3 + "rem" : undefined,
      }}
    />
  );
};

const spellProps: CSSProperties = {
  height: "10rem",
  width: "auto",
};
const siteProps: CSSProperties = {
  width: "7.5rem",
  height: "auto",
  transform: "rotate(270deg)",
  top: "0",
  left: "2.55rem",
};
