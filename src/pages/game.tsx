import { GameBoard } from "@/components/organisms/GameBoard";
import { useState } from "react";

export default function GamePage() {
  const [gridItems, setGridItems] = useState(
    Array.from({ length: 20 }, (_, gridIndex) => [
      { id: `card-${gridIndex}-0` }, // Each droppable starts with a single card
    ]),
  );
  return <GameBoard gridItems={gridItems} />;
}
