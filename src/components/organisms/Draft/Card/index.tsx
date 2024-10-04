import { CardImage } from "@/components/atoms/card-view/card";
import { Box, Flex, Grid } from "styled-system/jsx";

export const DraftCard = () => {
  return (
    <Flex justifyContent="center" w="16.4rem" h="23rem" bg="plum">
      <CardImage img="battlemage" />
    </Flex>
  );
};
