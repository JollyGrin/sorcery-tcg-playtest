import { useState, useEffect } from 'react';
import { LocalDeck, Card } from '../types';

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
    getCardCount
  };
};