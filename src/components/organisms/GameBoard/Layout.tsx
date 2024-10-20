import { DragEvent, ReactNode, useState } from "react";
import { Box, Grid } from "styled-system/jsx";
import { grid } from "styled-system/patterns";
import { getCardImage, LAYOUT_HEIGHTS } from "./constants";
import { GameFooter } from "./Footer";
import { GameStateActions } from ".";
import { Auras } from "./Auras";
import { PlayerDataProps } from "@/types/card";
import { GameHeader } from "./Header";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";

const { nav, body, footer } = LAYOUT_HEIGHTS;

export const GameLayout = (
  props: GameStateActions &
    PlayerDataProps & {
      isReversed?: boolean;
      activeCardSlug?: string;
      children: ReactNode;
    },
) => {
  const matches = useMediaQuery("(min-width: 1200px)");
  const [trans, setTrans] = useState<string>("");

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default drag behavior

    if (e.clientX !== 0 && e.clientY !== 0) {
      const transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      setTrans(transform ?? "");
    }
  };

  return (
    <Grid
      style={{ gridTemplateRows: `${nav} ${body} ${footer}` }}
      gap={0}
      position="relative"
    >
      <Box
        zIndex={5}
        position="absolute"
        draggable
        onDragStart={(e) => {
          const img = new Image();
          img.src = "";
          e.dataTransfer.setDragImage(img, 0, 0);
        }}
        onDrag={handleDrag} // Directly update position for smoother dragging
        cursor="grab"
        style={{
          transform: trans,
          display: matches ? "block" : "none",
        }}
      >
        {matches && props.activeCardSlug && (
          <img
            src={getCardImage(props.activeCardSlug)}
            alt="card"
            style={{ maxWidth: "20rem" }}
          />
        )}
        {matches && props.activeCardSlug === undefined && (
          <Box
            w="20rem"
            h="26rem"
            bg="gray"
            borderRadius="1rem"
            opacity="0.35"
          />
        )}
      </Box>
      <GameHeader players={props.players} />
      <Box position="relative" h="100%" w="100%" maxW="1200px" m="0 auto">
        <Auras {...props} />
        <div
          className={grid({
            gap: 2,
            gridTemplateColumns: "repeat(5, 1fr)",
            gridTemplateRows: "repeat(4, 1fr)",
            w: "100%",
            h: "100%",
            background: "rgba(240, 240, 240, 0.5)", // Ensure background visibility
          })}
        >
          {props.children}
        </div>
      </Box>

      <GameFooter {...props} />
    </Grid>
  );
};
