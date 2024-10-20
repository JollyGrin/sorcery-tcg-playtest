type Thresholds = {
  air: number;
  earth: number;
  fire: number;
  water: number;
};

type Guardian = {
  rarity: "Ordinary" | "Elite" | "Exceptional" | "Unique";
  type: "Minion" | "Magic" | "Aura" | "Artifact" | "Site" | "Avatar";
  typeText: string;
  subType: string;
  rulesText: string;
  cost: number;
  attack: number;
  defence: number;
  life: number | null;
  thresholds: Thresholds;
};

type Variant = {
  finish: string;
  product: string;
  artist: string;
  flavorText: string;
  slug: string;
};

type SetMetadata = {
  rarity: string;
  type: string;
  typeText: string;
  subType: string;
  rulesText: string;
  cost: number;
  attack: number;
  defence: number;
  life: number | null;
  thresholds: Thresholds;
};

type CardSet = {
  name: string;
  slug: string;
  releasedAt: string;
  type: string;
  variants: Variant[];
  metadata: SetMetadata;
};

export type CardDTO = {
  name: string;
  slug: string;
  guardian: Guardian;
  sets: CardSet[];
};
