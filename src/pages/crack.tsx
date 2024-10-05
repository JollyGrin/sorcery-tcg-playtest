import { CrackBoard } from "@/components/organisms/Crack";
import { DraftPlayerData } from "@/components/organisms/Draft/types";
import { useState } from "react";

export default function CrackPacksPage() {
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

  return <CrackBoard player={players?.p1} setPlayerData={setPlayer} />;
}
