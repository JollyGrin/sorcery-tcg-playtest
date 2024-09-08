import { GameBoard } from "@/components/organisms/GameBoard";
import { SorceryCard } from "@/types/card";
import { useState } from "react";

const initCards = Array.from({ length: 18 }, (_, gridIndex) => [
  {
    id: `card-${gridIndex}-0`,
    img: "atlas_rift_valley.webp",
    type: "site",
  } as GameCard, // Each droppable starts with a single card
]);

type GameCard = SorceryCard & { id: string }; // for game position
export default function GamePage() {
  const [gridItems, setGridItems] = useState<GameCard[][]>([
    ...initCards,

    [
      {
        id: "card-18-0",
        img: "headless_haunt.webp",
        type: "minion",
      } as GameCard,
    ],
    [
      {
        id: "card-19-0",
        img: "atlas_cloud_city.webp",
        type: "site",
      } as GameCard,
    ],
    [
      {
        id: "card-20-0",
        img: "atlas_cloud_city.webp",
        type: "site",
      } as GameCard,
      {
        id: "card-20-1",
        img: "headless_haunt.webp",
        type: "minion",
      },
    ],
  ]);

  return <GameBoard gridItems={gridItems} setGridItems={setGridItems} />;
}
