import { LoadDeck } from "@/components/molecules/LoadDeck";
import { GameBoard } from "@/components/organisms/GameBoard";
import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { GameCard, GameState, PlayersState } from "@/types/card";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const initGameState: GameCard[][] = Array.from({ length: 36 }, () => []);

export default function GamePage() {
  const { query } = useRouter();
  const name = (query?.name as string | undefined) ?? "p1";

  // const [gridItems, setGridItems] = useState<GameState>(initGameState);
  const [players, setPlayers] = useState<PlayersState>({
    p1: initGameState,
    p2: initGameState,
    GLOBAL: initGameState,
  });

  function setPlayer(playerName: keyof typeof players) {
    return (state: GameState) => {
      const newState = [...state]; // make a copy of state
      const GLOBAL = newState.slice(0, GRIDS.AURA_12 + 1); // GLOBAL takes game grid
      const GLOBAL_EMPTY = Array.from({ length: 4 }, () => []); // empties player data
      const newGlobal = [...GLOBAL, ...GLOBAL_EMPTY];
      setPlayers((prev) => ({
        ...prev,
        GLOBAL: newGlobal,
        [playerName]: state,
      }));
    };
  }

  const state = useMemo(() => {
    return [
      ...players.GLOBAL.slice(0, GRIDS.HAND),
      ...players[name as keyof typeof players].slice(GRIDS.HAND),
    ];
  }, [players, name]);

  if (needsDeck(players["p1"]))
    return (
      <div>
        <p>Load deck for player 1</p>
        <LoadDeck gridItems={players["p1"]} setGridItems={setPlayer("p1")} />
      </div>
    );

  if (needsDeck(players["p2"]))
    return (
      <div>
        <p>Load deck for player 2</p>
        <LoadDeck gridItems={players["p2"]} setGridItems={setPlayer("p2")} />
      </div>
    );

  return <GameBoard gridItems={state} setGridItems={setPlayer(name)} />;
}

function needsDeck(state: GameState) {
  return (
    state[GRIDS.DECK].length === 0 &&
    state[GRIDS.HAND].length === 0 &&
    state[GRIDS.GRAVE].length === 0
  );
}
