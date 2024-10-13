import { Box, Divider } from "styled-system/jsx";
import { Note20241013 } from "./Notes/20241013";

export const ReleaseNoteBody = () => {
  return (
    <Box
      maxW="700px"
      w={{ base: "65vw", md: "80vw" }}
      maxH="600px"
      overflowY="auto"
    >
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
