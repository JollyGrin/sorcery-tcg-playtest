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
  deck?: CardDTO[]; // after draft, the deck you construct from selectedCards
};
