import React, { useState, useEffect } from 'react';
import { Box, Grid } from 'styled-system/jsx';
import { button } from 'styled-system/recipes';
import { CuriosaResponse } from '@/utils/api/curiosa/api';
import Link from 'next/link';

interface LocalDeck {
  id: string;
  name: string;
  avatar: string;
  spellbook: string[];
  atlas: string[];
  createdAt: number;
  updatedAt: number;
}

interface LocalDeckLoaderProps {
  setDeck: (deck?: CuriosaResponse) => void;
}

const LocalDeckLoader: React.FC<LocalDeckLoaderProps> = ({ setDeck }) => {
  const [localDecks, setLocalDecks] = useState<LocalDeck[]>([]);
  const [selectedDeck, setSelectedDeck] = useState<LocalDeck | null>(null);

  useEffect(() => {
    loadLocalDecks();
  }, []);

  const loadLocalDecks = () => {
    const saved = localStorage.getItem('sorcery-decks');
    if (saved) {
      const decks = JSON.parse(saved);
      setLocalDecks(decks);
    }
  };

  // Convert LocalDeck format to CuriosaResponse format
  const convertToCuriosaFormat = (localDeck: LocalDeck): CuriosaResponse => {
    const createCard = (slug: string, quantity: number = 1) => ({
      identifier: slug,
      name: slug,
      cost: 0,
      attack: 0,
      defence: 0,
      life: 0,
      thresholds: { air: 0, earth: 0, fire: 0, water: 0 },
      rulesText: '',
      type: '',
      subTypes: '',
      rarity: '',
      elements: '',
      keywords: [],
      quantity
    });

    // Count occurrences of each card in spellbook
    const spellbookCounts = localDeck.spellbook.reduce((acc, slug) => {
      acc[slug] = (acc[slug] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Count occurrences of each card in atlas
    const atlasCounts = localDeck.atlas.reduce((acc, slug) => {
      acc[slug] = (acc[slug] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      avatar: localDeck.avatar ? [createCard(localDeck.avatar, 1)] : [],
      spellbook: Object.entries(spellbookCounts).map(([slug, count]) => createCard(slug, count)),
      atlas: Object.entries(atlasCounts).map(([slug, count]) => createCard(slug, count))
    };
  };

  const handleSelectDeck = (deck: LocalDeck) => {
    setSelectedDeck(deck);
  };

  const handleUseDeck = () => {
    if (selectedDeck) {
      const curiousaDeck = convertToCuriosaFormat(selectedDeck);
      setDeck(curiousaDeck);
    }
  };

  if (localDecks.length === 0) {
    return (
      <Box textAlign="center" py="2rem">
        <p style={{ marginBottom: '1rem' }}>No local decks found.</p>
        <Link href="/deckbuilder">
          <button className={button({ visual: 'solid' })}>
            Build Your First Deck
          </button>
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <p style={{ marginBottom: '1rem' }}>Select a deck from your collection:</p>
      
      <Grid gap="0.5rem" mb="1rem" maxH="300px" overflowY="auto">
        {localDecks.map((deck) => (
          <Box
            key={deck.id}
            p="1rem"
            border="2px solid"
            borderColor={selectedDeck?.id === deck.id ? "blue.500" : "gray.300"}
            borderRadius="0.5rem"
            cursor="pointer"
            onClick={() => handleSelectDeck(deck)}
            style={{
              backgroundColor: selectedDeck?.id === deck.id ? 'rgba(59, 130, 246, 0.1)' : 'white'
            }}
          >
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{deck.name}</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {deck.spellbook.length} cards, {deck.atlas.length} sites
            </p>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              Updated: {new Date(deck.updatedAt).toLocaleDateString()}
            </p>
          </Box>
        ))}
      </Grid>

      {selectedDeck && (
        <>
          <button
            className={button()}
            style={{ width: '100%', marginBottom: '1rem' }}
            onClick={handleUseDeck}
          >
            Use "{selectedDeck.name}"
          </button>

          {/* Show deck preview */}
          <Box>
            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Deck Preview:</h4>
            <Grid gap="0.25rem" gridTemplateColumns="repeat(auto-fill, minmax(120px, 1fr))" maxH="200px" overflowY="auto">
              {selectedDeck.avatar && (
                <img
                  src={`https://card.cards.army/cards/${selectedDeck.avatar}.webp`}
                  alt="Avatar"
                  style={{ width: '100%', borderRadius: '0.25rem' }}
                />
              )}
              {Array.from(new Set([...selectedDeck.spellbook, ...selectedDeck.atlas])).slice(0, 20).map((slug, index) => (
                <img
                  key={slug + index}
                  src={`https://card.cards.army/cards/${slug}.webp`}
                  alt={slug}
                  style={{ width: '100%', borderRadius: '0.25rem' }}
                />
              ))}
            </Grid>
            {(selectedDeck.spellbook.length + selectedDeck.atlas.length) > 20 && (
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginTop: '0.5rem' }}>
                ... and {selectedDeck.spellbook.length + selectedDeck.atlas.length - 20} more cards
              </p>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default LocalDeckLoader;