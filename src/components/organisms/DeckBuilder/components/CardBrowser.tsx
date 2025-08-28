import React from 'react';
import { Box, Flex, Grid } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { Card } from '../types';

interface CardBrowserProps {
  cards: Card[];
  searchQuery: string;
  selectedType: string;
  onAddCard: (card: Card) => void;
  getCardCount: (slug: string) => number;
  getCardImage: (slug: string) => string;
}

const CardBrowser: React.FC<CardBrowserProps> = ({
  cards,
  searchQuery,
  selectedType,
  onAddCard,
  getCardCount,
  getCardImage
}) => {
  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || card.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Grid
        gridTemplateColumns={{
          base: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        gap={4}
      >
        {filteredCards.slice(0, 100).map((card) => (
          <Box
            key={card.slug}
            position="relative"
            cursor="pointer"
            onClick={() => onAddCard(card)}
            className={css({
              _hover: {
                "& img": { boxShadow: "lg", transform: "scale(1.05)" },
                "& .overlay": { opacity: 1, bg: "rgba(0,0,0,0.5)" },
              },
            })}
          >
            <img
              src={getCardImage(card.slug)}
              alt={card.name}
              className={css({
                w: "full",
                borderRadius: "0.5rem",
                transition: "all 0.2s",
              })}
              loading="lazy"
            />
            <Flex
              className="overlay"
              position="absolute"
              inset={0}
              bg="transparent"
              opacity={0}
              transition="all 0.2s"
              borderRadius="0.5rem"
              alignItems="center"
              justifyContent="center"
            >
              <span
                className={css({
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                })}
              >
                +
              </span>
            </Flex>
            {getCardCount(card.slug) > 0 && (
              <Box
                position="absolute"
                top="0.5rem"
                right="0.5rem"
                bg="blue.600"
                color="white"
                borderRadius="full"
                w="1.5rem"
                h="1.5rem"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="0.875rem"
                fontWeight="bold"
              >
                {getCardCount(card.slug)}
              </Box>
            )}
          </Box>
        ))}
      </Grid>

      {filteredCards.length > 100 && (
        <p
          className={css({
            color: "gray.400",
            textAlign: "center",
            mt: "1rem",
            mb: "1rem",
          })}
        >
          Showing first 100 results. Use search to narrow down.
        </p>
      )}
    </>
  );
};

export default CardBrowser;