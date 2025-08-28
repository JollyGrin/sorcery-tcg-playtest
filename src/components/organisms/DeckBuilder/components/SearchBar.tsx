import React from 'react';
import { Box, Flex } from 'styled-system/jsx';
import { button, input } from 'styled-system/recipes';

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
    <Box
      position="sticky"
      top="0"
      zIndex={10}
      bg="rgba(0,0,0,0.8)"
      p="1rem"
      backdropFilter="blur(10px)"
    >
      <Box maxW="1400px" mx="auto">
        <Flex direction={{ base: "column", sm: "row" }} gap={4} alignItems="center">
          <Flex gap={2}>
            <button
              className={button()}
              onClick={() => {
                setShowMyDecks(!showMyDecks);
                setShowDeckCards(false);
              }}
            >
              My Decks ({savedDecksCount})
            </button>
            <button
              className={button()}
              onClick={() => {
                setShowDeckCards(!showDeckCards);
                setShowMyDecks(false);
              }}
            >
              Deck Cards
            </button>
            <button
              className={button()}
              onClick={onCreateNewDeck}
            >
              New Deck
            </button>
            <button
              className={button()}
              onClick={onImport}
            >
              Import
            </button>
          </Flex>
          
          <input
            type="text"
            placeholder="Search cards..."
            className={input()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <select
            className={input()}
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
        </Flex>
      </Box>
    </Box>
  );
};

export default SearchBar;