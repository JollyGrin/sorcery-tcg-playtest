import { CARD_CDN } from "@/components/organisms/GameBoard/constants";
import { useHover } from "@/utils/hooks/useHover";
import { useKeyPress } from "@/utils/hooks/useKeyPress";
import { useEffect, useRef, useState } from "react";
import { Box } from "styled-system/jsx";

export const CardImage = ({
  height = "90px",
  img = "headless_haunt.webp",
  position = "top",
  index = 1,
  isTapped,
  ...props
}: {
  img?: string;
  position?: "top" | "bottom";
  index?: number;
  isTapped?: boolean;
  show?: boolean;
  height?: string;
  isMine?: boolean;
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

  const show = props.show || (preview && isHovering);
  const isMe = props.isMine === undefined || !!props.isMine;

  return (
    <Box
      position="relative"
      m="0 auto"
      w="calc(100% - 1rem)"
      maxW="221px"
      bg="yellow"
      overflow={show ? "unset" : "clip"}
      borderRadius="1rem"
      filter="drop-shadow(0 1px 3px rgba(0,0,0,0.2))"
      zIndex={isHovering ? 1000 : index}
      mb={position === "top" ? "unset" : "unset"}
      mt={position === "bottom" ? "-0.25rem" : "unset"}
      isolation="isolate"
      transform={isTapped && !isHovering ? "rotate(5deg)" : "unset"}
      opacity={isTapped && !isHovering ? "0.8" : "1"}
      transition="all 0.25s ease"
      onMouseOut={() => setPreview(false)}
      style={{
        height,
        transform: isMe ? "rotate(0deg)" : "rotate(180deg)",
        border: isMe ? "" : "solid 2px tomato",
      }}
    >
      <Box
        ref={hoverRef}
        position={show ? "absolute" : "unset"}
        h="310px"
        w="100%"
        backgroundPosition="top"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        transform={show ? "scale(1.5)" : "unset"}
        transition="all 0.25s ease"
        style={{
          backgroundImage: `url(${CARD_CDN}/${img}.webp)`,
        }}
      />{" "}
    </Box>
  );
};
