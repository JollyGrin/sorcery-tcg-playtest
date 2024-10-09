import { DraftPlayerData } from "@/components/organisms/Draft/types";
import { PlayerState } from "@/types/card";

export interface WebsocketMessage {
  msgtype: string;
  // The content depends on the msgtype.
  content?: OnlineState;
  error: string;
}

export interface OnlineState {
  // gid is the Game ID
  gid: string;
  players: Record<string, PlayerState>;
  // TODO: Parse this
  last_updated: string;
}

export const pingMessage = {
  msgtype: "ping",
};
export const pongMessage = {
  msgtype: "pong",
};

/**
 * DRAFT SOCKET TYPES
 * */

export interface DraftWebsocketMessage {
  msgtype: string;
  // The content depends on the msgtype.
  content?: DraftOnlineState;
  error: string;
}

export interface DraftOnlineState {
  // gid is the Game ID
  gid: string;
  players: Record<string, DraftPlayerData>;
  // TODO: Parse this
  last_updated: string;
}
