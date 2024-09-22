import { GameStateActions } from "@/components/organisms/GameBoard";
import {
  getCardImage,
  GRIDS,
  initGameData,
} from "@/components/organisms/GameBoard/constants";
import { Button } from "@/components/ui/button";
import { PlayerDataProps } from "@/types/card";
import {
  actDeckMoveToTop,
  actDrawDeck,
  actDrawDeckBottom,
} from "@/utils/actions";
import { useRouter } from "next/router";
import { useState } from "react";
import { css } from "styled-system/css";
import { Box, Flex, VStack } from "styled-system/jsx";
import { input } from "styled-system/recipes";

export const actions = [
  {
    value: "dice",
    label: "Roll dice",
  },
  {
    value: "spawn_token",
    label: "Spawn a token onto the grid",
  },
  {
    value: "draw_deck_top",
    label: "Draw top of spellbook",
  },
  {
    value: "draw_deck_bottom",
    label: "Draw bottom of spellbook",
  },
  {
    value: "scry_x",
    label: "View top X cards of spellbook",
  },
  {
    value: "scry_x_atlas",
    label: "View top X cards of atlas deck",
  },
] as const;
export type ActionIds = (typeof actions)[number]["value"];

/**
 * COMMAND DIVs
 *
 * These are displayed with if conditions to do actions without worrying about UI
 * */

export const ActionRollDice = (props: GameStateActions & PlayerDataProps) => {
  const { query } = useRouter();
  const name = (query?.name ?? "") as string;
  const myData = props.players?.[name].data ?? initGameData;

  function rollD6() {
    const roll = Math.floor(Math.random() * 6) + 1;
    const dice = {
      d6: roll,
      d20: undefined,
    };
    props.setMyData({
      ...myData,
      dice,
    });
  }

  function rollD20() {
    const roll = Math.floor(Math.random() * 20) + 1;
    const dice = {
      d6: undefined,
      d20: roll,
    };
    props.setMyData({
      ...myData,
      dice,
    });
  }

  function clearDice() {
    props.setMyData({
      ...myData,
      dice: undefined,
    });
  }

  return (
    <VStack alignItems="start">
      <p>Roll a dice</p>
      <p>d6: {myData?.dice?.d6}</p>
      <p>d20: {myData?.dice?.d20}</p>
      <Button onClick={rollD6}>Roll d6</Button>
      <Button onClick={rollD20}>Roll d20</Button>
      <Button onClick={clearDice}>Clear Rolls</Button>
    </VStack>
  );
};

export const ActDrawDeckTop = (props: GameStateActions) => (
  <VStack alignItems="start">
    <p>Draw a card from the top of your deck</p>
    <Button onClick={() => props.setGridItems(actDrawDeck(props.gridItems))}>
      Draw card
    </Button>
  </VStack>
);

export const ActDrawDeckBottom = (props: GameStateActions) => (
  <VStack alignItems="start">
    <p>Draw a card from the bottom of your deck</p>
    <Button
      onClick={() => props.setGridItems(actDrawDeckBottom(props.gridItems))}
    >
      Draw card
    </Button>
  </VStack>
);

export const ActScryX = ({
  deckType = "deck",
  ...props
}: GameStateActions & {
  deckType: "deck" | "atlas";
}) => {
  const GRID_DECK_TYPE = deckType === "deck" ? GRIDS.DECK : GRIDS.ATLAS_DECK;
  const [scry, setScry] = useState(0);
  const deck = [...props.gridItems[GRID_DECK_TYPE]];

  function moveCardToTopOfDeck(cardIndex: number) {
    const state = actDeckMoveToTop(props.gridItems, deckType, cardIndex);
    props.setGridItems(state);
  }

  return (
    <VStack alignItems="start">
      <p>Look at the top X cards of your spellbook</p>
      <input
        className={input()}
        type="number"
        onChange={(e) => setScry(+e.target.value)}
        value={scry.toString()}
      />
      <Flex flexWrap="wrap" maxW="500px" maxH="600px" overflowY="auto" gap={2}>
        {scry > 0 &&
          deck
            ?.reverse() // top of deck is last item in array
            ?.slice(0, scry)
            .map((card, cardIndex) => (
              <Box
                key={card.id + cardIndex}
                onClick={() => moveCardToTopOfDeck(deck.length - cardIndex - 1)}
              >
                <Button fontSize="0.65rem" paddingBlock={0} h="1rem">
                  Move to top
                </Button>
                <img
                  key={card.id + card.img}
                  src={getCardImage(card.img)}
                  alt="card-img"
                  className={css({
                    width: "150px",
                  })}
                />
              </Box>
            ))}
      </Flex>
    </VStack>
  );
};
