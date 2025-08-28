import { LocalDeck } from '../types';

// Encode a deck to a URL-safe string
export const encodeDeck = (deck: Partial<LocalDeck>): string => {
  try {
    const deckData = {
      name: deck.name || 'Imported Deck',
      avatar: deck.avatar || '',
      spellbook: deck.spellbook || [],
      atlas: deck.atlas || []
    };
    
    const jsonString = JSON.stringify(deckData);
    const base64 = btoa(jsonString);
    
    // Make URL-safe by replacing characters
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    console.error('Error encoding deck:', error);
    throw new Error('Failed to encode deck');
  }
};

// Decode a URL-safe string back to a deck
export const decodeDeck = (encodedDeck: string): Partial<LocalDeck> => {
  try {
    // Restore base64 padding and characters
    let base64 = encodedDeck.replace(/-/g, '+').replace(/_/g, '/');
    
    // Add padding if needed
    while (base64.length % 4) {
      base64 += '=';
    }
    
    const jsonString = atob(base64);
    const deckData = JSON.parse(jsonString);
    
    // Validate the decoded data structure
    if (!deckData || typeof deckData !== 'object') {
      throw new Error('Invalid deck data structure');
    }
    
    return {
      name: deckData.name || 'Imported Deck',
      avatar: deckData.avatar || '',
      spellbook: Array.isArray(deckData.spellbook) ? deckData.spellbook : [],
      atlas: Array.isArray(deckData.atlas) ? deckData.atlas : []
    };
  } catch (error) {
    console.error('Error decoding deck:', error);
    throw new Error('Invalid deck URL format');
  }
};

// Generate a shareable URL for a deck
export const generateShareableURL = (deck: Partial<LocalDeck>, baseURL?: string): string => {
  const encoded = encodeDeck(deck);
  const base = baseURL || window.location.origin + window.location.pathname;
  return `${base}?deck=${encoded}`;
};

// Parse URL parameters to extract deck data
export const parseURLForDeck = (): Partial<LocalDeck> | null => {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  const deckParam = params.get('deck');
  
  if (!deckParam) return null;
  
  try {
    return decodeDeck(deckParam);
  } catch (error) {
    console.error('Failed to parse deck from URL:', error);
    return null;
  }
};

// Validate that a deck has the minimum required structure
export const isValidDeck = (deck: any): deck is Partial<LocalDeck> => {
  return (
    deck &&
    typeof deck === 'object' &&
    (typeof deck.name === 'string' || deck.name === undefined) &&
    (typeof deck.avatar === 'string' || deck.avatar === undefined) &&
    (Array.isArray(deck.spellbook) || deck.spellbook === undefined) &&
    (Array.isArray(deck.atlas) || deck.atlas === undefined)
  );
};