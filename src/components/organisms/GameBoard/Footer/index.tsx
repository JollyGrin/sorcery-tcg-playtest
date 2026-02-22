import { GRIDS, LAYOUT_HEIGHTS } from "../constants";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { GameStateActions } from "..";
import { SortableItem } from "@/components/molecules/SortItem";
import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { DecksTray } from "./Decks";
import { GraveTray } from "./Grave";
import { GameCard, PlayerDataProps } from "@/types/card";
import { useState } from "react";
import { Modal } from "@/components/atoms/Modal";
import { FullCardAtlas } from "@/components/atoms/card-view/atlas";
import { CardImage as FullCard } from "@/components/atoms/card-view/card";
import { buttonVariants } from "@/components/ui/button/variants";
import { actHandToBottomDeck, actHandToTopDeck } from "@/utils/actions/hand";

import {
  BiArrowToTop as IconTop,
  BiArrowToBottom as IconBottom,
} from "react-icons/bi";
import { CountersTray } from "./Counters";

/**
 * HAND - Drag and Drop tray of all the cards in your hand
 * */
export const GameFooter = ({
  setHoverCard,
  ...props
}: GameStateActions &
  PlayerDataProps & {
    setHoverCard(slug: string): void;
  }) => {
  const gridIndex = GRIDS.HAND;
  const cardsInHand = props.gridItems[gridIndex] ?? [];

  return (
    <div
      data-testid="footer"
      style={{
        height: LAYOUT_HEIGHTS.footer,
        maxWidth: "100vw",
        overflowX: "auto",
      }}
    >
      <div className="grid h-full grid-cols-[130px_115px_110px_1fr] gap-0 overflow-y-clip">
        <GraveTray {...props} />
        <DecksTray {...props} />
        <CountersTray {...props} />
        <DroppableGridItem id={gridIndex.toString()} gridIndex={gridIndex}>
          <SortableContext
            id={`grid-${gridIndex}`}
            items={cardsInHand?.map(
              (_, cardIndex) => `card-${gridIndex}-${cardIndex}`,
            )}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex items-center p-0 m-0 w-[calc(100vw-355px)] h-full justify-start overflow-x-auto relative">
              <div className="absolute bottom-[0.25rem] left-[0.5rem] opacity-25">
                <p>
                  Right click cards for options. Press{" "}
                  <span
                    style={{
                      borderRadius: "0.25rem",
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      padding: "2px 4px",
                      fontFamily: "monospace",
                    }}
                  >
                    ?
                  </span>{" "}
                  for more commands
                </p>
              </div>
              {props.gridItems?.[gridIndex]?.map((card, index) => (
                <HandCard
                  key={card.id + index}
                  card={card}
                  gridIndex={gridIndex}
                  cardIndex={index}
                  gameStateActions={props}
                  setHoverCard={setHoverCard}
                />
              ))}
            </div>
          </SortableContext>
        </DroppableGridItem>
      </div>
    </div>
  );
};

const HandCard = ({
  card,
  gridIndex,
  cardIndex: index,
  gameStateActions,
  ...props
}: {
  card: GameCard;
  gridIndex: number;
  cardIndex: number;
  gameStateActions: GameStateActions;
  setHoverCard(slug?: string): void;
}) => {
  function over() {
    if (props.setHoverCard) props.setHoverCard(card.img);
  }
  function out() {
    if (props.setHoverCard) props.setHoverCard();
  }

  const [preview, setPreview] = useState(false);
  const deckType = card.type === "site" ? "atlas" : "deck";

  function topDeck() {
    gameStateActions.setGridItems(
      actHandToTopDeck(gameStateActions.gridItems, deckType, index),
    );
  }

  function bottomDeck() {
    gameStateActions.setGridItems(
      actHandToBottomDeck(gameStateActions.gridItems, deckType, index),
    );
  }

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setPreview(true);
      }}
      onMouseOver={over}
      onMouseOut={out}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "220px",
        minWidth: "180px",
      }}
    >
      <SortableItem id={card.id} gridIndex={gridIndex} index={index}>
        {card?.type === "site" && <CardAtlas img={card?.img} />}
        {card?.type !== "site" && <CardImage img={card?.img} />}
      </SortableItem>

      <Modal
        wrapperProps={{ open: preview, onOpenChange: setPreview }}
        content={
          <div className="h-[700px] w-[460px]">
            {card.type === "site" && <FullCardAtlas img={card.img} />}
            {card.type !== "site" && <FullCard img={card.img} />}
            <div className="flex items-center absolute bottom-[1rem] w-[calc(100%-3rem)] justify-center rounded-[1rem] drop-shadow-[0_4px_2px_rgba(0,0,0,0.25)]">
              <button className={buttonVariants()} onClick={topDeck}>
                <div className="flex items-center">
                  <IconTop />
                  <p>Top of deck</p>
                </div>
              </button>

              <button className={buttonVariants()} onClick={bottomDeck}>
                <div className="flex items-center">
                  <IconBottom />
                  <p>Bottom of deck</p>
                </div>
              </button>
            </div>
          </div>
        }
      />
    </div>
  );
};
