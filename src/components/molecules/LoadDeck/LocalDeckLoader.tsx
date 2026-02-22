import React, { useState, useEffect } from 'react';
import { CuriosaResponse } from '@/utils/api/curiosa/api';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
      atlas: Object.entries(atlasCounts).map(([slug, count]) => createCard(slug, count)),
      sideboard: []
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
      <div className="text-center py-8">
        <p style={{ marginBottom: '1rem' }}>No local decks found.</p>
        <Link href="/deckbuilder">
          <Button>
            Build Your First Deck
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p style={{ marginBottom: '1rem' }}>Select a deck from your collection:</p>

      <div className="grid gap-2 mb-4 max-h-[300px] overflow-y-auto">
        {localDecks.map((deck) => (
          <div
            key={deck.id}
            className={`p-4 border-2 rounded-lg cursor-pointer ${
              selectedDeck?.id === deck.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-gray-300 bg-white'
            }`}
            onClick={() => handleSelectDeck(deck)}
          >
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{deck.name}</h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              {deck.spellbook.length} cards, {deck.atlas.length} sites
            </p>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
              Updated: {new Date(deck.updatedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      {selectedDeck && (
        <>
          <Button
            className="w-full mb-4"
            onClick={handleUseDeck}
          >
            Use &quot;{selectedDeck.name}&quot;
          </Button>

          {/* Show deck preview */}
          <div>
            <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Deck Preview:</h4>
            <div className="grid gap-1 max-h-[200px] overflow-y-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
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
            </div>
            {(selectedDeck.spellbook.length + selectedDeck.atlas.length) > 20 && (
              <p style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center', marginTop: '0.5rem' }}>
                ... and {selectedDeck.spellbook.length + selectedDeck.atlas.length - 20} more cards
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LocalDeckLoader;
