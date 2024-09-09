import { LoadDeck } from "@/components/molecules/LoadDeck";
import { GameBoard } from "@/components/organisms/GameBoard";
import { GRIDS } from "@/components/organisms/GameBoard/constants";
import { SorceryCard } from "@/types/card";
import { useState } from "react";

const initCards: GameCard[][] = Array.from({ length: 36 }, () => []);
// initCards[GRIDS.HAND] = handCards as GameCard[];
// initCards[GRIDS.DECK] = [...deckCards, ...mockDeck] as GameCard[];

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
