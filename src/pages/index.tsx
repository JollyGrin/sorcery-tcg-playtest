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
    <Grid
      minW="100vw"
      h="100vh"
      bgImage="url(/bg/tavern-min.png)"
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
      // animation="bgZoomIn 5s"
      overflowX="clip"
      overflowY="auto"
    >
      <Flex direction="column" maxW="900px" m="0 auto 10rem" gap="1rem">
        <Nav />
        <Box
          color="white"
          bgImage="url(/bg/solo-forest.png)"
          bgSize="cover"
          bgPosition="center"
          borderRadius="0.5rem"
          p={{ base: "0.25rem", sm: "2rem" }}
          minH="20rem"
          overflow="hidden"
        >
          <Grid gridTemplateColumns={{ base: "1fr", md: "6fr 8fr" }} h="100%">
            <Box>
              <HStack>
                <IconLogo size="2.5rem" />
                <p className={css({ fontWeight: 700, fontSize: "3rem" })}>
                  Spells Bar
                </p>
              </HStack>
              <p className={css({ fontSize: "1.5rem" })}>
                Playtest decks from Sorcery TCG
              </p>
              <ul style={{ opacity: 0.75, marginTop: "2rem" }}>
                <li>No accounts</li>
                <li>All in the browser</li>
                <li>Load Table Top Simulator decks</li>
                <li>Open Sourced</li>
              </ul>
            </Box>
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
          </Grid>
        </Box>
        <Disclaimer />
        <HowToPlay />
      </Flex>
    </Grid>
  );
}

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
