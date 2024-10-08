import { GameStateActions } from "@/components/organisms/GameBoard";
import {
  useCuriosaDeck,
  useFourCoresDeck,
  useRealmsAppDeck,
} from "@/utils/api/curiosa/useCuriosa";
import { ReactNode, useState } from "react";
import { Box, Flex, Grid } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";

import { mapDeckCuriosa } from "./mappers";
import { actShuffleDeck } from "@/utils/actions";
import { CuriosaResponse } from "@/utils/api/curiosa/api";
import { Tabs } from "@/components/atoms/Tabs";
import { UseQueryResult } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getDeckQuery } from "@/components/organisms/GameBoard/useDeckQuery";
import { DefaultDecks } from "./DefaultDecks";

export const LoadDeck = (
  props: GameStateActions & { children?: ReactNode; playerName: string },
) => {
  const [deckId, setDeckId] = useState<string>("");

  function setDeck(deck?: CuriosaResponse) {
    const newGrid = mapDeckCuriosa({
      deck,
      gridItems: props.gridItems,
      playerName: props.playerName,
    });
    if (!newGrid) return;
    const shuffledDeck = actShuffleDeck(newGrid, "deck");
    const shuffledAtlas = actShuffleDeck(shuffledDeck, "atlas");
    if (newGrid) props.setGridItems(shuffledAtlas);
    toast.success(`${props.playerName}'s deck was loaded`);
  }

  return (
    <>
      <Grid
        w="100vw"
        h="100vh"
        placeItems="center"
        bg="blue.200"
        overflowX="hidden"
      >
        <Box
          bg="white"
          w="100%"
          maxW={!!deckId ? "900px" : "400px"}
          m="0 auto"
          p="1rem"
        >
          {props.children}
          <Tabs
            tabs={["curiosa", "realms", "four cores"]}
            content={[
              <InputLoader
                key="curiosa"
                deckId={deckId}
                setDeckId={setDeckId}
                setDeck={setDeck}
                useDeck={useCuriosaDeck}
                provider="curiosa"
              />,
              <InputLoader
                key="realms"
                deckId={deckId}
                setDeckId={setDeckId}
                setDeck={setDeck}
                useDeck={useRealmsAppDeck}
                provider="realms"
              />,
              <InputLoader
                key="fourcores"
                deckId={deckId}
                setDeckId={setDeckId}
                setDeck={setDeck}
                useDeck={useFourCoresDeck}
                provider="four cores"
              />,
            ]}
          />
        </Box>
      </Grid>
    </>
  );
};

const InputLoader = ({
  deckId,
  setDeckId,
  setDeck,
  useDeck,
  provider,
}: {
  deckId: string;
  setDeckId(value: string): void;
  setDeck(deck?: CuriosaResponse): void;
  useDeck(deckId: string): UseQueryResult<CuriosaResponse, Error>;
  provider: "curiosa" | "realms" | "four cores";
}) => {
  // if the deckId is a url, find the ID in the url
  const [, id] = getDeckQuery(deckId)?.split("-") ?? [];
  const { data: deck } = useDeck(id ?? deckId);

  const cards = [
    ...(deck?.avatar ?? []),
    ...(deck?.spellbook ?? []),
    ...(deck?.atlas ?? []),
  ];

  return (
    <>
      <input
        placeholder={`${provider} deck id`}
        className={input()}
        value={deckId}
        onChange={(e) => setDeckId(e.target.value)}
      />
      {deckId === "" && (
        <>
          <p style={{ margin: "0.25rem 0" }}>copy the deckid from {provider}</p>
          <DefaultDecks {...{ setDeckId }} />
        </>
      )}
      {deckId !== "" && (
        <button
          className={button()}
          style={{ marginTop: "1rem" }}
          onClick={() => setDeck(deck)}
        >
          Use this deck
        </button>
      )}
      <Flex wrap="wrap" gap="0.25rem" mt="1rem">
        {cards?.map((card, index) => (
          <div key={card.identifier + index + "flex"}>
            <img
              alt="card"
              width="165px"
              key={card.identifier + index}
              src={`https://card.cards.army/cards/50/${card.identifier}.webp`}
            />
          </div>
        ))}
      </Flex>
    </>
  );
};
