import { Box, Flex, Grid, HStack } from "styled-system/jsx";
import { css } from "styled-system/css";
import { IconLogo } from "@/components/atoms/Icons";
import { Disclaimer } from "@/components/organisms/LandingPage/Disclaimer";
import { Nav } from "@/components/organisms/LandingPage/Nav";
import { Tabs } from "@/components/atoms/Tabs";
import { Solo } from "@/components/organisms/LandingPage/SoloLoader";
import Link from "next/link";
import { button } from "styled-system/recipes";

export default function Home() {
  return (
    <Grid minH="100vh" bg="brand.shadow" p="2rem" className="wood">
      <Flex direction="column" maxW="900px" w="100%" m="0 auto" gap={3}>
        <Nav />
        <Grid
          minH="300px"
          gridTemplateColumns="1fr 1fr"
          bg="linear-gradient(45deg, rgba(100,50,150,1) 0%, rgba(200,100,100,1) 99%)"
          borderBottom="solid 5px"
          borderBottomColor="rgba(80,30,120,1)"
          padding="1rem"
          borderRadius="0.5rem"
          justifyContent="space-between"
          filter="drop-shadow(0 0.25rem 0.25rem rgba(0,0,0,0.35))"
        >
          <Box color="brand.highlight">
            <HStack>
              <IconLogo size="2.5rem" />
              <p
                className={css({
                  fontWeight: 700,
                  fontSize: "3rem",
                  fontFamily: "title",
                })}
              >
                Spells.Bar
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
          <Selector />
        </Grid>
        <Disclaimer />
        <Grid
          gridTemplateColumns="1fr 1fr"
          py="1rem"
          fontSize="2rem"
          fontWeight="700"
          alignItems="center"
        >
          <p>Load your favorite decks from Curiosa, Realms, or Four Cores</p>
          <img
            src="/landing/cards3.png"
            alt="cards"
            style={{
              justifySelf: "end",
              height: "250px",
            }}
          />
        </Grid>
        <Box bg="plum" w="fit-content" p="1rem" borderRadius="1rem">
          <p>Draft Mode in development!</p>
          <Link href="/draft">
            <p style={{ textDecoration: "underline" }}>
              In the meantime, crack some packs!
            </p>
          </Link>
        </Box>
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
