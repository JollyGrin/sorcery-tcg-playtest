import { DraftBoard } from "@/components/organisms/Draft";
import { findAdjacentPlayers } from "@/components/organisms/Draft/helpers";
import {
  DraftPlayerData,
  initPlayers,
} from "@/components/organisms/Draft/types";
import { CardDTO } from "@/utils/api/cardData/CardDataType";
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
    return findAdjacentPlayers(players[name], players);
  }, [Object.values(players).map((player) => player.joinedSessionTimestamp)]);

  const player = useMemo(() => {
    const data: DraftPlayerData = { ...players[name] };

    // NOTE: the transfer is buggy
    // data.pendingPacks = previousPlayer[1].finishedPacks;
    const prevFinishedKeys = previousPlayer[1].finishedPacks.map(mapPackKey);
    const myPendingKeys = players[name].pendingPacks.map(mapPackKey);
    const myFinishedKeys = players[name].finishedPacks.map(mapPackKey);
    const [myActiveKey] = [players[name].activePack].map(mapPackKey);

    const pendingPacks = previousPlayer[1].finishedPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      const isNotInActive = packKey !== myActiveKey;
      return isNotInActive;
    });

    console.table({
      IMMU: prevFinishedKeys,
      myActiveKey: [myActiveKey],
      myFinishedKeys,
    });

    data.pendingPacks = pendingPacks;
    data.finishedPacks = nextPlayer[1].pendingPacks;

    return data;
  }, [players, name]);

  return (
    <DraftBoard
      players={players}
      player={player} // displays combined pending/finished
      hiddenPlayer={players[name]} // values of your own state pre-combine
      setPlayerData={setPlayer}
    />
  );
}

function mapCardKey(card: CardDTO) {
  return card.slug.slice(0, 2);
}
function mapPackKey(pack: CardDTO[]) {
  return pack.map(mapCardKey).join("");
}
