import React, { useState, useEffect } from "react";
import { CuriosaResponse } from "../GameBoard/useDeckQuery";
import { Box, Flex, Grid, VStack } from "styled-system/jsx";
import { css } from "styled-system/css";
import { button, input } from "styled-system/recipes";

interface LocalDeck {
  id: string;
  name: string;
  avatar: string;
  spellbook: string[];
  atlas: string[];
  createdAt: number;
  updatedAt: number;
}

interface Card {
  name: string;
  slug: string;
  type: string;
}

const DeckBuilder: React.FC = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [currentDeck, setCurrentDeck] = useState<Partial<LocalDeck>>({
    name: "New Deck",
    avatar: "",
    spellbook: [],
    atlas: [],
  });
  const [savedDecks, setSavedDecks] = useState<LocalDeck[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [showMyDecks, setShowMyDecks] = useState(false);
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch("/card-data/processed_cards.json");
        const data = await response.json();
        setCards(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading cards:", error);
        setLoading(false);
      }
    };
    loadCards();
    loadSavedDecks();
  }, []);

  const loadSavedDecks = () => {
    const saved = localStorage.getItem('sorcery-decks');
    if (saved) {
      setSavedDecks(JSON.parse(saved));
    }
  };

  const saveCurrentDeck = () => {
    if (!currentDeck.name || currentDeck.name.trim() === '') {
      alert('Please enter a deck name');
      return;
    }

    const now = Date.now();
    let deckToSave: LocalDeck;

    if (editingDeckId) {
      // Update existing deck
      deckToSave = {
        id: editingDeckId,
        name: currentDeck.name,
        avatar: currentDeck.avatar || '',
        spellbook: currentDeck.spellbook || [],
        atlas: currentDeck.atlas || [],
        createdAt: savedDecks.find(d => d.id === editingDeckId)?.createdAt || now,
        updatedAt: now
      };
    } else {
      // Create new deck
      deckToSave = {
        id: `deck_${now}`,
        name: currentDeck.name,
        avatar: currentDeck.avatar || '',
        spellbook: currentDeck.spellbook || [],
        atlas: currentDeck.atlas || [],
        createdAt: now,
        updatedAt: now
      };
    }

    const updatedDecks = editingDeckId 
      ? savedDecks.map(d => d.id === editingDeckId ? deckToSave : d)
      : [...savedDecks, deckToSave];

    setSavedDecks(updatedDecks);
    localStorage.setItem('sorcery-decks', JSON.stringify(updatedDecks));
    
    if (!editingDeckId) {
      setEditingDeckId(deckToSave.id);
    }
    
    alert(editingDeckId ? 'Deck updated!' : 'Deck saved!');
  };

  const loadDeck = (deck: LocalDeck) => {
    setCurrentDeck({
      name: deck.name,
      avatar: deck.avatar,
      spellbook: deck.spellbook,
      atlas: deck.atlas
    });
    setEditingDeckId(deck.id);
    setShowMyDecks(false);
  };

  const createNewDeck = () => {
    setCurrentDeck({
      name: "New Deck",
      avatar: "",
      spellbook: [],
      atlas: [],
    });
    setEditingDeckId(null);
    setShowMyDecks(false);
  };

  const deleteDeck = (deckId: string) => {
    if (confirm('Are you sure you want to delete this deck?')) {
      const updatedDecks = savedDecks.filter(d => d.id !== deckId);
      setSavedDecks(updatedDecks);
      localStorage.setItem('sorcery-decks', JSON.stringify(updatedDecks));
      
      if (editingDeckId === deckId) {
        createNewDeck();
      }
    }
  };

  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || card.type === selectedType;
    return matchesSearch && matchesType;
  });

  const addCardToDeck = (card: Card) => {
    setCurrentDeck((prev) => {
      if (card.type === "avatar") {
        return { ...prev, avatar: card.slug };
      } else if (card.type === "site") {
        return { ...prev, atlas: [...(prev.atlas || []), card.slug] };
      } else {
        return { ...prev, spellbook: [...(prev.spellbook || []), card.slug] };
      }
    });
  };

  const removeCardFromDeck = (slug: string, type: string) => {
    setCurrentDeck((prev) => {
      if (type === "avatar") {
        return { ...prev, avatar: "" };
      } else if (type === "site") {
        return { ...prev, atlas: (prev.atlas || []).filter((s) => s !== slug) };
      } else {
        const index = (prev.spellbook || []).indexOf(slug);
        if (index > -1) {
          const newSpellbook = [...(prev.spellbook || [])];
          newSpellbook.splice(index, 1);
          return { ...prev, spellbook: newSpellbook };
        }
        return prev;
      }
    });
  };

  const getCardCount = (slug: string): number => {
    return currentDeck.spellbook?.filter((s) => s === slug).length || 0;
  };

  const getCardImage = (slug: string) => {
    return `https://card.cards.army/cards/${slug}.webp`;
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
      {/* Sticky search bar */}
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
                className={button({ visual: showMyDecks ? "solid" : "outline" })}
                onClick={() => setShowMyDecks(!showMyDecks)}
              >
                My Decks ({savedDecks.length})
              </button>
              <button
                className={button()}
                onClick={createNewDeck}
              >
                New Deck
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

      {/* Main content */}
      <Grid
        gridTemplateColumns={{ base: "1fr", lg: "1fr 400px" }}
        h="calc(100% - 72px)"
        maxW="1400px"
        mx="auto"
      >
        {/* Card Browser or My Decks */}
        <Box overflow="auto" p="1rem">
          {showMyDecks ? (
            <VStack gap={4} alignItems="stretch">
              <h2 className={css({ fontSize: '2rem', fontWeight: 700, color: 'brand.highlight' })}>
                My Decks
              </h2>
              {savedDecks.length === 0 ? (
                <Box textAlign="center" py="4rem">
                  <p className={css({ color: 'gray.400', fontSize: '1.25rem' })}>
                    No saved decks yet. Build your first deck!
                  </p>
                </Box>
              ) : (
                <Grid gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4}>
                  {savedDecks.map((deck) => (
                    <Box
                      key={deck.id}
                      bg="rgba(255,255,255,0.1)"
                      p="1rem"
                      borderRadius="0.5rem"
                      cursor="pointer"
                      className={css({
                        _hover: { bg: 'rgba(255,255,255,0.15)' },
                        border: editingDeckId === deck.id ? '2px solid' : '1px solid',
                        borderColor: editingDeckId === deck.id ? 'blue.400' : 'rgba(255,255,255,0.2)'
                      })}
                      onClick={() => loadDeck(deck)}
                    >
                      <h3 className={css({ fontWeight: 'bold', fontSize: '1.125rem', mb: '0.5rem' })}>
                        {deck.name}
                      </h3>
                      <p className={css({ fontSize: '0.875rem', color: 'gray.400', mb: '0.5rem' })}>
                        {deck.spellbook.length} cards, {deck.atlas.length} sites
                      </p>
                      <p className={css({ fontSize: '0.75rem', color: 'gray.500' })}>
                        {deck.avatar && cards.find(c => c.slug === deck.avatar)?.name}
                      </p>
                      <Flex justifyContent="space-between" alignItems="center" mt="1rem">
                        <span className={css({ fontSize: '0.75rem', color: 'gray.500' })}>
                          {new Date(deck.updatedAt).toLocaleDateString()}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteDeck(deck.id);
                          }}
                          className={css({
                            color: 'red.400',
                            _hover: { color: 'red.300' },
                            fontSize: '0.875rem'
                          })}
                        >
                          Delete
                        </button>
                      </Flex>
                    </Box>
                  ))}
                </Grid>
              )}
            </VStack>
          ) : (
            <Grid
              gridTemplateColumns={{
                base: "repeat(2, 1fr)",
                sm: "repeat(3, 1fr)",
                md: "repeat(4, 1fr)",
                lg: "repeat(5, 1fr)",
              }}
              gap={4}
            >
              {filteredCards.slice(0, 100).map((card) => (
                <Box
                  key={card.slug}
                  position="relative"
                  cursor="pointer"
                  onClick={() => addCardToDeck(card)}
                  className={css({
                    _hover: {
                      "& img": { boxShadow: "lg", transform: "scale(1.05)" },
                      "& .overlay": { opacity: 1, bg: "rgba(0,0,0,0.5)" },
                    },
                  })}
                >
                  <img
                    src={getCardImage(card.slug)}
                    alt={card.name}
                    className={css({
                      w: "full",
                      borderRadius: "0.5rem",
                      transition: "all 0.2s",
                    })}
                    loading="lazy"
                  />
                  <Flex
                    className="overlay"
                    position="absolute"
                    inset={0}
                    bg="transparent"
                    opacity={0}
                    transition="all 0.2s"
                    borderRadius="0.5rem"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <span
                      className={css({
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      })}
                    >
                      +
                    </span>
                  </Flex>
                  {getCardCount(card.slug) > 0 && (
                    <Box
                      position="absolute"
                      top="0.5rem"
                      right="0.5rem"
                      bg="blue.600"
                      color="white"
                      borderRadius="full"
                      w="1.5rem"
                      h="1.5rem"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="0.875rem"
                      fontWeight="bold"
                    >
                      {getCardCount(card.slug)}
                    </Box>
                  )}
                </Box>
              ))}
            </Grid>
          )}

          {!showMyDecks && filteredCards.length > 100 && (
            <p
              className={css({
                color: "gray.400",
                textAlign: "center",
                mt: "1rem",
                mb: "1rem",
              })}
            >
              Showing first 100 results. Use search to narrow down.
            </p>
          )}
        </Box>

        {/* Current Deck - Fixed right pane */}
        <Box
          position="sticky"
          top="72px"
          h="calc(100vh - 72px)"
          bg="rgba(0,0,0,0.5)"
          borderLeft="1px solid"
          borderColor="rgba(255,255,255,0.1)"
          p="1.5rem"
          overflowY="auto"
        >
          <h2
            className={css({
              fontSize: "1.5rem",
              fontWeight: 700,
              mb: "1rem",
              color: "brand.highlight",
            })}
          >
            {editingDeckId ? 'Editing Deck' : 'Current Deck'}
          </h2>

          <input
            type="text"
            placeholder="Deck Name"
            className={input()}
            value={currentDeck.name}
            onChange={(e) =>
              setCurrentDeck((prev) => ({ ...prev, name: e.target.value }))
            }
            style={{ width: "100%", marginBottom: "1rem" }}
          />

          <VStack gap={4} alignItems="stretch">
            <Box>
              <h3
                className={css({
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                  mb: "0.5rem",
                  color: "blue.400",
                })}
              >
                Avatar
              </h3>
              {currentDeck.avatar ? (
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  bg="rgba(255,255,255,0.1)"
                  p="0.5rem"
                  borderRadius="0.25rem"
                >
                  <span className={css({ fontSize: "0.875rem" })}>
                    {cards.find((c) => c.slug === currentDeck.avatar)?.name}
                  </span>
                  <button
                    onClick={() =>
                      removeCardFromDeck(currentDeck.avatar!, "avatar")
                    }
                    className={css({
                      color: "red.400",
                      _hover: { color: "red.300" },
                      cursor: "pointer",
                      fontSize: "0.875rem",
                    })}
                  >
                    Remove
                  </button>
                </Flex>
              ) : (
                <p className={css({ color: "gray.500", fontSize: "0.875rem" })}>
                  No avatar selected
                </p>
              )}
            </Box>

            <Box>
              <h3
                className={css({
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                  mb: "0.5rem",
                  color: "green.400",
                })}
              >
                Spellbook ({currentDeck.spellbook?.length || 0} cards)
              </h3>
              <VStack gap={1} maxH="20rem" overflowY="auto" pr="0.5rem">
                {Array.from(new Set(currentDeck.spellbook || [])).map(
                  (slug) => {
                    const card = cards.find((c) => c.slug === slug);
                    const count = getCardCount(slug);
                    return (
                      <Flex
                        key={slug}
                        alignItems="center"
                        justifyContent="space-between"
                        bg="rgba(255,255,255,0.1)"
                        p="0.5rem"
                        borderRadius="0.25rem"
                      >
                        <span className={css({ fontSize: "0.875rem" })}>
                          {count}x {card?.name}
                        </span>
                        <button
                          onClick={() => removeCardFromDeck(slug, "spellbook")}
                          className={css({
                            color: "red.400",
                            _hover: { color: "red.300" },
                            fontSize: "0.75rem",
                            cursor: "pointer",
                          })}
                        >
                          -1
                        </button>
                      </Flex>
                    );
                  },
                )}
              </VStack>
              {(!currentDeck.spellbook ||
                currentDeck.spellbook.length === 0) && (
                <p className={css({ color: "gray.500", fontSize: "0.875rem" })}>
                  No cards in spellbook
                </p>
              )}
            </Box>

            <Box>
              <h3
                className={css({
                  fontWeight: "bold",
                  fontSize: "1.125rem",
                  mb: "0.5rem",
                  color: "purple.400",
                })}
              >
                Atlas ({currentDeck.atlas?.length || 0} sites)
              </h3>
              <VStack gap={1} maxH="10rem" overflowY="auto" pr="0.5rem">
                {(currentDeck.atlas || []).map((slug, index) => {
                  const card = cards.find((c) => c.slug === slug);
                  return (
                    <Flex
                      key={`${slug}-${index}`}
                      alignItems="center"
                      justifyContent="space-between"
                      bg="rgba(255,255,255,0.1)"
                      p="0.5rem"
                      borderRadius="0.25rem"
                    >
                      <span className={css({ fontSize: "0.875rem" })}>
                        {card?.name}
                      </span>
                      <button
                        onClick={() => removeCardFromDeck(slug, "site")}
                        className={css({
                          color: "red.400",
                          _hover: { color: "red.300" },
                          fontSize: "0.75rem",
                          cursor: "pointer",
                        })}
                      >
                        Remove
                      </button>
                    </Flex>
                  );
                })}
              </VStack>
              {(!currentDeck.atlas || currentDeck.atlas.length === 0) && (
                <p className={css({ color: "gray.500", fontSize: "0.875rem" })}>
                  No sites in atlas
                </p>
              )}
            </Box>
          </VStack>

          <VStack gap={2} mt="1.5rem">
            <button
              className={button({ visual: "solid" })}
              style={{ width: "100%" }}
              onClick={saveCurrentDeck}
            >
              {editingDeckId ? 'Update Deck' : 'Save to My Decks'}
            </button>
            <button className={button()} style={{ width: "100%" }}>
              Export Deck
            </button>
          </VStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default DeckBuilder;