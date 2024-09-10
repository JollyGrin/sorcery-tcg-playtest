import { Grid, VStack } from "styled-system/jsx";
import { GRIDS, LAYOUT_HEIGHTS } from "../constants";
import { GameStateActions } from "..";
import { actDrawAtlas, actDrawDeck } from "@/utils/actions";
import { cva } from "styled-system/css/cva.mjs";

export const DecksTray = (props: GameStateActions) => {
  function draw(deck: GRIDS.DECK | GRIDS.ATLAS_DECK) {
    deck === GRIDS.DECK
      ? props.setGridItems(actDrawDeck(props.gridItems))
      : props.setGridItems(actDrawAtlas(props.gridItems));
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
      w="100%"
      py="1rem"
      style={{
        height: LAYOUT_HEIGHTS.footer,
        background:
          "linear-gradient(90deg, rgba(131,58,180,0.15) 0%, rgba(253,29,29,0.15) 50%, rgba(252,176,69,0.35) 100%)",
      }}
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
        <p className={remainingCards()}>{atlasRemainingCards}</p>
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
        <p className={remainingCards()}>{deckRemainingCards}</p>
      </Grid>
    </VStack>
  );
};

const remainingCards = cva({
  base: {
    fontWeight: 700,
    background: "rgba(255,255,255,0.7)",
    padding: "0 0.25rem",
    borderRadius: "0.25rem",
  },
});
