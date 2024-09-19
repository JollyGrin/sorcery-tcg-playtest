import { GameState } from "@/types/card";

export function actCardCounterIncrement(
  state: GameState,
  gridIndex: number,
  cellIndex: number,
) {
  const newState = [...state];

  const newGridCell = [...newState[gridIndex]];
  const newCard = newGridCell[cellIndex];

  let counter = newCard.counter ?? 0;
  counter++;
  newCard.counter = counter;

  newState[gridIndex][cellIndex] = newCard;

  return newState;
}

export function actCardCounterDecrement(
  state: GameState,
  gridIndex: number,
  cellIndex: number,
) {
  const newState = [...state];

  const newGridCell = [...newState[gridIndex]];
  const newCard = newGridCell[cellIndex];

  let counter = newCard.counter ?? 0;
  counter--;
  newCard.counter = counter;

  newState[gridIndex][cellIndex] = newCard;

  return newState;
}
