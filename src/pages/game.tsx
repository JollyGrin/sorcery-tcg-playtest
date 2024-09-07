import { GameBoard } from "@/components/organisms/GameBoard";
import { SorceryCard } from "@/types/card";
import { type } from "os";
import { useState } from "react";

type GameCard = SorceryCard & { id: string }; // for game position
export default function GamePage() {
  const [gridItems, setGridItems] = useState<GameCard[][]>(
    Array.from({ length: 20 }, (_, gridIndex) => [
      {
        id: `card-${gridIndex}-0`,
        img: "atlas_rift_valley.webp",
        type: "site",
      } as GameCard, // Each droppable starts with a single card
    ]),
  );

  console.log({ gridItems });

  return <GameBoard gridItems={gridItems} setGridItems={setGridItems} />;
}
