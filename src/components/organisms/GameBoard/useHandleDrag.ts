import { SorceryCard } from "@/types/card";
import { DragEndEvent } from "@dnd-kit/core";

type GameCard = SorceryCard & { id: string }; // for game position
type Cards = GameCard[][];

export const useHandleDrag = ({
  gridItems,
  setGridItems,
}: {
  setGridItems(state: Cards): void;
  gridItems: Cards;
}) => {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over) {
      const originIndex = parseInt(active.data.current?.gridIndex, 10);
      const destinationIndex = parseInt(
        (over?.id as string)?.split("-")[1],
        10, // base 10 number
      );
      console.log("why nan", destinationIndex, over.id);

      console.log("indexes", { originIndex, destinationIndex });

      // Remove card from the origin area
      const updatedGrid = [...gridItems];

      console.log("remove card from original grid", updatedGrid);

      const [movedCard] = updatedGrid[originIndex].splice(
        active?.data?.current?.index,
        1,
      );

      console.log("card to move", movedCard);

      // Place card in the destination area
      updatedGrid[destinationIndex]?.push(movedCard);

      setGridItems(updatedGrid);
    }
  }

  return {
    handleDragEnd,
  };
};
