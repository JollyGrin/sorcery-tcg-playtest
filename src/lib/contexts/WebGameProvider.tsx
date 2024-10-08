import {
  useEffect,
  useState,
  createContext,
  PropsWithChildren,
  FC,
  useContext,
} from "react";
import { WebsocketMessage } from "../gamesocket/message";
import { initializeWebsocket } from "../gamesocket/socket";
import { useRouter } from "next/router";
import { PlayersState, PlayerState } from "@/types/card";

const useLocalServerStorage = () => {
  const defaultServer = "https://unbrewed-v2.fly.dev";
  return { activeServer: defaultServer };
};

interface WebGameProviderValue {
  gameState: WebsocketMessage | undefined;
  setPlayerState: () => (state: PlayersState["GLOBAL"]) => void;
}

export const WebGameContext = createContext<WebGameProviderValue | undefined>(
  undefined,
);

export const WebGameProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const slug = router.query;

  const { activeServer } = useLocalServerStorage();

  // gameState is updated from the websocket return.
  const [gameState, setGameState] = useState<string>();

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
        "WebGameProvider should be used inside of a page with a 'name' and 'gid' query param.",
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
    <WebGameContext.Provider
      value={{
        gameState:
          typeof gameState === "string"
            ? (JSON.parse(gameState) as WebsocketMessage)
            : gameState,
        // Call setPlayerState to update the player state on the serverside.
        setPlayerState: setPlayerState,
      }}
    >
      {children}
    </WebGameContext.Provider>
  );
};

export const useWebGame = (): WebGameProviderValue => {
  const context = useContext(WebGameContext);

  if (!context) {
    // throw new Error("useWebGame should be used inside of <WebGameProvider />");
    return {
      gameState: undefined,
      setPlayerState: () => () => {},
    };
  }

  return context;
};
