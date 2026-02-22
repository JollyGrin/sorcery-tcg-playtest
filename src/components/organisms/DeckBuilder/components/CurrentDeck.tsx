import React, { useState } from 'react';
import { buttonVariants } from '@/components/ui/button/variants';
import { inputVariants } from '@/components/ui/input/variants';
import { LocalDeck, Card } from '../types';
import ExportModal from './ExportModal';

interface CurrentDeckProps {
  currentDeck: Partial<LocalDeck>;
  setCurrentDeck: React.Dispatch<React.SetStateAction<Partial<LocalDeck>>>;
  cards: Card[];
  editingDeckId: string | null;
  onRemoveCard: (slug: string, type: string) => void;
  onSave: () => void;
  getCardCount: (slug: string) => number;
}

const CurrentDeck: React.FC<CurrentDeckProps> = ({
  currentDeck,
  setCurrentDeck,
  cards,
  editingDeckId,
  onRemoveCard,
  onSave,
  getCardCount
}) => {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div
      className="sticky top-[72px] h-[calc(100vh-72px)] bg-surface-raised border-l border-[rgba(255,255,255,0.1)] p-6 overflow-y-auto"
    >
      <h2
        className="text-[1.5rem] font-bold mb-4 text-brand-highlight"
      >
        {editingDeckId ? 'Editing Deck' : 'Current Deck'}
      </h2>

      <input
        type="text"
        placeholder="Deck Name"
        className={inputVariants()}
        value={currentDeck.name}
        onChange={(e) =>
          setCurrentDeck((prev) => ({ ...prev, name: e.target.value }))
        }
        style={{ width: "100%", marginBottom: "1rem" }}
      />

      <div className="flex flex-col gap-4 items-stretch">
        {/* Avatar Section */}
        <div>
          <h3
            className="font-bold text-[1.125rem] mb-2 text-blue-400"
          >
            Avatar
          </h3>
          {currentDeck.avatar ? (
            <div
              className="flex items-center justify-between bg-[rgba(255,255,255,0.1)] p-2 rounded-[0.25rem]"
            >
              <span className="text-sm">
                {cards.find((c) => c.slug === currentDeck.avatar)?.name}
              </span>
              <button
                onClick={() => onRemoveCard(currentDeck.avatar!, "avatar")}
                className="text-red-400 hover:text-red-300 cursor-pointer text-sm"
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No avatar selected
            </p>
          )}
        </div>

        {/* Spellbook Section */}
        <div>
          <h3
            className="font-bold text-[1.125rem] mb-2 text-green-400"
          >
            Spellbook ({currentDeck.spellbook?.length || 0} cards)
          </h3>
          <div className="flex flex-col gap-1 max-h-80 overflow-y-auto pr-2">
            {Array.from(new Set(currentDeck.spellbook || [])).map((slug) => {
              const card = cards.find((c) => c.slug === slug);
              const count = getCardCount(slug);
              return (
                <div
                  key={slug}
                  className="flex items-center justify-between bg-[rgba(255,255,255,0.1)] p-2 rounded-[0.25rem]"
                >
                  <span className="text-sm">
                    {count}x {card?.name}
                  </span>
                  <button
                    onClick={() => onRemoveCard(slug, "spellbook")}
                    className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                  >
                    -1
                  </button>
                </div>
              );
            })}
          </div>
          {(!currentDeck.spellbook || currentDeck.spellbook.length === 0) && (
            <p className="text-gray-500 text-sm">
              No cards in spellbook
            </p>
          )}
        </div>

        {/* Atlas Section */}
        <div>
          <h3
            className="font-bold text-[1.125rem] mb-2 text-purple-400"
          >
            Atlas ({currentDeck.atlas?.length || 0} sites)
          </h3>
          <div className="flex flex-col gap-1 max-h-40 overflow-y-auto pr-2">
            {(currentDeck.atlas || []).map((slug, index) => {
              const card = cards.find((c) => c.slug === slug);
              return (
                <div
                  key={`${slug}-${index}`}
                  className="flex items-center justify-between bg-[rgba(255,255,255,0.1)] p-2 rounded-[0.25rem]"
                >
                  <span className="text-sm">
                    {card?.name}
                  </span>
                  <button
                    onClick={() => onRemoveCard(slug, "site")}
                    className="text-red-400 hover:text-red-300 text-xs cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              );
            })}
          </div>
          {(!currentDeck.atlas || currentDeck.atlas.length === 0) && (
            <p className="text-gray-500 text-sm">
              No sites in atlas
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-6">
        <button
          className={buttonVariants()}
          style={{ width: "100%" }}
          onClick={onSave}
        >
          {editingDeckId ? 'Update Deck' : 'Save to My Decks'}
        </button>
        <button
          className={buttonVariants()}
          style={{ width: "100%" }}
          onClick={() => setShowExportModal(true)}
        >
          Export Deck
        </button>
      </div>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        deck={currentDeck}
        cards={cards}
      />
    </div>
  );
};

export default CurrentDeck;
