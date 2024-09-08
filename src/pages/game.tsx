import { GameBoard } from "@/components/organisms/GameBoard";
import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { SorceryCard } from "@/types/card";
import { useState } from "react";

const handCards: GameCard[] = [
  {
    id: "atlas-02",
    img: "atlas_cloud_city.webp",
    type: "site",
  },
  {
    id: "headless-02",
    img: "headless_haunt.webp",
    type: "minion",
  },
  {
    id: "headless-03",
    img: "headless_haunt.webp",
    type: "minion",
  },
  {
    id: "headless-04",
    img: "headless_haunt.webp",
    type: "minion",
  },
];

const deckCards = Array.from({ length: 30 }).map((_, index) => ({
  id: "headless-ab-" + index,
  img: "headless_haunt.webp",
  type: "minion",
}));

const atlasCards = Array.from({ length: 10 }).map((_, index) => ({
  id: "atlas-02" + index,
  img: "atlas_cloud_city.webp",
  type: "site",
}));

const initCards: GameCard[][] = Array.from({ length: 35 }, () => []);
// initCards[GRIDS.HAND] = handCards as GameCard[];
initCards[GRIDS.DECK] = deckCards as GameCard[];
initCards[GRIDS.ATLAS_DECK] = atlasCards as GameCard[];

export type GameCard = SorceryCard & { id: string }; // for game position
export default function GamePage() {
  const [gridItems, setGridItems] = useState<GameCard[][]>(initCards);

  return <GameBoard gridItems={gridItems} setGridItems={setGridItems} />;
}
