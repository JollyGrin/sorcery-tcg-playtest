import axios from "axios";

type CardDataMinimized = {
  name: string;
  slug: string;
  type: "site" | ("minion" & string);
};
export async function getCardsData() {
  const res = await axios.get<CardDataMinimized[]>(
    `/card-data/processed_cards.json`,
  );
  return res.data;
}

export async function getTokensData() {
  const res = await axios.get<string[]>(`https://card.cards.army/tokens.json`);
  return res.data;
}

export const TOKEN_CARDS: CardDataMinimized[] = [
  {
    slug: "frog",
    name: "Frog",
    type: "minion",
  },
  {
    slug: "foot_solider",
    name: "Foot Soldier",
    type: "minion",
  },
  {
    slug: "wildfire_path",
    name: "Wildfire Path",
    type: "minion",
  },
  {
    slug: "rubble",
    name: "Rubble",
    type: "site",
  },
];

export const TOKEN_RUBBLE: CardDataMinimized = {
  slug: "rubble",
  name: "Rubble",
  type: "site",
};
