import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import DeckBuilder from "../components/organisms/DeckBuilder";
import { Box } from "styled-system/jsx";
import { AppNav } from "@/components/molecules/AppNav";

const DeckBuilderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deck Builder | Sorcery TCG Playtest</title>
        <meta name="description" content="Build your custom Sorcery TCG deck" />
      </Head>
      <Box minH="100vh" bg="brand.shadow" className="wood">
        <AppNav />
        <DeckBuilder />
      </Box>
    </>
  );
};

export default DeckBuilderPage;
