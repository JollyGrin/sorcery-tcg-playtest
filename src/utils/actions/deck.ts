import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { GameState } from "@/types/card";

/**
 * Shuffle deck with fisher yates algorithm
 * */
export function actShuffleDeck(state: GameState, deckType: "deck" | "atlas") {
  const GRID_DECK_TYPE = deckType === "deck" ? GRIDS.DECK : GRIDS.ATLAS_DECK;

  const newState = [...state];
  const newDeck = [...newState[GRID_DECK_TYPE]];

  const array = newDeck;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }

  newState[GRID_DECK_TYPE] = newDeck;
  return newState;
}

export function actDrawDeck(state: GameState) {
  const newState = [...state];

  const newDeck = [...newState[GRIDS.DECK]];
  const newHand = [...newState[GRIDS.HAND]];

  // Pop a card from the deck and push it to the hand
  const card = newDeck.pop();
  if (card) newHand.push(card);

  newState[GRIDS.DECK] = newDeck;
  newState[GRIDS.HAND] = newHand;

  return newState;
}

export function actDrawDeckBottom(state: GameState) {
  const newState = [...state];

  const newDeck = [...newState[GRIDS.DECK]];
  const newHand = [...newState[GRIDS.HAND]];

  // Pop a card from the deck and push it to the hand
  const card = newDeck.shift();
  if (card) newHand.push(card);

  newState[GRIDS.DECK] = newDeck;
  newState[GRIDS.HAND] = newHand;

  return newState;
}

export function actDrawAtlas(state: GameState) {
  const newState = [...state];

  // Make a copy of the deck and hand arrays, preserving their positions
  const newDeck = [...newState[GRIDS.ATLAS_DECK]];
  const newHand = [...newState[GRIDS.HAND]];

  // Pop a card from the deck and push it to the hand
  const card = newDeck.pop();
  if (card) newHand.push(card);

  newState[GRIDS.ATLAS_DECK] = newDeck;
  newState[GRIDS.HAND] = newHand;

  return newState;
}

export function actDrawDeckIndex(
  state: GameState,
  deckType: "deck" | "atlas",
  cardIndex: number,
) {
  const newState = [...state];
  const GRID_DECK_TYPE = deckType === "deck" ? GRIDS.DECK : GRIDS.ATLAS_DECK;

  const newDeck = [...newState[GRID_DECK_TYPE]];
  const newHand = [...newState[GRIDS.HAND]];

  // Ensure the cardIndex is within bounds
  if (cardIndex >= 0 && cardIndex < newDeck.length) {
    // Remove the card at the specified index from the deck
    const [card] = newDeck.splice(cardIndex, 1);
    // Push the card to the hand if it exists
    if (card) newHand.push(card);
  }

  // Update the newState array with the updated deck and hand arrays
  newState[GRID_DECK_TYPE] = newDeck;
  newState[GRIDS.HAND] = newHand;

  return newState;
}

/**
 * Move a card within a deck to the top of the deck
 * */
export function actDeckMoveToTop(
  state: GameState,
  deckType: "deck" | "atlas",
  cardIndex: number,
) {
  const newState = [...state];
  const GRID_DECK_TYPE = deckType === "deck" ? GRIDS.DECK : GRIDS.ATLAS_DECK;
  const newDeck = [...newState[GRID_DECK_TYPE]];

  // Ensure the cardIndex is within bounds
  if (cardIndex >= 0 && cardIndex < newDeck.length) {
    // Remove the card at the specified index from the deck
    const [card] = newDeck.splice(cardIndex, 1);
    // Push the card to the hand if it exists
    if (card) newDeck.push(card);
  }

  newState[GRID_DECK_TYPE] = newDeck;

  return newState;
}

/**
 * Move a card within a deck to the bottom of the deck
 * */
export function actDeckMoveToBottom(
  state: GameState,
  deckType: "deck" | "atlas",
  cardIndex: number,
) {
  const newState = [...state];
  const GRID_DECK_TYPE = deckType === "deck" ? GRIDS.DECK : GRIDS.ATLAS_DECK;
  const newDeck = [...newState[GRID_DECK_TYPE]];

  // Ensure the cardIndex is within bounds
  if (cardIndex >= 0 && cardIndex < newDeck.length) {
    // Remove the card at the specified index from the deck
    const [card] = newDeck.splice(cardIndex, 1);
    // Push the card to the hand if it exists
    if (card) newDeck.unshift(card);
  }

  newState[GRID_DECK_TYPE] = newDeck;

  return newState;
}
