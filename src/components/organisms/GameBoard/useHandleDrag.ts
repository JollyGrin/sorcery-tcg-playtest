import { SorceryCard } from "@/types/card";
import { actMoveCard } from "@/utils/actions/grid";
import {
  closestCenter,
  closestCorners,
  CollisionDetection,
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

const collision: CollisionDetection = (props) => {
  // Access the current translated Y position of the dragged item
  const currentY = props?.active?.rect?.current?.translated?.top;

  // Get the height of the viewport
  const viewportHeight = window.innerHeight;

  // Check if the current Y position is within the bottom 170px of the page
  const isInFooter = currentY && currentY > viewportHeight - 170;

  // Check if the current Y position is within the bottom 170px of the page
  // If the item is in the bottom 170px, use closestCenter for the footer
  if (isInFooter) {
    return closestCenter(props);
  }

  return closestCorners(props);
};

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
    collision,
    sensors,
    onDragEnd: handleDragEnd,
    onDragStart: handleDragStart,
    activeId: active?.id,
    activeCard:
      gridItems?.[active?.data?.current?.gridIndex]?.[
        active?.data?.current?.index
      ],
  };
};
