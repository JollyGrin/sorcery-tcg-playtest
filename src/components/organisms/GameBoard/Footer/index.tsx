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
import { GameCard } from "@/types/card";
import { useState } from "react";
import { Modal } from "@/components/atoms/Modal";
import { FullCardAtlas } from "@/components/atoms/card-view/atlas";
import { CardImage as FullCard } from "@/components/atoms/card-view/card";

/**
 * HAND - Drag and Drop tray of all the cards in your hand
 * */
export const GameFooter = (props: GameStateActions) => {
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
      <Grid h="100%" gridTemplateColumns="repeat(2,150px) 1fr" gap={0}>
        <GraveTray {...props} />
        <DecksTray {...props} />
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
              w="calc(100vw - 300px)"
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
}: {
  card: GameCard;
  gridIndex: number;
  cardIndex: number;
}) => {
  const [preview, setPreview] = useState(false);

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setPreview(true);
      }}
      style={{
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
          <Box h="600px" w="460px">
            {card.type === "site" && <FullCardAtlas img={card.img} />}
            {card.type !== "site" && <FullCard img={card.img} />}
          </Box>
        }
      />
    </div>
  );
};
