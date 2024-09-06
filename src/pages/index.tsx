import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { css } from "styled-system/css";
import { Box, Grid } from "styled-system/jsx";
import { grid } from "styled-system/patterns";

const nav = `100px`;
const footer = `50px`;
const body = `calc(100vh - ${nav} - ${footer})`;

export default function Home() {
  return (
    <div>
      <Grid gridTemplateRows={`${nav} ${body} ${footer}`} gap={0}>
        <div style={{ background: "rgba(0,200,0,0.2)", padding: "1rem" }}>
          <p>Experiment arranging a Sorcery Grid</p>
          <p>
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
            // border: "1px solid black",
          })}
        >
          <Row />
          <Row swap />
          <Row />
          <Row swap />
        </div>

        <div style={{ background: "brown" }}>footer</div>
      </Grid>
    </div>
  );
}

const Row = (props: { swap?: boolean }) => (
  <>
    {Array.from({ length: 5 }).map((_, i) => (
      <>
        {i % 2 === (props.swap ? 0 : 1) ? (
          <div
            className={css({
              // bg: "red",
              h: "100%",
              w: "100%",
              // isolation: "isolate",
              position: "relative",
            })}
          >
            <CardImage index={30} />
            {/* <CardImage index={100} isTapped /> */}
            <CardAtlas />
            <CardImage position="bottom" index={1} />
            <Box
              position="absolute"
              top={0}
              w="100%"
              h="100%"
              bg="gray.200"
              zIndex={-1000}
            />
          </div>
        ) : (
          <div
            className={css({
              // bg: "blue",
              h: "100%",
              w: "100%",
              zIndex: 0,
              isolation: "isolate",
              position: "relative",
            })}
          >
            <CardAtlas img="atlas_cloud_city.webp" />
            <Box
              position="absolute"
              top={0}
              w="100%"
              h="100%"
              bg="gray.200"
              zIndex={-1000}
            />
          </div>
        )}
      </>
    ))}
  </>
);
