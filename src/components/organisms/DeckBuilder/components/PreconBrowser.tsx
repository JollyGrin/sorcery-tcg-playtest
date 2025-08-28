import React, { useState, useEffect } from 'react';
import { Box, Grid, Flex, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { button } from 'styled-system/recipes';
import { PreconMeta, PreconDeck, getPreconList, getPreconDeck, preconToLocalDeck } from '@/utils/precons';

interface PreconBrowserProps {
  onLoadPrecon: (precon: Partial<any>) => void;
}

const PreconBrowser: React.FC<PreconBrowserProps> = ({ onLoadPrecon }) => {
  const [precons, setPrecons] = useState<PreconMeta[]>([]);
  const [selectedPrecon, setSelectedPrecon] = useState<PreconDeck | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDeck, setLoadingDeck] = useState(false);

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

  const handleSelectPrecon = async (preconId: string) => {
    setLoadingDeck(true);
    try {
      const precon = await getPreconDeck(preconId);
      setSelectedPrecon(precon);
    } catch (error) {
      console.error('Error loading precon deck:', error);
    } finally {
      setLoadingDeck(false);
    }
  };

  const handleLoadForEditing = () => {
    if (selectedPrecon) {
      const localDeck = preconToLocalDeck(selectedPrecon);
      onLoadPrecon({
        ...localDeck,
        name: selectedPrecon.name + ' (Copy)'
      });
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

  if (loading) {
    return (
      <Box textAlign="center" py="4rem">
        <p className={css({ color: 'gray.400', fontSize: '1.25rem' })}>
          Loading preconstructed decks...
        </p>
      </Box>
    );
  }

  return (
    <VStack gap={4} alignItems="stretch">
      <h2 className={css({ fontSize: '2rem', fontWeight: 700, color: 'brand.highlight' })}>
        Preconstructed Decks
      </h2>
      
      {precons.length === 0 ? (
        <Box textAlign="center" py="4rem">
          <p className={css({ color: 'gray.400', fontSize: '1.25rem' })}>
            No preconstructed decks available.
          </p>
        </Box>
      ) : (
        <Grid gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
          {precons.map((precon) => (
            <Box
              key={precon.id}
              bg="rgba(255,255,255,0.1)"
              p="1rem"
              borderRadius="0.5rem"
              cursor="pointer"
              className={css({
                _hover: { bg: 'rgba(255,255,255,0.15)' },
                border: selectedPrecon?.name === precon.name ? '2px solid' : '1px solid',
                borderColor: selectedPrecon?.name === precon.name ? 'blue.400' : 'rgba(255,255,255,0.2)'
              })}
              onClick={() => handleSelectPrecon(precon.id)}
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

      {selectedPrecon && (
        <Box>
          <button
            className={button({ visual: 'solid' })}
            onClick={handleLoadForEditing}
            disabled={loadingDeck}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {loadingDeck ? 'Loading...' : `Load "${selectedPrecon.name}" for Editing`}
          </button>

          <Box>
            <h4 className={css({ fontWeight: 'bold', mb: '0.5rem' })}>Preview:</h4>
            <Grid gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))" gap={2} maxH="200px" overflowY="auto">
              {selectedPrecon.avatar && (
                <img
                  src={`https://card.cards.army/cards/${selectedPrecon.avatar}.webp`}
                  alt="Avatar"
                  className={css({ w: 'full', borderRadius: '0.25rem' })}
                />
              )}
              {Array.from(new Set([...selectedPrecon.spellbook, ...selectedPrecon.atlas])).slice(0, 15).map((slug, index) => (
                <img
                  key={slug + index}
                  src={`https://card.cards.army/cards/${slug}.webp`}
                  alt={slug}
                  className={css({ w: 'full', borderRadius: '0.25rem' })}
                />
              ))}
            </Grid>
            {(selectedPrecon.spellbook.length + selectedPrecon.atlas.length) > 15 && (
              <p className={css({ fontSize: '0.75rem', color: 'gray.500', textAlign: 'center', mt: '0.5rem' })}>
                ... and {selectedPrecon.spellbook.length + selectedPrecon.atlas.length - 15} more cards
              </p>
            )}
          </Box>
        </Box>
      )}

      <Box p="0.75rem" bg="rgba(59,130,246,0.1)" borderRadius="0.5rem">
        <p className={css({ fontSize: '0.75rem', color: 'blue.400' })}>
          <strong>Tip:</strong> Load any precon to customize it and save your own version.
        </p>
      </Box>
    </VStack>
  );
};

export default PreconBrowser;