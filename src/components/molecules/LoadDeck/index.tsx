import { CARD_CDN } from "@/constants";
import { GameStateActions } from "@/components/organisms/GameBoard";
import {
  useCuriosaDeck,
  useFourCoresDeck,
  useRealmsAppDeck,
} from "@/utils/api/curiosa/useCuriosa";
import { ReactNode, useState } from "react";
import { buttonVariants } from "@/components/ui/button/variants";
import { inputVariants } from "@/components/ui/input/variants";

import { mapDeckCuriosa } from "./mappers";
import { actShuffleDeck } from "@/utils/actions";
import { CuriosaResponse } from "@/utils/api/curiosa/api";
import { Tabs } from "@/components/atoms/Tabs";
import { UseQueryResult } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getDeckQuery } from "@/components/organisms/GameBoard/useDeckQuery";
import { DefaultDecks } from "./DefaultDecks";
import LocalDeckLoader from "./LocalDeckLoader";
import DirectImport from "./DirectImport";
import PreconLoader from "./PreconLoader";

export const LoadDeck = (
  props: GameStateActions & { children?: ReactNode; playerName: string },
) => {
  const [deckId, setDeckId] = useState<string>("");

  function setDeck(deck?: CuriosaResponse) {
    const newGrid = mapDeckCuriosa({
      deck,
      gridItems: props.gridItems,
      playerName: props.playerName,
    });
    if (!newGrid) return;
    const shuffledDeck = actShuffleDeck(newGrid, "deck");
    const shuffledAtlas = actShuffleDeck(shuffledDeck, "atlas");
    if (newGrid) props.setGridItems(shuffledAtlas);
    toast.success(`${props.playerName}'s deck was loaded`);
  }

  return (
    <>
      <div className="grid w-screen min-h-screen place-items-center bg-blue-200 overflow-x-hidden">
        <div className={`bg-white w-full m-[0_auto] p-[1rem] ${!!deckId ? "max-w-[900px]" : "max-w-[600px]"}`}>
          {props.children}
          <Tabs
            tabs={[
              "precons",
              "my decks",
              "import url",
              "curiosa",
              "realms",
              "four cores",
            ]}
            content={[
              <PreconLoader key="precons" setDeck={setDeck} />,
              <LocalDeckLoader key="mydecks" setDeck={setDeck} />,
              <DirectImport key="import" setDeck={setDeck} />,
              <InputLoader
                disabledReason="Curiosa API has changed - import not currently working"
                key="curiosa"
                deckId={deckId}
                setDeckId={setDeckId}
                setDeck={setDeck}
                useDeck={useCuriosaDeck}
                provider="curiosa"
              />,
              <InputLoader
                disabledReason="API has changed - import not currently working"
                key="realms"
                deckId={deckId}
                setDeckId={setDeckId}
                setDeck={setDeck}
                useDeck={useRealmsAppDeck}
                provider="realms"
              />,
              <InputLoader
                key="fourcores"
                deckId={deckId}
                setDeckId={setDeckId}
                setDeck={setDeck}
                useDeck={useFourCoresDeck}
                provider="four cores"
              />,
            ]}
          />
        </div>
      </div>
    </>
  );
};

const InputLoader = ({
  deckId,
  setDeckId,
  setDeck,
  useDeck,
  provider,
  disabledReason,
}: {
  deckId: string;
  setDeckId(value: string): void;
  setDeck(deck?: CuriosaResponse): void;
  useDeck(deckId: string): UseQueryResult<CuriosaResponse, Error>;
  provider: "curiosa" | "realms" | "four cores";
  disabledReason?: string;
}) => {
  // if the deckId is a url, find the ID in the url
  const [, id] = getDeckQuery(deckId)?.split("-") ?? [];
  const { data: deck } = useDeck(id ?? deckId);

  const cards = [
    ...(deck?.avatar ?? []),
    ...(deck?.spellbook ?? []),
    ...(deck?.atlas ?? []),
  ];

  if (disabledReason) return <div>Not Available: {disabledReason}</div>;

  return (
    <>
      <input
        placeholder={`${provider} deck id`}
        className={inputVariants()}
        value={deckId}
        onChange={(e) => setDeckId(e.target.value)}
      />
      {deckId === "" && (
        <>
          <p style={{ margin: "0.25rem 0" }}>copy the deckid from {provider}</p>
          <DefaultDecks {...{ setDeckId }} />
        </>
      )}
      {deckId !== "" && (
        <button
          className={buttonVariants()}
          style={{ marginTop: "1rem" }}
          onClick={() => setDeck(deck)}
        >
          Use this deck
        </button>
      )}
      <div className="flex flex-wrap gap-[0.25rem] mt-[1rem]">
        {cards?.map((card, index) => (
          <div key={card.identifier + index + "flex"}>
            <img
              alt="card"
              width="165px"
              key={card.identifier + index}
              src={`${CARD_CDN}${card.identifier}.webp`}
            />
          </div>
        ))}
      </div>
    </>
  );
};
