import Link from "next/link";
import { ReactNode } from "react";
import { css } from "styled-system/css";
import { Box, Flex, Grid } from "styled-system/jsx";

export const HowToPlay = () => {
  return (
    <Flex
      bg="rgba(200,100,0,0.5)"
      color="white"
      backdropFilter="blur(3px) brightness(90%)"
      p="1rem"
      borderRadius="0.5rem"
      direction="column"
      gap="2rem"
    >
      <p className={css({ fontWeight: 700, fontSize: "2rem" })}>How to play</p>
      <Grid gridTemplateColumns="repeat(3, 1fr)">
        <Step
          img="shop"
          title="1) Buy Sorcery Cards"
          desc="Buy some Sorcery TCG cards from your favorite cardboard dealer"
        />

        <Step
          img="deckbuilding"
          title="2) Build your deck"
          desc={
            <p>
              Build your deck on <Link href="https://curiosa.io/">Curiosa</Link>
            </p>
          }
        />

        <Step
          img="duel"
          title="3) Test your deck"
          desc={
            <p>
              Build your deck on <Link href="https://curiosa.io/">Curiosa</Link>
            </p>
          }
        />
      </Grid>
    </Flex>
  );
};

const Step = (props: { img: string; title: string; desc: ReactNode }) => {
  return (
    <Box>
      <p className={css({ fontWeight: 600, fontSize: "1.25rem" })}>
        {props.title}
      </p>
      <img
        src={`/bg/${props.img}.png`}
        style={{
          maxWidth: "250px",
          borderRadius: "1rem",
          height: "250px",
          objectFit: "cover",
        }}
      />
      {typeof props.desc === "string" ? <p>{props.desc}</p> : props.desc}
    </Box>
  );
};
