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
        <Box bg="yellow">Grave</Box>
        <DecksTray {...props} />
        <DroppableGridItem id={gridIndex.toString()} gridIndex={gridIndex}>
          <SortableContext
            id={`grid-${gridIndex}`}
            items={cardsInHand?.map(
              (_, cardIndex) => `card-${gridIndex}-${cardIndex}`,
            )}
            strategy={horizontalListSortingStrategy}
          >
            <HStack p={0} m={0} w="100%" h="100%" justifyContent="start">
              {props.gridItems?.[gridIndex]?.map((card, index) => (
                <div
                  key={card.id}
                  style={{
                    width: "100%",
                    maxWidth: "220px",
                    minWidth: "180px",
                  }}
                >
                  <SortableItem
                    id={card.id}
                    gridIndex={gridIndex}
                    index={index}
                  >
                    {card?.type === "site" && <CardAtlas img={card?.img} />}
                    {card?.type !== "site" && <CardImage img={card?.img} />}
                  </SortableItem>
                </div>
              ))}
            </HStack>
          </SortableContext>
        </DroppableGridItem>
      </Grid>
    </div>
  );
};
