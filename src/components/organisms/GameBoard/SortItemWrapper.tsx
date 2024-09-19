import { CardAtlas } from "@/components/atoms/mock-cards/atlas";

import { CardImage } from "@/components/atoms/mock-cards/card";
import { CardImage as FullCard } from "@/components/atoms/card-view/card";
import { SortableItem } from "@/components/molecules/SortItem";
import { Box, Flex, HStack } from "styled-system/jsx";
import { Modal } from "@/components/atoms/Modal";

import { useState } from "react";
import { FullCardAtlas } from "@/components/atoms/card-view/atlas";
import { GameCard } from "@/types/card";
import { useRouter } from "next/router";
import { GameStateActions } from ".";
import { button } from "styled-system/recipes";
import {
  actCardCounterDecrement,
  actCardCounterIncrement,
} from "@/utils/actions/card";

export const SortItemWrapper = ({
  amountOfCards = 0,
  card,
  gridIndex,
  cardIndex,
  ...props
}: {
  card: GameCard;
  gridIndex: number;
  cardIndex: number;
  amountOfCards?: number;
} & GameStateActions) => {
  const { query } = useRouter();
  const name = query?.name as string;

  // opens modal with card actions
  const [preview, setPreview] = useState(false);

  // Adjusts the height of card based on amount in cell
  const heightCalc = () => {
    if (amountOfCards === 1) return 120;
    if (amountOfCards === 2) return 75;
    if (amountOfCards === 3) return 65;
    return 90 - Math.min(amountOfCards, 4) * 15;
  };

  const height = `${heightCalc()}px`;

  const isTapped = card.isTapped;
  function toggleTap() {
    const newGrid = [...props.gridItems];
    const card = newGrid[gridIndex][cardIndex];
    newGrid[gridIndex][cardIndex] = {
      ...card,
      isTapped: !card.isTapped,
    } as GameCard;
    props.setGridItems(newGrid);
  }

  function incrementCounter() {
    actCardCounterIncrement(props.gridItems, gridIndex, cardIndex);
  }

  function decrementCounter() {
    actCardCounterDecrement(props.gridItems, gridIndex, cardIndex);
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTap();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setPreview(true);
      }}
      data-testid={"sortable-item-wrapper-" + card.id}
      style={{
        height: heightCalc() + 7 + "px",
        transform: isTapped ? "rotate(5deg)" : "",
        filter: isTapped ? "saturate(0)" : "",
        transition: "all 0.25s ease",
        position: "relative",
      }}
    >
      <SortableItem
        key={`card-${gridIndex}-${cardIndex}`}
        data-testid={"sortable-item-" + card.id}
        id={card.id}
        gridIndex={gridIndex}
        index={cardIndex}
      >
        {card.counter && card.counter !== 0 ? (
          <Box
            position="absolute"
            right={0}
            bottom={0}
            zIndex={10}
            bg="rgba(255,255,255,0.25)"
            backdropFilter="blur(4px)"
            filter="drop-shadow(0 1px 1px black)"
            p="0.25rem 0.5rem"
            borderRadius="100%"
            color="white"
            minW="1.65rem"
          >
            <p style={{ fontSize: "0.75rem" }}>{card.counter}</p>
          </Box>
        ) : null}
        {card.type === "site" && (
          <CardAtlas
            height={height}
            img={card.img}
            isMine={name === card.playerName}
          />
        )}
        {card.type !== "site" && (
          <CardImage
            height={height}
            img={card.img}
            isMine={name === card.playerName}
          />
        )}
      </SortableItem>
      <Modal
        wrapperProps={{ open: preview, onOpenChange: setPreview }}
        content={
          <Flex direction="column" gap="1rem">
            <Box h="600px" w="460px" position="relative">
              {card.type === "site" && <FullCardAtlas img={card.img} />}
              {card.type !== "site" && <FullCard img={card.img} />}
            </Box>
            <HStack justifyContent="center">
              <button className={button()} onClick={decrementCounter}>
                Decrement
              </button>
              <p>{card.counter}</p>
              <button className={button()} onClick={incrementCounter}>
                Increment
              </button>
            </HStack>
          </Flex>
        }
      />
    </div>
  );
};
