import { useCreateLobby } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Box, Divider, Flex, Grid, HStack } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";

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
    <Grid w="100vw" h="100vh" placeItems="center" bg="gray.800">
      <Box w="100%" maxW="500px">
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
    </Grid>
  );
};
