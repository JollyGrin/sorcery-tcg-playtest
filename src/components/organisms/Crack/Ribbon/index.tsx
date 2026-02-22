import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/atoms/Tabs";

import { useCardFullData } from "@/utils/api/cardData/useCardData";
import { DraftProps } from "@/components/organisms/Draft/types";
import {
  Expansion,
  generateBoosterPack,
} from "@/components/organisms/Draft/helpers";
import { useState } from "react";

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

  const packTabs =
    props.player?.finishedPacks?.length > 0
      ? props.player?.finishedPacks?.map((_, index) => `Pack ${index + 1}`)
      : [];

  return (
    <div className="p-4 bg-[brown]">
      <div className="grid" style={{ gridTemplateColumns: "1fr 7fr" }}>
        <div className="flex items-center">
          <select onChange={(e) => setSet(e.target.value as Expansion)}>
            <option>Alpha</option>
            <option>Beta</option>
            <option>Arthurian Legends</option>
          </select>
          <Button className="min-w-[9rem]" onClick={crackBooster}>
            Crack a Pack
          </Button>
        </div>
        <div className="flex items-center max-w-[70vw] overflow-x-auto overflow-y-clip">
          {props.player.finishedPacks.length > 0 && (
            <Tabs
              tabs={packTabs}
              onSelect={props.setActiveView}
              selectedIndex={props.activeViewIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};
