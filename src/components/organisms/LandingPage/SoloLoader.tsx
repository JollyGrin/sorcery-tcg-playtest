import { Flex } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";

export const Solo = () => {
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
