import {
  useEffect,
  useState,
  createContext,
  PropsWithChildren,
  FC,
  useContext,
} from "react";
import { DraftWebsocketMessage as WebsocketMessage } from "../gamesocket/message";
import { initializeDraftWebsocket as initializeWebsocket } from "../gamesocket/draft-socket";
import { useRouter } from "next/router";
import type { DraftPlayerData as PlayerState } from "@/components/organisms/Draft/types";
type PlayersState = Record<string, PlayerState>;

const useLocalServerStorage = () => {
  const defaultServer = "https://unbrewed-v2.fly.dev";
  return { activeServer: defaultServer };
};

interface DraftGameProviderValue {
  draftState: WebsocketMessage | undefined;
  setPlayerState: () => (state: PlayersState[string]) => void;
}

export const DraftGameContext = createContext<
  DraftGameProviderValue | undefined
>(undefined);

export const DraftGameProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const slug = router.query;

  const { activeServer } = useLocalServerStorage();

  // draftState is updated from the websocket return.
  const [draftState, setGameState] = useState<string>();

  const [setPlayerState, setPlayerStatefn] = useState<
    () => (ps: PlayerState) => void
  >(() => () => {});

  // This should only happen once
  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!slug?.name || !slug?.gid) {
      throw new Error(
        "DraftGameProvider should be used inside of a page with a 'name' and 'gid' query param.",
      );
    }

    const serverURL = new URL(activeServer);
    const { updateMyPlayerState } = initializeWebsocket({
      name: slug.name.toString(),
      gid: slug.gid.toString(),
      connectURL: serverURL,
      onGameState: (state: string) => {
        setGameState(state);
      },
    });

    setPlayerStatefn(() => () => updateMyPlayerState);
  }, [router.isReady, slug.name, slug.gid, activeServer]);

  return (
    <DraftGameContext.Provider
      value={{
        draftState:
          typeof draftState === "string"
            ? (JSON.parse(draftState) as WebsocketMessage)
            : draftState,
        // Call setPlayerState to update the player state on the serverside.
        setPlayerState: setPlayerState,
      }}
    >
      {children}
    </DraftGameContext.Provider>
  );
};

export const useDraftGame = (): DraftGameProviderValue => {
  const context = useContext(DraftGameContext);

  if (!context) {
    // throw new Error("useDraftGame should be used inside of <DraftGameProvider />");
    return {
      draftState: undefined,
      setPlayerState: () => () => {},
    };
  }

  return context;
};
