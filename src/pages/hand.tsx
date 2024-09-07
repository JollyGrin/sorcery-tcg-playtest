//@ts-nocheck
import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { Box, Grid } from "styled-system/jsx";
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
  // Initialize gridItems with cards
  const [gridItems, setGridItems] = useState(
    Array.from({ length: 20 }, () => []),
  );

  // Initialize hand tray with some cards
  const [handItems, setHandItems] = useState([
    { id: "hand-card-1" },
    { id: "hand-card-2" },
    { id: "hand-card-3" },
    { id: "hand-card-4" },
    { id: "hand-card-5" },
  ]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over) {
      const originId = active.id;
      const destinationId = over.id;

      const originGridIndex = active.data.current?.gridIndex;
      const originHandIndex = active.data.current?.handIndex;
      const destinationGridIndex = destinationId?.startsWith("grid-")
        ? parseInt(destinationId?.split("-")[1], 10)
        : null;
      const destinationHandIndex = destinationId?.startsWith("hand-")
        ? parseInt(destinationId.split("-")[1], 10)
        : null;

      const updatedGridItems = [...gridItems]; // Create a shallow copy of gridItems
      const updatedHandItems = [...handItems]; // Create a shallow copy of handItems

      // Handle moving between grid items
      if (originGridIndex !== null && destinationGridIndex !== null) {
        // Ensure both origin and destination grid arrays exist
        if (!updatedGridItems[originGridIndex]) {
          updatedGridItems[originGridIndex] = [];
        }
        if (!updatedGridItems[destinationGridIndex]) {
          updatedGridItems[destinationGridIndex] = [];
        }

        // Move card within grid
        const [movedCard] = updatedGridItems[originGridIndex].splice(
          active.data.current.index,
          1,
        );
        updatedGridItems[destinationGridIndex].push(movedCard); // Add card to destination grid area
      }

      // Handle moving from grid to hand
      else if (originGridIndex !== null && destinationHandIndex === null) {
        // Moving from grid to hand
        if (!updatedGridItems[originGridIndex]) {
          updatedGridItems[originGridIndex] = [];
        }

        const [movedCard] = updatedGridItems[originGridIndex].splice(
          active.data.current.index,
          1,
        );
        updatedHandItems.push(movedCard); // Add card back to hand
      }

      // Handle moving from hand to grid
      else if (originHandIndex !== null && destinationGridIndex !== null) {
        // Moving from hand to grid
        if (!updatedGridItems[destinationGridIndex]) {
          updatedGridItems[destinationGridIndex] = [];
        }

        const [movedCard] = updatedHandItems.splice(originHandIndex, 1); // Remove from hand
        updatedGridItems[destinationGridIndex].push(movedCard); // Add card to destination grid area
      }

      // Update the state to reflect the changes
      setGridItems(updatedGridItems); // Update grid state
      setHandItems(updatedHandItems); // Update hand state (without refilling it)
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
              background: "rgba(240, 240, 240, 0.5)", // Ensure background visibility
            })}
          >
            {gridItems.map((cards, gridIndex) => (
              <DroppableGridItem
                key={"grid-" + gridIndex}
                id={"grid-" + gridIndex}
              >
                <SortableContext
                  id={`grid-${gridIndex}`}
                  items={cards.map((card) => card?.id)}
                  strategy={rectSortingStrategy}
                >
                  {cards.map((card, cardIndex) => (
                    <Drag
                      key={card?.id + cardIndex}
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

          {/* Hand tray */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              background: "rgba(200, 200, 200, 0.8)",
              padding: "1rem",
            }}
          >
            {handItems.map((card, handIndex) => (
              <Drag key={card.id} handIndex={handIndex} index={handIndex}>
                <CardAtlas />
              </Drag>
            ))}
          </div>
        </Grid>
      </DndContext>
    </div>
  );
}

const Drag = (props: {
  children: ReactNode;
  gridIndex?: number;
  handIndex?: number;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id:
      props.gridIndex !== undefined
        ? `grid-${props.gridIndex}-${props.index}`
        : `hand-${props.handIndex}`,
    data: {
      gridIndex: props.gridIndex,
      handIndex: props.handIndex,
      index: props.index,
    },
  });
  const style = {
    ...(transform
      ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
      : {}),
    width: "100%", // Ensure cards are visible
    height: "100%", // Ensure cards are visible
  };

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
      style={{ minHeight: "100px", border: "1px solid black" }}
    >
      {props.children}
    </div>
  );
};
