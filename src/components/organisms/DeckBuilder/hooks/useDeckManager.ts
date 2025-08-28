import { useState, useEffect } from 'react';
import { LocalDeck, Card } from '../types';
import { parseURLForDeck, isValidDeck } from '../utils/deckEncoding';

export const useDeckManager = () => {
  const [savedDecks, setSavedDecks] = useState<LocalDeck[]>([]);
  const [currentDeck, setCurrentDeck] = useState<Partial<LocalDeck>>({
    name: "New Deck",
    avatar: "",
    spellbook: [],
    atlas: [],
  });
  const [editingDeckId, setEditingDeckId] = useState<string | null>(null);

  useEffect(() => {
    loadSavedDecks();
    // Check for deck in URL parameters on initial load
    const urlDeck = parseURLForDeck();
    if (urlDeck && isValidDeck(urlDeck)) {
      importDeckFromURL(urlDeck);
    }
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
  };

  const createNewDeck = () => {
    setCurrentDeck({
      name: "New Deck",
      avatar: "",
      spellbook: [],
      atlas: [],
    });
    setEditingDeckId(null);
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

  const importDeckFromURL = (urlDeck: Partial<LocalDeck>) => {
    // Clear URL parameters after importing
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('deck');
      window.history.replaceState({}, document.title, url.toString());
    }

    // Set the imported deck as current
    setCurrentDeck({
      name: urlDeck.name + ' (Imported)',
      avatar: urlDeck.avatar || '',
      spellbook: urlDeck.spellbook || [],
      atlas: urlDeck.atlas || []
    });
    
    // Clear editing state since this is a new import
    setEditingDeckId(null);
  };

  return {
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
  };
};