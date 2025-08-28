import React, { useState, useEffect } from 'react';
import { Box, Grid, Flex } from 'styled-system/jsx';
import { button } from 'styled-system/recipes';
import { css } from 'styled-system/css';
import { CuriosaResponse } from '@/utils/api/curiosa/api';
import { PreconMeta, PreconDeck, getPreconList, getPreconDeck, preconToCuriosaFormat, preconToLocalDeck } from '@/utils/precons';
import Link from 'next/link';

interface PreconLoaderProps {
  setDeck: (deck?: CuriosaResponse) => void;
}

const PreconLoader: React.FC<PreconLoaderProps> = ({ setDeck }) => {
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

  const handleUseDeck = () => {
    if (selectedPrecon) {
      const curiousaDeck = preconToCuriosaFormat(selectedPrecon);
      setDeck(curiousaDeck);
    }
  };

  const savePreconToLocalDecks = () => {
    if (!selectedPrecon) return;

    const localDeck = {
      id: `precon_${Date.now()}`,
      ...preconToLocalDeck(selectedPrecon),
      name: selectedPrecon.name + ' (Copy)',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    // Load existing decks
    const existing = localStorage.getItem('sorcery-decks');
    const savedDecks = existing ? JSON.parse(existing) : [];
    
    // Add new deck
    savedDecks.push(localDeck);
    localStorage.setItem('sorcery-decks', JSON.stringify(savedDecks));

    alert(`"${localDeck.name}" saved to your collection!`);
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
    return <Box textAlign="center" py="2rem">Loading preconstructed decks...</Box>;
  }

  if (precons.length === 0) {
    return (
      <Box textAlign="center" py="2rem">
        <p style={{ marginBottom: '1rem' }}>No preconstructed decks available.</p>
      </Box>
    );
  }

  return (
    <Box>
      <p style={{ marginBottom: '1rem' }}>Choose a preconstructed deck to play with:</p>
      
      <Grid gap="0.5rem" mb="1rem" maxH="300px" overflowY="auto">
        {precons.map((precon) => (
          <Box
            key={precon.id}
            p="1rem"
            border="2px solid"
            borderColor={selectedPrecon?.name === precon.name ? "blue.500" : "gray.300"}
            borderRadius="0.5rem"
            cursor="pointer"
            onClick={() => handleSelectPrecon(precon.id)}
            style={{
              backgroundColor: selectedPrecon?.name === precon.name ? 'rgba(59, 130, 246, 0.1)' : 'white'
            }}
          >
            <Flex justifyContent="space-between" alignItems="flex-start" mb="0.5rem">
              <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{precon.name}</h3>
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
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
              {precon.description}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              {precon.cardCount.total} cards ({precon.cardCount.spellbook} spellbook, {precon.cardCount.atlas} atlas)
            </p>
          </Box>
        ))}
      </Grid>

      {selectedPrecon && (
        <>
          <Flex gap="0.5rem" mb="1rem">
            <button
              className={button({ visual: 'solid' })}
              onClick={handleUseDeck}
              disabled={loadingDeck}
              style={{ flex: 1 }}
            >
              {loadingDeck ? 'Loading...' : `Use "${selectedPrecon.name}"`}
            </button>
            <button
              className={button()}
              onClick={savePreconToLocalDecks}
              disabled={loadingDeck}
            >
              Save Copy
            </button>
          </Flex>

          {/* Show deck preview */}
          <Box>
            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Deck Preview:</h4>
            <Grid gap="0.25rem" gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))" maxH="200px" overflowY="auto">
              {selectedPrecon.avatar && (
                <img
                  src={`https://card.cards.army/cards/${selectedPrecon.avatar}.webp`}
                  alt="Avatar"
                  style={{ width: '100%', borderRadius: '0.25rem' }}
                />
              )}
              {Array.from(new Set([...selectedPrecon.spellbook, ...selectedPrecon.atlas])).slice(0, 20).map((slug, index) => (
                <img
                  key={slug + index}
                  src={`https://card.cards.army/cards/${slug}.webp`}
                  alt={slug}
                  style={{ width: '100%', borderRadius: '0.25rem' }}
                />
              ))}
            </Grid>
            {(selectedPrecon.spellbook.length + selectedPrecon.atlas.length) > 20 && (
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginTop: '0.5rem' }}>
                ... and {selectedPrecon.spellbook.length + selectedPrecon.atlas.length - 20} more cards
              </p>
            )}
          </Box>
        </>
      )}

      <Box mt="1rem" p="0.75rem" bg="rgba(59,130,246,0.1)" borderRadius="0.5rem">
        <p style={{ fontSize: '0.75rem', color: '#3b82f6' }}>
          <strong>Tip:</strong> Save a copy of any precon to your collection to customize it in the{' '}
          <Link href="/deckbuilder" style={{ textDecoration: 'underline' }}>
            Deck Builder
          </Link>
          .
        </p>
      </Box>
    </Box>
  );
};

export default PreconLoader;