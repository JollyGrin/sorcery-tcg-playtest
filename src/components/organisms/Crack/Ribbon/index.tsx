import { Button } from "@/components/ui/button";
import { useCardFullData } from "@/utils/api/cardData/useCardData";
import { DraftProps } from "@/components/organisms/Draft/types";
import {
  Expansion,
  generateBoosterPack,
} from "@/components/organisms/Draft/helpers";
import { useState } from "react";
import { GiCardPick } from "react-icons/gi";

export const Ribbon = (
  props: DraftProps & {
    activeViewIndex: number;
    setActiveView(index: number): void;
  },
) => {
  const { data: cardData = [] } = useCardFullData();
  const [set, setSet] = useState<Expansion>("Beta");

  function crackBooster() {
    const newBooster = generateBoosterPack({
      cardData,
      expansionSlug: set,
    });
    const { finishedPacks } = props.player;
    const isEmpty = finishedPacks.length === 0;
    props.setPlayerData({
      ...props.player,
      finishedPacks: isEmpty ? [newBooster] : [...finishedPacks, newBooster],
    });
    props.setActiveView(props.player.finishedPacks.length);
  }

  const packCount = props.player?.finishedPacks?.length ?? 0;

  return (
    <div
      className="flex items-center gap-4 px-4 py-2"
      style={{
        background: "linear-gradient(180deg, #292524 0%, #1C1917 100%)",
        borderBottom: "1px solid rgba(212,168,83,0.15)",
      }}
    >
      {/* Crack controls */}
      <div className="flex items-center gap-2 shrink-0">
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
          onClick={crackBooster}
          className="bg-[#D4A853] text-[#1C1917] hover:bg-[#E0BC6A] font-semibold gap-1.5"
        >
          <GiCardPick className="text-base" />
          Crack Pack
        </Button>
      </div>

      {/* Pack pills */}
      {packCount > 0 && (
        <div className="flex items-center gap-1 overflow-x-auto min-w-0 py-1">
          {props.player.finishedPacks.map((_, index) => {
            const isActive = index === props.activeViewIndex;
            return (
              <button
                key={`pack-${index}`}
                onClick={() => props.setActiveView(index)}
                className="shrink-0 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-150 cursor-pointer"
                style={{
                  background: isActive
                    ? "rgba(212,168,83,0.2)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid rgba(212,168,83,0.5)"
                    : "1px solid rgba(255,255,255,0.06)",
                  color: isActive ? "#D4A853" : "#A8A29E",
                }}
              >
                Pack {index + 1}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
