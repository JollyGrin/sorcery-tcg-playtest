import { GameCard } from "@/types/card";
import { CSSProperties } from "react";
import { getCardImage } from "../../constants";

export const GridDisplayCard = (props: {
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
        transform: "rotate(90deg)",
        filter: "saturate(0.5)",
      }
    : undefined;

  return (
    <img
      key={img + props.index}
      src={getCardImage(img)}
      style={{
        position: "absolute",
        left: props.index * 0.5 + 2 + "rem",
        zIndex: props.length.cards - props.index,
        transition: "all 0.25s ease",
        filter: "drop-shadow(0 0 2px rgba(0,0,0,0.25))",
        ...isTapped,
        ...style,
        top:
          type !== "site"
            ? props.length.spells - props.index + 0.5 + "rem"
            : undefined,
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
  transform: "rotate(90deg)",
  bottom: "-1.25rem",
  left: "2.55rem",
};
