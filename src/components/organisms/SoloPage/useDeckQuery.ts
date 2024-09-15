import { mapDeckCuriosa } from "@/components/molecules/LoadDeck/mappers";
import { actShuffleDeck } from "@/utils/actions";
import { CuriosaResponse } from "@/utils/api/curiosa/api";
import { useRouter } from "next/router";
import { GameStateActions } from "../GameBoard";
import toast from "react-hot-toast";
import {
  useCuriosaDeck,
  useRealmsAppDeck,
} from "@/utils/api/curiosa/useCuriosa";
import { useEffect } from "react";

type DECK_TYPE = "curiosa" | "realms";
type DECK_ID = `${DECK_TYPE}-${string}`;

export const useDeckQuery = (props: {
  p1: GameStateActions;
  p2: GameStateActions;
}) => {
  const { query } = useRouter();
  const deck1Query = (query.p1 ?? "") as DECK_ID;
  const deck2Query = (query.p2 ?? "") as DECK_ID;

  const [deckTypeP1, deckIdP1] = deck1Query?.split("-");
  const useP1Deck = getDeckHook(deckTypeP1 as DECK_TYPE);
  const { data: p1Deck } = useP1Deck(deckIdP1 ?? "");

  const [deckTypeP2, deckIdP2] = deck2Query?.split("-");
  const useP2Deck = getDeckHook(deckTypeP2 as DECK_TYPE);
  const { data: p2Deck } = useP2Deck(deckIdP2 ?? "");

  useEffect(() => {
    if (deck1Query && p1Deck && !hasDeck(props.p1.gridItems)) {
      setDeck({
        deck: p1Deck,
        gridItems: props.p1.gridItems,
        setGridItems: props.p1.setGridItems,
        playerName: "p1",
      });
    }

    if (deck2Query && p2Deck && !hasDeck(props.p2.gridItems)) {
      setDeck({
        deck: p2Deck,
        gridItems: props.p2.gridItems,
        setGridItems: props.p2.setGridItems,
        playerName: "p2",
      });
    }
  }, [deck1Query, p1Deck, deck2Query, p2Deck]);
};

function getDeckHook(deckType: DECK_TYPE) {
  if (deckType === "curiosa") return useCuriosaDeck;
  if (deckType === "realms") return useRealmsAppDeck;
  return useCuriosaDeck;
}

function setDeck(
  props: {
    deck?: CuriosaResponse;
    playerName: string;
  } & GameStateActions,
) {
  const newGrid = mapDeckCuriosa({
    deck: props.deck,
    gridItems: props.gridItems,
    playerName: props.playerName,
  });
  if (!newGrid) return;
  const shuffledDeck = actShuffleDeck(newGrid, "deck");
  const shuffledAtlas = actShuffleDeck(shuffledDeck, "atlas");
  if (newGrid) props.setGridItems(shuffledAtlas);
  toast.success(`${props.playerName}'s deck was loaded`);
}

function hasDeck(deck?: GameStateActions["gridItems"]) {
  const length = deck?.flat()?.length ?? 0;
  return length > 0;
}
