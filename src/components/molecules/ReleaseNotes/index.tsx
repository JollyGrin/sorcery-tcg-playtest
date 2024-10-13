import { Box, Divider } from "styled-system/jsx";
import { Note20241013 } from "./Notes/20241013";
import { LOCALSTORAGE_KEYS } from "@/components/organisms/GameBoard/constants";
import { useLocalStorage } from "@/utils/hooks";

export const ReleaseNoteBody = () => {
  const { key, ...options } =
    LOCALSTORAGE_KEYS.DISCLAIMER.GAMEBOARD.lastSeenNote;
  const [, setLastSeenNote] = useLocalStorage(key, 0, options);

  function confirmRead() {
    const now = Date.now();
    setLastSeenNote(now);
  }

  return (
    <Box
      maxW="700px"
      w={{ base: "65vw", md: "80vw" }}
      maxH="600px"
      overflowY="auto"
      position="relative"
    >
      <Box
        position="absolute"
        right={0}
        bg="gray.300"
        padding="0.25rem 0.5rem"
        borderRadius="4px"
        cursor="pointer"
        transition="all 0.25s ease"
        _hover={{
          bg: "gray.200",
        }}
        onClick={confirmRead}
      >
        X
      </Box>
      <p
        style={{
          fontWeight: 700,
          fontSize: "2.5rem",
        }}
      >
        Release Notes
      </p>
      <p>(new updates!)</p>
      <Divider my="1rem" />
      <Note20241013 />
    </Box>
  );
};
