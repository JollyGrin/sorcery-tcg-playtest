type SorceryCardType =
  | "site"
  | "aura"
  | "avatar"
  | "artifact"
  | "minion"
  | "magic";

export type SorceryCard = {
  img: string;
  type: SorceryCardType;
};
