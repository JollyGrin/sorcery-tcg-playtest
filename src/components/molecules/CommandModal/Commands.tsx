import { GameStateActions } from "@/components/organisms/GameBoard";
import {
  getCardImage,
  GRIDS,
  initGameData,
  LOCALSTORAGE_KEYS,
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
import { Box, Flex, Grid, HStack, VStack } from "styled-system/jsx";
import { input } from "styled-system/recipes";
import { GiPirateGrave as IconGrave } from "react-icons/gi";
import { useLocalStorage } from "@/utils/hooks";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { CardAtlas } from "@/components/atoms/mock-cards/atlas";

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
  {
    value: "view_cemetary",
    label: "View enemy cemetary",
  },
  {
    value: "rotate_enemy",
    label: "Rotate enemy cards on grid",
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

export const ActViewCemetary = () => {
  return (
    <Box>
      <p>To view an enemy cemetary:</p>
      <HStack flexWrap="wrap">
        <p>click on the</p>
        <IconGrave />
        <p>icon next to the player&apos;s name</p>
      </HStack>
    </Box>
  );
};

export const ActRotateEnemyCards = () => {
  const { key, ...options } = LOCALSTORAGE_KEYS.SETTINGS.rotateEnemy;
  const [rotateEnemy, setRotateEnemy] = useLocalStorage(key, false, options);

  return (
    <Box>
      <p>Rotate the enemy cards on the board.</p>
      <Box
        className={css({
          bg: "rgba(0,100,200,0.1)",
          padding: "1rem",
          border: "solid 2px",
          borderColor: "rgba(0,100,200,0.3)",
          borderRadius: "0.25rem",
        })}
      >
        <p>The ordering (top to bottom) remains the same.</p>
        <p>Visually each enemy card will be flipped.</p>
        <p>Keep this in mind when ordering.</p>
      </Box>
      <Grid gridTemplateColumns="1fr 1fr" mt="2rem">
        <Box>
          <p>Rotate enemy: {`${rotateEnemy}`}</p>
          <Button onClick={() => setRotateEnemy(!rotateEnemy)}>
            Rotate enemy card
          </Button>
        </Box>

        <VStack>
          <CardImage img={"autumn_unicorn"} isMine={false} />
          <CardAtlas img={"windmill"} isMine={false} />
        </VStack>
      </Grid>
    </Box>
  );
};
