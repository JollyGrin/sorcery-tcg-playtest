import { Box, Flex, Grid } from "styled-system/jsx";
import { Modal } from "@/components/atoms/Modal";
import { getCardImage } from "../../GameBoard/constants";
import { sortAlphabetical } from "./helpers";
import { CardDTO } from "@/utils/api/cardData/CardDataType";
import { Button } from "@/components/ui/button";

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
          <Grid
            gridTemplateColumns="4fr 1fr"
            minW="70vw"
            minH="50vh"
            maxH="70vh"
            w="100%"
          >
            <Flex
              flexWrap="wrap"
              gap="0.25rem"
              h="100%"
              overflowY="auto"
              overflowX="clip"
            >
              {cards.sort(sortAlphabetical).map((card, index) => (
                <Box
                  key={card.slug + index}
                  width="18rem"
                  height="fit-content"
                  transition="all 0.25s ease"
                  _hover={{
                    transform: `scale(1.25) ${card.guardian.type === "Site" ? "rotate(90deg)" : ""}`,
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
            </Flex>
            <Box>
              {cards
                .sort(sortAlphabetical)
                .reduce<{ name: string; count: number }[]>(
                  (acc, card: Card) => {
                    const existingCard = acc.find(
                      (item) => item.name === card.name,
                    );
                    if (existingCard) {
                      existingCard.count += 1;
                    } else {
                      acc.push({ name: card.name, count: 1 });
                    }
                    return acc;
                  },
                  [],
                )
                .map((card, index) => {
                  return (
                    <Grid gridTemplateColumns="1.5rem auto">
                      <p>{card.count}x</p>
                      <p>{card.name}</p>
                    </Grid>
                  );
                })}
              <Button mt="2rem" w="100%">
                Copy Bulk List
              </Button>
            </Box>
          </Grid>
        }
      />
    </>
  );
};
