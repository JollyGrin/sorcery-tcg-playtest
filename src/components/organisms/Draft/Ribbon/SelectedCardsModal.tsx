import { Box, Grid } from "styled-system/jsx";
import { Modal } from "@/components/atoms/Modal";
import { getCardImage } from "../../GameBoard/constants";
import { sortAlphabetical } from "./helpers";
import { CardDTO } from "@/utils/api/cardData/CardDataType";

export const SelectedCardsModal = ({
  cards = [],
  isOpen,
  onToggle,
}: {
  cards?: CardDTO[];
  isOpen?: boolean;
  onToggle?(): void;
}) => {
  return (
    <>
      <Modal
        wrapperProps={{ open: isOpen, onOpenChange: onToggle }}
        content={
          <Grid gridTemplateColumns="5fr 1fr" minW="80vw" minH="50vh" w="100%">
            <Grid gridTemplateColumns="repeat(auto-fit, minmax(16.4rem, 1fr))">
              {cards.sort(sortAlphabetical).map((card, index) => (
                <Box
                  key={card.slug + index}
                  width="15rem"
                  height="fit-content"
                  transition="all 0.25s ease"
                  _hover={{
                    transform: "scale(1.25)",
                  }}
                >
                  <img
                    alt="card image"
                    src={getCardImage(card.slug)}
                    height="inherit"
                    width="inherit"
                  />
                </Box>
              ))}
            </Grid>
            <Box>
              {cards.sort(sortAlphabetical).map((card, index) => {
                return <p>{card.name}</p>;
              })}
            </Box>
          </Grid>
        }
      />
    </>
  );
};
