import React, { useState, useEffect } from 'react';
import { CuriosaResponse } from '../GameBoard/useDeckQuery';
import { Box, Flex, Grid, HStack, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { button, input } from 'styled-system/recipes';

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
    name: 'New Deck',
    avatar: '',
    spellbook: [],
    atlas: []
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch('/card-data/processed_cards.json');
        const data = await response.json();
        setCards(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading cards:', error);
        setLoading(false);
      }
    };
    loadCards();
  }, []);

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || card.type === selectedType;
    return matchesSearch && matchesType;
  });

  const addCardToDeck = (card: Card) => {
    setCurrentDeck(prev => {
      if (card.type === 'avatar') {
        return { ...prev, avatar: card.slug };
      } else if (card.type === 'site') {
        return { ...prev, atlas: [...(prev.atlas || []), card.slug] };
      } else {
        return { ...prev, spellbook: [...(prev.spellbook || []), card.slug] };
      }
    });
  };

  const removeCardFromDeck = (slug: string, type: string) => {
    setCurrentDeck(prev => {
      if (type === 'avatar') {
        return { ...prev, avatar: '' };
      } else if (type === 'site') {
        return { ...prev, atlas: (prev.atlas || []).filter(s => s !== slug) };
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
    return currentDeck.spellbook?.filter(s => s === slug).length || 0;
  };

  const getCardImage = (slug: string) => {
    return `https://card.cards.army/cards/${slug}.webp`;
  };

  if (loading) {
    return <Box textAlign="center" py="2rem">Loading cards...</Box>;
  }

  return (
    <Grid gridTemplateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
      <Box>
        <Box bg="rgba(0,0,0,0.5)" borderRadius="0.5rem" p="1.5rem">
          <h2 className={css({ fontSize: '2rem', fontWeight: 700, mb: '1rem', color: 'brand.highlight' })}>Card Browser</h2>
          
          <Flex direction={{ base: 'column', sm: 'row' }} gap={4} mb="1.5rem">
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
              style={{ width: 'auto' }}
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

          <Grid 
            gridTemplateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }} 
            gap={4} 
            maxH="600px" 
            overflowY="auto"
            className={css({ pr: '0.5rem' })}
          >
            {filteredCards.slice(0, 100).map((card) => (
              <Box
                key={card.slug}
                position="relative"
                cursor="pointer"
                onClick={() => addCardToDeck(card)}
                className={css({
                  _hover: {
                    '& img': { boxShadow: 'lg' },
                    '& .overlay': { opacity: 1, bg: 'rgba(0,0,0,0.5)' }
                  }
                })}
              >
                <img
                  src={getCardImage(card.slug)}
                  alt={card.name}
                  className={css({ w: 'full', borderRadius: '0.5rem', transition: 'all 0.2s' })}
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
                  <span className={css({ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' })}>+</span>
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
          
          {filteredCards.length > 100 && (
            <p className={css({ color: 'gray.400', textAlign: 'center', mt: '1rem' })}>
              Showing first 100 results. Use search to narrow down.
            </p>
          )}
        </Box>
      </Box>

      <Box>
        <Box bg="rgba(0,0,0,0.5)" borderRadius="0.5rem" p="1.5rem" position="sticky" top="6rem">
          <h2 className={css({ fontSize: '2rem', fontWeight: 700, mb: '1rem', color: 'brand.highlight' })}>Current Deck</h2>
          
          <input
            type="text"
            placeholder="Deck Name"
            className={input()}
            value={currentDeck.name}
            onChange={(e) => setCurrentDeck(prev => ({ ...prev, name: e.target.value }))}
            style={{ width: '100%', marginBottom: '1rem' }}
          />

          <VStack gap={4} alignItems="stretch">
            <Box>
              <h3 className={css({ fontWeight: 'bold', fontSize: '1.25rem', mb: '0.5rem', color: 'blue.400' })}>Avatar</h3>
              {currentDeck.avatar ? (
                <Flex alignItems="center" justifyContent="space-between" bg="rgba(255,255,255,0.1)" p="0.5rem" borderRadius="0.25rem">
                  <span>{cards.find(c => c.slug === currentDeck.avatar)?.name}</span>
                  <button
                    onClick={() => removeCardFromDeck(currentDeck.avatar!, 'avatar')}
                    className={css({ color: 'red.400', _hover: { color: 'red.300' }, cursor: 'pointer' })}
                  >
                    Remove
                  </button>
                </Flex>
              ) : (
                <p className={css({ color: 'gray.500' })}>No avatar selected</p>
              )}
            </Box>

            <Box>
              <h3 className={css({ fontWeight: 'bold', fontSize: '1.25rem', mb: '0.5rem', color: 'green.400' })}>
                Spellbook ({currentDeck.spellbook?.length || 0} cards)
              </h3>
              <VStack gap={1} maxH="16rem" overflowY="auto" pr="0.5rem">
                {Array.from(new Set(currentDeck.spellbook || [])).map(slug => {
                  const card = cards.find(c => c.slug === slug);
                  const count = getCardCount(slug);
                  return (
                    <Flex key={slug} alignItems="center" justifyContent="space-between" bg="rgba(255,255,255,0.1)" p="0.5rem" borderRadius="0.25rem">
                      <span>{count}x {card?.name}</span>
                      <button
                        onClick={() => removeCardFromDeck(slug, 'spellbook')}
                        className={css({ color: 'red.400', _hover: { color: 'red.300' }, fontSize: '0.875rem', cursor: 'pointer' })}
                      >
                        -1
                      </button>
                    </Flex>
                  );
                })}
              </VStack>
              {(!currentDeck.spellbook || currentDeck.spellbook.length === 0) && (
                <p className={css({ color: 'gray.500' })}>No cards in spellbook</p>
              )}
            </Box>

            <Box>
              <h3 className={css({ fontWeight: 'bold', fontSize: '1.25rem', mb: '0.5rem', color: 'purple.400' })}>
                Atlas ({currentDeck.atlas?.length || 0} sites)
              </h3>
              <VStack gap={1} maxH="16rem" overflowY="auto" pr="0.5rem">
                {(currentDeck.atlas || []).map((slug, index) => {
                  const card = cards.find(c => c.slug === slug);
                  return (
                    <Flex key={`${slug}-${index}`} alignItems="center" justifyContent="space-between" bg="rgba(255,255,255,0.1)" p="0.5rem" borderRadius="0.25rem">
                      <span>{card?.name}</span>
                      <button
                        onClick={() => removeCardFromDeck(slug, 'site')}
                        className={css({ color: 'red.400', _hover: { color: 'red.300' }, fontSize: '0.875rem', cursor: 'pointer' })}
                      >
                        Remove
                      </button>
                    </Flex>
                  );
                })}
              </VStack>
              {(!currentDeck.atlas || currentDeck.atlas.length === 0) && (
                <p className={css({ color: 'gray.500' })}>No sites in atlas</p>
              )}
            </Box>
          </VStack>

          <VStack gap={2} mt="1.5rem">
            <button className={button({ visual: 'solid' })} style={{ width: '100%' }}>
              Save to My Decks
            </button>
            <button className={button()} style={{ width: '100%' }}>
              Export Deck
            </button>
          </VStack>
        </Box>
      </Box>
    </Grid>
  );
};

export default DeckBuilder;