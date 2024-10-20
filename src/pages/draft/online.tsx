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
import { Grid, VStack } from "styled-system/jsx";

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
  if (isDelayed)
    return (
      <Grid minH="99vh" minW="99vw" placeItems="center" fontSize="3rem">
        <p>loading...</p>
      </Grid>
    );

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
      <Grid minW="99vw" minH="99vh" placeItems="center" fontSize="2rem">
        <VStack>
          <Button
            p="2rem"
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
        </VStack>
      </Grid>
    );

  const initPlayers = Object.entries(socketPlayers).filter((entry) => {
    const [, value] = entry;
    return !value.joinedSessionTimestamp;
  });

  if (initPlayers.length > 0)
    return (
      <Grid minH="99vh" minW="99vw" placeItems="center" fontSize="3rem">
        <p>loading new player...</p>
      </Grid>
    );

  return (
    <DraftBoard
      players={socketPlayers as Record<string, DraftPlayerData>}
      player={state} // displays combined pending/finished
      setPlayerData={setState}
    />
  );
};
