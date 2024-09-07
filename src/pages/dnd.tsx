//@ts-nocheck
import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { Box, Grid, HStack } from "styled-system/jsx";
import { grid } from "styled-system/patterns";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { ReactNode, useState } from "react";

const nav = `100px`;
const footer = `50px`;
const body = `calc(100vh - ${nav} - ${footer})`;

export default function Home() {
  const [gridItems, setGridItems] = useState(
    Array.from({ length: 20 }, (_, gridIndex) => [
      { id: `card-${gridIndex}-0` }, // Each droppable starts with a single card
    ]),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over) {
      const originIndex = parseInt(active.data.current?.gridIndex, 10);
      const destinationIndex = parseInt(over.id.split("-")[1], 10);

      // Remove card from the origin area
      const updatedGrid = [...gridItems];
      const [movedCard] = updatedGrid[originIndex].splice(
        active.data.current.index,
        1,
      );

      // Place card in the destination area
      updatedGrid[destinationIndex].push(movedCard);

      setGridItems(updatedGrid);
    }
  }

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <Grid gridTemplateRows={`${nav} ${body} ${footer}`} gap={0}>
          <div style={{ background: "rgba(0,200,0,0.2)", padding: "1rem" }}>
            <p>Experiment arranging a Sorcery Grid</p>
            <p>
              While hovering over a card, click{" "}
              <code
                style={{
                  background: "rgba(0,0,0,0.075)",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                ALT
              </code>{" "}
              key
            </p>
          </div>
          <div
            className={grid({
              gap: 1,
              m: "0 auto",
              gridTemplateColumns: "repeat(5, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
              maxW: "1200px",
              w: "100%",
              h: "100%",
            })}
          >
            {gridItems.map((cards, gridIndex) => (
              <DroppableGridItem
                key={"grid-" + gridIndex}
                id={"grid-" + gridIndex}
              >
                <SortableContext
                  id={`grid-${gridIndex}`}
                  items={cards.map((_, i) => `${gridIndex}-${i}`)}
                  strategy={rectSortingStrategy}
                >
                  {cards.map((card, cardIndex) => (
                    <Drag
                      key={`card-${gridIndex}-${cardIndex}`}
                      gridIndex={gridIndex}
                      index={cardIndex}
                    >
                      <CardAtlas />
                    </Drag>
                  ))}
                </SortableContext>
              </DroppableGridItem>
            ))}
          </div>

          <TrayFooter />
        </Grid>
      </DndContext>
    </div>
  );
}

const TrayFooter = () => {
  return <HStack h={footer}>place hand here</HStack>;
};

const Drag = (props: {
  children: ReactNode;
  gridIndex: number;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `${props.gridIndex}-${props.index}`,
    data: {
      gridIndex: props.gridIndex,
      index: props.index,
    },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
};

const DroppableGridItem = (props: { children: ReactNode; id: string }) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        minHeight: "100px",
        border: "1px solid black",
      }}
    >
      {props.children}
    </div>
  );
};
