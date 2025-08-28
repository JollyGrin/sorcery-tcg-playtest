import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import DeckBuilder from "../components/organisms/DeckBuilder";
import { Nav } from "@/components/organisms/LandingPage/Nav";
import { Box, Flex } from "styled-system/jsx";
import { css } from "styled-system/css";

const DeckBuilderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deck Builder | Sorcery TCG Playtest</title>
        <meta name="description" content="Build your custom Sorcery TCG deck" />
      </Head>
      <Box minH="100vh" bg="brand.shadow" className="wood">
        <Flex direction="column" maxW="1400px" w="100%" m="0 auto" p="2rem" gap={3}>
          <Nav />
          <h1 className={css({ 
            fontSize: "3rem", 
            fontWeight: 700, 
            mb: "2rem", 
            textAlign: "center",
            color: "brand.highlight",
            fontFamily: "title"
          })}>
            Deck Builder
          </h1>
          <DeckBuilder />
        </Flex>
      </Box>
    </>
  );
};

export default DeckBuilderPage;
