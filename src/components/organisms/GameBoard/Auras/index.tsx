import { Box } from "styled-system/jsx";
import { AuraDrop } from "./AuraDrop";
import { GameStateActions } from "..";
import { DragItem } from "@/components/molecules/DragItem";
import { GameCard } from "@/types/card";
import { useState } from "react";
import { Modal } from "@/components/atoms/Modal";
import { FullCardAtlas } from "@/components/atoms/card-view/atlas";
import { CardImage as FullCard } from "@/components/atoms/card-view/card";
import { CARD_CDN, GRIDS } from "../constants";

export const Auras = (props: GameStateActions) => {
  return (
    <Box position="absolute" w="100%" h="100%">
      {Array.from({ length: 12 })
        .map((_, index) => index)
        .map((index) => (
          <Aura
            key={"aura" + index}
            card={props.gridItems?.[GRIDS.AURA_1 + index]?.[0]}
            gridIndex={GRIDS.AURA_1 + index}
            index={0}
          />
        ))}
    </Box>
  );
};

const Aura = (props: { card: GameCard; gridIndex: number; index: number }) => {
  const auraCard = props.card;

  const auraIndex = props.gridIndex - GRIDS.AURA_1; // normalize to zero
  const topIndex = Math.floor(auraIndex / 4) + 1; // increments every 4
  const top = `${topIndex * 25}%`; // in percent
  const leftIndex = 1 + (auraIndex % 4); // every 4, resets
  const left = `${leftIndex * 20}%`; // in percent

  return (
    <Box
      style={{
        top,
        left,
      }}
      position="absolute"
      w="75px"
      h="75px"
      transform="translate(-50%, -50%)" /* Center the box */
      _hover={{
        border: "solid 5px rgba(0,100,200,0.5)",
        borderRadius: "1rem",
      }}
    >
      {!auraCard?.id && (
        <AuraDrop gridIndex={props.gridIndex}>
          <Box
            w="100%"
            h="100%"
            backgroundSize="cover"
            transform="rotate(90deg)"
            borderRadius="0.5rem"
          />
        </AuraDrop>
      )}
      {auraCard?.id && (
        <DragWrapper gridIndex={props.gridIndex} index={0} card={auraCard} />
      )}
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
            backgroundImage: `url(${CARD_CDN}${card.img}.webp)`,
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
          <Box h="600px" minW="400px">
            {card?.type === "site" && <FullCardAtlas img={card?.img} />}
            {card?.type !== "site" && <FullCard img={card?.img} />}
          </Box>
        }
      />
    </div>
  );
};
