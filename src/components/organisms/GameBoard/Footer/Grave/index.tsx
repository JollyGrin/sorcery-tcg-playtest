import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { GRIDS } from "@/components/organisms/GameBoard/constants";

import { GiPirateGrave as IconGrave } from "react-icons/gi";
import { CardImage } from "@/components/atoms/card-view/card";
import { Modal } from "@/components/atoms/Modal";
import { useState } from "react";
import { GameStateActions } from "@/components/organisms/GameBoard";
import { DiscardModalBody } from "./DiscardModal";

export const GraveTray = (props: GameStateActions) => {
  const graveCards = props.gridItems[GRIDS.GRAVE];
  const graveAmount = graveCards?.length ?? 0;
  console.log({ graveAmount });
  const hasCards = graveCards?.length > 0;

  const [preview, setPreview] = useState(false);

  return (
    <div className="relative overflow-clip h-full">
      <IconGrave
        style={{
          position: "absolute",
          fontSize: "6rem",
          bottom: "-1rem",
          left: "-0.5rem",
          opacity: 0.3,
        }}
      />
      {preview && (
        <Modal
          wrapperProps={{ open: preview, onOpenChange: setPreview }}
          content={<DiscardModalBody cards={graveCards} {...props} />}
        />
      )}
      <DroppableGridItem gridIndex={GRIDS.GRAVE} id={GRIDS.GRAVE.toString()}>
        {hasCards && (
          <div
            className="grid relative place-items-center h-full cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              setPreview(true);
            }}
            onContextMenu={(e) => {
              e.preventDefault();
              setPreview(true);
            }}
          >
            {graveAmount > 0 && (
              <div style={{ width: "100px", height: "120px", position: "absolute" }}>
                <CardImage
                  img={graveCards?.[graveAmount - 1 - 0].img}
                  minH={"0"}
                />
              </div>
            )}

            {graveAmount > 1 && (
              <div
                style={{ width: "100px", height: "120px", position: "absolute", transform: "rotate(4deg)", left: 9, top: 9 }}
              >
                <CardImage
                  img={graveCards?.[graveAmount - 1 - 1].img}
                  minH={"0"}
                />
              </div>
            )}

            {graveAmount > 2 && (
              <div
                style={{ width: "100px", height: "120px", position: "absolute", transform: "rotate(-2deg)", left: 4, top: 8 }}
              >
                <CardImage
                  img={graveCards?.[graveAmount - 1 - 2].img}
                  minH={"0"}
                />
              </div>
            )}

            {graveAmount > 3 && (
              <div
                style={{ width: "100px", height: "120px", position: "absolute", transform: "rotate(3deg)", left: 7, top: 4 }}
              >
                <CardImage
                  img={graveCards?.[graveAmount - 1 - 3].img}
                  minH={"0"}
                />
              </div>
            )}

            {graveAmount > 4 && (
              <div
                style={{ width: "100px", height: "120px", position: "absolute", transform: "rotate(0deg)", left: 5, top: 9 }}
              >
                <CardImage img={graveCards?.[0].img} minH={"0"} />
              </div>
            )}
          </div>
        )}
      </DroppableGridItem>
    </div>
  );
};
