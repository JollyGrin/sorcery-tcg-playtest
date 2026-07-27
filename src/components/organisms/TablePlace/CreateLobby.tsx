import React, { useState } from "react";
import toast from "react-hot-toast";
import { GiTabletopPlayers } from "react-icons/gi";
import { HiClipboardCopy, HiExternalLink } from "react-icons/hi";

import { buttonVariants } from "@/components/ui/button/variants";
import { badgeVariants } from "@/components/ui/badge/variants";
import { LocalDeck } from "@/components/organisms/DeckBuilder/types";
import { getPreconDeck, PreconMeta } from "@/utils/precons";
import { DecklistInput } from "@/utils/tableplace/toPack";
import {
  createLobby,
  LobbyError,
  LobbyResult,
} from "@/utils/tableplace/createLobby";

type Props = {
  precons: PreconMeta[];
  savedDecks: LocalDeck[];
  cardNames?: Record<string, string>;
};

const SEAT_LABELS = ["Player 1", "Player 2"];

export const CreateLobby = ({ precons, savedDecks, cardNames }: Props) => {
  const [selection, setSelection] = useState<[string, string]>(["", ""]);
  const [isCreating, setIsCreating] = useState(false);
  const [lobby, setLobby] = useState<LobbyResult | null>(null);

  const resolveDeck = async (value: string): Promise<DecklistInput | null> => {
    const [kind, id] = [value.slice(0, value.indexOf(":")), value.slice(value.indexOf(":") + 1)];
    if (kind === "precon") return getPreconDeck(id);
    return savedDecks.find((deck) => deck.id === id) ?? null;
  };

  const onCreate = async () => {
    setIsCreating(true);
    try {
      const [deck0, deck1] = await Promise.all(selection.map(resolveDeck));
      if (!deck0 || !deck1) {
        toast.error("Failed to load one of the selected decks");
        return;
      }
      const result = await createLobby(deck0, deck1, cardNames);
      setLobby(result);
      toast.success(`Lobby "${result.lobby}" is ready!`);
    } catch (error) {
      toast.error(
        error instanceof LobbyError ? error.message : "Lobby creation failed",
      );
    } finally {
      setIsCreating(false);
    }
  };

  const copy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Link copied");
  };

  const deckSelect = (seat: number) => (
    <label key={seat} className="flex flex-col gap-1 grow basis-0 min-w-[220px]">
      <span className="text-text-secondary text-[0.85rem]">
        {SEAT_LABELS[seat]} deck
      </span>
      <select
        className="bg-[rgba(0,0,0,0.4)] border border-[rgba(255,255,255,0.15)] rounded-md p-2 text-text-primary"
        value={selection[seat]}
        onChange={(event) => {
          const next: [string, string] = [...selection];
          next[seat] = event.target.value;
          setSelection(next);
        }}
      >
        <option value="">Select a deck…</option>
        <optgroup label="Precons">
          {precons.map((precon) => (
            <option key={precon.id} value={`precon:${precon.id}`}>
              {precon.name}
            </option>
          ))}
        </optgroup>
        {savedDecks.length > 0 && (
          <optgroup label="My Decks">
            {savedDecks.map((deck) => (
              <option key={deck.id} value={`saved:${deck.id}`}>
                {deck.name}
              </option>
            ))}
          </optgroup>
        )}
      </select>
    </label>
  );

  return (
    <section className="bg-[linear-gradient(135deg,#1C2B2A_0%,#29403D_100%)] border-b-[5px] border-b-accent-teal p-8 rounded-xl drop-shadow-[0_0.5rem_1rem_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-3 mb-2">
        <GiTabletopPlayers className="text-accent-teal text-[2rem]" />
        <h2 className="text-[1.5rem] font-bold text-accent-teal font-header">
          Create an Online Lobby
        </h2>
        <span className={badgeVariants({ variant: "new" })}>NEW</span>
      </div>
      <p className="text-text-secondary mb-4">
        Skip the manual import: pick a deck for each player and we&apos;ll seed
        a table.place lobby with both decks dealt on a realm map. You get two
        links — hand one to each player.
      </p>

      <div className="flex flex-wrap gap-4 items-end">
        {deckSelect(0)}
        {deckSelect(1)}
        <button
          className={buttonVariants()}
          disabled={isCreating || selection.some((value) => !value)}
          onClick={onCreate}
        >
          {isCreating ? "Creating…" : "Create lobby"}
        </button>
      </div>

      {lobby && (
        <div className="mt-6 bg-[rgba(0,0,0,0.35)] rounded-lg p-4 flex flex-col gap-3">
          <p className="font-bold text-text-primary">
            Lobby <span className="text-accent-teal">{lobby.lobby}</span> is
            ready — seats claim on first join.
          </p>
          {lobby.seats.map((seat) => (
            <div key={seat.seat} className="flex flex-wrap items-center gap-2">
              <span className="text-text-secondary w-[80px]">
                {SEAT_LABELS[seat.seat]}
              </span>
              <code className="bg-[rgba(0,0,0,0.4)] rounded px-2 py-1 text-[0.85rem] text-text-primary break-all">
                {seat.url}
              </code>
              <button
                aria-label={`Copy ${SEAT_LABELS[seat.seat]} link`}
                className={buttonVariants({ variant: "outline", size: "sm" })}
                onClick={() => copy(seat.url)}
              >
                <HiClipboardCopy />
              </button>
              <a
                href={seat.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                <HiExternalLink />
              </a>
            </div>
          ))}
          <p className="text-text-secondary text-[0.85rem]">
            Join promptly — an empty lobby is cleaned up after ~15 minutes, so
            create it when both players are ready. Mana counters can&apos;t be
            pre-placed yet (the table.place API doesn&apos;t accept pieces);
            grab red, blue, green and brown counters from the table&apos;s
            toolbox once you&apos;re seated.
          </p>
        </div>
      )}
    </section>
  );
};
