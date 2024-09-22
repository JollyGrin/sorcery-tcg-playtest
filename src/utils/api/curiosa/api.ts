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

export async function getCuriosaDeck(_deckId: string) {
  let deckId;
  const regex = /\/([^\/]+)$/;
  const match = _deckId.match(regex);

  // incase the user submits the TTS link, this handles it
  if (match) {
    deckId = match[1];
  } else {
    deckId = _deckId;
  }

  const res = await axios.get<CuriosaResponse>(
    `${CORS_PROXY}https://curiosa.io/api/decks/${deckId}`,
  );
  return res.data;
}

type RealmsCard = {
  name: string;
  id: string;
  count: number;
};
type RealmsAppResponse = {
  atlas: RealmsCard[];
  avatar: RealmsCard[];
  spellbook: RealmsCard[];
};
export async function getRealmsAppDeck(_deckId: string) {
  let deckId;
  const regex = /\/(\d+)\//;
  const match = _deckId.match(regex);

  // incase the user submits the TTS link, this handles it
  if (match) {
    deckId = match[1];
  } else {
    deckId = _deckId;
  }

  const res = await axios.get<RealmsAppResponse>(
    `${CORS_PROXY}https://www.realmsapp.com/sorcery_tcg/decklists/${deckId}/exports/TTS/share.json`,
  );

  /**
   * Convert to Curiosa card
   * */
  function mapper(card: RealmsCard) {
    return { ...card, quantity: card.count, identifier: card.id } as Card;
  }
  /**
   * Normalize to Curiosa Response
   * */
  const newResponse: CuriosaResponse = {
    avatar: res.data.avatar.map(mapper),
    spellbook: res.data.spellbook.map(mapper),
    atlas: res.data.atlas.map(mapper),
    sideboard: [],
  };

  return newResponse;
}

export async function getFourCoresDeck(_deckId: string) {
  let deckId;
  const regex = /\/(\d+)\//;
  const match = _deckId.match(regex);

  // incase the user submits the TTS link, this handles it
  if (match) {
    deckId = match[1];
  } else {
    deckId = _deckId;
  }

  const res = await axios.get<RealmsAppResponse>(
    `${CORS_PROXY}https://fourcores.xyz/api/tts/${deckId}`,
  );

  /**
   * Convert to Curiosa card
   * */
  function mapper(card: RealmsCard) {
    return { ...card, quantity: card.count, identifier: card.id } as Card;
  }
  /**
   * Normalize to Curiosa Response
   * */
  const newResponse: CuriosaResponse = {
    avatar: res.data.avatar.map(mapper),
    spellbook: res.data.spellbook.map(mapper),
    atlas: res.data.atlas.map(mapper),
    sideboard: [],
  };

  return newResponse;
}
