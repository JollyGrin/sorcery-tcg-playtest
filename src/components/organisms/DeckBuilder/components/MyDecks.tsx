import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
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
    <div className="flex flex-col gap-4 items-stretch">
      <h2 className="text-[2rem] font-bold text-brand-highlight">
        My Decks
      </h2>
      {savedDecks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-[1.25rem]">
            No saved decks yet. Build your first deck!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {savedDecks.map((deck) => (
            <div
              key={deck.id}
              className={cn(
                "bg-[rgba(255,255,255,0.1)] p-4 rounded-[0.5rem] cursor-pointer hover:bg-[rgba(255,255,255,0.15)]",
                editingDeckId === deck.id
                  ? "border-2 border-blue-400"
                  : "border border-[rgba(255,255,255,0.2)]"
              )}
              onClick={() => onLoadDeck(deck)}
            >
              <h3 className="font-bold text-[1.125rem] mb-2">
                {deck.name}
              </h3>
              <p className="text-sm text-gray-400 mb-2">
                {deck.spellbook.length} cards, {deck.atlas.length} sites
              </p>
              <p className="text-xs text-gray-500">
                {deck.avatar && cards.find(c => c.slug === deck.avatar)?.name}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">
                  {new Date(deck.updatedAt).toLocaleDateString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteDeck(deck.id);
                  }}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-[rgba(255,255,255,0.2)] my-8" />

      {/* Precons Section */}
      <h2 className="text-[2rem] font-bold text-brand-highlight">
        Preconstructed Decks
      </h2>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-[1.25rem]">
            Loading preconstructed decks...
          </p>
        </div>
      ) : precons.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-[1.25rem]">
            No preconstructed decks available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {precons.map((precon) => (
            <div
              key={precon.id}
              className="bg-[rgba(255,255,255,0.05)] p-4 rounded-[0.5rem] cursor-pointer hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)]"
              onClick={() => handleLoadPrecon(precon.id)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-[1.125rem] mb-2">
                  {precon.name}
                </h3>
                <div className="flex gap-2">
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
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-2">
                {precon.description}
              </p>
              <p className="text-xs text-gray-500">
                {precon.cardCount.total} cards ({precon.cardCount.spellbook} spellbook, {precon.cardCount.atlas} atlas)
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="p-3 bg-[rgba(59,130,246,0.1)] rounded-[0.5rem]">
        <p className="text-xs text-blue-400">
          <strong>Tip:</strong> Click any precon to load it as a new deck. You can then customize it and save your own version.
        </p>
      </div>
    </div>
  );
};

export default MyDecks;
