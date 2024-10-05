import { DraftBoard } from "@/components/organisms/Draft";
import {
  DraftPlayerData,
  initPlayers,
} from "@/components/organisms/Draft/types";
import { useState } from "react";

export default function DraftSoloPage() {
  const [players, setPlayers] =
    useState<Record<string, DraftPlayerData>>(initPlayers);

  function setPlayer(data: DraftPlayerData) {
    return setPlayers((prev) => ({
      ...prev,
      p1: {
        ...data,
      },
    }));
  }

  return (
    <DraftBoard
      players={players}
      player={players?.p1}
      setPlayerData={setPlayer}
    />
  );
}
