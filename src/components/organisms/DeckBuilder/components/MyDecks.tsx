import React from 'react';
import { Box, Flex, Grid, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { LocalDeck, Card } from '../types';

interface MyDecksProps {
  savedDecks: LocalDeck[];
  editingDeckId: string | null;
  cards: Card[];
  onLoadDeck: (deck: LocalDeck) => void;
  onDeleteDeck: (deckId: string) => void;
}

const MyDecks: React.FC<MyDecksProps> = ({
  savedDecks,
  editingDeckId,
  cards,
  onLoadDeck,
  onDeleteDeck
}) => {
  return (
    <VStack gap={4} alignItems="stretch">
      <h2 className={css({ fontSize: '2rem', fontWeight: 700, color: 'brand.highlight' })}>
        My Decks
      </h2>
      {savedDecks.length === 0 ? (
        <Box textAlign="center" py="4rem">
          <p className={css({ color: 'gray.400', fontSize: '1.25rem' })}>
            No saved decks yet. Build your first deck!
          </p>
        </Box>
      ) : (
        <Grid gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
          {savedDecks.map((deck) => (
            <Box
              key={deck.id}
              bg="rgba(255,255,255,0.1)"
              p="1rem"
              borderRadius="0.5rem"
              cursor="pointer"
              className={css({
                _hover: { bg: 'rgba(255,255,255,0.15)' },
                border: editingDeckId === deck.id ? '2px solid' : '1px solid',
                borderColor: editingDeckId === deck.id ? 'blue.400' : 'rgba(255,255,255,0.2)'
              })}
              onClick={() => onLoadDeck(deck)}
            >
              <h3 className={css({ fontWeight: 'bold', fontSize: '1.125rem', mb: '0.5rem' })}>
                {deck.name}
              </h3>
              <p className={css({ fontSize: '0.875rem', color: 'gray.400', mb: '0.5rem' })}>
                {deck.spellbook.length} cards, {deck.atlas.length} sites
              </p>
              <p className={css({ fontSize: '0.75rem', color: 'gray.500' })}>
                {deck.avatar && cards.find(c => c.slug === deck.avatar)?.name}
              </p>
              <Flex justifyContent="space-between" alignItems="center" mt="1rem">
                <span className={css({ fontSize: '0.75rem', color: 'gray.500' })}>
                  {new Date(deck.updatedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteDeck(deck.id);
                  }}
                  className={css({
                    color: 'red.400',
                    _hover: { color: 'red.300' },
                    fontSize: '0.875rem'
                  })}
                >
                  Delete
                </button>
              </Flex>
            </Box>
          ))}
        </Grid>
      )}
    </VStack>
  );
};

export default MyDecks;