import React from 'react';
import { LocalDeck, Card } from '../types';
import { useBlurLoad } from '@/utils/hooks/useBlurLoad';

interface DeckCardsProps {
  currentDeck: Partial<LocalDeck>;
  cards: Card[];
  getCardCount: (slug: string) => number;
}

const DeckCards: React.FC<DeckCardsProps> = ({
  currentDeck,
  cards,
  getCardCount,
}) => {
  const isEmpty = !currentDeck.avatar &&
    (!currentDeck.spellbook || currentDeck.spellbook.length === 0) &&
    (!currentDeck.atlas || currentDeck.atlas.length === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col gap-4 items-stretch">
        <h2 className="text-[2rem] font-bold text-brand-highlight">
          Deck Cards
        </h2>
        <div className="text-center py-16">
          <p className="text-gray-400 text-[1.25rem]">
            No cards in deck yet. Add some cards to see them here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-stretch">
      <h2 className="text-[2rem] font-bold text-brand-highlight">
        Deck Cards
      </h2>

      <div className="flex flex-col gap-6 items-stretch">
        {/* Avatar Section */}
        {currentDeck.avatar && (
          <div>
            <h3 className="text-[1.5rem] font-bold mb-4 text-blue-400">
              Avatar
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              <div className="relative">
                <BlurImage
                  slug={currentDeck.avatar}
                  alt={cards.find(c => c.slug === currentDeck.avatar)?.name}
                />
              </div>
            </div>
          </div>
        )}

        {/* Spellbook Section */}
        {currentDeck.spellbook && currentDeck.spellbook.length > 0 && (
          <div>
            <h3 className="text-[1.5rem] font-bold mb-4 text-green-400">
              Spellbook ({currentDeck.spellbook.length} cards)
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
              {currentDeck.spellbook.map((slug, index) => {
                const card = cards.find(c => c.slug === slug);
                const count = getCardCount(slug);
                const isFirstInstance = currentDeck.spellbook!.indexOf(slug) === index;

                // Only show first instance of each card with count badge
                if (!isFirstInstance) return null;

                return (
                  <div key={slug} className="relative">
                    <BlurImage slug={slug} alt={card?.name} />
                    {count > 1 && (
                      <div
                        className="absolute top-2 right-2 bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-base font-bold"
                      >
                        {count}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Atlas Section */}
        {currentDeck.atlas && currentDeck.atlas.length > 0 && (
          <div>
            <h3 className="text-[1.5rem] font-bold mb-4 text-purple-400">
              Atlas ({currentDeck.atlas.length} sites)
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
              {currentDeck.atlas.map((slug, index) => {
                const card = cards.find(c => c.slug === slug);
                return (
                  <div key={`${slug}-${index}`} className="relative">
                    <BlurImage slug={slug} alt={card?.name} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const BlurImage: React.FC<{ slug: string; alt?: string }> = ({ slug, alt }) => {
  const { url, loaded } = useBlurLoad(slug);
  return (
    <img
      src={url}
      alt={alt}
      style={{
        width: "100%",
        borderRadius: "0.5rem",
        filter: loaded ? "none" : "blur(10px)",
        transition: "filter 0.3s ease",
      }}
    />
  );
};

export default DeckCards;
