import Link from "next/link";
import { useState } from "react";
import { Flex, HStack } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";
import { css } from "styled-system/css";
import { FaDice as IconDice } from "react-icons/fa6";
import { DECK_URLS } from "./constants";
import { getDeckQuery } from "../GameBoard/useDeckQuery";

export const Solo = () => {
  const [deckIds, setDeckIds] = useState({
    p1: "",
    p2: "",
  });
  const [deckQueries, setDeckQueries] = useState({
    p1: "",
    p2: "",
  });

  function setDeckId(player: "p1" | "p2") {
    // TODO: detect if curiosa or realms
    return (value: string) => {
      const query = getDeckQuery(value);
      setDeckIds((prev) => ({
        ...prev,
        [player]: value,
      }));
      return setDeckQueries((prev) => ({
        ...prev,
        [player]: query,
      }));
    };
  }

  return (
    <Flex direction="column" gap={2} h="inherit">
      <p>Play against yourself with 2 different decks.</p>
      <HStack>
        <IconDice
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * DECK_URLS.length);
            const URL = DECK_URLS[randomIndex];
            setDeckId("p1")(URL);
          }}
          className={css({
            transform: "scale(1)",
            transition: "all 0.25s ease",
            cursor: "pointer",
            _hover: {
              transform: "scale(1.25)",
            },
            _active: {
              transform: "scale(1.1)",
            },
          })}
        />
        <input
          className={input()}
          placeholder="Player 1: Load TTS export via Curiosa/Realms/FourCores"
          value={deckIds.p1}
          onChange={(e) => setDeckId("p1")(e.target.value)}
          style={{
            color: "black",
            fontFamily: "monospace",
            letterSpacing: "-1px",
          }}
        />
      </HStack>

      <HStack>
        <IconDice
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * DECK_URLS.length);
            const URL = DECK_URLS[randomIndex];
            setDeckId("p2")(URL);
          }}
          className={css({
            transform: "scale(1)",
            transition: "all 0.25s ease",
            cursor: "pointer",
            _hover: {
              transform: "scale(1.25)",
            },
            _active: {
              transform: "scale(1.1)",
            },
          })}
        />
        <input
          className={input()}
          placeholder="Player 2: Load TTS export via Curiosa/Realms/FourCores"
          value={deckIds.p2}
          onChange={(e) => setDeckId("p2")(e.target.value)}
          style={{
            color: "black",
            fontFamily: "monospace",
            letterSpacing: "-1px",
          }}
        />
      </HStack>
      <Link
        href={{ pathname: "/solo", query: { ...deckQueries, name: "p1" } }}
        prefetch
      >
        <button
          disabled={deckQueries.p1 === "" || deckQueries.p2 === ""}
          className={button()}
          style={{ justifySelf: "end", width: "100%", marginTop: "1rem" }}
        >
          Play
        </button>
      </Link>
    </Flex>
  );
};
