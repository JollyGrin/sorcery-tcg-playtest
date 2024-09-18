import { ReactNode } from "react";
import { Box, Grid } from "styled-system/jsx";
import { grid } from "styled-system/patterns";
import { LAYOUT_HEIGHTS } from "./constants";
import { GameFooter } from "./Footer";
import { GameStateActions } from ".";
import { Auras } from "./Auras";
import { PlayerDataProps } from "@/types/card";
import { GameHeader } from "./Header";

const { nav, body, footer } = LAYOUT_HEIGHTS;

export const GameLayout = (
  props: GameStateActions &
    PlayerDataProps & { isReversed?: boolean; children: ReactNode },
) => {
  return (
    <Grid style={{ gridTemplateRows: `${nav} ${body} ${footer}` }} gap={0}>
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
