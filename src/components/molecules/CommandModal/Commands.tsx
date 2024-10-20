import { GameStateActions } from "@/components/organisms/GameBoard";
import {
  getCardImage,
  GRIDS,
  initGameData,
  LOCALSTORAGE_KEYS,
} from "@/components/organisms/GameBoard/constants";
import { Button } from "@/components/ui/button";
import { GridItem, PlayerDataProps } from "@/types/card";
import {
  actDeckMoveToBottom,
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
import { AltGridDisplay } from "@/components/organisms/GameBoard/Grid/AltGridDisplay";

export const actions = [
  {
    value: "untap_all",
    label: "Untap all your cards",
  },
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
  {
    value: "toggle_display",
    label: "Display full/minimized cards view",
  },
] as const;
export type ActionIds = (typeof actions)[number]["value"];

/**
 * COMMAND DIVs
 *
 * These are displayed with if conditions to do actions without worrying about UI
 * */

export const ActUntapAll = () => {
  return (
    <Box>
      <p>
        You can untap all your tapped cards by pressing{" "}
        <span
          style={{
            borderRadius: "0.25rem",
            background: "rgba(0,0,0,0.2)",
            padding: "2px 6px",
            fontFamily: "monospace",
            borderBottom: "solid 1px black",
          }}
        >
          u
        </span>{" "}
        on your keyboard
      </p>
    </Box>
  );
};

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

  function moveCardToBottomOfDeck(cardIndex: number) {
    const state = actDeckMoveToBottom(props.gridItems, deckType, cardIndex);
    props.setGridItems(state);
  }

  return (
    <VStack alignItems="start">
      <p>Look at the top X cards of your spellbook</p>
      <p style={{ fontSize: "0.85rem", opacity: 0.5 }}>
        Select input and use arrow keys on keyboard to go up and down
      </p>
      <input
        className={input()}
        type="number"
        onChange={(e) => setScry(+e.target.value)}
        value={scry.toString()}
      />

      {scry > 0 && (
        <p style={{ fontSize: "0.85rem", opacity: 0.5 }}>
          You can move individual cards to the top or bottom of your deck
        </p>
      )}
      <Flex flexWrap="wrap" maxW="500px" maxH="600px" overflowY="auto" gap={2}>
        {scry > 0 &&
          deck
            ?.reverse() // top of deck is last item in array
            ?.slice(0, scry)
            .map((card, cardIndex) => (
              <Box key={card.id + cardIndex}>
                <HStack py="2px">
                  <Button
                    w="fit-content"
                    fontSize="0.65rem"
                    paddingBlock={0}
                    h="1rem"
                    onClick={() =>
                      moveCardToTopOfDeck(deck.length - cardIndex - 1)
                    }
                  >
                    {"<-"} Top
                  </Button>

                  <Button
                    fontSize="0.65rem"
                    paddingBlock={0}
                    h="1rem"
                    onClick={() =>
                      moveCardToBottomOfDeck(deck.length - cardIndex - 1)
                    }
                  >
                    Bottom {"->"}
                  </Button>
                </HStack>
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

/**
 * Toggles the view on GridCells
 * true = shows display
 * false = maintains minimized view
 * */
export const ActToggleDisplayCards = () => {
  const { query } = useRouter();
  const name = query.name as string;
  const { key, ...options } = LOCALSTORAGE_KEYS.SETTINGS.DISPLAY.toggle;
  const [isDisplay, setIsDisplay] = useLocalStorage(key, false, options);

  return (
    <Box>
      <p>Toggle between full view of cards on the grid or minimized view.</p>
      <Box
        className={css({
          bg: "rgba(0,100,200,0.1)",
          my: "1rem",
          padding: "1rem",
          border: "solid 2px",
          borderColor: "rgba(0,100,200,0.3)",
          borderRadius: "0.25rem",
        })}
      >
        <p>
          View will always switch to minimized view on drag/hover for
          positioning
        </p>
      </Box>
      <Box>
        <p>Toggle card view</p>
        <Button onClick={() => setIsDisplay(!isDisplay)}>
          {isDisplay ? "Show min card view" : "Show full card"}
        </Button>
      </Box>

      <Grid gridTemplateColumns="1fr 1fr" w="100%" minH="200px">
        <div />
        {isDisplay ? (
          <AltGridDisplay
            onMouseOver={() => {}}
            cards={mockCards.map((card) => ({ ...card, playerName: name }))}
            myName={name as string}
          />
        ) : (
          <VStack>
            {mockCards?.map((card, index) => {
              const CardType = card.type === "site" ? CardAtlas : CardImage;
              return (
                <CardType key={card.img + index} img={card.img} isMine={true} />
              );
            })}
          </VStack>
        )}
      </Grid>
    </Box>
  );
};

const mockCards: GridItem = [
  {
    id: "1",
    img: "flamecaller",
    type: "avatar",
  },
  {
    id: "3",
    img: "red_desert",
    type: "site",
  },
];
