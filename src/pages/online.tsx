/**
 * ALMOST DONE
 * TODO: add a way to ensure the 2nd player rotates their screen
 * */

import { LoadDeck } from "@/components/molecules/LoadDeck";
import { GameBoard } from "@/components/organisms/GameBoard";
import {
  GRIDS,
  initGameData,
  initGameState,
} from "@/components/organisms/GameBoard/constants";
import { useWebGame, WebGameProvider } from "@/lib/contexts/WebGameProvider";
import { useCreateLobby } from "@/lib/hooks";
import { GameState, PlayerData, PlayersState, PlayerState } from "@/types/card";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { Box } from "styled-system/jsx";
import { button, input } from "styled-system/recipes";
import ErrorBoundary from "@/utils/helpers/ErrorBoundary";

export default function WebsocketDebug() {
  const { query } = useRouter();
  const { name, gid } = query;
  if (!name || !gid) return <CreateLobby />;

  return (
    <WebGameProvider>
      <ErrorBoundary>
        <Body />
      </ErrorBoundary>
    </WebGameProvider>
  );
}

const CreateLobby = () => {
  const { push } = useRouter();
  const [fields, setFields] = useState({ name: "", gid: "" });
  const gidRef = useRef(null);
  const nameRef = useRef(null);
  const { refetch } = useCreateLobby({
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
  const name = query?.name as string | undefined;
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

  const socketPlayers =
    gameState?.content?.players ?? ({} as Record<string, PlayerState>);

  const [firstJoiner] =
    Object.entries(socketPlayers ?? {})?.sort((a, b) => {
      const [, valueA] = a;
      const [, valueB] = b;
      const timeA = valueA.joinTimestamp ?? 0;
      const timeB = valueB.joinTimestamp ?? 0;
      return timeA - timeB;
    }) ?? [];
  const [firstName] = firstJoiner;
  const isReversed = name !== firstName;

  function combineGameStates(): GameState {
    const playersState = socketPlayers ?? {};
    const [mostRecentState] =
      Object.values(playersState).sort(
        (a, b) => (b.timestamp ?? 0) - (a.timestamp ?? 0),
      ) ?? [];
    return mostRecentState?.state?.slice(0, 32) ?? [];
  }

  const state = useMemo(() => {
    const localState = myState?.state ?? initGameState;
    return [...combineGameStates(), ...localState.slice(GRIDS.HAND)];
  }, [socketPlayers]);

  if (myState?.state === undefined && name) {
    return (
      <LoadDeck
        playerName={name}
        gridItems={myState?.state ?? initGameState}
        setGridItems={(state: GameState) => {
          setPlayerState()({
            state,
            data: myState?.data ?? initGameData,
            timestamp: Date.now(),
            joinTimestamp: Date.now(),
          });
        }}
      >
        pick one
      </LoadDeck>
    );
  }

  if (myState?.state === undefined) return null;

  return (
    <GameBoard
      isReversed={isReversed}
      players={socketPlayers as PlayersState}
      gridItems={state}
      setGridItems={setState}
      setMyData={setData}
    />
  );
};
