import { CardImage } from "@/components/atoms/card-view/card";
import { GameCard, GridItem } from "@/types/card";
import { buttonVariants } from "@/components/ui/button/variants";

import { PiHandWithdrawFill as IconHand } from "react-icons/pi";
import { GiSilenced as IconBanish } from "react-icons/gi";
import { useHover } from "@/utils/hooks/useHover";
import { useRef } from "react";
import { GameStateActions } from "../..";
import { actDrawDiscard, actToggleBanishCard } from "@/utils/actions/discard";
import { cn } from "@/lib/utils";

export const DiscardModalBody = (
  props: {
    cards: GridItem;
  } & Partial<GameStateActions>,
) => {
  function returnToHand(cardIndex: number) {
    if (!props.setGridItems || !props.gridItems) return;
    props.setGridItems(actDrawDiscard(props.gridItems, cardIndex));
  }

  function toggleBanish(cardIndex: number) {
    if (!props.setGridItems || !props.gridItems) return;
    props.setGridItems(actToggleBanishCard(props.gridItems, cardIndex));
  }

  const hasFunctions = !!props.setGridItems;

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-rows-[auto] min-w-[75vw] h-[70vh] overflow-x-clip overflow-y-scroll">
      {props.cards
        ?.sort((a, b) => {
          if (a.isBanished && b.isBanished) {
            return 0; // no sorting if both are the same
          }
          return a.isBanished ? 1 : -1; // move banished cards to the bottom
        })
        ?.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            returnToHand={() => returnToHand(index)}
            toggleBanish={() => toggleBanish(index)}
            hasFunctions={hasFunctions}
          />
        ))}
    </div>
  );
};

const Card = ({
  card,
  returnToHand,
  toggleBanish,
  hasFunctions,
}: {
  card: GameCard;
  returnToHand(): void;
  toggleBanish(): void;
  hasFunctions: boolean;
}) => {
  const hoverRef = useRef(null);
  const isHovering = useHover(hoverRef);

  return (
    <div
      ref={hoverRef}
      key={card.id + "discard"}
      className={cn(
        "aspect-[8/11] w-full h-full max-h-[500px] relative",
        card.isBanished ? "saturate-0 hover:saturate-0" : "saturate-100 hover:saturate-[1.75]",
      )}
    >
      <CardImage img={card.img} minH={"0"} />
      <div
        className={cn(
          "flex items-center absolute bottom-[50%] right-[calc(50%-100px)]",
          hasFunctions ? "flex" : "hidden",
        )}
      >
        <button
          onClick={returnToHand}
          className={buttonVariants()}
          style={{
            opacity: isHovering ? 1 : 0.1,
            width: "100px",
            transition: "all 0.25s ease",
          }}
        >
          <div className="flex items-center gap-0">
            <p>Return</p>
            <IconHand
              size="2rem"
              style={{ fontSize: "2rem", color: "white" }}
            />
          </div>
        </button>

        <button
          onClick={toggleBanish}
          className={buttonVariants()}
          style={{
            opacity: isHovering ? 1 : 0.1,
            width: "100px",
            transition: "all 0.25s ease",
          }}
        >
          <div className="flex items-center gap-0">
            <p>{card.isBanished ? "Unbanish" : "Banish"}</p>
            <IconBanish
              size="2rem"
              style={{ fontSize: "2rem", color: "white" }}
            />
          </div>
        </button>
      </div>
    </div>
  );
};
