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
