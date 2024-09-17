import { GameBoard } from "@/components/organisms/GameBoard";
import {
  GRIDS,
  initGameData,
  initGameState,
} from "@/components/organisms/GameBoard/constants";
import { CreateLobby } from "@/components/organisms/Online/CreateLobby";
import { WebGameProvider, useWebGame } from "@/lib/contexts/WebGameProvider";
import { GameState, PlayerState, PlayersState } from "@/types/card";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { button, input } from "styled-system/recipes";

export default function OnlinePage() {
  const { query } = useRouter();
  const { name, gid } = query;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  if (!name || !gid) return <CreateLobby />;
  if (isLoading) return "fake timeout";

  return (
    <WebGameProvider>
      {/* {name && ( */}
      {/*   <Init name={name as string}> */}
      {/*     ds */}
      {/*     <Online name={name as string} /> */}
      {/*   </Init> */}
      {/* )} */}

      {name && <Online name={name as string} />}
    </WebGameProvider>
  );
}

const Init = (props: { name: string; children: ReactNode }) => {
  const { gameState: socketState, setPlayerState: setMySocketState } =
    useWebGame();

  console.log({ socketState });

  const socketPlayers = socketState?.content?.players as Record<
    string,
    PlayerState
  >;
  const mySocketState = socketPlayers?.[props.name] as PlayerState;

  if (mySocketState?.data === undefined || mySocketState?.state === undefined)
    return (
      <button
        className={button()}
        onClick={() => {
          const setState = setMySocketState();
          console.log({ setState });
          setState({ data: initGameData, state: initGameState });
        }}
      >
        Init Data
      </button>
    );

  return props.children;
};

const Online = (props: { name: string }) => {
  const { gameState: socketState, setPlayerState: setMySocketState } =
    useWebGame();

  const socketPlayers = socketState?.content?.players as Record<
    string,
    PlayerState
  >;
  const mySocketState = socketPlayers?.[props.name] as PlayerState;

  function setPlayerState(state: GameState) {
    setMySocketState()({ state, data: mySocketState.data });
  }

  function setPlayerData(data: PlayerState["data"]) {
    setMySocketState()({ state: mySocketState.state, data });
  }

  useEffect(() => {
    if (
      mySocketState?.state === undefined ||
      mySocketState?.data === undefined
    ) {
      const setState = setMySocketState();
      console.log({ setState }, "1");
      if (!setState) return;
      console.log({ setState }, "2");
      const newState = { data: initGameData, state: initGameState };
      console.log({ newState }, "3");
      setState(newState);
    }
  }, []);

  /**
   * Combines the game state arrays (1-32) from all players into one merged state.
   * The last updated player's state takes priority.
   */
  function combineGameStates(): GameState {
    const playersState = socketPlayers;
    // Create an empty array to hold the combined state for the first 32 slots.
    const combinedState: GameState = Array.from({ length: 32 }, () => []);

    if (!playersState) return combinedState;

    // Iterate over each player, merging their state into the combined state.
    Object.values(playersState).forEach((playerState) => {
      const localState = playerState?.state ?? combinedState;
      localState.slice(0, 32).forEach((cards, index) => {
        combinedState[index] = cards; // Overwrite earlier player's state
      });
    });

    return combinedState;
  }

  const state = useMemo(() => {
    const localState = mySocketState?.state ?? initGameState;
    return [...combineGameStates(), ...localState.slice(GRIDS.HAND)];
  }, [socketPlayers]);

  console.log({ mySocketState });
  if (mySocketState?.data === undefined || mySocketState?.state === undefined)
    return "loading state";

  return (
    <>
      <GameBoard
        players={socketPlayers as PlayersState}
        gridItems={state}
        setGridItems={setPlayerState}
        setMyData={setPlayerData}
      />
    </>
  );
};
