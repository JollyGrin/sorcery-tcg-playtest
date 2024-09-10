import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { GameState } from "@/types/card";

/**
 * Return a card from hand to the top of the deck
 * */
export function actHandToTopDeck(
  state: GameState,
  deckType: "deck" | "atlas",
  handCardIndex: number,
) {
  // Create a shallow copy of the previous grid items array
  const newState = [...state];

  // choose between deck or atlas deck
  const GRIDS_DECK_TYPE = deckType === "deck" ? GRIDS.DECK : GRIDS.ATLAS_DECK;

  // Make a copy of the deck and hand arrays, preserving their positions
  const newDeck = [...newState[GRIDS_DECK_TYPE]];
  const newHand = [...newState[GRIDS.HAND]];

  // Pop a card from the hand and push it to the deck
  const [card] = newHand.splice(handCardIndex, 1);
  if (card) newDeck.push(card);

  // Update the newState array
  newState[GRIDS_DECK_TYPE] = newDeck;
  newState[GRIDS.HAND] = newHand;

  // Return the updated newState array to trigger a re-render
  return newState;
}
