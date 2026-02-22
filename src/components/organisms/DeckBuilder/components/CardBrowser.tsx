import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '../types';

interface CardBrowserProps {
  cards: Card[];
  searchQuery: string;
  selectedType: string;
  onAddCard: (card: Card) => void;
  getCardCount: (slug: string) => number;
  getCardImage: (slug: string) => string;
}

const CardBrowser: React.FC<CardBrowserProps> = ({
  cards,
  searchQuery,
  selectedType,
  onAddCard,
  getCardCount,
  getCardImage
}) => {
  const filteredCards = cards.filter((card) => {
    const matchesSearch = card.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || card.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        {filteredCards.slice(0, 100).map((card) => (
          <div
            key={card.slug}
            className="relative cursor-pointer group"
            onClick={() => onAddCard(card)}
          >
            <img
              src={getCardImage(card.slug)}
              alt={card.name}
              style={{ width: "100%", borderRadius: "0.5rem" }}
              className="transition-all duration-200 group-hover:shadow-lg group-hover:scale-105"
              loading="lazy"
            />
            <div
              className={cn(
                "overlay absolute inset-0 bg-transparent opacity-0 transition-all duration-200 rounded-[0.5rem] flex items-center justify-center",
                "group-hover:opacity-100 group-hover:bg-[rgba(0,0,0,0.5)]"
              )}
            >
              <span
                className="text-white text-[1.5rem] font-bold"
              >
                +
              </span>
            </div>
            {getCardCount(card.slug) > 0 && (
              <div
                className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold"
              >
                {getCardCount(card.slug)}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredCards.length > 100 && (
        <p
          className="text-gray-400 text-center mt-4 mb-4"
        >
          Showing first 100 results. Use search to narrow down.
        </p>
      )}
    </>
  );
};

export default CardBrowser;
