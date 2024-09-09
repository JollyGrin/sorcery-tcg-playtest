import axios from "axios";

const CORS_PROXY = "https://corsproxy.io/?";

type Card = {
  identifier: string;
  name: string;
  quantity: number;
};
type SideboardCard = Card & { category: "spellbook" | "atlas" };
type CuriosaResponse = {
  avatar: Card[];
  spellbook: Card[];
  atlas: Card[];
  sideboard: SideboardCard[];
};

export async function getCuriosaDeck(deckId: string) {
  const res = await axios.get<CuriosaResponse>(
    `${CORS_PROXY}https://curiosa.io/api/decks/${deckId}`,
  );
  return res.data;
}
