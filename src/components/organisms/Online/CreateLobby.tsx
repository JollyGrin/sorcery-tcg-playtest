import { useCreateLobby } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Box, Divider, Flex, Grid, HStack } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";
import { css } from "styled-system/css";

export const CreateLobby = () => {
  const { push } = useRouter();
  const [fields, setFields] = useState({ name: "", gid: "" });
  const gidRef = useRef(null);
  const nameRef = useRef(null);
  const { refetch } = useCreateLobby({
    gidRef,
    nameRef,
  });
  function onSubmit() {
    push({ query: { ...fields } });
    refetch(undefined);
  }
  return (
    <Grid
      w="100vw"
      h="100vh"
      placeItems="center"
      bg="gray.800"
      position="relative"
    >
      <Box w="100%" maxW="500px" zIndex={1}>
        <Flex
          direction="column"
          m="0 auto"
          mt="10rem"
          gap="1rem"
          bg="gray.100"
          p="2rem"
          borderRadius="1rem"
        >
          <img
            src="/logo.svg"
            alt="logo"
            style={{ width: "100px", margin: "0 auto" }}
          />
          <input
            ref={nameRef}
            placeholder="Your name"
            onChange={(e) =>
              setFields((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
            className={input()}
          />

          <input
            ref={gidRef}
            placeholder="Lobby name"
            onChange={(e) =>
              setFields((prev) => ({
                ...prev,
                gid: e.target.value,
              }))
            }
            className={input()}
          />
          <button className={button()} onClick={onSubmit}>
            submit
          </button>
        </Flex>
        <Flex
          mt="1rem"
          bg="gray.100"
          maxW="500px"
          w="100%"
          p="2rem"
          borderRadius="1rem"
          direction="column"
          gap={4}
        >
          <p style={{ fontWeight: 500, fontSize: "1.5rem" }}>How to play</p>
          <p>
            Play Sorcery TCG online with a friend! SpellsBar has no rules
            enforcement, no accounts, and loads decks from curiosa and realms.
          </p>
          <ul style={{ listStyle: "inside" }}>
            <li>Enter a name for yourself and a lobby name</li>
            <li>Find a deck and copy it's TTS export link</li>
            <li>Load your deck</li>
            <li>Share the lobby name for your opponent to connect to</li>
          </ul>
          <Divider opacity={0.1} />
          <HStack>
            <p style={{ opacity: 0.5 }}>Find a deck from:</p>
            <Link href="https://curiosa.io/" target="_blank">
              <p>Curiosa</p>
            </Link>

            <Link
              href="https://www.realmsapp.com/sorcery_tcg/decklists"
              target="_blank"
            >
              <p>Realms</p>
            </Link>
          </HStack>
        </Flex>
      </Box>

      <Box className={fallingCardsContainer}>
        {cards.slice(0, 6).map((img, index, original) => (
          <img
            src={`https://card.cards.army/cards/50/${img}.webp`}
            alt={"card" + index}
            className={fallingCard}
            style={{ left: (index + 1) * (90 / original.length) + "%" }}
          />
        ))}
      </Box>
    </Grid>
  );
};

const cards = [
  "arid_desert",
  "atlantean_fate-f",
  "avatar_of_fire",
  "bridge_troll",
  "buried_treasure",
  "cave_trolls",
  "chain_lightning",
  "chaos_twister",
  "cloud_city",
  "crusade",
  "fade",
  "flood",
  "grim_reaper",
  "hillock_basilisk",
  "lighthouse",
  "master_tracker",
  "midnight_rogue",
  "mudflow",
  "pirate_ship",
  "red_desert",
  "riptide",
  "royal_bodyguard",
  "sea_serpent",
  "sinkhole",
  "spear_of_destiny",
  "swiven_scout",
  "twist_of_fate",
];

// Falling cards container
const fallingCardsContainer = css({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 0, // Behind the main content
});

// Falling card styles
const fallingCard = css({
  position: "absolute",
  width: "150px", // Adjust as needed
  animation: "fall 10s linear infinite, sway 5s ease-in-out infinite alternate",
  opacity: 0.7,

  // Random animation delay for each card
  "&:nth-child(1)": { animationDelay: "2s" },
  "&:nth-child(2)": { animationDelay: "0s" },
  "&:nth-child(3)": { animationDelay: "4s" },
  "&:nth-child(4)": { animationDelay: "6s" },
  "&:nth-child(5)": { animationDelay: "8s" },
  // Add more nth-child styles for additional cards
});
