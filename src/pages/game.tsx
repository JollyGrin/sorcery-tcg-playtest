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

const initCards: GameCard[][] = Array.from({ length: 35 }, () => []);
initCards[GRIDS.HAND] = handCards as GameCard[];

export type GameCard = SorceryCard & { id: string }; // for game position
export default function GamePage() {
  const [gridItems, setGridItems] = useState<GameCard[][]>(initCards);

  console.log(gridItems.length, "length");

  return <GameBoard gridItems={gridItems} setGridItems={setGridItems} />;
}
