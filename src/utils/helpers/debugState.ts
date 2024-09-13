import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { GameState } from "@/types/card";

/**
 * Having trouble understanding the state?
 * Throw this around state anywhere to see a table in the console logs
 * */
export function debugState(state: GameState) {
  // Transform each row into an object that includes the `id` from each object
  const arrayOfObjects = state.map((row, rowIndex) => {
    // Start with the row name from the enum
    const rowObject = { "Row Name": GRIDS[rowIndex] };

    // Add the id from each object in the row
    row.forEach((obj, colIndex) => {
      //@ts-expect-error: do not care, it works
      rowObject[`Card Index ${colIndex}`] = obj.id;
    });

    return rowObject;
  });
  console.table(arrayOfObjects);
}
