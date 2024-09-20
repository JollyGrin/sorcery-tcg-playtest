import { v4 as uuid } from "uuid";
import { GameCard, GameState } from "@/types/card";

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

export function actSpawnCard(
  state: GameState,
  gridIndex: number,
  card: GameCard,
) {
  const newState = [...state];
  const newCard: GameCard = {
    ...card,
    id: card.id + uuid(),
    img: card.img,
    type: card.type,
    isTapped: false,
    counter: 0,
  };

  newState[gridIndex].push(newCard);
  return newState as GameState;
}
