import { CardDTO } from "@/utils/api/cardData/CardDataType";

export type BoosterPack = {
  uuid: string;
  playerName: string;
  cards: CardDTO[];
};

export type DraftPlayerData = {
  joinedSessionTimestamp: number; // time of joining the session. Used for ordering
  selectedCards: CardDTO[]; // cards you've picked
  activePack: CardDTO[]; // pack actively picking from
  pendingPacks: CardDTO[][]; // packs ready for pick (passed by other player)
  finishedPacks: CardDTO[][]; // packs you've picked and ready to pass (ready to pass to other player)
  packsOpened: number;
  deck?: CardDTO[]; // after draft, the deck you construct from selectedCards
};

export const initPlayer: DraftPlayerData = {
  joinedSessionTimestamp: 0,
  selectedCards: [],
  activePack: [],
  pendingPacks: [],
  finishedPacks: [],
  packsOpened: 0,
};

export const initPlayers: Record<string, DraftPlayerData> = [1, 2, 3, 4].reduce(
  (acc, player) => {
    acc[`p${player}`] = {
      ...initPlayer,
      joinedSessionTimestamp: player,
    };
    return acc;
  },
  {} as { [key: string]: DraftPlayerData },
);

/**
 * Your individual state and setter to update it
 * */
export type DraftProps = {
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
};
