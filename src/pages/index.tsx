import { Box, Flex, Grid, HStack } from "styled-system/jsx";
import { css } from "styled-system/css";
import { IconLogo } from "@/components/atoms/Icons";
import { Disclaimer } from "@/components/organisms/LandingPage/Disclaimer";
import { Nav } from "@/components/organisms/LandingPage/Nav";
import { Tabs } from "@/components/atoms/Tabs";
import { Solo } from "@/components/organisms/LandingPage/SoloLoader";
import { HowToPlay } from "@/components/organisms/LandingPage/HowToPlay";
import Link from "next/link";
import { button } from "styled-system/recipes";

export default function Home() {
  return (
    <Grid w="100vw" h="100vh" bg="brand.secondary" p="2rem">
      <Flex direction="column" maxW="900px" w="100%" m="0 auto">
        <Grid
          minH="300px"
          gridTemplateColumns="1fr 1fr"
          bg="brand.shadow"
          padding="1rem"
          borderRadius="0.25rem"
          justifyContent="space-between"
        >
          <Box>hjk</Box>
          <Selector />
        </Grid>
      </Flex>
    </Grid>
  );
}

const Selector = () => (
  <Box
    h="100%"
    bg="rgba(0,0,0,0.25)"
    borderRadius="0.5rem"
    p="0.5rem"
    // display={{ base: "none", sm: "block" }}
  >
    <Tabs
      tabs={["Solo", "Battlebox", "Online"]}
      content={[
        <Solo key="solo" />,
        <Battlebox key="battlebox" />,
        <Multiplayer key="multiplayer" />,
      ]}
    />
  </Box>
);

const Multiplayer = () => {
  return (
    <div>
      <p>Play Sorcery online in the browser.</p>
      <p>Two players join a lobby, choose their decks, and duel</p>
      <HStack fontFamily="monospace" my="0.5rem">
        <p>Version:</p>
        <Box p="0 0.5rem" borderRadius="0.5rem" bg="blue.600">
          BETA
        </Box>
        <p>Share feedback/bugs!</p>
      </HStack>
      <ol style={{ listStyle: "inside", marginBottom: "0.5rem" }}>
        <li>start a lobby</li>
        <li>choose a name</li>
        <li>share lobbyname with friend</li>
      </ol>
      <Link href="/online">
        <button className={button()} style={{ width: "100%" }}>
          Create a lobby
        </button>
      </Link>
    </div>
  );
};

const Battlebox = () => {
  return (
    <div>
      <p>Playtest a a deck in battlebox mode</p>
      <p>In Battlebox, both players share the same deck</p>
      <p>Coming soon! Currently in development</p>
    </div>
  );
};
