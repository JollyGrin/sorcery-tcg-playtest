import React, { useState } from "react";
import { Box, Grid } from "styled-system/jsx";

// Hooks
import { useCards } from "./hooks/useCards";
import { useDeckManager } from "./hooks/useDeckManager";
import { LocalDeck } from "./types";

// Components
import SearchBar from "./components/SearchBar";
import CardBrowser from "./components/CardBrowser";
import MyDecks from "./components/MyDecks";
import DeckCards from "./components/DeckCards";
import CurrentDeck from "./components/CurrentDeck";
import ImportModal from "./components/ImportModal";

const DeckBuilder: React.FC = () => {
  // UI State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showMyDecks, setShowMyDecks] = useState(false);
  const [showDeckCards, setShowDeckCards] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // Custom hooks
  const { cards, loading, getCardImage } = useCards();
  const {
    savedDecks,
    currentDeck,
    editingDeckId,
    setCurrentDeck,
    saveCurrentDeck,
    loadDeck,
    createNewDeck,
    deleteDeck,
    addCardToDeck,
    removeCardFromDeck,
    getCardCount,
    importDeckFromURL
  } = useDeckManager();

  // Enhanced handlers that manage view state
  const handleCreateNewDeck = () => {
    createNewDeck();
    setShowMyDecks(false);
    setShowDeckCards(false);
  };

  const handleLoadDeck = (deck: LocalDeck) => {
    loadDeck(deck);
    setShowMyDecks(false);
    setShowDeckCards(false);
  };

  const handleImport = (deck: Partial<LocalDeck>) => {
    importDeckFromURL(deck);
    setShowMyDecks(false);
    setShowDeckCards(false);
  };

  const handleLoadPrecon = (precon: { name: string; avatar?: string; spellbook: string[]; atlas: string[]; id?: string | undefined }) => {
    setCurrentDeck(precon);
    setShowMyDecks(false);
    setShowDeckCards(false);
  };

  if (loading) {
    return (
      <Box textAlign="center" py="2rem">
        Loading cards...
      </Box>
    );
  }

  return (
    <Box position="relative" h="calc(100vh - 0px)">
      {/* Search Bar */}
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        showMyDecks={showMyDecks}
        setShowMyDecks={setShowMyDecks}
        showDeckCards={showDeckCards}
        setShowDeckCards={setShowDeckCards}
        savedDecksCount={savedDecks.length}
        onCreateNewDeck={handleCreateNewDeck}
        onImport={() => setShowImportModal(true)}
      />

      {/* Main content */}
      <Grid
        gridTemplateColumns={{ base: "1fr", lg: "1fr 400px" }}
        h="calc(100% - 72px)"
        maxW="1400px"
        mx="auto"
      >
        {/* Left Panel - Card Browser, My Decks, or Deck Cards */}
        <Box overflow="auto" p="1rem">
          {showMyDecks ? (
            <MyDecks
              savedDecks={savedDecks}
              editingDeckId={editingDeckId}
              cards={cards}
              onLoadDeck={handleLoadDeck}
              onDeleteDeck={deleteDeck}
              onLoadPrecon={handleLoadPrecon}
            />
          ) : showDeckCards ? (
            <DeckCards
              currentDeck={currentDeck}
              cards={cards}
              getCardCount={getCardCount}
              getCardImage={getCardImage}
            />
          ) : (
            <CardBrowser
              cards={cards}
              searchQuery={searchQuery}
              selectedType={selectedType}
              onAddCard={addCardToDeck}
              getCardCount={getCardCount}
              getCardImage={getCardImage}
            />
          )}
        </Box>

        {/* Right Panel - Current Deck */}
        <CurrentDeck
          currentDeck={currentDeck}
          setCurrentDeck={setCurrentDeck}
          cards={cards}
          editingDeckId={editingDeckId}
          onRemoveCard={removeCardFromDeck}
          onSave={saveCurrentDeck}
          getCardCount={getCardCount}
        />

        <ImportModal
          isOpen={showImportModal}
          onClose={() => setShowImportModal(false)}
          onImport={handleImport}
        />
      </Grid>
    </Box>
  );
};

export default DeckBuilder;