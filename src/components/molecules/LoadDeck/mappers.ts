import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { GameCard, GameState } from "@/types/card";
import { CuriosaResponse } from "@/utils/api/curiosa/api";
import { v4 as uuid } from "uuid";

export function mapDeckCuriosa({
  deck,
  playerName,
  ...props
}: {
  deck?: CuriosaResponse;
  gridItems: GameState;
  playerName: string;
}) {
  if (!deck) return;
  const newGrid = [...props.gridItems];
  const newAtlas = deck?.atlas?.flatMap(
    (spell) =>
      Array.from({ length: spell.quantity }, () => ({
        // Copy the spell object without the quantity field
        ...spell,
        quantity: undefined, // Remove the quantity field
      })).map(
        (rest, index) =>
          ({
            id: rest.identifier + index + uuid(),
            img: rest.identifier,
            type: "site",
            playerName,
          }) as GameCard,
      ), // Actually remove quantity in the final object
  );
  const newDeck = deck?.spellbook?.flatMap(
    (spell) =>
      Array.from({ length: spell.quantity }, () => ({
        // Copy the spell object without the quantity field
        ...spell,
        quantity: undefined, // Remove the quantity field
      })).map(
        (rest) =>
          ({
            id: rest.identifier + uuid(),
            img: rest.identifier,
            type: "minion",
            playerName,
          }) as GameCard,
      ), // Actually remove quantity in the final object
  );
  newGrid[GRIDS.DECK] = newDeck;
  newGrid[GRIDS.ATLAS_DECK] = newAtlas;
  newGrid[GRIDS.HAND] = deck?.avatar?.map(
    (avatar) =>
      ({
        id: avatar.identifier + "-avatar-" + uuid(),
        img: avatar.identifier,
        type: "avatar",
        playerName,
      }) as GameCard,
  );

  return newGrid;
}
