import { GameState } from "@/types/card";
import { DragEndEvent } from "@dnd-kit/core";

/**
 * Repositions a card within it's existing grid cell
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
