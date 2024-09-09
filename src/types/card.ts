type SorceryCardType =
  | "site" // in reality, only this one is relevant variation
  | "aura"
  | "avatar"
  | "artifact"
  | "minion"
  | "magic";

export type SorceryCard = {
  img: string; // used with CDN
  type: SorceryCardType; // site card is rotated sideways
};

/**
 * Card props used for playtesting
 * */
type GameProps = {
  id: string;
  isTapped?: boolean;
};
/**
 * Card type used for game playtesting
 * */
export type GameCard = SorceryCard & GameProps;

export type GridItem = GameCard[];

export type GameState = GridItem[];
