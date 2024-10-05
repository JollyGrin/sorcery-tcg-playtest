import { DraftBoard } from "@/components/organisms/Draft";
import { generateBoosterPack } from "@/components/organisms/Draft/helpers";
import { DraftPlayerData } from "@/components/organisms/Draft/types";
import { useEffect, useState } from "react";

export default function DraftPage() {
  const [players, setPlayers] = useState<Record<string, DraftPlayerData>>({
    p1: {
      joinedSessionTimestamp: 1,
      selectedCards: [],
      activePack: [],
      pendingPacks: [[]],
      finishedPacks: [],
    },
  });

  function setPlayer(data: DraftPlayerData) {
    return setPlayers((prev) => ({
      ...prev,
      p1: {
        ...data,
      },
    }));
  }

  return <DraftBoard player={players?.p1} setPlayerData={setPlayer} />;
}
