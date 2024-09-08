import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { Grid } from "styled-system/jsx";
import { grid } from "styled-system/patterns";
import { DndContext, DragEndEvent, useDraggable } from "@dnd-kit/core";
import { ReactNode, useEffect } from "react";
import { LAYOUT_HEIGHTS } from "@/components/organisms/GameBoard/constants";
import { useRouter } from "next/router";

const { nav, body, footer } = LAYOUT_HEIGHTS;

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/game");
  }, []);
  return null;

  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id === "droppable") {
      // setIsDropped(true);
    }
  }

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
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
              // border: "1px solid black",
            })}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <DroppableGridItem key={"grid" + i} id={"grid" + i}>
                <Drag>
                  <CardAtlas />
                </Drag>
              </DroppableGridItem>
            ))}
          </div>

          <div style={{ background: "brown" }}>footer</div>
        </Grid>
      </DndContext>
    </div>
  );
}

const Drag = (props: { children: ReactNode }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
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
