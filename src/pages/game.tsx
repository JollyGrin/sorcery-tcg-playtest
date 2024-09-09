import { LoadDeck } from "@/components/molecules/LoadDeck";
import { GameBoard } from "@/components/organisms/GameBoard";
import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { SorceryCard } from "@/types/card";
import { useState } from "react";

const handCards: GameCard[] = [
  {
    id: "sorcerer-01",
    img: "sorcerer.webp",
    type: "avatar",
  },
];

const deckCards = Array.from({ length: 30 }).map((_, index) => ({
  id: "headless-ab-" + index,
  img: "headless_haunt.webp",
  type: "minion",
}));

const mockDeck: GameCard[] = [
  {
    id: "jihad",
    img: "jihad.webp",
    type: "aura",
  },
  {
    id: "death_dealer-01",
    img: "death_dealer.webp",
    type: "minion",
  },
  {
    id: "infernal_legion-01",
    img: "infernal_legion.webp",
    type: "minion",
  },
  {
    id: "wayfaring_pilgrim-01",
    img: "wayfaring_pilgrim.webp",
    type: "minion",
  },
];

const atlasCards = Array.from({ length: 10 }).map((_, index) => ({
  id: "atlas-02" + index,
  img: "arid_desert.webp",
  type: "site",
}));

const initCards: GameCard[][] = Array.from({ length: 36 }, () => []);
// initCards[GRIDS.HAND] = handCards as GameCard[];
// initCards[GRIDS.DECK] = [...deckCards, ...mockDeck] as GameCard[];
initCards[GRIDS.ATLAS_DECK] = atlasCards as GameCard[];

type GameProps = {
  id: string;
  isTapped?: boolean;
};
export type GameCard = SorceryCard & GameProps; // for game position
export default function GamePage() {
  const [gridItems, setGridItems] = useState<GameCard[][]>(initCards);

  if (
    gridItems[GRIDS.DECK].length === 0 &&
    gridItems[GRIDS.HAND].length === 0 &&
    gridItems[GRIDS.GRAVE].length === 0
  )
    return (
      <div>
        <LoadDeck gridItems={gridItems} setGridItems={setGridItems} />
      </div>
    );

  return <GameBoard gridItems={gridItems} setGridItems={setGridItems} />;
}
