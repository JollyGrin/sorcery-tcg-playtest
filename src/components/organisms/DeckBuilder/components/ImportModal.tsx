import React, { useState } from 'react';
import { Box, Flex, VStack } from 'styled-system/jsx';
import { css } from 'styled-system/css';
import { button, input } from 'styled-system/recipes';
import { LocalDeck } from '../types';
import { decodeDeck, isValidDeck } from '../utils/deckEncoding';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (deck: Partial<LocalDeck>) => void;
}

const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [importText, setImportText] = useState('');
  const [error, setError] = useState('');
  const [importing, setImporting] = useState(false);

  if (!isOpen) return null;

  const handleImport = async () => {
    if (!importText.trim()) {
      setError('Please enter a deck URL or code');
      return;
    }

    setImporting(true);
    setError('');

    try {
      let deckData: Partial<LocalDeck>;

      // Check if it's a full URL
      if (importText.includes('deck=')) {
        const url = new URL(importText);
        const deckParam = url.searchParams.get('deck');
        if (!deckParam) {
          throw new Error('No deck data found in URL');
        }
        deckData = decodeDeck(deckParam);
      }
      // Check if it's just the encoded deck parameter
      else if (importText.length > 20 && !importText.includes(' ')) {
        deckData = decodeDeck(importText);
      }
      // Otherwise, it might be a text list (future enhancement)
      else {
        throw new Error('Please provide a valid deck URL or share code');
      }

      if (!isValidDeck(deckData)) {
        throw new Error('Invalid deck format');
      }

      // Import the deck
      onImport(deckData);
      onClose();
      setImportText('');
      setError('');

    } catch (error) {
      console.error('Import error:', error);
      setError(error instanceof Error ? error.message : 'Failed to import deck');
    } finally {
      setImporting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setImportText('');
    setError('');
  };

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
        maxW="500px"
        w="100%"
        border="1px solid"
        borderColor="rgba(255,255,255,0.2)"
      >
        <Flex justifyContent="space-between" alignItems="center" mb="1.5rem">
          <h2 className={css({ fontSize: '1.5rem', fontWeight: 700, color: 'brand.highlight' })}>
            Import Deck
          </h2>
          <button
            onClick={handleClose}
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

        <VStack gap={4} alignItems="stretch">
          <Box>
            <p className={css({ mb: '0.5rem', color: 'gray.300' })}>
              Paste a deck URL or share code:
            </p>
            <textarea
              placeholder="https://yoursite.com/deckbuilder?deck=... or just the deck code"
              className={input()}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              style={{
                width: '100%',
                height: '100px',
                resize: 'vertical',
                fontFamily: 'monospace',
                fontSize: '0.875rem'
              }}
            />
          </Box>

          {error && (
            <Box
              bg="rgba(239,68,68,0.1)"
              border="1px solid"
              borderColor="red.400"
              borderRadius="0.5rem"
              p="0.75rem"
            >
              <p className={css({ color: 'red.400', fontSize: '0.875rem' })}>
                {error}
              </p>
            </Box>
          )}

          <Flex gap={2}>
            <button
              className={button()}
              onClick={handleClose}
              style={{ flex: 1 }}
            >
              Cancel
            </button>
            <button
              className={button({ visual: 'solid' })}
              onClick={handleImport}
              disabled={importing || !importText.trim()}
              style={{ flex: 1 }}
            >
              {importing ? 'Importing...' : 'Import Deck'}
            </button>
          </Flex>
        </VStack>

        <Box mt="1.5rem" p="0.75rem" bg="rgba(59,130,246,0.1)" borderRadius="0.5rem">
          <p className={css({ fontSize: '0.75rem', color: 'blue.400' })}>
            <strong>Tip:</strong> You can also visit a deck URL directly to import it automatically.
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default ImportModal;