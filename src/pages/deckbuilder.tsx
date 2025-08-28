import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import DeckBuilder from "../components/organisms/DeckBuilder";
import { Nav } from "@/components/organisms/LandingPage/Nav";
import { Box } from "styled-system/jsx";

const DeckBuilderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deck Builder | Sorcery TCG Playtest</title>
        <meta name="description" content="Build your custom Sorcery TCG deck" />
      </Head>
      <Box minH="100vh" bg="brand.shadow" className="wood">
        {/* <Nav /> */}
        <DeckBuilder />
      </Box>
    </>
  );
};

export default DeckBuilderPage;
