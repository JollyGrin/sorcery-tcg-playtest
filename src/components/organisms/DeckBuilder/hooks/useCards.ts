import { useState, useEffect } from 'react';
import { CARD_CDN } from '@/constants';
import { Card } from '../types';

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

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
  }, []);

  const getCardImage = (slug: string) => {
    return `${CARD_CDN}${slug}.webp`;
  };

  return {
    cards,
    loading,
    getCardImage
  };
};