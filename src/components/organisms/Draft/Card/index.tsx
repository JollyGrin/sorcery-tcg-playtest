import { CardImage } from "@/components/atoms/card-view/card";
import { Box, Flex, Grid } from "styled-system/jsx";
import Tilt, { GlareProps } from "react-parallax-tilt";
import { useState } from "react";
import { CardDTO } from "@/utils/api/cardData/CardDataType";

export const DraftCard = (cardDTO: CardDTO) => {
  const [isOver, setIsOver] = useState(false);
  function over() {
    setIsOver(true);
  }
  function out() {
    setIsOver(false);
  }

  return (
    <Box
      transition="all 0.25s ease"
      style={{
        zIndex: isOver ? 10000 : 1,
        transform:
          isOver && cardDTO.guardian.type === "Site" ? " rotate(90deg)" : "",
        filter: isOver ? `saturate(1.5)` : "saturate(1)",
      }}
    >
      <Tilt {...tiltOptions} scale={isOver ? 1.2 : 1}>
        <Flex
          justifyContent="center"
          w="100%"
          h="23.5rem"
          // bg="plum"
          onMouseOver={over}
          onMouseOut={out}
          alignItems="center"
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
