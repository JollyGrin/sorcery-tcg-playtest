import { useRouter } from "next/router";
import { useState } from "react";
import { Flex } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";

export const Solo = () => {
  const { push } = useRouter();
  const [deckIds, setDeckIds] = useState({
    p1: "",
    p2: "",
  });

  function setDeckId(player: "p1" | "p2") {
    return (value: string) =>
      setDeckIds((prev) => ({
        ...prev,
        [player]: value,
      }));
  }

  return (
    <Flex direction="column" gap={2} h="inherit">
      <p>Play against yourself with 2 different decks.</p>
      <input
        className={input()}
        placeholder="Player 1: Load TTS export from Curiosa or RealmsApp"
      />
      <input
        className={input()}
        placeholder="Player 2: Load TTS export from Curiosa or RealmsApp"
      />
      <button className={button()} style={{ justifySelf: "end" }}>
        Play
      </button>
    </Flex>
  );
};
