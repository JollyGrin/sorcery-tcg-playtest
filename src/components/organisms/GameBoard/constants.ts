import { GameCard, PlayerData } from "@/types/card";

/**
 * CDN Images
 * */
export const CARD_CDN = `https://card.cards.army/cards/`;

/**
 * LAYOUT
 * */

const nav = `40px`;
const footer = `170px`;
const body = `calc(100vh - ${nav} - ${footer})`;

export const LAYOUT_HEIGHTS = { nav, footer, body };

/**
 * GRID ORDERING
 *
 * Contains the grid, auras, hand, deck, atlas deck, grave
 * grave is last element in enum
 * */
export enum GRIDS {
  GRID_1,
  GRID_2,
  GRID_3,
  GRID_4,
  GRID_5,
  GRID_6,
  GRID_7,
  GRID_8,
  GRID_9,
  GRID_10,
  GRID_11,
  GRID_12,
  GRID_13,
  GRID_14,
  GRID_15,
  GRID_16,
  GRID_17,
  GRID_18,
  GRID_19,
  GRID_20,
  AURA_1,
  AURA_2,
  AURA_3,
  AURA_4,
  AURA_5,
  AURA_6,
  AURA_7,
  AURA_8,
  AURA_9,
  AURA_10,
  AURA_11,
  AURA_12,
  HAND,
  DECK,
  ATLAS_DECK,
  GRAVE,
}

/**
 * Length of hand, deck, deck-atlas, and grave (4)
 * used to splice playerstate from global state
 * */
export const GRIDS_PERSONAL_LENGTH = GRIDS.GRAVE - GRIDS.AURA_12;

/**
 * Initialize game state
 * */
export const initGameState: GameCard[][] = Array.from({ length: 36 }, () => []);
export const initGameData: PlayerData = {
  earth: 0,
  wind: 0,
  fire: 0,
  water: 0,
  life: 20,
  mana: 0,
  manaRemaining: 0,
};

/**
 * Returns the webp
 * */
export function getCardImage(identifier: string, quality: 50 | 100 = 100) {
  return `https://card.cards.army/cards/${quality === 100 ? "" : "/50"}${identifier}.webp`;
}
