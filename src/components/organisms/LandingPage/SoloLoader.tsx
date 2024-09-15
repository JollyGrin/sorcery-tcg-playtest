import { useRouter } from "next/router";
import { useState } from "react";
import { Flex } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";

export const Solo = () => {
  const { push } = useRouter();

  // detect if realms or curiosa and return query
  function getDeckQuery(deckId: string) {
    const urlParts = deckId.split(".");
    const isCuriosa = urlParts.includes("curiosa.io");
    const isRealms = urlParts.includes("realmsapp");

    let deckQuery;

    if (isCuriosa) {
      const regex = /\/([^\/]+)$/;
      const match = deckId.match(regex);
      if (match) deckQuery = `curiosa:${match[1]}`;
    }
    if (isRealms) {
      const regex = /\/(\d+)\//;
      const match = deckId.match(regex);
      if (match) deckQuery = `realms:${match[1]}`;
    }

    return deckQuery;
  }

  const [deckIds, setDeckIds] = useState({
    p1: "",
    p2: "",
  });

  function setDeckId(player: "p1" | "p2") {
    // TODO: detect if curiosa or realms
    return (value: string) => {
      const query = getDeckQuery(value);
      console.log({ query });
      return setDeckIds((prev) => ({
        ...prev,
        [player]: value,
      }));
    };
  }

  return (
    <Flex direction="column" gap={2} h="inherit">
      <p>Play against yourself with 2 different decks.</p>
      <input
        className={input()}
        placeholder="Player 1: Load TTS export from Curiosa or RealmsApp"
        onChange={(e) => setDeckId("p1")(e.target.value)}
        style={{
          color: "black",
          fontFamily: "monospace",
          letterSpacing: "-0.5px",
        }}
      />
      <input
        className={input()}
        placeholder="Player 2: Load TTS export from Curiosa or RealmsApp"
        style={{
          color: "black",
          fontFamily: "monospace",
          letterSpacing: "-0.5px",
        }}
      />
      <button className={button()} style={{ justifySelf: "end" }}>
        Play
      </button>
    </Flex>
  );
};
