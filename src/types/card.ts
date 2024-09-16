type SorceryCardType =
  | "site" // in reality, only this one is relevant variation
  | "aura"
  | "avatar"
  | "artifact"
  | "minion"
  | "magic";

/**
 * Static props needed to render a card
 * img for display
 * type only matters to rotate sites (sites are horizontal)
 * */
export type SorceryCard = {
  img: string; // used with CDN
  type: SorceryCardType; // site card is rotated sideways
};

/**
 * Card props used for playtesting
 * id is used for drag-n-drop
 * isTapped ...well yeah for tapping
 * */
type GameProps = {
  id: string;
  isTapped?: boolean;
  playerName?: string;
};

/**
 * Card type used for game playtesting
 * */
export type GameCard = SorceryCard & GameProps;

/**
 * Represents an array of cards.
 * Every container of cards is a grid item.
 * For example, hand, deck, discard, individual cell on the game grid.
 * */
export type GridItem = GameCard[];

/**
 * The entire state of the board is an array of 36 arrays.
 * 1-20 Game Grid (5x4 grid)
 * 21-32 Aura intersections
 * 33 HAND
 * 34 DECK
 * 35 ATLAS_DECK
 * 36 GRAVE
 * */
export type GameState = GridItem[];

export type PlayerData = {
  earth: number;
  wind: number;
  fire: number;
  water: number;
  life: number;
};
export type PlayerState = { state: GameState; data: PlayerData };
export type PlayersState = Record<string, PlayerState> & {
  GLOBAL: PlayerState;
};

export type PlayerDataProps = {
  players?: PlayersState;
  setMyData(data: PlayersState["GLOBAL"]["data"]): void;
};
