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
          minH="400px"
          gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
          bg="linear-gradient(45deg, rgba(100,50,150,1) 0%, rgba(200,100,100,1) 99%)"
          borderBottom="solid 5px"
          borderBottomColor="rgba(80,30,120,1)"
          padding="2rem"
          borderRadius="0.75rem"
          gap="2rem"
          justifyContent="space-between"
          filter="drop-shadow(0 0.5rem 1rem rgba(0,0,0,0.25))"
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
            <p className={css({ fontSize: "1.5rem", marginBottom: "1rem" })}>
              Play Sorcery TCG online in your browser
            </p>
            <ul
              className={css({
                fontSize: "1.1rem",
                lineHeight: "1.6",
                marginTop: "1.5rem",
              })}
            >
              <li>🎮 Play online multiplayer matches</li>
              <li>🌐 No downloads or accounts required</li>
              <li>⚡ Instant browser-based gameplay</li>
              <li>🔧 Build custom decks</li>
              <li>📦 Draft and crack packs</li>
              <li>🔓 Open source project</li>
            </ul>
          </Box>
          <Selector />
        </Grid>
        <Disclaimer />
        <Box
          py="2rem"
          textAlign="center"
          bg="rgba(0,0,0,0.1)"
          borderRadius="0.5rem"
          className={css({ backdropFilter: "blur(5px)" })}
        >
          <h2
            className={css({
              fontSize: "2rem",
              fontWeight: "700",
              marginBottom: "1rem",
              color: "brand.highlight",
            })}
          >
            Ready to Play?
          </h2>
          <p
            className={css({
              fontSize: "1.2rem",
              marginBottom: "1.5rem",
              opacity: 0.9,
            })}
          >
            Jump into a game right now - no setup required!
          </p>
          <HStack justify="center" gap="1rem" flexWrap="wrap">
            <Link href="/online">
              <button
                className={css({
                  bg: "linear-gradient(45deg, rgba(59, 130, 246, 1), rgba(147, 51, 234, 1))",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-2px)" },
                })}
              >
                🎮 Play Online
              </button>
            </Link>
            <Link href="/deckbuilder">
              <button
                className={css({
                  bg: "linear-gradient(45deg, rgba(34, 197, 94, 1), rgba(59, 130, 246, 1))",
                  color: "white",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": { transform: "translateY(-2px)" },
                })}
              >
                🔧 Build Deck
              </button>
            </Link>
          </HStack>
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
      tabs={["Solo", "Online", "Deck Builder", "Crack Packs", "Online Draft"]}
      content={[
        <Solo key="solo" />,
        <Multiplayer key="multiplayer" />,
        <DeckBuilder key="deckbuilder" />,
        <Crack key="crack" />,
        <Draft key="draft" />,
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

const Draft = () => {
  return (
    <div>
      <p>Run a (mock) Sorcery Draft online in the browser.</p>
      <p>Players join a lobby, select & pass, and can export decklist</p>
      <HStack>
        <p>Draft rates are NOT accurate.</p>
        <Link href="https://github.com/JollyGrin/sorcery-tcg-playtest/blob/fa6510ea46ee0c5845aba1654944799a2eff2d1b/src/components/organisms/Draft/helpers.ts#L14">
          <p
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Link to Code
          </p>
        </Link>
      </HStack>
      <HStack fontFamily="monospace" my="0.5rem">
        <p>Version:</p>
        <Box p="0 0.5rem" borderRadius="0.5rem" bg="yellow.600">
          ALPHA
        </Box>
        <p>Expect bugs!</p>
      </HStack>
      <ol style={{ listStyle: "inside", marginBottom: "0.5rem" }}>
        <li>start a lobby</li>
        <li>choose a name</li>
        <li>share lobbyname with friend</li>
      </ol>
      <Link href="/draft/online">
        <button className={button()} style={{ width: "100%" }}>
          Create a lobby
        </button>
      </Link>
    </div>
  );
};

const DeckBuilder = () => {
  return (
    <div>
      <p>Build Custom Decks</p>
      <p>Create and save your own Sorcery TCG decks locally</p>
      <HStack fontFamily="monospace" my="0.5rem">
        <p>Version:</p>
        <Box p="0 0.5rem" borderRadius="0.5rem" bg="green.600">
          NEW
        </Box>
        <p>Build decks without external sites!</p>
      </HStack>
      <ul style={{ listStyle: "inside", marginBottom: "0.5rem" }}>
        <li>Browse all available cards</li>
        <li>Save decks to your browser</li>
        <li>Export and share deck lists</li>
      </ul>
      <Link href="/deckbuilder">
        <button className={button()} style={{ width: "100%" }}>
          Build a Deck
        </button>
      </Link>
    </div>
  );
};

const Crack = () => {
  return (
    <div>
      <p>Crack Booster Packs</p>
      <p>Open (mock) booster packs by yourself.</p>
      <HStack>
        <p>Draft rates are NOT accurate.</p>
        <Link href="https://github.com/JollyGrin/sorcery-tcg-playtest/blob/fa6510ea46ee0c5845aba1654944799a2eff2d1b/src/components/organisms/Draft/helpers.ts#L14">
          <p
            style={{
              color: "blue",
              textDecoration: "underline",
            }}
          >
            Link to Code
          </p>
        </Link>
      </HStack>
      <HStack fontFamily="monospace" my="0.5rem">
        <p>Version:</p>
        <Box p="0 0.5rem" borderRadius="0.5rem" bg="yellow.600">
          BETA
        </Box>
        <p>Report bugs/feedback!</p>
      </HStack>
      <ol style={{ listStyle: "inside", marginBottom: "0.5rem" }}>
        <li>Choose pack type to open</li>
        <li>Reveal your cards one by one</li>
        <li>Build collection for deckbuilding</li>
      </ol>
      <Link href="/crack">
        <button className={button()} style={{ width: "100%" }}>
          Crack Packs
        </button>
      </Link>
    </div>
  );
};
