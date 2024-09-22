import { mapDeckCuriosa } from "@/components/molecules/LoadDeck/mappers";
import { actShuffleDeck } from "@/utils/actions";
import { CuriosaResponse } from "@/utils/api/curiosa/api";
import { useRouter } from "next/router";
import { GameStateActions } from "../GameBoard";
import toast from "react-hot-toast";
import {
  useCuriosaDeck,
  useFourCoresDeck,
  useRealmsAppDeck,
} from "@/utils/api/curiosa/useCuriosa";
import { useEffect } from "react";

type DECK_TYPE = "curiosa" | "realms" | "fourcores";
type DECK_ID = `${DECK_TYPE}-${string}`;

export const useDeckQuery = (props: {
  name: string;
  stateActions: GameStateActions;
}) => {
  const { query } = useRouter();
  const deckQuery = (query[props.name] ?? "") as DECK_ID;

  const [deckType, deckId] = deckQuery?.split("-");
  const useDeck = getDeckHook(deckType as DECK_TYPE);
  const { data: deck } = useDeck(deckId ?? "");

  useEffect(() => {
    if (deckQuery && deck && !hasDeck(props.stateActions.gridItems)) {
      setDeck({
        deck,
        gridItems: props.stateActions.gridItems,
        setGridItems: props.stateActions.setGridItems,
        playerName: props.name,
      });
    }
  }, [deckQuery, deck]);
};

function getDeckHook(deckType: DECK_TYPE) {
  if (deckType === "curiosa") return useCuriosaDeck;
  if (deckType === "realms") return useRealmsAppDeck;
  if (deckType === "fourcores") return useFourCoresDeck;
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
