import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button/variants';
import { PreconMeta, PreconDeck, getPreconList, getPreconDeck, preconToLocalDeck } from '@/utils/precons';

interface PreconBrowserProps {
  onLoadPrecon: (precon: { name: string; avatar?: string; spellbook: string[]; atlas: string[]; id?: string | undefined }) => void;
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
      <div className="text-center py-16">
        <p className="text-gray-400 text-[1.25rem]">
          Loading preconstructed decks...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-stretch">
      <h2 className="text-[2rem] font-bold text-brand-highlight">
        Preconstructed Decks
      </h2>

      {precons.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-400 text-[1.25rem]">
            No preconstructed decks available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {precons.map((precon) => (
            <div
              key={precon.id}
              className={cn(
                "bg-[rgba(255,255,255,0.1)] p-4 rounded-[0.5rem] cursor-pointer hover:bg-[rgba(255,255,255,0.15)]",
                selectedPrecon?.name === precon.name
                  ? "border-2 border-blue-400"
                  : "border border-[rgba(255,255,255,0.2)]"
              )}
              onClick={() => handleSelectPrecon(precon.id)}
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

      {selectedPrecon && (
        <div>
          <button
            className={buttonVariants()}
            onClick={handleLoadForEditing}
            disabled={loadingDeck}
            style={{ width: '100%', marginBottom: '1rem' }}
          >
            {loadingDeck ? 'Loading...' : `Load "${selectedPrecon.name}" for Editing`}
          </button>

          <div>
            <h4 className="font-bold mb-2">Preview:</h4>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-2 max-h-[200px] overflow-y-auto">
              {selectedPrecon.avatar && (
                <img
                  src={`https://card.cards.army/cards/${selectedPrecon.avatar}.webp`}
                  alt="Avatar"
                  style={{ width: "100%", borderRadius: "0.25rem" }}
                />
              )}
              {Array.from(new Set([...selectedPrecon.spellbook, ...selectedPrecon.atlas])).slice(0, 15).map((slug, index) => (
                <img
                  key={slug + index}
                  src={`https://card.cards.army/cards/${slug}.webp`}
                  alt={slug}
                  style={{ width: "100%", borderRadius: "0.25rem" }}
                />
              ))}
            </div>
            {(selectedPrecon.spellbook.length + selectedPrecon.atlas.length) > 15 && (
              <p className="text-xs text-gray-500 text-center mt-2">
                ... and {selectedPrecon.spellbook.length + selectedPrecon.atlas.length - 15} more cards
              </p>
            )}
          </div>
        </div>
      )}

      <div className="p-3 bg-[rgba(59,130,246,0.1)] rounded-[0.5rem]">
        <p className="text-xs text-blue-400">
          <strong>Tip:</strong> Load any precon to customize it and save your own version.
        </p>
      </div>
    </div>
  );
};

export default PreconBrowser;
