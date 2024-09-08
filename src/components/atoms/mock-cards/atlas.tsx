import { useHover } from "@/utils/hooks/useHover";
import { useKeyPress } from "@/utils/hooks/useKeyPress";
import { useEffect, useRef, useState } from "react";
import { Box } from "styled-system/jsx";

export const CardAtlas = ({
  img = "atlas_rift_valley.webp",
}: {
  img?: string;
}) => {
  const hoverRef = useRef(null);
  const isHovering = useHover(hoverRef);

  const isPressed = useKeyPress("Alt");
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    if (isHovering && isPressed) {
      setPreview((prev) => !prev);
    }
  }, [isPressed]);

  const show = preview && isHovering; // full preview of the card
  return (
    <Box
      position="relative"
      m="0.5rem auto"
      w="calc(100% - 1rem)"
      h="70px"
      bg="yellow"
      borderRadius="1rem"
      isolation="isolate"
      overflow={show ? "unset" : "clip"}
      zIndex={show ? 1000000 : "unset"}
      onMouseOut={() => setPreview(false)}
    >
      <Box
        style={{ backgroundImage: `url(/mock-cards/${img})` }} // bgImage has caching issues
        ref={hoverRef}
        isolation="isolate"
        h="310px"
        w="100%"
        position="absolute"
        top={show ? 0 : "-85px"}
        backgroundPosition="right"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        transform={
          show
            ? "scale(1.45) rotate(90deg) translate(-47.8%, 0px)"
            : "scale(0.85) rotate(90deg) translate(-47.8%, 0px)"
        }
        bg="gray.400"
        borderRadius="1rem"
        transition="all 0.25s ease"
      />{" "}
    </Box>
  );
};
