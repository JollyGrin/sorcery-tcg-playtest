import { DraftBoard } from "@/components/organisms/Draft";
import { findAdjacentPlayers } from "@/components/organisms/Draft/helpers";
import {
  DraftPlayerData,
  initPlayers,
} from "@/components/organisms/Draft/types";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

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

  const { previousPlayer, nextPlayer } = useMemo(() => {
    return findAdjacentPlayers(players.p1, players);
  }, [Object.values(players).map((player) => player.joinedSessionTimestamp)]);

  const player = useMemo(() => {
    const data: DraftPlayerData = { ...players[name] };
    data.pendingPacks = previousPlayer[1].finishedPacks;
    data.finishedPacks = nextPlayer[1].pendingPacks;
    return data;
  }, [players, name]);

  return (
    <DraftBoard players={players} player={player} setPlayerData={setPlayer} />
  );
}
