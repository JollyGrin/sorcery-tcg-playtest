import { GameStateActions } from "@/components/organisms/GameBoard";
import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { GameCard } from "@/types/card";
import { useCuriosaDeck } from "@/utils/api/curiosa/useCuriosa";
import { useState } from "react";
import { Box, Flex } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";

export const LoadDeck = (props: GameStateActions) => {
  const [deckId, setDeckId] = useState<string>();
  const { data: deck } = useCuriosaDeck(deckId);
  const cards = [
    ...(deck?.avatar ?? []),
    ...(deck?.spellbook ?? []),
    ...(deck?.atlas ?? []),
  ];

  function setDeck() {
    if (!deck) return;
    const newGrid = [...props.gridItems];
    const newAtlas = deck?.atlas?.flatMap(
      (spell) =>
        Array.from({ length: spell.quantity }, () => ({
          // Copy the spell object without the quantity field
          ...spell,
          quantity: undefined, // Remove the quantity field
        })).map(
          (rest, index) =>
            ({
              id: rest.identifier + index + Date.now(),
              img: rest.identifier,
              type: "site",
            }) as GameCard,
        ), // Actually remove quantity in the final object
    );
    const newDeck = deck?.spellbook?.flatMap(
      (spell) =>
        Array.from({ length: spell.quantity }, () => ({
          // Copy the spell object without the quantity field
          ...spell,
          quantity: undefined, // Remove the quantity field
        })).map(
          (rest, i) =>
            ({
              id: rest.identifier + i + Date.now(),
              img: rest.identifier,
              type: "minion",
            }) as GameCard,
        ), // Actually remove quantity in the final object
    );
    newGrid[GRIDS.DECK] = shuffleArray(newDeck);
    newGrid[GRIDS.ATLAS_DECK] = shuffleArray(newAtlas);
    newGrid[GRIDS.HAND] = deck?.avatar?.map(
      (avatar) =>
        ({
          id: avatar.identifier,
          img: avatar.identifier,
          type: "avatar",
        }) as GameCard,
    );

    props.setGridItems(newGrid);
  }

  return (
    <Box p="2rem">
      <input
        placeholder="curiosa deck id"
        className={input()}
        value={deckId}
        onChange={(e) => setDeckId(e.target.value)}
      />
      {deckId === undefined && (
        <>
          <p>copy the deckid from curiosa</p>
          <button
            className={button()}
            style={{ marginTop: "1rem" }}
            onClick={() => setDeckId("clytk3k08009d3dya1cu989e3")}
          >
            Load Default Deck
          </button>
        </>
      )}
      {deckId !== undefined && (
        <button
          className={button()}
          style={{ marginTop: "1rem" }}
          onClick={setDeck}
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
    </Box>
  );
};

// eslint-disable-next-line
function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}
