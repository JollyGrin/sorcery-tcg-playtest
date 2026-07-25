import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AppNav } from "@/components/molecules/AppNav";
import { TablePlace } from "@/components/organisms/TablePlace";

const TablePlacePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Table.Place Packs | Sorcery TCG Playtest</title>
        <meta
          name="description"
          content="Export Sorcery TCG decks as table.place packs and play on a 3D tabletop"
        />
      </Head>
      <div className="min-h-screen bg-surface-page">
        <AppNav />
        <TablePlace />
      </div>
    </>
  );
};

export default TablePlacePage;
