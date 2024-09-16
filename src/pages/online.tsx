import { CreateLobby } from "@/components/organisms/Online/CreateLobby";
import { useWebGame, WebGameProvider } from "@/lib/contexts/WebGameProvider";
import { useRouter } from "next/router";
import { input } from "styled-system/recipes";

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

const Body = () => {
  const { gameState, setPlayerState } = useWebGame();
  console.log({ gameState });
  return (
    <>
      <input
        onChange={(e) => setPlayerState()({ pool: e.target.value })}
        className={input()}
      />
      <p>gamestate</p>
      <p>{JSON.stringify(gameState)}</p>
    </>
  );
};
