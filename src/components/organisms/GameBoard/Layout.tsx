import { ReactNode } from "react";
import { Box, Grid } from "styled-system/jsx";
import { grid } from "styled-system/patterns";
import { LAYOUT_HEIGHTS } from "./constants";
import { GameFooter } from "./Footer";
import { GameStateActions } from ".";
import { AuraDrop } from "./AuraDrop";

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
          padding: "1rem",
          height: nav,
        }}
      >
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
      <Box position="relative" h="100%" w="100%" maxW="1200px" m="0 auto">
        <Box position="absolute" w="100%" h="100%">
          <Box
            position="absolute"
            top="25%" /* Adjust relative to row height */
            left="20%" /* Adjust relative to column width */
            bg="blue"
            w="50px"
            h="50px"
            transform="translate(-50%, -50%)" /* Center the box */
          >
            <AuraDrop gridIndex={21}>
              <Box
                w="100%"
                h="100%"
                style={{
                  backgroundImage: `url(/mock-cards/${props.gridItems?.[21]?.[0]?.img})`,
                }}
              />
              {/* {props.gridItems[21][0].img} */}
            </AuraDrop>
          </Box>

          <Box
            position="absolute"
            top="25%" /* Adjust relative to row height */
            left="40%" /* Adjust relative to column width */
            bg="blue"
            w="25px"
            h="25px"
            transform="translate(-50%, -50%)" /* Center the box */
          />
        </Box>

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
