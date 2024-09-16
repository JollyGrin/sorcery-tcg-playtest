import { useWebGame, WebGameProvider } from "@/lib/contexts/WebGameProvider";
import { useCreateLobby } from "@/lib/hooks";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { button, input } from "styled-system/recipes";

export default function OnlinePage() {
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
    refetch();
  }
  return (
    <>
      <input
        ref={nameRef}
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
    </>
  );
};

const Body = () => {
  const { gameState, setPlayerState } = useWebGame();
  console.log({ gameState });
  return (
    <>
      <input
        onChange={(e) => setPlayerState()({ pool: e.target.value })}
        className={input()}
      />
    </>
  );
};
