import { DragEndEvent } from "@dnd-kit/core";

export const useHandleDrag = ({
  gridItems,
  setGridItems,
}: {
  gridItems: any;
  setGridItems: any;
}) => {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over) {
      const originIndex = parseInt(active.data.current?.gridIndex, 10);
      const destinationIndex = parseInt(
        (over?.id as string)?.split("-")[1],
        10,
      );

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
