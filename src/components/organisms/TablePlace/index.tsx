import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { GiAnvil, GiCubeforce } from "react-icons/gi";
import { HiDownload } from "react-icons/hi";

import { buttonVariants } from "@/components/ui/button/variants";
import { badgeVariants } from "@/components/ui/badge/variants";
import { useCardData } from "@/utils/api/cardData/useCardData";
import { getPreconDeck, getPreconList, PreconMeta } from "@/utils/precons";
import { LocalDeck } from "@/components/organisms/DeckBuilder/types";
import {
  decklistToTbppPack,
  downloadTbppPack,
} from "@/utils/tableplace/toPack";
import { CreateLobby } from "@/components/organisms/TablePlace/CreateLobby";

export const TablePlace = () => {
  const { data: cards } = useCardData();
  const { data: precons, isLoading: preconsLoading } = useQuery({
    queryFn: getPreconList,
    queryKey: ["precon-list"],
    staleTime: Infinity,
  });

  const [savedDecks, setSavedDecks] = useState<LocalDeck[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem("sorcery-decks");
    if (saved) setSavedDecks(JSON.parse(saved));
  }, []);

  const cardNames = useMemo(() => {
    if (!cards) return undefined;
    return Object.fromEntries(cards.map((card) => [card.slug, card.name]));
  }, [cards]);

  const downloadPrecon = async (precon: PreconMeta) => {
    const deck = await getPreconDeck(precon.id);
    if (!deck) {
      toast.error(`Failed to load ${precon.name}`);
      return;
    }
    downloadTbppPack(decklistToTbppPack(deck, cardNames));
    toast.success(`Downloaded ${precon.name}.tbpp.json`);
  };

  const downloadLocalDeck = (deck: LocalDeck) => {
    downloadTbppPack(decklistToTbppPack(deck, cardNames));
    toast.success(`Downloaded ${deck.name}.tbpp.json`);
  };

  return (
    <div className="max-w-[900px] mx-auto p-6 flex flex-col gap-8 text-text-primary">
      {/* Intro */}
      <div className="bg-[linear-gradient(135deg,#292524_0%,#44403C_100%)] border-b-[5px] border-b-accent-gold p-8 rounded-xl drop-shadow-[0_0.5rem_1rem_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3 mb-2">
          <GiCubeforce className="text-accent-gold text-[2rem]" />
          <h1 className="text-[2rem] font-bold text-accent-gold font-header">
            Play on table.place
          </h1>
          <span className={badgeVariants({ variant: "new" })}>NEW</span>
        </div>
        <p className="text-[1.1rem] text-text-secondary mb-4">
          Export any deck as a{" "}
          <a
            href="https://table.place"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-teal underline"
          >
            table.place
          </a>{" "}
          pack and play Sorcery on a full 3D tabletop — drag, flip, stack and
          shuffle cards freely with friends.
        </p>
        <ol className="list-decimal list-inside leading-8">
          <li>Download a deck below as a `.tbpp.json` pack file</li>
          <li>
            Open{" "}
            <a
              href="https://table.place/setup"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-teal underline"
            >
              table.place/setup
            </a>{" "}
            and import the pack file
          </li>
          <li>Each player brings their own deck — then duel!</li>
        </ol>
      </div>

      {/* One-click lobby */}
      <CreateLobby
        precons={precons ?? []}
        savedDecks={savedDecks}
        cardNames={cardNames}
      />

      {/* Precons */}
      <section>
        <h2 className="text-[1.5rem] font-bold text-accent-gold font-header mb-1">
          Precon Decks
        </h2>
        <p className="text-text-secondary mb-4">
          Ready-to-play preconstructed decks. Download one for you and one for
          your opponent.
        </p>
        {preconsLoading && <p className="text-text-secondary">Loading…</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {precons?.map((precon) => (
            <DeckCard
              key={precon.id}
              title={precon.name}
              subtitle={`${precon.element} · ${precon.difficulty} · ${precon.cardCount.spellbook} spells / ${precon.cardCount.atlas} sites`}
              description={precon.description}
              onDownload={() => downloadPrecon(precon)}
            />
          ))}
        </div>
      </section>

      {/* My Decks */}
      <section>
        <h2 className="text-[1.5rem] font-bold text-accent-gold font-header mb-1">
          My Decks
        </h2>
        <p className="text-text-secondary mb-4">
          Decks saved in the deck builder on this browser.
        </p>
        {savedDecks.length === 0 ? (
          <div className="bg-[rgba(0,0,0,0.3)] rounded-lg p-6 text-center">
            <p className="text-text-secondary mb-4">
              No saved decks yet — build one first, or import from Curiosa in
              the deck builder.
            </p>
            <Link href="/deckbuilder">
              <button className={buttonVariants()}>
                <div className="flex items-center gap-2">
                  <GiAnvil />
                  <span>Open Deck Builder</span>
                </div>
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedDecks.map((deck) => (
              <DeckCard
                key={deck.id}
                title={deck.name}
                subtitle={`${deck.spellbook.length} spells / ${deck.atlas.length} sites${deck.avatar ? ` · avatar: ${cardNames?.[deck.avatar] ?? deck.avatar}` : ""}`}
                onDownload={() => downloadLocalDeck(deck)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Notes */}
      <section className="bg-[rgba(0,0,0,0.3)] rounded-lg p-6 text-[0.95rem] text-text-secondary">
        <p className="mb-2">
          Pack files only contain card names and links to card images — the
          images themselves stay on our card CDN, so files are tiny and always
          up to date.
        </p>
        <p>
          table.place is a rules-free 3D tabletop: it doesn&apos;t know
          Sorcery&apos;s rules, it just gives you cards, dice and counters to
          play with — like a real table.
        </p>
      </section>
    </div>
  );
};

const DeckCard = ({
  title,
  subtitle,
  description,
  onDownload,
}: {
  title: string;
  subtitle: string;
  description?: string;
  onDownload: () => void;
}) => (
  <div className="bg-[linear-gradient(135deg,#292524_0%,#3D2B1F_100%)] rounded-lg p-4 flex flex-col gap-2 border border-[rgba(255,255,255,0.08)]">
    <div>
      <p className="font-bold text-[1.1rem] text-text-primary">{title}</p>
      <p className="text-text-secondary text-[0.85rem] capitalize">
        {subtitle}
      </p>
    </div>
    {description && (
      <p className="text-text-secondary text-[0.9rem] grow">{description}</p>
    )}
    <button
      className={buttonVariants({ variant: "outline" })}
      onClick={onDownload}
    >
      <div className="flex items-center justify-center gap-2">
        <HiDownload />
        <span>Download pack</span>
      </div>
    </button>
  </div>
);
