import axios from "axios";

// allows bypassing CORS headers without spinning up a server.
const CORS_PROXY = "https://corsproxy.io/?";

type Card = {
  identifier: string;
  name: string;
  quantity: number;
};
type SideboardCard = Card & { category: "spellbook" | "atlas" };
export type CuriosaResponse = {
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

export async function getRealmsAppDeck(deckId: string) {
  const res = await axios.get<CuriosaResponse>(
    `${CORS_PROXY}https://www.realmsapp.com/sorcery_tcg/decklists/${deckId}/exports/TTS/share.json`,
  );
  return res.data;
}
