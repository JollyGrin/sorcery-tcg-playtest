import { CrackBoard } from "@/components/organisms/Crack";
import { DraftPlayerData } from "@/components/organisms/Draft/types";
import { useState } from "react";
import { AppNav } from "@/components/molecules/AppNav";

export default function CrackPacksPage() {
  const [players, setPlayers] = useState<Record<string, DraftPlayerData>>({
    p1: {
      joinedSessionTimestamp: 1,
      selectedCards: [],
      activePack: [],
      pendingPacks: [[]],
      finishedPacks: [],
      packsOpened: 0,
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

  return (
    <div>
      <AppNav />
      <CrackBoard player={players?.p1} setPlayerData={setPlayer} />
    </div>
  );
}
