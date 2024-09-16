import { CreateLobby } from "@/components/organisms/Online/CreateLobby";
import { WebGameProvider, useWebGame } from "@/lib/contexts/WebGameProvider";
import { useRouter } from "next/router";

export default function OnlinePage() {
  const { query } = useRouter();
  const { name, gid } = query;

  if (!name || !gid) return <CreateLobby />;

  return (
    <WebGameProvider>
      <Online />
    </WebGameProvider>
  );
}

const Online = () => {
  const { gameState, setPlayerState } = useWebGame();
  return <p>{JSON.stringify(gameState)}</p>;
};
