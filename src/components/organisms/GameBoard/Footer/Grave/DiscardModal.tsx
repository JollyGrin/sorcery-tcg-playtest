import { CardImage } from "@/components/atoms/card-view/card";
import { GameCard, GridItem } from "@/types/card";
import { Box, Grid, HStack } from "styled-system/jsx";
import { button } from "styled-system/recipes";

import { PiHandWithdrawFill as IconHand } from "react-icons/pi";
import { useHover } from "@/utils/hooks/useHover";
import { useRef } from "react";
import { GameStateActions } from "../..";
import { actDrawDiscard, actToggleBanishCard } from "@/utils/actions/discard";

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

  const hasFunctions = !!props.setGridItems && !!props.gridItems;

  return (
    <Grid
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gridTemplateRows="auto"
      minW="75vw"
      h="70vh"
      overflowX="clip"
      overflowY="scroll"
    >
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
    </Grid>
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
    <Box
      ref={hoverRef}
      key={card.id + "discard"}
      aspectRatio={8 / 11}
      w="100%"
      h="100%"
      maxH="500px"
      position="relative"
      filter={card.isBanished ? "saturate(0)" : "saturate(1)"}
      _hover={{
        filter: card.isBanished ? "" : "saturate(1.75)",
      }}
    >
      <CardImage img={card.img} minH={"0"} />
      <HStack
        display={hasFunctions ? "flex" : "none"}
        position="absolute"
        bottom="50%"
        right="calc(50% - 100px)"
      >
        <button
          onClick={returnToHand}
          className={button()}
          style={{
            opacity: isHovering ? 1 : 0.1,
            width: "100px",
            transition: "all 0.25s ease",
          }}
        >
          <HStack gap={0}>
            <p>Return</p>
            <IconHand
              size="2rem"
              style={{ fontSize: "2rem", color: "white" }}
            />
          </HStack>
        </button>

        <button
          onClick={toggleBanish}
          className={button()}
          style={{
            opacity: isHovering ? 1 : 0.1,
            width: "100px",
            transition: "all 0.25s ease",
          }}
        >
          <HStack gap={0}>
            <p>Toggle Banish</p>
            <IconHand
              size="2rem"
              style={{ fontSize: "2rem", color: "white" }}
            />
          </HStack>
        </button>
      </HStack>
    </Box>
  );
};
