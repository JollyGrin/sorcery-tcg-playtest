import { Box } from "styled-system/jsx";
import { AuraDrop } from "./AuraDrop";
import { GameStateActions } from "..";
import { DragItem } from "@/components/molecules/DragItem";
import { GameCard } from "@/pages/game";
import { useState } from "react";
import { Modal } from "@/components/atoms/Modal";
import { FullCardAtlas } from "@/components/atoms/card-view/atlas";
import { CardImage as FullCard } from "@/components/atoms/card-view/card";

export const Auras = (props: GameStateActions) => {
  const auraCards = props.gridItems?.[21]?.[0];
  return (
    <Box position="absolute" w="100%" h="100%">
      <Box
        position="absolute"
        top="25%" /* Adjust relative to row height */
        left="20%" /* Adjust relative to column width */
        bg="blue"
        w="50px"
        h="50px"
        transform="translate(-50%, -50%)" /* Center the box */
      >
        {!auraCards?.id && (
          <AuraDrop gridIndex={21}>
            <Box
              w="100%"
              h="100%"
              backgroundSize="cover"
              transform="rotate(90deg)"
              borderRadius="0.5rem"
            />
          </AuraDrop>
        )}
        {auraCards?.id && (
          <DragWrapper
            gridIndex={21}
            index={0}
            card={props.gridItems?.[21]?.[0]}
          />
        )}
      </Box>

      <Box
        position="absolute"
        top="25%" /* Adjust relative to row height */
        left="40%" /* Adjust relative to column width */
        bg="blue"
        w="25px"
        h="25px"
        transform="translate(-50%, -50%)" /* Center the box */
      />
    </Box>
  );
};

const DragWrapper = ({
  card,
  ...props
}: {
  gridIndex: number;
  index: number;
  card: GameCard;
}) => {
  const [preview, setPreview] = useState(false);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DragItem
        gridIndex={21}
        index={0}
        style={{ width: "100%", height: "100%", zIndex: 1000 }}
      >
        <Box
          w="100%"
          h="100%"
          backgroundSize="cover"
          transform="rotate(90deg)"
          borderRadius="0.5rem"
          style={{
            backgroundImage: `url(/mock-cards/${card?.img})`,
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setPreview(true);
          }}
        />
      </DragItem>
      <Modal
        wrapperProps={{ open: preview, onOpenChange: setPreview }}
        content={
          <Box h="600px">
            {card.type === "site" && <FullCardAtlas img={card.img} />}
            {card.type !== "site" && <FullCard img={card.img} />}
          </Box>
        }
      />
    </div>
  );
};
