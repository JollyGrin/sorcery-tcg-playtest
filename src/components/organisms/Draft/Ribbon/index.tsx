import { Button } from "@/components/ui/button";
import { DraftPlayerData, DraftProps } from "../types";
import {
  Expansion,
  findAdjacentPlayers,
  generateBoosterPack,
} from "../helpers";
import { useCardFullData } from "@/utils/api/cardData/useCardData";
import { useEffect, useMemo, useState } from "react";
import { SelectedCardsModal } from "./SelectedCardsModal";
import { useRouter } from "next/router";
import { mapPackKey } from "./helpers";
import {
  GiCardPick,
  GiCardDraw,
  GiSwapBag,
} from "react-icons/gi";

export const DraftRibbon = (
  props: DraftProps & {
    players: Record<string, DraftPlayerData>;
    isAnimating?: boolean;
  },
) => {
  const { query } = useRouter();
  const name = (query?.name as string) ?? ("p1" as string);
  const [isOpen, setIsOpen] = useState(false);
  const disclosure = {
    isOpen,
    toggle: () => setIsOpen((prev) => !prev),
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  };

  const [set, setSet] = useState<Expansion>("Alpha");

  const { data: cardData = [] } = useCardFullData();

  const { nextPlayer, previousPlayer } = useMemo(() => {
    return findAdjacentPlayers(props.players[name], props.players);
  }, [
    Object.values(props.players).map((player) => player.joinedSessionTimestamp),
  ]);

  const pendingPackKeys = useMemo(() => {
    if (!props?.player?.pendingPacks) return [];
    return props.player.pendingPacks.map(mapPackKey);
  }, [props.player.pendingPacks]);

  const { unrequestedPacks, availablePacks } = useMemo(() => {
    const [, values] = previousPlayer;
    const { finishedPacks } = values;

    if (!finishedPacks) return {};

    const unrequestedPacks = finishedPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      return !pendingPackKeys.includes(packKey);
    });

    const requestedPacks = finishedPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      return pendingPackKeys.includes(packKey);
    });
    const requestedPackKeys = requestedPacks.map(mapPackKey);

    const availablePacks = props.player.pendingPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      return !requestedPackKeys.includes(packKey);
    });

    return { unrequestedPacks, requestedPacks, availablePacks };
  }, [previousPlayer[1].finishedPacks, pendingPackKeys]);

  function crackBooster() {
    const newBooster = generateBoosterPack({
      cardData,
      expansionSlug: set,
    });
    props.setPlayerData({
      ...props.player,
      activePack: newBooster,
      packsOpened: (props.player.packsOpened ?? 0) + 1,
    });
  }

  function activatePendingPack() {
    const { pendingPacks } = props.player;
    const updatedPending = [...pendingPacks];
    const [pack] = updatedPending.splice(0, 1);

    props.setPlayerData({
      ...props.player,
      pendingPacks: updatedPending,
      activePack: pack,
    });
  }

  function takeAndPass() {
    const { activePack, finishedPacks, selectedIndex, selectedCards } =
      props.player;

    if (selectedIndex === undefined) return;

    const updatedPack = [...activePack];
    const updatedSelected = [...selectedCards];

    const [card] = updatedPack.splice(selectedIndex, 1);
    updatedSelected.push(card);

    props.setPlayerData({
      ...props.player,
      activePack: [],
      finishedPacks: [...finishedPacks, updatedPack],
      selectedCards: updatedSelected,
      selectedIndex: undefined,
    });
  }

  const [nextPack] = props.player.pendingPacks ?? [];

  useEffect(() => {
    if (!props.player.pendingPacks) return;
    const [, value] = previousPlayer;

    const myPendingPackKeys = props.player.pendingPacks.map(mapPackKey);
    const packsToRequest = value.finishedPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      return !myPendingPackKeys.includes(packKey);
    });

    if (packsToRequest.length === 0) return;

    props.setPlayerData({
      ...props.player,
      pendingPacks: [...props.player.pendingPacks, ...packsToRequest],
    });
  }, [previousPlayer[1].finishedPacks]);

  useEffect(() => {
    if (props.player.finishedPacks.length === 0) return;
    const [, value] = nextPlayer;
    const pendingPackKeys = value.pendingPacks.map(mapPackKey);
    const unrequestedPacks = props.player.finishedPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      return !pendingPackKeys.includes(packKey);
    });

    const unrequestedPackKeys = unrequestedPacks.map(mapPackKey);
    const isSame = props.player.finishedPacks.every((pack) => {
      const packKey = mapPackKey(pack);
      return unrequestedPackKeys.includes(packKey);
    });

    if (isSame) return;

    props.setPlayerData({
      ...props.player,
      finishedPacks: unrequestedPacks,
    });
  }, [nextPlayer[1].pendingPacks]);

  if (!availablePacks) return null;

  const packSize = props.player.activePack.length;
  const totalPicked = props.player.selectedCards.length;
  const hasActivePack = packSize > 0;
  const canFlip =
    availablePacks.length > 0 && !hasActivePack && (nextPack ?? []).length > 0;
  const canCrack =
    (nextPack ?? []).length === 0 && (unrequestedPacks ?? []).length === 0;
  const hasSelection = props.player.selectedIndex !== undefined;

  // Count sites vs non-sites in selected cards
  const siteCount = props.player.selectedCards.filter(
    (c) => c.guardian.type === "Site",
  ).length;
  const spellbookCount = totalPicked - siteCount;

  return (
    <>
      <SelectedCardsModal
        isOpen={disclosure.isOpen}
        onToggle={disclosure.toggle}
        cards={props.player.selectedCards}
      />

      <div
        className="flex items-center gap-4 px-4 py-2"
        style={{
          background: "linear-gradient(180deg, #292524 0%, #1C1917 100%)",
          borderBottom: "1px solid rgba(212,168,83,0.15)",
        }}
      >
        {/* Left: Pending packs / Flip */}
        <div className="flex items-center gap-2 min-w-0 shrink-0">
          {canFlip ? (
            <Button
              onClick={activatePendingPack}
              className="bg-[#D4A853] text-[#1C1917] hover:bg-[#E0BC6A] font-semibold gap-1.5 animate-pulse"
            >
              <GiSwapBag className="text-base" />
              <span>
                Open Passed Pack
                {availablePacks.length > 1 &&
                  ` (${availablePacks.length})`}
              </span>
            </Button>
          ) : availablePacks.length > 0 && hasActivePack ? (
            <div className="text-xs text-[#A8A29E] flex items-center gap-1.5">
              <GiSwapBag className="text-sm text-[#D4A853] opacity-50" />
              <span>
                {availablePacks.length} pack
                {availablePacks.length !== 1 ? "s" : ""} waiting
              </span>
            </div>
          ) : null}
        </div>

        {/* Center: Main action area */}
        <div className="flex items-center justify-center gap-3 flex-1 min-w-0">
          {!hasActivePack ? (
            <div className="flex items-center gap-2">
              <select
                value={set}
                onChange={(e) => setSet(e.target.value as Expansion)}
                className="bg-[#44403C] text-[#FAF7F0] border border-stone-600 rounded-md px-3 py-1.5 text-sm outline-none focus:border-[#D4A853] transition-colors cursor-pointer"
              >
                <option>Alpha</option>
                <option>Beta</option>
                <option>Arthurian Legends</option>
              </select>
              <Button
                disabled={!canCrack}
                onClick={crackBooster}
                className="bg-[#D4A853] text-[#1C1917] hover:bg-[#E0BC6A] font-semibold gap-1.5 disabled:opacity-30"
              >
                <GiCardPick className="text-base" />
                Crack Pack
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#A8A29E] tabular-nums">
                {packSize} card{packSize !== 1 ? "s" : ""} in pack
              </span>
              <Button
                disabled={!hasSelection || props.isAnimating}
                onClick={takeAndPass}
                className="bg-[#D4A853] text-[#1C1917] hover:bg-[#E0BC6A] font-semibold gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <GiCardDraw className="text-base" />
                {hasSelection ? "Take & Pass" : "Select a card"}
              </Button>
            </div>
          )}
        </div>

        {/* Right: Stats + View Selected */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Draft progress counters */}
          <div className="hidden sm:flex items-center gap-3 text-xs tabular-nums">
            <div className="flex flex-col items-center leading-tight">
              <span className="text-[#D4A853] font-semibold text-sm">
                {spellbookCount}
              </span>
              <span className="text-[#A8A29E] text-[10px] uppercase tracking-wider">
                Spellbook
              </span>
            </div>
            <div
              className="w-px h-6"
              style={{ background: "rgba(168,162,158,0.2)" }}
            />
            <div className="flex flex-col items-center leading-tight">
              <span className="text-[#D4A853] font-semibold text-sm">
                {siteCount}
              </span>
              <span className="text-[#A8A29E] text-[10px] uppercase tracking-wider">
                Atlas
              </span>
            </div>
            <div
              className="w-px h-6"
              style={{ background: "rgba(168,162,158,0.2)" }}
            />
            <div className="flex flex-col items-center leading-tight">
              <span className="text-[#D4A853] font-semibold text-sm">
                {props.player.packsOpened ?? 0}
              </span>
              <span className="text-[#A8A29E] text-[10px] uppercase tracking-wider">
                Packs
              </span>
            </div>
          </div>

          {totalPicked > 0 && (
            <Button
              onClick={disclosure.onOpen}
              variant="outline"
              className="border-[#D4A853]/40 text-[#D4A853] hover:bg-[#D4A853]/10 hover:text-[#E0BC6A] gap-1.5 text-sm"
            >
              <GiCardDraw className="text-base" />
              <span>
                Picks
                <span className="ml-1 text-xs opacity-70">({totalPicked})</span>
              </span>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
