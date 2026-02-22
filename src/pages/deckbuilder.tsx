import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import DeckBuilder from "../components/organisms/DeckBuilder";
import { AppNav } from "@/components/molecules/AppNav";

const DeckBuilderPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deck Builder | Sorcery TCG Playtest</title>
        <meta name="description" content="Build your custom Sorcery TCG deck" />
      </Head>
      <div className="min-h-screen bg-brand-shadow wood">
        <AppNav />
        <DeckBuilder />
      </div>
    </>
  );
};

export default DeckBuilderPage;
