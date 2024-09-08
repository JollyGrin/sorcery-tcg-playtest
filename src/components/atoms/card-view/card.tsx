import { Box } from "styled-system/jsx";

export const CardImage = ({
  img = "headless_haunt.webp",
  position = "top",
}: {
  img?: string;
  position?: "top" | "bottom";
}) => {
  return (
    <Box
      w="inherit"
      h="inherit"
      position="relative"
      m="0.5rem auto"
      borderRadius="1rem"
      mb={position === "top" ? "unset" : "unset"}
      mt={position === "bottom" ? "-0.25rem" : "unset"}
      isolation="isolate"
      transform="unset"
      opacity="1"
      transition="all 0.25s ease"
    >
      <Box
        style={{ backgroundImage: `url(/mock-cards/${img})` }}
        w="100%"
        h="100%"
        minH="300px"
        backgroundPosition="top"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        transition="all 0.25s ease"
        // bg="gray.400"
      />{" "}
    </Box>
  );
};
