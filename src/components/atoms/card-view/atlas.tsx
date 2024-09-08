import { Box } from "styled-system/jsx";

export const FullCardAtlas = ({
  img = "atlas_rift_valley.webp",
}: {
  img?: string;
}) => {
  return (
    <Box
      position="relative"
      m="0.5rem auto"
      w="inherit"
      h="inherit"
      borderRadius="1rem"
      isolation="isolate"
    >
      <Box
        style={{ backgroundImage: `url(/mock-cards/${img})` }} // bgImage has caching issues
        isolation="isolate"
        w="100%"
        h="100%"
        // position="absolute"
        backgroundPosition="right"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        transform="rotate(90deg)"
        bg="gray.400"
        borderRadius="1rem"
        transition="all 0.25s ease"
      />
    </Box>
  );
};
