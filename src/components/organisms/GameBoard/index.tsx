import { CardAtlas } from "@/components/atoms/mock-cards/atlas";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import { GameLayout } from "./Layout";
import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useHandleDrag } from "./useHandleDrag";
import { CardImage } from "@/components/atoms/mock-cards/card";
import { Box } from "styled-system/jsx";
import { GameState, PlayerDataProps } from "@/types/card";
import { GRIDS, LOCALSTORAGE_KEYS } from "./constants";
import { useRouter } from "next/router";
import { SortItemWrapper } from "./SortItemWrapper";
import { CardInject } from "@/components/molecules/CardInject";
import { CommandModalWrapper } from "@/components/molecules/CommandModal";
import { useState } from "react";
import { AltGridDisplay } from "./Grid/AltGridDisplay";
import { useLocalStorage } from "@/utils/hooks";

export type GameStateActions = {
  gridItems: GameState;
  setGridItems: (state: GameState) => void;
};
export const GameBoard = ({
  gridItems,
  setGridItems,
  isReversed: reversed,
  ...playerDataProps
}: GameStateActions & PlayerDataProps & { isReversed?: boolean }) => {
  const { query } = useRouter();
  const name = query?.name ?? "p1";
  const isReversed = reversed ?? name === "p2"; // online will send reversed, solo will not and default to p2

  // while dragging, activeCard has the GameCard type details of it
  const { activeCard, activeId, ...dragProps } = useHandleDrag({
    gridItems,
    setGridItems,
  });

  const [gridHover, setGridHover] = useState<number | undefined>(undefined);
  const { key, ...options } = LOCALSTORAGE_KEYS.SETTINGS.DISPLAY.toggle;
  const [isDisplay] = useLocalStorage(key, false, options);

  return (
    <CommandModalWrapper {...{ gridItems, setGridItems, ...playerDataProps }}>
      <DndContext {...dragProps}>
        <GameLayout
          gridItems={gridItems}
          setGridItems={setGridItems}
          isReversed={isReversed}
          {...playerDataProps}
        >
          {(isReversed
            ? gridItems.slice(0, 20).reverse()
            : gridItems.slice(0, 20)
          )?.map((cards, _gridIndex) => {
            // Adjust the gridIndex if array was reversed
            const gridIndex = isReversed
              ? GRIDS.GRID_20 - _gridIndex
              : _gridIndex;

            if (
              isDisplay &&
              gridHover !== gridIndex &&
              activeId === undefined
            ) {
              return (
                <AltGridDisplay
                  key={"preview" + gridIndex}
                  onMouseOver={() => setGridHover(gridIndex)}
                  cards={cards}
                  myName={name as string}
                  gridIndex={gridIndex + 1}
                />
              );
            }

            return (
              <DroppableGridItem
                key={"grid-" + gridIndex}
                id={gridIndex.toString()}
                gridIndex={gridIndex}
                style={{ overflowY: "auto", overflowX: "clip" }}
                contextMenu={
                  <Box maxW="900px" w="100%">
                    <CardInject
                      gridIndex={gridIndex}
                      gameState={{ gridItems, setGridItems }}
                    />
                  </Box>
                }
              >
                <SortableContext
                  id={`grid-${gridIndex}`}
                  items={cards.map((card) => card.id)}
                  strategy={rectSortingStrategy}
                >
                  <Box
                    h="100%"
                    w="100%"
                    onMouseEnter={() => {
                      setGridHover(gridIndex);
                    }}
                  >
                    {cards.map((card, cardIndex) => (
                      <SortItemWrapper
                        key={card.id}
                        amountOfCards={cards?.length}
                        {...{ gridItems, setGridItems }}
                        {...{ card, gridIndex, cardIndex }}
                      />
                    ))}
                  </Box>
                </SortableContext>
              </DroppableGridItem>
            );
          })}
        </GameLayout>
        <DragOverlay>
          {activeId ? (
            <Box opacity={0.5}>
              {activeCard?.type === "site" && (
                <CardAtlas img={activeCard?.img} />
              )}
              {activeCard?.type !== "site" && (
                <CardImage img={activeCard?.img} />
              )}
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>
    </CommandModalWrapper>
  );
};
