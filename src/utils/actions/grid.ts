import { GameState } from "@/types/card";
import { DragEndEvent } from "@dnd-kit/core";

/**
 * Repositions a card within it's existing grid cell
 * Returns an updated game state
 * */
export function actMoveCardInCell(state: GameState, event: DragEndEvent) {
  const originIndex = parseInt(event.active.data.current?.gridIndex, 10);
  const updatedGrid = [...state];
  const cardsInCell = [...updatedGrid[originIndex]]; // Copy the cards in the original cell

  const activeCardIndex = event.active?.data?.current?.index; // Index of the card being dragged
  const destinationCardIndex = event.over?.data?.current?.index; // Index where the card will be dropped

  // Remove the active card from its original position
  const [activeCard] = cardsInCell.splice(activeCardIndex, 1);

  // Insert the active card into the new position (destination)
  cardsInCell.splice(destinationCardIndex, 0, activeCard);

  // Update the original grid with the modified cards in the cell
  updatedGrid[originIndex] = cardsInCell;

  return updatedGrid;
}

/**
 * Repositions a card to another grid cell
 * Returns an updated game state
 * */
export function actMoveCardOutsideCell(state: GameState, event: DragEndEvent) {
  const originIndex = parseInt(event.active.data.current?.gridIndex, 10);
  const destinationIndex = event.over?.data?.current?.gridIndex;

  // Remove the active card from its original position
  const updatedGrid = [...state];
  const [movedCard] = updatedGrid[originIndex].splice(
    event.active?.data?.current?.index,
    1,
  );
  // Place card in the destination area
  updatedGrid[destinationIndex]?.push(movedCard);

  return updatedGrid;
}

/**
 * Moves a card within a cell or to another grid cell
 * Returns an updated game state
 * If no action possible, will return the original state
 * * */
export function actMoveCard(state: GameState, event: DragEndEvent) {
  const { active, over } = event;

  if (over?.id === active.id) return state; // if self, do nothing

  if (over) {
    const originIndex = parseInt(active.data.current?.gridIndex, 10);
    const destinationIndex = over?.data?.current?.gridIndex;

    if (originIndex === destinationIndex) {
      return actMoveCardInCell(state, event);
    }

    return actMoveCardOutsideCell(state, event);
  }

  return state;
}
