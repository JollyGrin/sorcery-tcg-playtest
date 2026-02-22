import { useState, useEffect } from 'react';
import { CARD_CDN } from '@/constants';
import { Card } from '../types';
import { CardDTO } from '@/utils/api/cardData/CardDataType';

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch("/card-data/cards.json");
        const data: CardDTO[] = await response.json();
        const mapped: Card[] = data.map((dto) => ({
          name: dto.name,
          slug: dto.slug,
          type: dto.guardian.type.toLowerCase(),
          rarity: dto.guardian.rarity,
          cost: dto.guardian.cost,
          attack: dto.guardian.attack,
          defence: dto.guardian.defence,
          life: dto.guardian.life,
          subType: dto.guardian.subType,
          rulesText: dto.guardian.rulesText,
          thresholds: dto.guardian.thresholds,
        }));
        setCards(mapped);
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
