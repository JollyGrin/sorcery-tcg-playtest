/* eslint-disable no-use-before-define */
import { DraftPlayerData as PlayerState } from "@/components/organisms/Draft/types";
import { WebsocketMessage, pingMessage, pongMessage } from "./message";

export interface DraftWebsocketProps {
  // Game lobby id
  gid: string;
  // Name of the player
  name: string;
  connectURL: URL;
  // Callbacks
  onGameState: (state: string) => void;
}

export interface DraftWebsocketReturn {
  updateMyPlayerState: (state: PlayerState) => void;
}

const js = (e: any) => JSON.stringify(e);
const jp = (e: string) => JSON.parse(e);

export const initializeDraftWebsocket = ({
  name,
  gid,
  connectURL,
  onGameState,
}: DraftWebsocketProps): DraftWebsocketReturn => {
  const url = new URL(`/ws/${gid}`, connectURL);

  url.searchParams.append("name", name);
  url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

  const ws = new WebSocket(url);
  ws.onopen = (_: any): void => {
    ws.send(js(pingMessage));
  };
  ws.onmessage = (event: any): void => {
    const data: WebsocketMessage = jp(event.data);
    switch (data.msgtype) {
      case "ping":
        ws.send(js(pongMessage));
        return;
      case "pong":
        return;
      case "gamestate":
        onGameState(event.data as string);
        return;
      // case "playerposition":
      //   onGamePositions(event.data as string);
      //   return;
    }
  };
  ws.onerror = (event: any): void => {
    console.error("error", js(event.data));
  };
  ws.onclose = (event: any): void => {
    console.info("close", js(event.data));
  };

  return {
    updateMyPlayerState: (state: PlayerState): void => {
      if (!state) {
        // TODO: Idk why this happens, but some undedfined state is being passed in
        return;
      }
      if (ws.readyState !== ws.OPEN) {
        throw new Error("Websocket not open");
      }
      ws.send(
        //@ts-ignore
        js({
          msgtype: "playerstate",
          content: state,
        } as WebsocketMessage),
      );
    },
  };
};
