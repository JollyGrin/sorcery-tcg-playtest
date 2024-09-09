import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { GameLayout } from "./Layout";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import {
  closestCenter,
  closestCorners,
  CollisionDetection,
  DndContext,
  DragOverlay,
} from "@dnd-kit/core";
import { useHandleDrag } from "./useHandleDrag";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { CardImage as FullCard } from "@/components/atoms/card-view/card";
import { SortableItem } from "@/components/molecules/SortItem";
import { Box } from "styled-system/jsx";
import { Modal } from "@/components/atoms/Modal";

import { Dispatch, SetStateAction, useState } from "react";
import { FullCardAtlas } from "@/components/atoms/card-view/atlas";
import { GameCard, GameState } from "@/types/card";

export type GameStateActions = {
  gridItems: GameState;
  setGridItems: Dispatch<SetStateAction<GameState>>;
};
export const GameBoard = ({ gridItems, setGridItems }: GameStateActions) => {
  const { sensors, handleDragEnd, handleDragStart, activeId, activeCard } =
    useHandleDrag({
      gridItems,
      setGridItems,
    });

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

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={collision}
      sensors={sensors}
    >
      <GameLayout gridItems={gridItems} setGridItems={setGridItems}>
        {gridItems?.slice(0, 20)?.map((cards, gridIndex) => (
          <DroppableGridItem
            key={"grid-" + gridIndex}
            id={gridIndex.toString()}
            gridIndex={gridIndex}
            style={{ overflowY: "auto", overflowX: "clip" }}
          >
            <SortableContext
              id={`grid-${gridIndex}`}
              items={cards.map((card) => card.id)}
              strategy={rectSortingStrategy}
            >
              {cards.map((card, cardIndex) => (
                <SortItemWrapper
                  key={card.id}
                  amountOfCards={cards?.length}
                  {...{ gridItems, setGridItems }}
                  {...{ card, gridIndex, cardIndex }}
                />
              ))}
            </SortableContext>
          </DroppableGridItem>
        ))}
      </GameLayout>
      <DragOverlay>
        {activeId ? (
          <Box opacity={0.5}>
            {activeCard?.type === "site" && <CardAtlas img={activeCard?.img} />}
            {activeCard?.type !== "site" && <CardImage img={activeCard?.img} />}
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const SortItemWrapper = ({
  amountOfCards = 0,
  card,
  gridIndex,
  cardIndex,
  ...props
}: {
  card: GameCard;
  gridIndex: number;
  cardIndex: number;
  amountOfCards?: number;
} & GameStateActions) => {
  const [preview, setPreview] = useState(false);

  const heightCalc = () => {
    if (amountOfCards === 1) return 120;
    if (amountOfCards === 2) return 75;
    if (amountOfCards === 3) return 65;

    return 90 - Math.min(amountOfCards, 4) * 15;
  };
  const height = `${heightCalc()}px`;

  const isTapped = card.isTapped;
  function toggleTap() {
    props.setGridItems(() => {
      const newGrid = [...props.gridItems];
      const card = newGrid[gridIndex][cardIndex];
      newGrid[gridIndex][cardIndex] = {
        ...card,
        isTapped: !card.isTapped,
      } as GameCard;

      return newGrid;
    });
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleTap();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setPreview(true);
      }}
      style={{
        height: heightCalc() + 7 + "px",
        transform: isTapped ? "rotate(5deg)" : "",
        filter: isTapped ? "saturate(0)" : "",
        transition: "all 0.25s ease",
      }}
    >
      <SortableItem
        key={`card-${gridIndex}-${cardIndex}`}
        id={card.id}
        gridIndex={gridIndex}
        index={cardIndex}
      >
        {card.type === "site" && <CardAtlas height={height} img={card.img} />}
        {card.type !== "site" && <CardImage height={height} img={card.img} />}
      </SortableItem>
      <Modal
        wrapperProps={{ open: preview, onOpenChange: setPreview }}
        content={
          <Box h="600px" w="460px">
            {card.type === "site" && <FullCardAtlas img={card.img} />}
            {card.type !== "site" && <FullCard img={card.img} />}
          </Box>
        }
      />
    </div>
  );
};
