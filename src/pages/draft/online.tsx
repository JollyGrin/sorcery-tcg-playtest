import {
  DraftPlayerData,
  initPlayer,
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
import { FullPageLoader } from "@/components/atoms/LoadingSpinner";

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
  if (isDelayed) return <FullPageLoader />;

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

  function setState(data: DraftPlayerData) {
    setPlayerState()(data ?? initPlayer);
  }

  const state = useMemo(() => {
    const myState = socketPlayers?.[name ?? ""];
    return myState;
  }, [gameState]);

  if (state === undefined) return null;
  if (state.joinedSessionTimestamp === undefined)
    return (
      <div className="grid min-w-[99vw] min-h-[99vh] place-items-center text-[2rem]">
        <div className="flex flex-col">
          <Button
            className="p-8"
            onClick={() => {
              setPlayerState()({
                ...initPlayer,
                joinedSessionTimestamp: Date.now(),
              });
            }}
          >
            Initiate
          </Button>
          <p>The board is ready! Click the button to get started!</p>
        </div>
      </div>
    );

  const initPlayers = Object.entries(socketPlayers).filter((entry) => {
    const [, value] = entry;
    return !value.joinedSessionTimestamp;
  });

  if (initPlayers.length > 0) return <FullPageLoader message="Waiting for player..." />;

  return (
    <DraftBoard
      players={socketPlayers as Record<string, DraftPlayerData>}
      player={state} // displays combined pending/finished
      setPlayerData={setState}
    />
  );
};
