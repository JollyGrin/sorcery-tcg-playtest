import { DraftBoard } from "@/components/organisms/Draft";
import { CardDTO } from "@/utils/api/cardData/CardDataType";
import { useCardFullData } from "@/utils/api/cardData/useCardData";
import { useState } from "react";

type BoosterPack = {
  uuid: string;
  playerName: string;
  cards: CardDTO[];
};
type DraftPlayerData = {
  selectedCards: CardDTO[];
  activePack: CardDTO[];
  finishedPacks: CardDTO[][];
};

export default function DraftPage() {
  const [players, setPlayers] = useState<Record<string, DraftPlayerData>>({
    p1: {
      selectedCards: [],
      activePack: [],
      finishedPacks: [[], [], []],
    },
  });

  const { data: cardData = [] } = useCardFullData();
  function generateNewBooster() {
    const arr = [...cardData];
    const count = 15;
    let shuffled = arr.slice(); // Shallow copy to avoid mutating the original array
    for (let i = arr.length - 1; i > arr.length - 1 - count; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled.slice(-count); // Return the last `count` items
  }

  function setPlayer(data: (typeof players)[number]) {
    return setPlayers((prev) => ({
      ...prev,
      p1: {
        ...prev["p1"],
        data,
      },
    }));
  }

  return <DraftBoard />;
}
