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

    if (over?.id === active.id) return; // if self, do nothing

    console.log("drag", {
      over,
      overId: over?.id,
      active,
      destinationGridIndex: over?.data?.current?.gridIndex,
      destinationIndex: over?.data?.current?.index,
    });

    if (over) {
      const originIndex = parseInt(active.data.current?.gridIndex, 10);
      const destinationIndex = parseInt(
        (over?.id as string)?.split("-")[1],
        10, // base 10 number
      );

      if (originIndex === destinationIndex) {
        const updatedGrid = [...gridItems];
        const cardsInCell = [...updatedGrid[originIndex]]; // Copy the cards in the original cell

        const activeCardIndex = active?.data?.current?.index; // Index of the card being dragged
        const destinationCardIndex = over?.data?.current?.index; // Index where the card will be dropped

        // Remove the active card from its original position
        const [activeCard] = cardsInCell.splice(activeCardIndex, 1);

        // Insert the active card into the new position (destination)
        cardsInCell.splice(destinationCardIndex, 0, activeCard);

        // Update the original grid with the modified cards in the cell
        updatedGrid[originIndex] = cardsInCell;

        console.log("drag", {
          updatedGrid,
          cardsInCell,
          activeCard,
        });
        setGridItems(updatedGrid);
        return;
      }

      // Remove card from the origin area
      const updatedGrid = [...gridItems];
      const [movedCard] = updatedGrid[originIndex].splice(
        active?.data?.current?.index,
        1,
      );
      // Place card in the destination area
      updatedGrid[destinationIndex]?.push(movedCard);

      setGridItems(updatedGrid);
    }
  }

  return {
    handleDragEnd,
  };
};
