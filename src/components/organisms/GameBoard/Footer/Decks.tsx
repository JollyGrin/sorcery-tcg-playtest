import { Box, VStack } from "styled-system/jsx";
import { LAYOUT_HEIGHTS } from "../constants";
import { GameStateActions } from "..";

export const DecksTray = (props: GameStateActions) => {
  return (
    <VStack
      bg="blue"
      w="100%"
      py="1rem"
      // style={{ height: LAYOUT_HEIGHTS.footer }}
      style={{ height: LAYOUT_HEIGHTS.footer }}
    >
      <Box h="70px" aspectRatio={3 / 2} bg="red" />
      <Box w="60px" aspectRatio={2 / 3} bg="red" />
    </VStack>
  );
};
