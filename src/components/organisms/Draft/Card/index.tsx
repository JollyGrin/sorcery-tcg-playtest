import { CardImage } from "@/components/atoms/card-view/card";
import { Box, Flex } from "styled-system/jsx";
import Tilt, { GlareProps } from "react-parallax-tilt";
import { useState } from "react";
import { CardDTO } from "@/utils/api/cardData/CardDataType";

export const DraftCard = ({
  isSelected,
  onSelect,
  ...cardDTO
}: CardDTO & {
  isSelected?: boolean;
  onSelect?(): void;
}) => {
  const [isOver, setIsOver] = useState(false);
  function over() {
    setIsOver(true);
  }
  function out() {
    setIsOver(false);
  }

  const rarityColor: Record<CardDTO["guardian"]["rarity"], string> = {
    Ordinary: "#fff",
    Exceptional: "rgba(0,100,150,1)",
    Elite: "rgba(150,0,250,1)",
    Unique: "rgba(230,180,50,1)",
  };

  return (
    <Box
      data-testid={"draftcard-" + cardDTO.slug}
      transition="all 0.25s ease"
      style={{
        zIndex: isOver ? 10000 : 1,
        transform:
          isOver && cardDTO.guardian.type === "Site" ? " rotate(90deg)" : "",
        filter: isOver || isSelected ? `saturate(1.5)` : "saturate(1)",
      }}
    >
      <Tilt
        {...tiltOptions}
        glareColor={rarityColor[cardDTO.guardian.rarity]}
        scale={isOver ? 1.3 : 1}
      >
        <Flex
          justifyContent="center"
          w="100%"
          h="23.5rem"
          filter="drop-shadow(0 0 5px rgba(0,0,0,0.35))"
          onMouseOver={over}
          onMouseOut={out}
          alignItems="center"
          onClick={onSelect}
          borderRadius="0.5rem"
          overflow="clip"
          style={{
            background: isSelected ? "rgba(0,250,100,0.5)" : "",
          }}
        >
          <CardImage img={cardDTO.slug} />
        </Flex>
      </Tilt>
    </Box>
  );
};

const glareOptions: GlareProps = {
  glareEnable: true,
  glareColor: "lightblue",
  glareMaxOpacity: 0.25,
  glarePosition: "all",
};
const tiltOptions = {
  ...glareOptions,
};
