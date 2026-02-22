import React, { useState, useMemo } from "react";
import Tilt from "react-parallax-tilt";
import { Card } from "../types";
import { ViewMode } from "./SearchBar";
import CardTable from "./CardTable";

interface CardBrowserProps {
  cards: Card[];
  searchQuery: string;
  selectedType: string;
  selectedRarity: string;
  costRange: [number, number];
  selectedElements: string[];
  viewMode: ViewMode;
  onAddCard: (card: Card) => void;
  getCardCount: (slug: string) => number;
  getCardImage: (slug: string) => string;
}

const RARITY_GLARE: Record<string, string> = {
  Ordinary: "rgba(255,255,255,0.5)",
  Exceptional: "rgba(60,160,210,1)",
  Elite: "rgba(160,60,255,1)",
  Unique: "rgba(230,180,50,1)",
};

const CardBrowser: React.FC<CardBrowserProps> = ({
  cards,
  searchQuery,
  selectedType,
  selectedRarity,
  costRange,
  selectedElements,
  viewMode,
  onAddCard,
  getCardCount,
  getCardImage,
}) => {
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const matchesSearch = card.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        selectedType === "all" || card.type === selectedType;
      const matchesRarity =
        selectedRarity === "all" || card.rarity === selectedRarity;
      const matchesCost =
        card.cost >= costRange[0] && card.cost <= costRange[1];
      const matchesElements =
        selectedElements.length === 0 ||
        selectedElements.some(
          (el) => card.thresholds[el as keyof typeof card.thresholds] > 0
        );
      return (
        matchesSearch &&
        matchesType &&
        matchesRarity &&
        matchesCost &&
        matchesElements
      );
    });
  }, [cards, searchQuery, selectedType, selectedRarity, costRange, selectedElements]);

  if (viewMode === "table") {
    return (
      <CardTable
        cards={filteredCards}
        onAddCard={onAddCard}
        getCardCount={getCardCount}
        getCardImage={getCardImage}
      />
    );
  }

  const isTilt = viewMode === "tilt";

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-text-muted text-xs">
          {filteredCards.length} card{filteredCards.length !== 1 ? "s" : ""}
          {filteredCards.length > 200 && " (showing first 200)"}
        </p>
      </div>

      <div
        className={
          isTilt
            ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            : "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
        }
      >
        {filteredCards.slice(0, 200).map((card) =>
          isTilt ? (
            <TiltCard
              key={card.slug}
              card={card}
              onAdd={onAddCard}
              count={getCardCount(card.slug)}
              imageSrc={getCardImage(card.slug)}
            />
          ) : (
            <GridCard
              key={card.slug}
              card={card}
              onAdd={onAddCard}
              count={getCardCount(card.slug)}
              imageSrc={getCardImage(card.slug)}
            />
          )
        )}
      </div>
    </>
  );
};

/* ─── Grid Card ─── */
const GridCard: React.FC<{
  card: Card;
  onAdd: (card: Card) => void;
  count: number;
  imageSrc: string;
}> = ({ card, onAdd, count, imageSrc }) => {
  return (
    <div
      className="relative cursor-pointer card-grid-item rounded-lg overflow-hidden"
      onClick={() => onAdd(card)}
    >
      <img
        src={imageSrc}
        alt={card.name}
        className="w-full rounded-lg"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-colors duration-200 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100">
        <span className="text-white text-2xl font-bold drop-shadow-lg">+</span>
      </div>
      {/* Count badge */}
      {count > 0 && (
        <div className="absolute top-1.5 right-1.5 card-count-badge rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {count}
        </div>
      )}
    </div>
  );
};

/* ─── Tilt Card ─── */
const TiltCard: React.FC<{
  card: Card;
  onAdd: (card: Card) => void;
  count: number;
  imageSrc: string;
}> = ({ card, onAdd, count, imageSrc }) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <div
      className="tilt-card-wrapper relative"
      style={{
        zIndex: isOver ? 100 : 1,
        filter: isOver ? "saturate(1.4)" : "saturate(0.92)",
        transition: "filter 0.2s ease, z-index 0s",
      }}
    >
      <Tilt
        glareEnable
        glareColor={RARITY_GLARE[card.rarity] || RARITY_GLARE.Ordinary}
        glareMaxOpacity={0.25}
        glarePosition="all"
        scale={isOver ? 1.15 : 1}
      >
        <div
          className="flex justify-center items-center rounded-lg overflow-hidden cursor-pointer relative"
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
          onClick={() => onAdd(card)}
          style={{
            boxShadow: isOver
              ? `0 0 20px rgba(0,0,0,0.6), 0 0 0 1px ${RARITY_GLARE[card.rarity] || "transparent"}33`
              : "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          <img
            src={imageSrc}
            alt={card.name}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {/* Add overlay on hover */}
          {isOver && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-lg">
              <span className="text-white/90 text-xl font-bold">+</span>
            </div>
          )}
        </div>
      </Tilt>
      {/* Count badge */}
      {count > 0 && (
        <div className="absolute top-1.5 right-1.5 z-10 card-count-badge rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
          {count}
        </div>
      )}
      {/* Rarity dot */}
      {card.rarity !== "Ordinary" && (
        <div className="flex justify-center mt-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: RARITY_GLARE[card.rarity],
              boxShadow: `0 0 6px ${RARITY_GLARE[card.rarity]}`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CardBrowser;
