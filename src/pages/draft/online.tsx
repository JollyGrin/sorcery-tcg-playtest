
import {
  DraftPlayerData,
  initPlayer,
  initPlayers,
} from "@/components/organisms/Draft/types";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

import ErrorBoundary from "@/utils/helpers/ErrorBoundary";
import { CreateLobby } from "@/components/organisms/Online/CreateLobby";
import {
  DraftGameProvider,
  useDraftGame,
} from "@/lib/contexts/DraftGameProvider";
import { DraftBoard } from "@/components/organisms/Draft";

export default function WebsocketDebug() {
  const { query } = useRouter();
  const { name, gid } = query;

  const [isDelayed, setIsDelayed] = useState(true);

  useEffect(() => {
    if (name && gid) {
      setTimeout(() => {
        setIsDelayed(false);
      }, 1000);
    }
  }, [name, gid]);

  if (!name || !gid) return <CreateLobby />;
  if (isDelayed) return "loading";

  return (
    <DraftGameProvider>
      <ErrorBoundary>
        <Body />
      </ErrorBoundary>
    </DraftGameProvider>
  );
}

const Body = () => {
  const { query } = useRouter();
  const name = query?.name as string | undefined;
  const { draftState: gameState, setPlayerState } = useDraftGame();
  const myState = gameState?.content?.players?.[name ?? ""];

  function setState(state: DraftPlayerData) {
    setPlayerState()(state);
  }

  const socketPlayers =
    gameState?.content?.players ?? ({} as Record<string, DraftPlayerData>);

  const [firstJoiner] =
    Object.entries(socketPlayers ?? {})?.sort((a, b) => {
      const [, valueA] = a;
      const [, valueB] = b;
      const timeA = valueA.joinTimestamp ?? 0;
      const timeB = valueB.joinTimestamp ?? 0;
      return timeA - timeB;
    }) ?? [];
  const [firstName] = firstJoiner ?? "";


  function setData(data: DraftPlayerData) {
    setPlayerState()(data ?? initPlayer);
  }

  const state: DraftPlayerData = useMemo(() => {
    return myState as DraftPlayerData

  },[])

  // if (myState?.state === undefined && name) {
  //   return (
  //     <LoadDeck
  //       playerName={name}
  //       gridItems={myState?.state ?? initGameState}
  //       setGridItems={(state: GameState) => {
  //         setPlayerState()({
  //           state,
  //           data: myState?.data ?? initGameData,
  //           joinTimestamp: Date.now(),
  //         });
  //       }}
  //     >
  //       pick one
  //     </LoadDeck>
  //   );
  // }

  if (myState?.state === undefined) return null;

  return (
    <DraftBoard
      players={socketPlayers as Record<string,DraftPlayerData>}
      player={( socketPlayers[name] as DraftPlayerData ) ?? initPlayer} // displays combined pending/finished
      setPlayerData={setState}
  );
};
