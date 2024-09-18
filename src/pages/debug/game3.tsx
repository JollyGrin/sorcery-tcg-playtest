import { LoadDeck } from "@/components/molecules/LoadDeck";
import { GameBoard } from "@/components/organisms/GameBoard";
import {
  GRIDS,
  initGameData,
  initGameState,
} from "@/components/organisms/GameBoard/constants";
import { useWebGame, WebGameProvider } from "@/lib/contexts/WebGameProvider";
import { useCreateLobby } from "@/lib/hooks";
import {
  GameCard,
  GameState,
  PlayerData,
  PlayersState,
  PlayerState,
} from "@/types/card";
import { debugState } from "@/utils/helpers/debugState";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { Box } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";

export default function WebsocketDebug() {
  const { query } = useRouter();
  const { name, gid } = query;
  if (!name || !gid) return <CreateLobby />;

  return (
    <WebGameProvider>
      <Body />
    </WebGameProvider>
  );
}

const CreateLobby = () => {
  const { push, query } = useRouter();
  const [fields, setFields] = useState({ name: "", gid: "" });
  const gidRef = useRef(null);
  const nameRef = useRef(null);
  const { refetch, loading, setLoading, disclosure } = useCreateLobby({
    gidRef,
    nameRef,
  });
  function onSubmit() {
    push({ query: { ...fields } });
    refetch(undefined);
  }
  return (
    <Box maxW="500px" m="0 auto" mt="10rem">
      <input
        ref={nameRef}
        placeholder="name"
        onChange={(e) =>
          setFields((prev) => ({
            ...prev,
            name: e.target.value,
          }))
        }
        className={input()}
      />

      <input
        ref={gidRef}
        placeholder="gid"
        onChange={(e) =>
          setFields((prev) => ({
            ...prev,
            gid: e.target.value,
          }))
        }
        className={input()}
      />
      <button className={button()} onClick={onSubmit}>
        submit
      </button>
    </Box>
  );
};

const Body = () => {
  const { query } = useRouter();
  const name = query.name as string | undefined;
  const { gameState, setPlayerState } = useWebGame();
  const myState = gameState?.content?.players?.[name ?? ""];

  function setState(state: GameState) {
    setPlayerState()({
      state,
      data: myState?.data ?? initGameData,
      timestamp: Date.now(),
    });
  }

  function setData(data: PlayerData) {
    setPlayerState()({
      state: myState?.state ?? initGameState,
      data,
      timestamp: Date.now(),
    });
  }

  const noState = Object.keys(myState ?? {}).length === 0;
  const isEmpty = noState || myState?.state?.[GRIDS.DECK]?.length === 0;

  if (myState?.state === undefined && name) {
    return (
      <LoadDeck
        playerName={name}
        gridItems={myState?.state ?? initGameState}
        setGridItems={setState}
      >
        pick one
      </LoadDeck>
    );
  }

  if (myState?.state === undefined) return null;

  const socketPlayers = gameState?.content?.players as Record<
    string,
    PlayerState
  >;

  function combineGameStates(): GameState {
    const playersState = socketPlayers;
    // Create an empty array to hold the combined state for the first 32 slots.
    const combinedState: GameState = Array.from({ length: 32 }, () => []);

    if (!playersState) return combinedState;
    const [mostRecentState] = Object.values(playersState).sort(
      (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0),
    );
    console.log({ mostRecentState });
    return mostRecentState?.state?.slice(0, 32);
  }

  const state = useMemo(() => {
    const localState = myState?.state ?? initGameState;
    return [...combineGameStates(), ...localState.slice(GRIDS.HAND)];
  }, [socketPlayers]);

  return (
    <GameBoard
      players={socketPlayers as PlayersState}
      gridItems={state}
      setGridItems={setState}
      setMyData={setData}
    />
  );
};
