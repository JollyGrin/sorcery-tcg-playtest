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

  const { nextPlayer } = useMemo(() => {
    return findAdjacentPlayers(players[name], players);
  }, [Object.values(players).map((player) => player.joinedSessionTimestamp)]);

  function takeAndPass() {
    const me = players?.[name];
    if (me.selectedIndex === undefined) return;

    const updatedPack = [...me.activePack];
    const [selectedCard] = updatedPack.splice(me.selectedIndex, 1);
    const newSelectedCards = [...me.selectedCards, selectedCard];

    const [nextPlayerName, nextPlayerData] = nextPlayer;
    // const [previousPlayerName, previousPlayerData] = previousPlayer;

    setPlayers({
      ...players,
      [name]: {
        ...me,
        activePack: [],
        selectedIndex: undefined,
        selectedCards: newSelectedCards,
      },
      [nextPlayerName]: {
        ...nextPlayerData,
        pendingPacks: [...nextPlayerData.pendingPacks, updatedPack],
      },
    });
  }

  return (
    <DraftBoard
      players={players}
      player={players?.[name]} // displays combined pending/finished
      setPlayerData={setPlayer}
      takeAndPass={takeAndPass}
    />
  );
}
