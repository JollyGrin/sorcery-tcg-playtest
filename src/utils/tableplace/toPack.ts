import { CARD_CDN } from "@/constants";

/**
 * Converts a spells.bar decklist into a table.place pack (.tbpp.json).
 * Format contract: https://table.place/llms.txt / pack.schema.json
 */

// Backs must be publicly reachable by table.place, so use absolute URLs
// to the deployed site rather than relative paths.
const SITE_URL = "https://spells.bar";
const SPELLBOOK_BACK = `${SITE_URL}/card-backs/m_spells.png`;
const ATLAS_BACK = `${SITE_URL}/card-backs/m_atlas.png`;

export type DecklistInput = {
  name: string;
  avatar?: string;
  /** one slug per copy */
  spellbook: string[];
  /** one slug per copy */
  atlas: string[];
};

type TbppCard = { code: string; name?: string; face: string };
type TbppDeck = {
  slot: string;
  name: string;
  back: string;
  isFaceUp?: boolean;
  cards: TbppCard[];
};
export type TbppPack = {
  $schema: string;
  tbpp: 1;
  specVersion: string;
  id: string;
  name: string;
  scope: "player";
  decks: TbppDeck[];
};

export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "deck";

/**
 * Card codes must be unique within a deck: table.place builds entity ids
 * from them, and duplicate codes collapse into a single card. First copy
 * keeps the bare slug; later copies get -2, -3… (same convention as
 * table.place's own /create page).
 */
/** Precon slugs carry a printing suffix (e.g. wild_boars_b_s) absent from card data */
const lookupName = (slug: string, cardNames?: Record<string, string>) =>
  cardNames?.[slug] ?? cardNames?.[slug.replace(/_[a-z]_[a-z]$/, "")] ?? slug;

const buildCards = (
  slugs: string[],
  cardNames?: Record<string, string>,
): TbppCard[] => {
  const seen: Record<string, number> = {};
  return slugs.map((slug) => {
    seen[slug] = (seen[slug] ?? 0) + 1;
    const code = seen[slug] === 1 ? slug : `${slug}-${seen[slug]}`;
    return {
      code,
      name: lookupName(slug, cardNames),
      face: `${CARD_CDN}${slug}.webp`,
    };
  });
};

export const decklistToTbppPack = (
  deck: DecklistInput,
  cardNames?: Record<string, string>,
): TbppPack => {
  const decks: TbppDeck[] = [];

  if (deck.avatar) {
    decks.push({
      slot: "avatar",
      name: "Avatar",
      back: SPELLBOOK_BACK,
      isFaceUp: true,
      cards: buildCards([deck.avatar], cardNames),
    });
  }
  decks.push({
    slot: "spellbook",
    name: "Spellbook",
    back: SPELLBOOK_BACK,
    cards: buildCards(deck.spellbook, cardNames),
  });
  decks.push({
    slot: "atlas",
    name: "Atlas",
    back: ATLAS_BACK,
    cards: buildCards(deck.atlas, cardNames),
  });

  return {
    $schema: "https://table.place/pack.schema.json",
    tbpp: 1,
    specVersion: "1.3.0",
    id: `spellsbar-${slugify(deck.name)}`,
    name: deck.name,
    scope: "player",
    decks,
  };
};

export const downloadTbppPack = (pack: TbppPack) => {
  const blob = new Blob([JSON.stringify(pack, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${slugify(pack.name)}.tbpp.json`;
  anchor.click();
  URL.revokeObjectURL(url);
};
