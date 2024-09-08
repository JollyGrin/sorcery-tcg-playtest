import { Box, Grid, VStack } from "styled-system/jsx";
import { GRIDS, LAYOUT_HEIGHTS } from "../constants";
import { GameStateActions } from "..";
import { GameCard } from "@/pages/game";

export const DecksTray = (props: GameStateActions) => {
  function draw(deck: GRIDS.DECK | GRIDS.ATLAS_DECK) {
    props.setGridItems((prev) => {
      // Create a shallow copy of the previous grid items array
      const newGridItems = [...prev];

      // Make a copy of the deck and hand arrays, preserving their positions
      const newDeck = [...newGridItems[deck]];
      const newHand = [...newGridItems[GRIDS.HAND]];

      // Pop a card from the deck and push it to the hand
      const card = newDeck.pop();
      if (card) newHand.push(card);

      // Update the newGridItems array with the updated deck and hand arrays
      newGridItems[deck] = newDeck;
      newGridItems[GRIDS.HAND] = newHand;

      // Return the updated newGridItems array to trigger a re-render
      return newGridItems;
    });
  }

  function drawDeck() {
    draw(GRIDS.DECK);
  }
  function drawAtlas() {
    draw(GRIDS.ATLAS_DECK);
  }

  const atlasRemainingCards = props.gridItems[GRIDS.ATLAS_DECK]?.length;
  const deckRemainingCards = props.gridItems[GRIDS.DECK]?.length;

  return (
    <VStack
      bg="blue"
      w="100%"
      py="1rem"
      // style={{ height: LAYOUT_HEIGHTS.footer }}
      style={{ height: LAYOUT_HEIGHTS.footer }}
    >
      <Grid
        h="70px"
        aspectRatio={3 / 2}
        onClick={drawAtlas}
        placeItems="center"
        borderRadius="0.25rem"
        cursor="pointer"
        backgroundSize="cover"
        style={{
          backgroundImage: "url(/card-backs/m_atlas.png)",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            background: "rgba(255,255,255,0.7)",
            padding: "0 0.25rem",
            borderRadius: "0.25rem",
          }}
        >
          {atlasRemainingCards}
        </p>
      </Grid>
      <Grid
        w="60px"
        aspectRatio={2 / 3}
        onClick={drawDeck}
        placeItems="center"
        borderRadius="0.25rem"
        cursor="pointer"
        backgroundSize="cover"
        style={{
          backgroundImage: "url(/card-backs/m_spells.png)",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            background: "rgba(255,255,255,0.7)",
            padding: "0 0.25rem",
            borderRadius: "0.25rem",
          }}
        >
          {deckRemainingCards}
        </p>
      </Grid>
    </VStack>
  );
};
