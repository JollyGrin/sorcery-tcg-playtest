import React from 'react';
import { buttonVariants } from '@/components/ui/button/variants';
import { inputVariants } from '@/components/ui/input/variants';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  showMyDecks: boolean;
  setShowMyDecks: (show: boolean) => void;
  showDeckCards: boolean;
  setShowDeckCards: (show: boolean) => void;
  savedDecksCount: number;
  onCreateNewDeck: () => void;
  onImport: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  showMyDecks,
  setShowMyDecks,
  showDeckCards,
  setShowDeckCards,
  savedDecksCount,
  onCreateNewDeck,
  onImport
}) => {
  return (
    <div
      className="sticky top-0 z-10 bg-surface-page p-4 backdrop-blur-[10px]"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex gap-2">
            <button
              className={buttonVariants()}
              onClick={() => {
                setShowMyDecks(!showMyDecks);
                setShowDeckCards(false);
              }}
            >
              My Decks ({savedDecksCount})
            </button>
            <button
              className={buttonVariants()}
              onClick={() => {
                setShowDeckCards(!showDeckCards);
                setShowMyDecks(false);
              }}
            >
              Deck Cards
            </button>
            <button
              className={buttonVariants()}
              onClick={onCreateNewDeck}
            >
              New Deck
            </button>
            <button
              className={buttonVariants()}
              onClick={onImport}
            >
              Import
            </button>
          </div>

          <input
            type="text"
            placeholder="Search cards..."
            className={inputVariants()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <select
            className={inputVariants()}
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ width: "auto" }}
          >
            <option value="all">All Types</option>
            <option value="avatar">Avatar</option>
            <option value="minion">Minion</option>
            <option value="magic">Magic</option>
            <option value="artifact">Artifact</option>
            <option value="aura">Aura</option>
            <option value="site">Site</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
