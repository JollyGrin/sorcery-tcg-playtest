import React, { useState } from 'react';
import { Box, Flex, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { button } from 'styled-system/recipes';
import { LocalDeck, Card } from '../types';
import { generateShareableURL } from '../utils/deckEncoding';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  deck: Partial<LocalDeck>;
  cards: Card[];
}

const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  deck,
  cards
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'url' | 'text'>('url');

  if (!isOpen) return null;

  const shareableURL = generateShareableURL(deck);

  const generateTextList = (): string => {
    let textList = `${deck.name || 'Deck'}\n\n`;

    if (deck.avatar) {
      const avatarCard = cards.find(c => c.slug === deck.avatar);
      textList += `Avatar:\n1x ${avatarCard?.name || deck.avatar}\n\n`;
    }

    if (deck.spellbook && deck.spellbook.length > 0) {
      textList += `Spellbook (${deck.spellbook.length} cards):\n`;
      const spellbookCounts = deck.spellbook.reduce((acc, slug) => {
        acc[slug] = (acc[slug] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      Object.entries(spellbookCounts)
        .sort(([a], [b]) => {
          const cardA = cards.find(c => c.slug === a);
          const cardB = cards.find(c => c.slug === b);
          return (cardA?.name || a).localeCompare(cardB?.name || b);
        })
        .forEach(([slug, count]) => {
          const card = cards.find(c => c.slug === slug);
          textList += `${count}x ${card?.name || slug}\n`;
        });
      textList += '\n';
    }

    if (deck.atlas && deck.atlas.length > 0) {
      textList += `Atlas (${deck.atlas.length} sites):\n`;
      deck.atlas.forEach((slug) => {
        const card = cards.find(c => c.slug === slug);
        textList += `1x ${card?.name || slug}\n`;
      });
    }

    return textList.trim();
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const textList = generateTextList();

  return (
    <Box
      position="fixed"
      inset={0}
      bg="rgba(0,0,0,0.8)"
      zIndex={50}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p="1rem"
    >
      <Box
        bg="rgba(40,40,40,0.95)"
        borderRadius="1rem"
        p="2rem"
        maxW="600px"
        w="100%"
        maxH="80vh"
        overflowY="auto"
        border="1px solid"
        borderColor="rgba(255,255,255,0.2)"
      >
        <Flex justifyContent="space-between" alignItems="center" mb="1.5rem">
          <h2 className={css({ fontSize: '1.5rem', fontWeight: 700, color: 'brand.highlight' })}>
            Export Deck: {deck.name}
          </h2>
          <button
            onClick={onClose}
            className={css({
              color: 'gray.400',
              _hover: { color: 'white' },
              fontSize: '1.5rem',
              cursor: 'pointer'
            })}
          >
            ×
          </button>
        </Flex>

        {/* Tab Navigation */}
        <Flex gap={2} mb="1rem">
          <button
            className={button()}
            onClick={() => setActiveTab('url')}
          >
            Shareable URL
          </button>
          <button
            className={button()}
            onClick={() => setActiveTab('text')}
          >
            Text List
          </button>
        </Flex>

        {/* URL Tab */}
        {activeTab === 'url' && (
          <VStack gap={4} alignItems="stretch">
            <Box>
              <p className={css({ mb: '0.5rem', color: 'gray.300' })}>
                Share this URL to let others import your deck:
              </p>
              <Box
                bg="rgba(0,0,0,0.3)"
                p="1rem"
                borderRadius="0.5rem"
                border="1px solid"
                borderColor="rgba(255,255,255,0.2)"
              >
                <code className={css({ fontSize: '0.875rem', wordBreak: 'break-all', color: 'green.400' })}>
                  {shareableURL}
                </code>
              </Box>
            </Box>
            <Flex gap={2}>
              <button
                className={button()}
                onClick={() => copyToClipboard(shareableURL)}
                style={{ flex: 1 }}
              >
                {copied ? 'Copied!' : 'Copy URL'}
              </button>
              <button
                className={button()}
                onClick={() => window.open(`mailto:?subject=Sorcery TCG Deck - ${deck.name}&body=Check out my deck: ${shareableURL}`, '_blank')}
              >
                Email
              </button>
            </Flex>
          </VStack>
        )}

        {/* Text Tab */}
        {activeTab === 'text' && (
          <VStack gap={4} alignItems="stretch">
            <Box>
              <p className={css({ mb: '0.5rem', color: 'gray.300' })}>
                Copy this text list to share your deck:
              </p>
              <Box
                bg="rgba(0,0,0,0.3)"
                p="1rem"
                borderRadius="0.5rem"
                border="1px solid"
                borderColor="rgba(255,255,255,0.2)"
                maxH="300px"
                overflowY="auto"
              >
                <pre className={css({ fontSize: '0.875rem', whiteSpace: 'pre-wrap', color: 'gray.100' })}>
                  {textList}
                </pre>
              </Box>
            </Box>
            <button
              className={button()}
              onClick={() => copyToClipboard(textList)}
            >
              {copied ? 'Copied!' : 'Copy Text List'}
            </button>
          </VStack>
        )}

        <Box mt="1.5rem" textAlign="center">
          <p className={css({ fontSize: '0.875rem', color: 'gray.400' })}>
            Anyone with the URL can import this deck and save it to their collection.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default ExportModal;