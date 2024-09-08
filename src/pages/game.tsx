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
const customCards = [
  [
    {
      id: "headless-01",
      img: "headless_haunt.webp",
      type: "minion",
    } as GameCard,
  ],
  [
    {
      id: "atlas-01",
      img: "atlas_cloud_city.webp",
      type: "site",
    } as GameCard,
  ],
];

const handCards = [
  {
    id: "atlas-02",
    img: "atlas_cloud_city.webp",
    type: "site",
  } as GameCard,
  {
    id: "headless-02",
    img: "headless_haunt.webp",
    type: "minion",
  } as GameCard,
];

/**
 * gridIndexes
 * 0-19 grid
 * 20 hand
 * 21-33 aura
 * */

type GameCard = SorceryCard & { id: string }; // for game position
export default function GamePage() {
  const [gridItems, setGridItems] = useState<GameCard[][]>([
    ...initCards,
    ...customCards,
    handCards,
    [],
  ]);

  return <GameBoard gridItems={gridItems} setGridItems={setGridItems} />;
}
