import Link from "next/link";
import { useState } from "react";
import { FaDice as IconDice } from "react-icons/fa6";
import { DECK_URLS } from "./constants";
import { getDeckQuery } from "../GameBoard/useDeckQuery";
import { buttonVariants } from "@/components/ui/button/variants";
import { inputVariants } from "@/components/ui/input/variants";
import { cn } from "@/lib/utils";

export const Solo = () => {
  const [deckIds, setDeckIds] = useState({
    p1: "",
    p2: "",
  });
  const [deckQueries, setDeckQueries] = useState({
    p1: "",
    p2: "",
  });

  function setDeckId(player: "p1" | "p2") {
    // TODO: detect if curiosa or realms
    return (value: string) => {
      const query = getDeckQuery(value);
      setDeckIds((prev) => ({
        ...prev,
        [player]: value,
      }));
      return setDeckQueries((prev) => ({
        ...prev,
        [player]: query,
      }));
    };
  }

  return (
    <div className="flex flex-col gap-2 h-inherit">
      <p>Play against yourself with 2 different decks.</p>
      <div className="flex items-center">
        <IconDice
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * DECK_URLS.length);
            const URL = DECK_URLS[randomIndex];
            setDeckId("p1")(URL);
          }}
          className="scale-100 transition-all duration-[0.25s] ease-[ease] cursor-pointer hover:scale-125 active:scale-110"
        />
        <input
          className={cn(inputVariants(), "font-mono tracking-[-1px]")}
          placeholder="Player 1: Load TTS export via Curiosa/Realms/FourCores"
          value={deckIds.p1}
          onChange={(e) => setDeckId("p1")(e.target.value)}
        />
      </div>

      <div className="flex items-center">
        <IconDice
          onClick={() => {
            const randomIndex = Math.floor(Math.random() * DECK_URLS.length);
            const URL = DECK_URLS[randomIndex];
            setDeckId("p2")(URL);
          }}
          className="scale-100 transition-all duration-[0.25s] ease-[ease] cursor-pointer hover:scale-125 active:scale-110"
        />
        <input
          className={cn(inputVariants(), "font-mono tracking-[-1px]")}
          placeholder="Player 2: Load TTS export via Curiosa/Realms/FourCores"
          value={deckIds.p2}
          onChange={(e) => setDeckId("p2")(e.target.value)}
        />
      </div>
      <Link
        href={{ pathname: "/solo", query: { ...deckQueries, name: "p1" } }}
        prefetch
      >
        <button
          disabled={deckQueries.p1 === "" || deckQueries.p2 === ""}
          className={buttonVariants()}
          style={{ justifySelf: "end", width: "100%", marginTop: "1rem" }}
        >
          Play
        </button>
      </Link>
    </div>
  );
};
