import { useCreateLobby } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Box, Flex, Grid, HStack } from "styled-system/jsx";
import { input } from "styled-system/recipes";
import { css } from "styled-system/css";

import { FaDice as IconDice } from "react-icons/fa6";
import { FaRegCopy as IconCopy } from "react-icons/fa";
import { generateRandomName } from "./random-names";
import { useCopyToClipboard } from "@/utils/hooks/useCopy";
import toast from "react-hot-toast";
import { AppNav } from "@/components/molecules/AppNav";

export const CreateLobby = () => {
  const { push, query } = useRouter();
  const { gid } = query;

  const [, copy] = useCopyToClipboard();
  const [fields, setFields] = useState({ name: "", gid: "" });
  const gidRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { refetch } = useCreateLobby({
    gidRef,
    nameRef,
  });
  function onSubmit() {
    push({ query: { ...fields } });
    refetch(undefined);
  }

  useEffect(() => {
    if (gid) {
      setFields((prev) => ({
        ...prev,
        gid: gid as string,
      }));
    }
  }, [gid, query]);

  return (
    <Grid
      w="100vw"
      minH="100vh"
      placeItems="center"
      bg="surface.page"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        bg="radial-gradient(ellipse at 50% 30%, rgba(212,168,83,0.08) 0%, transparent 70%)"
        pointerEvents="none"
      />
      <AppNav />
      <Box w="100%" maxW="500px" zIndex={1} px="1rem">
        <Flex
          direction="column"
          m="0 auto"
          mt="2rem"
          gap="1rem"
          bg="surface.raised"
          border="1px solid rgba(212,168,83,0.2)"
          p="2rem"
          borderRadius="1rem"
        >
          <Link href="/">
            <img
              src="/logo.svg"
              alt="logo"
              style={{ width: "100px", margin: "0 auto" }}
            />
          </Link>
          <h2
            className={css({
              fontFamily: "header",
              fontSize: "1.5rem",
              fontWeight: 600,
              color: "text.primary",
              textAlign: "center",
            })}
          >
            Create a Lobby
          </h2>
          <Box>
            <label
              className={css({
                display: "block",
                fontSize: "0.85rem",
                color: "text.secondary",
                mb: "0.25rem",
              })}
            >
              Your Name
            </label>
            <HStack>
              <IconDice
                className={DiceStyle}
                onClick={() =>
                  setFields((prev) => ({
                    ...prev,
                    name: generateRandomName(),
                  }))
                }
              />
              <input
                ref={nameRef}
                placeholder="Your name"
                value={fields.name}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                className={input()}
              />
            </HStack>
          </Box>

          <Box>
            <label
              className={css({
                display: "block",
                fontSize: "0.85rem",
                color: "text.secondary",
                mb: "0.25rem",
              })}
            >
              Lobby Name
            </label>
            <HStack>
              <IconDice
                className={DiceStyle}
                onClick={() =>
                  setFields((prev) => ({
                    ...prev,
                    gid: generateRandomName(),
                  }))
                }
              />
              <input
                ref={gidRef}
                placeholder="Lobby name"
                value={fields.gid}
                onChange={(e) =>
                  setFields((prev) => ({
                    ...prev,
                    gid: e.target.value,
                  }))
                }
                className={input()}
              />
            </HStack>
          </Box>

          <Box w="100%">
            <button
              className={css({
                width: "100%",
                bg: "accent.gold",
                color: "surface.page",
                padding: "0.6rem 1.5rem",
                borderRadius: "0.5rem",
                fontSize: "1rem",
                fontWeight: "600",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s",
                _hover: { bg: "accent.goldHover" },
              })}
              onClick={onSubmit}
            >
              Create/Join lobby
            </button>
            {fields.gid && (
              <HStack
                justifyContent="center"
                mt="1rem"
                cursor="pointer"
                color="text.secondary"
                transition="all 0.25s ease"
                _hover={{
                  transform: "scale(1.05)",
                  color: "accent.gold",
                }}
                _active={{
                  transform: "scale(1.02)",
                }}
                onClick={() => {
                  const text = `https://spells.bar/online?gid=${fields.gid}`;
                  copy(text);
                  toast.success(`Copied to clipboard`);
                }}
              >
                <IconCopy />
                <p style={{ width: "fit-content" }}>
                  share this lobby with a friend
                </p>
              </HStack>
            )}
          </Box>
        </Flex>
        <Flex
          mt="1rem"
          bg="surface.raised"
          border="1px solid rgba(212,168,83,0.2)"
          maxW="500px"
          w="100%"
          p="2rem"
          borderRadius="1rem"
          direction="column"
          gap={4}
          color="text.primary"
        >
          <p
            className={css({
              fontWeight: 500,
              fontSize: "1.5rem",
              fontFamily: "header",
            })}
          >
            How to play
          </p>
          <p className={css({ color: "text.secondary" })}>
            Play Sorcery TCG online with a friend! SpellsBar has no rules
            enforcement, no accounts{" "}
          </p>
          <ul style={{ listStyle: "inside" }}>
            <li>Enter a name for yourself and lobby</li>
            <li>Load a deck </li>
            <li>Share the lobby name for your opponent to connect to</li>
          </ul>
        </Flex>
      </Box>

      <Box className={fallingCardsContainer}>
        {cards.slice(0, 6).map((img, index, original) => (
          <img
            key={"image" + index}
            src={`https://card.cards.army/cards/${img}.webp`}
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
  opacity: 0.3,

  // Random animation delay for each card
  "&:nth-child(1)": { animationDelay: "2s" },
  "&:nth-child(2)": { animationDelay: "0s" },
  "&:nth-child(3)": { animationDelay: "4s" },
  "&:nth-child(4)": { animationDelay: "6s" },
  "&:nth-child(5)": { animationDelay: "8s" },
  // Add more nth-child styles for additional cards
});

const DiceStyle = css({
  userSelect: "none",
  transform: "scale(1)",
  transition: "all 0.25s ease",
  cursor: "pointer",
  color: "text.secondary",
  _hover: {
    transform: "scale(1.25) rotate(15deg)",
    color: "accent.gold",
  },
  _active: {
    transform: "scale(1.1)",
  },
});
