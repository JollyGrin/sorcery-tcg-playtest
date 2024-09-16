import { Online } from "@/components/organisms/Online";
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
      <Online />
    </WebGameProvider>
  );
}
