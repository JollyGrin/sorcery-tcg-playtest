import React, { useState, useEffect } from 'react';
import { Box, Flex, Grid, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { LocalDeck, Card } from '../types';
import { PreconMeta, getPreconList, getPreconDeck, preconToLocalDeck } from '@/utils/precons';

interface MyDecksProps {
  savedDecks: LocalDeck[];
  editingDeckId: string | null;
  cards: Card[];
  onLoadDeck: (deck: LocalDeck) => void;
  onDeleteDeck: (deckId: string) => void;
  onLoadPrecon: (precon: { name: string; avatar?: string; spellbook: string[]; atlas: string[]; id?: string | undefined }) => void;
}

const MyDecks: React.FC<MyDecksProps> = ({
  savedDecks,
  editingDeckId,
  cards,
  onLoadDeck,
  onDeleteDeck,
  onLoadPrecon
}) => {
  const [precons, setPrecons] = useState<PreconMeta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrecons();
  }, []);

  const loadPrecons = async () => {
    try {
      const preconList = await getPreconList();
      setPrecons(preconList);
    } catch (error) {
      console.error('Error loading precons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadPrecon = async (preconId: string) => {
    try {
      const preconData = await getPreconDeck(preconId);
      if (preconData) {
        const localDeck = preconToLocalDeck(preconData);
        onLoadPrecon({
          ...localDeck,
          name: preconData.name + ' (Copy)',
          id: undefined // Make it a new deck
        });
      }
    } catch (error) {
      console.error('Error loading precon:', error);
    }
  };

  const getElementColor = (element: string) => {
    switch (element.toLowerCase()) {
      case 'earth': return '#8B4513';
      case 'fire': return '#DC2626';
      case 'water': return '#2563EB';
      case 'air': return '#7C3AED';
      default: return '#6B7280';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '#10B981';
      case 'intermediate': return '#F59E0B';
      case 'advanced': return '#EF4444';
      default: return '#6B7280';
    }
  };
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

      {/* Divider */}
      <Box w="100%" h="1px" bg="rgba(255,255,255,0.2)" my="2rem" />

      {/* Precons Section */}
      <h2 className={css({ fontSize: '2rem', fontWeight: 700, color: 'brand.highlight' })}>
        Preconstructed Decks
      </h2>
      
      {loading ? (
        <Box textAlign="center" py="2rem">
          <p className={css({ color: 'gray.400', fontSize: '1.25rem' })}>
            Loading preconstructed decks...
          </p>
        </Box>
      ) : precons.length === 0 ? (
        <Box textAlign="center" py="2rem">
          <p className={css({ color: 'gray.400', fontSize: '1.25rem' })}>
            No preconstructed decks available.
          </p>
        </Box>
      ) : (
        <Grid gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
          {precons.map((precon) => (
            <Box
              key={precon.id}
              bg="rgba(255,255,255,0.05)"
              p="1rem"
              borderRadius="0.5rem"
              cursor="pointer"
              className={css({
                _hover: { bg: 'rgba(255,255,255,0.1)' },
                border: '1px solid rgba(255,255,255,0.1)'
              })}
              onClick={() => handleLoadPrecon(precon.id)}
            >
              <Flex justifyContent="space-between" alignItems="flex-start" mb="0.5rem">
                <h3 className={css({ fontWeight: 'bold', fontSize: '1.125rem', mb: '0.5rem' })}>
                  {precon.name}
                </h3>
                <Flex gap="0.5rem">
                  <span 
                    style={{ 
                      fontSize: '0.75rem', 
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      backgroundColor: getElementColor(precon.element),
                      color: 'white',
                      textTransform: 'capitalize'
                    }}
                  >
                    {precon.element}
                  </span>
                  <span 
                    style={{ 
                      fontSize: '0.75rem', 
                      padding: '0.25rem 0.5rem',
                      borderRadius: '0.25rem',
                      backgroundColor: getDifficultyColor(precon.difficulty),
                      color: 'white',
                      textTransform: 'capitalize'
                    }}
                  >
                    {precon.difficulty}
                  </span>
                </Flex>
              </Flex>
              <p className={css({ fontSize: '0.875rem', color: 'gray.400', mb: '0.5rem' })}>
                {precon.description}
              </p>
              <p className={css({ fontSize: '0.75rem', color: 'gray.500' })}>
                {precon.cardCount.total} cards ({precon.cardCount.spellbook} spellbook, {precon.cardCount.atlas} atlas)
              </p>
            </Box>
          ))}
        </Grid>
      )}

      <Box p="0.75rem" bg="rgba(59,130,246,0.1)" borderRadius="0.5rem">
        <p className={css({ fontSize: '0.75rem', color: 'blue.400' })}>
          <strong>Tip:</strong> Click any precon to load it as a new deck. You can then customize it and save your own version.
        </p>
      </Box>
    </VStack>
  );
};

export default MyDecks;