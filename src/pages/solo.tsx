import { LoadDeck } from "@/components/molecules/LoadDeck";
import { GameBoard } from "@/components/organisms/GameBoard";
import {
  GRIDS,
  initGameData,
  initGameState,
} from "@/components/organisms/GameBoard/constants";
import { useDeckQuery } from "@/components/organisms/SoloPage/useDeckQuery";
import { GameState, PlayersState } from "@/types/card";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export default function GamePage() {
  const { query } = useRouter();
  const name = (query?.name as string | undefined) ?? "p1";

  const [players, setPlayers] = useState<PlayersState>({
    p1: { state: initGameState, data: initGameData },
    p2: { state: initGameState, data: initGameData },
    GLOBAL: { state: initGameState, data: initGameData },
  });

  function setPlayerState(playerName: keyof typeof players) {
    return (state: GameState) => {
      const newState = [...state]; // make a copy of state
      const GLOBAL = newState.slice(0, GRIDS.AURA_12 + 1); // GLOBAL takes game grid
      const GLOBAL_EMPTY = Array.from({ length: 4 }, () => []); // empties player data
      const newGlobal = [...GLOBAL, ...GLOBAL_EMPTY];
      setPlayers((prev) => ({
        ...prev,
        GLOBAL: { state: newGlobal, data: initGameData },
        [playerName]: { state, data: prev[playerName].data },
      }));
    };
  }

  function setPlayerData(playerName: keyof typeof players) {
    return (data: PlayersState["GLOBAL"]["data"]) => {
      setPlayers((prev) => ({
        ...prev,
        [playerName]: { state: prev[playerName].state, data },
      }));
    };
  }

  /**
   * Query the URL bar to get the decks and load them
   * */
  useDeckQuery({
    p1: {
      gridItems: players?.["p1"].state,
      setGridItems: setPlayerState("p1"),
    },
    p2: {
      gridItems: players?.["p2"].state,
      setGridItems: setPlayerState("p2"),
    },
  });

  const state = useMemo(() => {
    return [
      ...players.GLOBAL.state.slice(0, GRIDS.HAND),
      ...players[name as keyof typeof players].state.slice(GRIDS.HAND),
    ];
  }, [players, name]);

  if (needsDeck(players["p1"].state))
    return (
      <div>
        <LoadDeck
          gridItems={players["p1"].state}
          setGridItems={setPlayerState("p1")}
          playerName="p1"
        >
          <p>Load deck for player 1</p>
        </LoadDeck>
      </div>
    );

  if (needsDeck(players["p2"].state))
    return (
      <div>
        <LoadDeck
          gridItems={players["p2"].state}
          setGridItems={setPlayerState("p2")}
          playerName="p2"
        >
          <p>Load deck for player 2</p>
        </LoadDeck>
      </div>
    );

  return (
    <GameBoard
      gridItems={state}
      setGridItems={setPlayerState(name)}
      players={players}
      setMyData={setPlayerData(name)}
    />
  );
}

function needsDeck(state: GameState) {
  return (
    state[GRIDS.DECK].length === 0 &&
    state[GRIDS.HAND].length === 0 &&
    state[GRIDS.GRAVE].length === 0
  );
}
