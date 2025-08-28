import React from 'react';
import { Box, Grid, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { LocalDeck, Card } from '../types';

interface DeckCardsProps {
  currentDeck: Partial<LocalDeck>;
  cards: Card[];
  getCardCount: (slug: string) => number;
  getCardImage: (slug: string) => string;
}

const DeckCards: React.FC<DeckCardsProps> = ({
  currentDeck,
  cards,
  getCardCount,
  getCardImage
}) => {
  const isEmpty = !currentDeck.avatar && 
    (!currentDeck.spellbook || currentDeck.spellbook.length === 0) && 
    (!currentDeck.atlas || currentDeck.atlas.length === 0);

  if (isEmpty) {
    return (
      <VStack gap={4} alignItems="stretch">
        <h2 className={css({ fontSize: '2rem', fontWeight: 700, color: 'brand.highlight' })}>
          Deck Cards
        </h2>
        <Box textAlign="center" py="4rem">
          <p className={css({ color: 'gray.400', fontSize: '1.25rem' })}>
            No cards in deck yet. Add some cards to see them here!
          </p>
        </Box>
      </VStack>
    );
  }

  return (
    <VStack gap={4} alignItems="stretch">
      <h2 className={css({ fontSize: '2rem', fontWeight: 700, color: 'brand.highlight' })}>
        Deck Cards
      </h2>
      
      <VStack gap={6} alignItems="stretch">
        {/* Avatar Section */}
        {currentDeck.avatar && (
          <Box>
            <h3 className={css({ fontSize: '1.5rem', fontWeight: 700, mb: '1rem', color: 'blue.400' })}>
              Avatar
            </h3>
            <Grid gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={4}>
              <Box position="relative">
                <img
                  src={getCardImage(currentDeck.avatar)}
                  alt={cards.find(c => c.slug === currentDeck.avatar)?.name}
                  className={css({ w: 'full', borderRadius: '0.5rem' })}
                />
              </Box>
            </Grid>
          </Box>
        )}

        {/* Spellbook Section */}
        {currentDeck.spellbook && currentDeck.spellbook.length > 0 && (
          <Box>
            <h3 className={css({ fontSize: '1.5rem', fontWeight: 700, mb: '1rem', color: 'green.400' })}>
              Spellbook ({currentDeck.spellbook.length} cards)
            </h3>
            <Grid gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4}>
              {currentDeck.spellbook.map((slug, index) => {
                const card = cards.find(c => c.slug === slug);
                const count = getCardCount(slug);
                const isFirstInstance = currentDeck.spellbook!.indexOf(slug) === index;
                
                // Only show first instance of each card with count badge
                if (!isFirstInstance) return null;
                
                return (
                  <Box key={slug} position="relative">
                    <img
                      src={getCardImage(slug)}
                      alt={card?.name}
                      className={css({ w: 'full', borderRadius: '0.5rem' })}
                    />
                    {count > 1 && (
                      <Box 
                        position="absolute" 
                        top="0.5rem" 
                        right="0.5rem" 
                        bg="green.600" 
                        color="white" 
                        borderRadius="full" 
                        w="2rem" 
                        h="2rem" 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center" 
                        fontSize="1rem" 
                        fontWeight="bold"
                      >
                        {count}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Grid>
          </Box>
        )}

        {/* Atlas Section */}
        {currentDeck.atlas && currentDeck.atlas.length > 0 && (
          <Box>
            <h3 className={css({ fontSize: '1.5rem', fontWeight: 700, mb: '1rem', color: 'purple.400' })}>
              Atlas ({currentDeck.atlas.length} sites)
            </h3>
            <Grid gridTemplateColumns="repeat(auto-fill, minmax(150px, 1fr))" gap={4}>
              {currentDeck.atlas.map((slug, index) => {
                const card = cards.find(c => c.slug === slug);
                return (
                  <Box key={`${slug}-${index}`} position="relative">
                    <img
                      src={getCardImage(slug)}
                      alt={card?.name}
                      className={css({ w: 'full', borderRadius: '0.5rem' })}
                    />
                  </Box>
                );
              })}
            </Grid>
          </Box>
        )}
      </VStack>
    </VStack>
  );
};

export default DeckCards;