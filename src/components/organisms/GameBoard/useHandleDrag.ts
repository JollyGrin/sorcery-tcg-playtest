import { SorceryCard } from "@/types/card";
import { actMoveCardInCell } from "@/utils/actions/grid";
import {
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useState } from "react";

type GameCard = SorceryCard & { id: string }; // for game position
type Cards = GameCard[][];

export const useHandleDrag = ({
  gridItems,
  setGridItems,
}: {
  gridItems: Cards;
  setGridItems(state: Cards): void;
}) => {
  const [active, setActive] = useState<DragEndEvent["active"] | null>(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      distance: 5,
    },
  });
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(
    pointerSensor,
    mouseSensor,
    touchSensor,
    keyboardSensor,
  );

  function handleDragStart(event: DragEndEvent) {
    setActive(event?.active);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActive(null);
    const { active, over } = event;

    if (over?.id === active.id) return; // if self, do nothing

    if (over) {
      const originIndex = parseInt(active.data.current?.gridIndex, 10);
      const destinationIndex = over?.data?.current?.gridIndex;

      if (originIndex === destinationIndex) {
        setGridItems(actMoveCardInCell(gridItems, event));
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
    sensors,
    handleDragEnd,
    handleDragStart,
    activeId: active?.id,
    activeCard:
      gridItems?.[active?.data?.current?.gridIndex]?.[
        active?.data?.current?.index
      ],
  };
};
