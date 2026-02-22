import { CardImage } from "@/components/atoms/card-view/card";
import { GameCard } from "@/types/card";
import { buttonVariants } from "@/components/ui/button/variants";

import { PiHandWithdrawFill as IconHand } from "react-icons/pi";
import { useHover } from "@/utils/hooks/useHover";
import { useRef } from "react";
import { GameStateActions } from "../..";
import { GRIDS } from "../../constants";
import { actDrawDeckIndex } from "@/utils/actions";

export const DeckModalBody = ({
  deckType,
  ...props
}: {
  deckType?: "deck" | "atlas";
} & GameStateActions) => {
  if (deckType === undefined) return null;

  const deckTypeGridIndex = deckType === "deck" ? GRIDS.DECK : GRIDS.ATLAS_DECK;
  const cards = props.gridItems[deckTypeGridIndex];

  function returnToHand(cardIndex: number) {
    if (deckType === undefined) return;
    props.setGridItems(actDrawDeckIndex(props.gridItems, deckType, cardIndex));
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-rows-[auto] min-w-[75vw] h-[70vh] overflow-x-clip overflow-y-scroll">
      {cards?.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          returnToHand={() => returnToHand(index)}
        />
      ))}
    </div>
  );
};

const Card = ({
  card,
  returnToHand,
}: {
  card: GameCard;
  returnToHand(): void;
}) => {
  const hoverRef = useRef(null);
  const isHovering = useHover(hoverRef);

  return (
    <div
      ref={hoverRef}
      key={card.id + "discard"}
      className="aspect-[8/11] w-full h-full max-h-[500px] relative saturate-100 hover:saturate-[1.75]"
    >
      <CardImage img={card.img} minH={"0"} />
      <button
        onClick={returnToHand}
        className={buttonVariants()}
        style={{
          position: "absolute",
          bottom: "50%",
          right: "calc(50% - 50px)",
          opacity: isHovering ? 1 : 0.1,
          width: "100px",
          transition: "all 0.25s ease",
        }}
      >
        <div className="flex items-center gap-0">
          <p>Return</p>
          <IconHand size="2rem" style={{ fontSize: "2rem", color: "white" }} />
        </div>
      </button>
    </div>
  );
};
