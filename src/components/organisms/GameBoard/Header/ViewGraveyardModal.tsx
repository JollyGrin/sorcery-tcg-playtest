import { CardImage } from "@/components/atoms/card-view/card";
import { Modal } from "@/components/atoms/Modal";
import { GridItem } from "@/types/card";
import { css } from "styled-system/css";
import { Box, Flex, styled } from "styled-system/jsx";

export const ViewGraveyardModal = (props: {
  cards: GridItem;
  onClose(): void;
}) => {
  return (
    <Modal
      wrapperProps={{ open: true, onOpenChange: props.onClose }}
      content={
        <Box>
          <p
            className={css({
              fontSize: "2rem",
              fontWeight: 600,
            })}
          >
            Graveyard
          </p>
          <Flex minW="50vw" minH="20vh" flexWrap="wrap">
            {props.cards?.map((card) => (
              <Box
                key={card.id}
                aspectRatio={8 / 11}
                h="350px"
                position="relative"
                filter="saturate(1)"
                _hover={{
                  filter: "saturate(1.75)",
                }}
              >
                <CardImage key={card.id} img={card.img} minH={"0"} />
              </Box>
            ))}
          </Flex>
        </Box>
      }
    />
  );
};
