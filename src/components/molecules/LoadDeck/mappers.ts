import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { GameCard, GameState } from "@/types/card";
import { actShuffleDeck } from "@/utils/actions";
import { CuriosaResponse } from "@/utils/api/curiosa/api";
import { v4 as uuid } from "uuid";

export function mapDeckCuriosa({
  deck,
  ...props
}: {
  deck?: CuriosaResponse;
  gridItems: GameState;
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
      }) as GameCard,
  );

  return newGrid;
}
