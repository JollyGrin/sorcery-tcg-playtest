import React from "react";
import { buttonVariants } from "@/components/ui/button/variants";
import { LocalDeck, Card } from "../types";
import { FiSave, FiShare2, FiX, FiMinus } from "react-icons/fi";

interface CurrentDeckProps {
  currentDeck: Partial<LocalDeck>;
  setCurrentDeck: React.Dispatch<React.SetStateAction<Partial<LocalDeck>>>;
  cards: Card[];
  editingDeckId: string | null;
  onRemoveCard: (slug: string, type: string) => void;
  onSave: () => void;
  getCardCount: (slug: string) => number;
  onExport: () => void;
}

const CurrentDeck: React.FC<CurrentDeckProps> = ({
  currentDeck,
  setCurrentDeck,
  cards,
  editingDeckId,
  onRemoveCard,
  onSave,
  getCardCount,
  onExport,
}) => {

  const totalCards =
    (currentDeck.spellbook?.length || 0) +
    (currentDeck.atlas?.length || 0) +
    (currentDeck.avatar ? 1 : 0);

  return (
    <div className="sticky top-[72px] h-[calc(100vh-72px)] deckbuilder-panel p-5 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="deck-section-header">
            {editingDeckId ? "Editing" : "Building"}
          </span>
          <p className="text-text-muted text-xs mt-0.5">
            {totalCards} card{totalCards !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex gap-1.5">
          <button
            className="filter-chip p-2 rounded-md cursor-pointer text-text-secondary hover:text-accent-gold"
            onClick={onSave}
            title={editingDeckId ? "Update Deck" : "Save to My Decks"}
          >
            <FiSave className="w-4 h-4" />
          </button>
          <button
            className="filter-chip p-2 rounded-md cursor-pointer text-text-secondary hover:text-accent-gold"
            onClick={onExport}
            title="Export Deck"
          >
            <FiShare2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Deck Name */}
      <input
        type="text"
        placeholder="Deck Name"
        className="w-full bg-white/5 border border-white/8 rounded-md px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-gold/40 mb-4"
        value={currentDeck.name}
        onChange={(e) =>
          setCurrentDeck((prev) => ({ ...prev, name: e.target.value }))
        }
      />

      {/* Avatar Section */}
      <div className="mb-4">
        <span className="deck-section-header text-blue-400/80">Avatar</span>
        {currentDeck.avatar ? (
          <div className="mt-2 flex items-center justify-between bg-white/5 border border-white/6 p-2 rounded-md group">
            <span className="text-sm text-text-primary truncate">
              {cards.find((c) => c.slug === currentDeck.avatar)?.name}
            </span>
            <button
              onClick={() => onRemoveCard(currentDeck.avatar!, "avatar")}
              className="text-text-muted hover:text-red-400 cursor-pointer p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <p className="text-text-muted text-xs mt-1 italic">
            No avatar selected
          </p>
        )}
      </div>

      {/* Spellbook Section */}
      <div className="mb-4">
        <span className="deck-section-header text-green-400/80">
          Spellbook ({currentDeck.spellbook?.length || 0})
        </span>
        <div className="mt-2 flex flex-col gap-0.5 max-h-72 overflow-y-auto pr-1">
          {Array.from(new Set(currentDeck.spellbook || [])).map((slug) => {
            const card = cards.find((c) => c.slug === slug);
            const count = getCardCount(slug);
            return (
              <div
                key={slug}
                className="flex items-center justify-between bg-white/4 hover:bg-white/6 p-1.5 px-2.5 rounded group transition-colors"
              >
                <span className="text-sm text-text-secondary">
                  <span className="text-text-muted font-mono text-xs mr-1.5">
                    {count}x
                  </span>
                  {card?.name}
                </span>
                <button
                  onClick={() => onRemoveCard(slug, "spellbook")}
                  className="text-text-muted hover:text-red-400 text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                >
                  <FiMinus className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
        {(!currentDeck.spellbook || currentDeck.spellbook.length === 0) && (
          <p className="text-text-muted text-xs mt-1 italic">
            No cards in spellbook
          </p>
        )}
      </div>

      {/* Atlas Section */}
      <div className="mb-4">
        <span className="deck-section-header text-purple-400/80">
          Atlas ({currentDeck.atlas?.length || 0})
        </span>
        <div className="mt-2 flex flex-col gap-0.5 max-h-36 overflow-y-auto pr-1">
          {(currentDeck.atlas || []).map((slug, index) => {
            const card = cards.find((c) => c.slug === slug);
            return (
              <div
                key={`${slug}-${index}`}
                className="flex items-center justify-between bg-white/4 hover:bg-white/6 p-1.5 px-2.5 rounded group transition-colors"
              >
                <span className="text-sm text-text-secondary">
                  {card?.name}
                </span>
                <button
                  onClick={() => onRemoveCard(slug, "site")}
                  className="text-text-muted hover:text-red-400 text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                >
                  <FiMinus className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
        {(!currentDeck.atlas || currentDeck.atlas.length === 0) && (
          <p className="text-text-muted text-xs mt-1 italic">
            No sites in atlas
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-6 pt-4 border-t border-white/6">
        <button
          className={buttonVariants() + " w-full"}
          onClick={onSave}
        >
          {editingDeckId ? "Update Deck" : "Save to My Decks"}
        </button>
        <button
          className={buttonVariants({ variant: "outline" }) + " w-full"}
          onClick={onExport}
        >
          Export Deck
        </button>
      </div>
    </div>
  );
};

export default CurrentDeck;
