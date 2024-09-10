import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { GameState } from "@/types/card";

export function actDrawDeck(state: GameState) {
  // Create a shallow copy of the previous grid items array
  const newState = [...state];

  // Make a copy of the deck and hand arrays, preserving their positions
  const newDeck = [...newState[GRIDS.DECK]];
  const newHand = [...newState[GRIDS.HAND]];

  // Pop a card from the deck and push it to the hand
  const card = newDeck.pop();
  if (card) newHand.push(card);

  // Update the newState array with the updated deck and hand arrays
  newState[GRIDS.DECK] = newDeck;
  newState[GRIDS.HAND] = newHand;

  // Return the updated newState array to trigger a re-render
  return newState;
}

export function actDrawAtlas(state: GameState) {
  // Create a shallow copy of the previous grid items array
  const newState = [...state];

  // Make a copy of the deck and hand arrays, preserving their positions
  const newDeck = [...newState[GRIDS.ATLAS_DECK]];
  const newHand = [...newState[GRIDS.HAND]];

  // Pop a card from the deck and push it to the hand
  const card = newDeck.pop();
  if (card) newHand.push(card);

  // Update the newState array with the updated deck and hand arrays
  newState[GRIDS.ATLAS_DECK] = newDeck;
  newState[GRIDS.HAND] = newHand;

  // Return the updated newState array to trigger a re-render
  return newState;
}

export function actDrawDeckIndex(
  state: GameState,
  deckType: "deck" | "atlas",
  cardIndex: number,
) {
  // Create a shallow copy of the previous grid items array
  const newState = [...state];
  const GRID_DECK_TYPE = deckType === "deck" ? GRIDS.DECK : GRIDS.ATLAS_DECK;

  // Make a copy of the deck and hand arrays, preserving their positions
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

  // Return the updated newState array to trigger a re-render
  return newState;
}
