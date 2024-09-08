import { GameBoard } from "@/components/organisms/GameBoard";
import { SorceryCard } from "@/types/card";
import { useState } from "react";

const initCards = Array.from({ length: 18 }, (_, gridIndex) => [
  // {
  //   id: `atlas-ab${gridIndex}`,
  //   img: "atlas_rift_valley.webp",
  //   type: "site",
  // } as GameCard, // Each droppable starts with a single card
]);
const customCards: GameCard[][] = [
  [
    {
      id: "headless-01",
      img: "headless_haunt.webp",
      type: "minion",
    },
  ],
  [
    {
      id: "atlas-01",
      img: "atlas_cloud_city.webp",
      type: "site",
    },
  ],
];

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

const auraCards = Array.from({ length: 12 }, (_, gridIndex) => []);

/**
 * gridIndexes
 * 0-19 grid
 * 20 hand
 * 21-33 aura
 * */

export type GameCard = SorceryCard & { id: string }; // for game position
export default function GamePage() {
  const [gridItems, setGridItems] = useState<GameCard[][]>([
    ...initCards,
    ...customCards,
    handCards,
    ...auraCards,
  ]);

  return <GameBoard gridItems={gridItems} setGridItems={setGridItems} />;
}
