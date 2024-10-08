import { DraftBoard } from "@/components/organisms/Draft";
import {
  DraftPlayerData,
  initPlayers,
} from "@/components/organisms/Draft/types";
import { useRouter } from "next/router";
import { useState } from "react";

export default function DraftSoloPage() {
  const { query } = useRouter();
  const name = (query?.name as string) ?? ("p1" as string);

  const [players, setPlayers] =
    useState<Record<string, DraftPlayerData>>(initPlayers);

  function setPlayer(data: DraftPlayerData) {
    return setPlayers((prev) => ({
      ...prev,
      [name]: {
        ...data,
      },
    }));
  }

  return (
    <DraftBoard
      players={players}
      player={players?.[name]} // displays combined pending/finished
      setPlayerData={setPlayer}
    />
  );
}
