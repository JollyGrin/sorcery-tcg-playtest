import { CardImage } from "@/components/atoms/card-view/card";
import { GameCard, GridItem } from "@/types/card";
import { Box, Grid, HStack } from "styled-system/jsx";
import { button } from "styled-system/recipes";

import { PiHandWithdrawFill as IconHand } from "react-icons/pi";
import { useHover } from "@/utils/hooks/useHover";
import { useRef } from "react";
import { GameStateActions } from "../..";
import { actDrawDiscard } from "@/utils/actions/discard";

export const DiscardModalBody = (
  props: {
    cards: GridItem;
  } & GameStateActions,
) => {
  function returnToHand(cardIndex: number) {
    props.setGridItems(actDrawDiscard(props.gridItems, cardIndex));
  }

  return (
    <Grid
      gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      gridTemplateRows="auto"
      minW="75vw"
      h="70vh"
      overflowX="clip"
      overflowY="scroll"
    >
      {props.cards?.map((card, index) => (
        <Card
          key={card.id}
          card={card}
          returnToHand={() => returnToHand(index)}
        />
      ))}
    </Grid>
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
    <Box
      ref={hoverRef}
      key={card.id + "discard"}
      aspectRatio={8 / 11}
      w="100%"
      h="100%"
      maxH="500px"
      position="relative"
      filter="saturate(1)"
      _hover={{
        filter: "saturate(1.75)",
      }}
    >
      <CardImage img={card.img} minH={"0"} />
      <button
        onClick={returnToHand}
        className={button()}
        style={{
          position: "absolute",
          bottom: "50%",
          right: "calc(50% - 50px)",
          opacity: isHovering ? 1 : 0.1,
          width: "100px",
          transition: "all 0.25s ease",
        }}
      >
        <HStack gap={0}>
          <p>Return</p>
          <IconHand size="2rem" style={{ fontSize: "2rem", color: "white" }} />
        </HStack>
      </button>
    </Box>
  );
};
