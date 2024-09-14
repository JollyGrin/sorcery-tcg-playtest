import { Box, Grid, HStack } from "styled-system/jsx";
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
import { button } from "styled-system/recipes";
import { actHandToBottomDeck, actHandToTopDeck } from "@/utils/actions/hand";

import {
  BiArrowToTop as IconTop,
  BiArrowToBottom as IconBottom,
} from "react-icons/bi";
import { CountersTray } from "./Counters";

/**
 * HAND - Drag and Drop tray of all the cards in your hand
 * */
export const GameFooter = (props: GameStateActions & PlayerDataProps) => {
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
      <Grid
        h="100%"
        gridTemplateColumns="130px 115px 85px 1fr"
        gap={0}
        overflowY="clip"
        // w="100vw"
      >
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
            <HStack
              p={0}
              m={0}
              w="calc(100vw - 330px)"
              h="100%"
              justifyContent="start"
              overflowX="auto"
            >
              {props.gridItems?.[gridIndex]?.map((card, index) => (
                <HandCard
                  key={card.id + index}
                  card={card}
                  gridIndex={gridIndex}
                  cardIndex={index}
                  gameStateActions={props}
                />
              ))}
            </HStack>
          </SortableContext>
        </DroppableGridItem>
      </Grid>
    </div>
  );
};

const HandCard = ({
  card,
  gridIndex,
  cardIndex: index,
  gameStateActions,
}: {
  card: GameCard;
  gridIndex: number;
  cardIndex: number;
  gameStateActions: GameStateActions;
}) => {
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
          <Box h="700px" w="460px">
            {card.type === "site" && <FullCardAtlas img={card.img} />}
            {card.type !== "site" && <FullCard img={card.img} />}
            <HStack
              position="absolute"
              bottom="1rem"
              w="calc(100% - 3rem)"
              justifyContent="center"
              borderRadius="1rem"
              filter="drop-shadow(0 4px 2px rgba(0,0,0,0.25))"
            >
              <button className={button()} onClick={topDeck}>
                <HStack>
                  <IconTop />
                  <p>Top of deck</p>
                </HStack>
              </button>

              <button className={button()} onClick={bottomDeck}>
                <HStack>
                  <IconBottom />
                  <p>Bottom of deck</p>
                </HStack>
              </button>
            </HStack>
          </Box>
        }
      />
    </div>
  );
};
