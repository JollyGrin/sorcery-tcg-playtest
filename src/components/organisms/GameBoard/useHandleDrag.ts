import { SorceryCard } from "@/types/card";
import { actMoveCard } from "@/utils/actions/grid";
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
    setGridItems(actMoveCard(gridItems, event));
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
