import { ReactNode } from "react";
import { Grid, HStack } from "styled-system/jsx";
import { grid } from "styled-system/patterns";
import { LAYOUT_HEIGHTS } from "./constants";
import { GameFooter } from "./Footer";
import { GameStateActions } from ".";

const { nav, body, footer } = LAYOUT_HEIGHTS;

export const GameLayout = (
  props: GameStateActions & { children: ReactNode },
) => {
  return (
    <Grid style={{ gridTemplateRows: `${nav} ${body} ${footer}` }} gap={0}>
      <div style={{ background: "rgba(0,200,0,0.2)", padding: "1rem" }}>
        <p style={{ width: "fit-content", margin: "0 auto" }}>
          While hovering over a card, click{" "}
          <code
            style={{
              background: "rgba(0,0,0,0.075)",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            ALT
          </code>{" "}
          key
        </p>
      </div>
      <div
        className={grid({
          gap: 1,
          m: "0 auto",
          gridTemplateColumns: "repeat(5, 1fr)",
          gridTemplateRows: "repeat(4, 1fr)",
          maxW: "1200px",
          w: "100%",
          h: "100%",
          background: "rgba(240, 240, 240, 0.5)", // Ensure background visibility
        })}
      >
        {props.children}
      </div>

      <GameFooter {...props} />
    </Grid>
  );
};
