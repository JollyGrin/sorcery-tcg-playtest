import { css } from "styled-system/css";
import { Grid } from "styled-system/jsx";
import { grid } from "styled-system/patterns";

const nav = `100px`;
const footer = `150px`;
const body = `calc(100vh - ${nav} - ${footer})`;

export default function Home() {
  return (
    <div>
      <Grid gridTemplateRows={`${nav} ${body} ${footer}`}>
        <div style={{ background: "red" }}>nav</div>
        <div
          className={grid({
            gap: 2,
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
          <Row />
        </div>

        <div style={{ background: "blue" }}>footer</div>
      </Grid>
    </div>
  );
}

const Row = (props: { swap?: boolean }) => (
  <>
    {Array.from({ length: 5 }).map((_, i) => (
      <>
        {i % 2 === (props.swap ? 0 : 1) ? (
          <div className={css({ bg: "red", h: "100%", w: "100%" })} />
        ) : (
          <div className={css({ bg: "blue", h: "100%", w: "100%" })} />
        )}
      </>
    ))}
  </>
);
