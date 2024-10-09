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
import { Button } from "@/components/ui/button";

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

  const socketPlayers =
    gameState?.content?.players ?? ({} as Record<string, DraftPlayerData>);

  // const [firstJoiner] =
  //   Object.entries(socketPlayers ?? {})?.sort((a, b) => {
  //     const [, valueA] = a;
  //     const [, valueB] = b;
  //     const timeA = valueA.joinedSessionTimestamp ?? 0;
  //     const timeB = valueB.joinedSessionTimestamp ?? 0;
  //     return timeA - timeB;
  //   }) ?? [];
  // const [firstName] = firstJoiner ?? "";

  function setState(data: DraftPlayerData) {
    console.log("SETTING STATE", state);
    setPlayerState()(data ?? initPlayer);
  }

  const state = useMemo(() => {
    const myState = socketPlayers?.[name ?? ""];
    return myState;
  }, [gameState]);

  if (state === undefined) return null;
  if (state.joinedSessionTimestamp === undefined)
    return (
      <div>
        <Button
          onClick={() => {
            setPlayerState()({
              ...initPlayer,
              joinedSessionTimestamp: Date.now(),
            });
          }}
        >
          Init
        </Button>
      </div>
    );

  return (
    <DraftBoard
      players={socketPlayers as Record<string, DraftPlayerData>}
      player={state} // displays combined pending/finished
      setPlayerData={setState}
    />
  );
};
