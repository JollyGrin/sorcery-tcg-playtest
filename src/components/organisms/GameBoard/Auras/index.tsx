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
  return (
    <Box position="absolute" w="100%" h="100%">
      <Aura card={props.gridItems[21]?.[0]} gridIndex={21} index={0} />

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

const Aura = (props: { card: GameCard; gridIndex: number; index: number }) => {
  const auraCard = props.card;
  return (
    <Box
      position="absolute"
      top="25%" /* Adjust relative to row height */
      left="20%" /* Adjust relative to column width */
      w="75px"
      h="75px"
      transform="translate(-50%, -50%)" /* Center the box */
      _hover={{
        border: "solid 5px rgba(0,100,200,0.5)",
        borderRadius: "1rem",
      }}
    >
      {!auraCard?.id && (
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
      {auraCard?.id && <DragWrapper gridIndex={21} index={0} card={auraCard} />}
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
        gridIndex={props.gridIndex}
        index={props.index}
        style={{ width: "100%", height: "100%", zIndex: 1000 }}
      >
        <Box
          w="100%"
          h="100%"
          backgroundSize="200%"
          backgroundPosition="10% 20%"
          transform={card?.type === "site" ? "rotate(90deg)" : ""}
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
            {card?.type === "site" && <FullCardAtlas img={card?.img} />}
            {card?.type !== "site" && <FullCard img={card?.img} />}
          </Box>
        }
      />
    </div>
  );
};
