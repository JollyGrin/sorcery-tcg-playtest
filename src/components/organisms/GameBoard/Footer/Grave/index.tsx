import { DroppableGridItem } from "@/components/molecules/DropGridItem";
import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { Box, Grid } from "styled-system/jsx";

import { GiPirateGrave as IconGrave } from "react-icons/gi";
import { CardImage } from "@/components/atoms/card-view/card";
import { Modal } from "@/components/atoms/Modal";
import { useState } from "react";
import { GameStateActions } from "@/components/organisms/GameBoard";
import { DiscardModalBody } from "./DiscardModal";

export const GraveTray = (props: GameStateActions) => {
  const graveCards = props.gridItems[GRIDS.GRAVE];
  const graveAmount = graveCards?.length ?? 0;
  const hasCards = graveCards?.length > 0;

  const [preview, setPreview] = useState(false);

  return (
    <Box position="relative" overflow="clip" h="100%">
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
      <DroppableGridItem gridIndex={GRIDS.GRAVE} id="droppable-grave">
        {hasCards && (
          <Grid
            position="relative"
            placeItems="center"
            h="100%"
            cursor="pointer"
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
              <Box w="100px" h="120px" position="absolute">
                <CardImage img={graveCards?.[0].img} minH={"0"} />
              </Box>
            )}

            {graveAmount > 1 && (
              <Box
                w="100px"
                h="120px"
                position="absolute"
                left={9}
                top={9}
                rotate="4deg"
              >
                <CardImage img={graveCards?.[1].img} minH={"0"} />
              </Box>
            )}

            {graveAmount > 2 && (
              <Box
                w="100px"
                h="120px"
                position="absolute"
                left={4}
                top={8}
                rotate="-2deg"
              >
                <CardImage img={graveCards?.[2].img} minH={"0"} />
              </Box>
            )}

            {graveAmount > 3 && (
              <Box
                w="100px"
                h="120px"
                position="absolute"
                left={7}
                top={4}
                rotate="3deg"
              >
                <CardImage img={graveCards?.[3].img} minH={"0"} />
              </Box>
            )}

            {graveAmount > 4 && (
              <Box
                w="100px"
                h="120px"
                position="absolute"
                left={5}
                top={9}
                rotate="0deg"
              >
                <CardImage img={graveCards?.[graveAmount - 1].img} minH={"0"} />
              </Box>
            )}
          </Grid>
        )}
      </DroppableGridItem>
    </Box>
  );
};
