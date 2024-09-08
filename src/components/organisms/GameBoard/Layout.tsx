import { ReactNode } from "react";
import { Box, Grid } from "styled-system/jsx";
import { grid } from "styled-system/patterns";
import { LAYOUT_HEIGHTS } from "./constants";
import { GameFooter } from "./Footer";
import { GameStateActions } from ".";
import { Auras } from "./Auras";

const { nav, body, footer } = LAYOUT_HEIGHTS;

export const GameLayout = (
  props: GameStateActions & { children: ReactNode },
) => {
  console.table(props.gridItems);
  return (
    <Grid style={{ gridTemplateRows: `${nav} ${body} ${footer}` }} gap={0}>
      <div
        style={{
          background: "rgba(0,200,0,0.2)",
          padding: "0.5rem",
          height: nav,
        }}
      >
        <p style={{ width: "fit-content" }}>
          Right click cards to view in full
        </p>
      </div>
      <Box position="relative" h="100%" w="100%" maxW="1200px" m="0 auto">
        <Auras {...props} />
        <div
          className={grid({
            gap: 1,
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
