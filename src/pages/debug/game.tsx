import {
  GRIDS,
  initGameData,
  initGameState,
} from "@/components/organisms/GameBoard/constants";
import { useWebGame, WebGameProvider } from "@/lib/contexts/WebGameProvider";
import { useCreateLobby } from "@/lib/hooks";
import { GameCard, GameState } from "@/types/card";
import { actDrawDeck } from "@/utils/actions";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
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

const cards: GameCard[] = Array.from({ length: 20 }).map((_, index) => ({
  id: index + ":card",
  img: index + ".png",
  type: "magic",
}));

const Body = () => {
  const { query } = useRouter();
  const name = query.name as string | undefined;
  const { gameState, setPlayerState } = useWebGame();
  const myState = gameState?.content?.players?.[name ?? ""];
  console.log({ gameState });

  function setState(state: GameState) {
    setPlayerState()({ state, data: initGameData });
  }

  return (
    <Box maxW="500px" m="5rem auto">
      {myState?.state?.[GRIDS.DECK]?.length === 0 && (
        <button
          className={button()}
          onClick={() => {
            const newState = [...myState?.state];
            newState[GRIDS.DECK] = cards;
            setState(newState);
          }}
        >
          init
        </button>
      )}
      <button
        className={button()}
        onClick={() => {
          const newState = [...(myState?.state ?? [])];
          const newerState = actDrawDeck(newState);
          setState(newerState);
        }}
      >
        draw
      </button>
      <p>gamestate</p>
      <p>{JSON.stringify(myState)}</p>
    </Box>
  );
};
