import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { GameState } from "@/types/card";

export function actDrawDiscard(state: GameState, graveCardIndex: number) {
  // Create a shallow copy of the previous grid items array
  const newState = [...state];

  // Make a copy of the deck and hand arrays, preserving their positions
  const newGrave = [...newState[GRIDS.GRAVE]];
  const newHand = [...newState[GRIDS.HAND]];

  // Pop a card from the deck and push it to the hand
  const [card] = newGrave.splice(graveCardIndex, 1);
  if (card) newHand.push(card);

  // Update the newState array with the updated deck and hand arrays
  newState[GRIDS.GRAVE] = newGrave;
  newState[GRIDS.HAND] = newHand;

  // Return the updated newState array to trigger a re-render
  return newState;
}

export function actToggleBanishCard(state: GameState, graveCardIndex: number) {
  const newState = [...state];

  const newGrave = [...newState[GRIDS.GRAVE]];

  const card = newGrave[graveCardIndex];
  card.isBanished = !card.isBanished;
  newGrave[graveCardIndex] = card;
  newState[GRIDS.GRAVE] = newGrave;

  return newState;
}
