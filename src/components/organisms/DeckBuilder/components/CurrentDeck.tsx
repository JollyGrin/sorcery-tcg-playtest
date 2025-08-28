import React, { useState } from 'react';
import { Box, Flex, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { button, input } from 'styled-system/recipes';
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
        {/* Avatar Section */}
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
                onClick={() => onRemoveCard(currentDeck.avatar!, "avatar")}
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

        {/* Spellbook Section */}
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
            {Array.from(new Set(currentDeck.spellbook || [])).map((slug) => {
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
                    onClick={() => onRemoveCard(slug, "spellbook")}
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
            })}
          </VStack>
          {(!currentDeck.spellbook || currentDeck.spellbook.length === 0) && (
            <p className={css({ color: "gray.500", fontSize: "0.875rem" })}>
              No cards in spellbook
            </p>
          )}
        </Box>

        {/* Atlas Section */}
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
                    onClick={() => onRemoveCard(slug, "site")}
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
          onClick={onSave}
        >
          {editingDeckId ? 'Update Deck' : 'Save to My Decks'}
        </button>
        <button 
          className={button()} 
          style={{ width: "100%" }}
          onClick={() => setShowExportModal(true)}
        >
          Export Deck
        </button>
      </VStack>

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        deck={currentDeck}
        cards={cards}
      />
    </Box>
  );
};

export default CurrentDeck;