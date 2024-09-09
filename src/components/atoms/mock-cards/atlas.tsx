import { CARD_CDN } from "@/components/organisms/GameBoard/constants";
import { Box } from "styled-system/jsx";

export const CardAtlas = ({
  height = "90px",
  img = "atlas_rift_valley.webp",
}: {
  img?: string;
  height?: string;
}) => {
  return (
    <Box
      position="relative"
      m="0 auto"
      w="calc(100% - 1rem)"
      maxW="221px"
      bg="yellow"
      borderRadius="1rem"
      isolation="isolate"
      overflow="clip"
      style={{ height }}
    >
      <Box
        style={{
          backgroundImage: `url(${CARD_CDN}/${img}.webp)`,
        }} // bgImage has caching issues
        isolation="isolate"
        h="310px"
        w="100%"
        position="absolute"
        right={0 + "px"}
        bottom={-160 + "px"}
        backgroundPosition="right"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        transform="scale(0.85) rotate(90deg) translate(-47.8%, 0px)"
        bg="gray.400"
        borderRadius="1rem"
        transition="all 0.25s ease"
      />{" "}
    </Box>
  );
};
