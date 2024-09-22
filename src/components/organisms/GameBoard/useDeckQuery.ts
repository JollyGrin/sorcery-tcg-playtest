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
  stateActions?: GameStateActions;
}) => {
  const { query } = useRouter();
  const deckQuery = (query[props.name] ?? "") as DECK_ID;

  const [deckType, deckId] = deckQuery?.split("-");
  const useDeck = getDeckHook(deckType as DECK_TYPE);
  const { data: deck } = useDeck(deckId ?? "");

  useEffect(() => {
    if (!props.stateActions?.gridItems) return;
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

export function getDeckQuery(deckId: string) {
  const urlParts = deckId.split("/");
  const isCuriosa = urlParts.includes("curiosa.io");
  const isRealms = urlParts.includes("www.realmsapp.com");
  const isFourCores = urlParts.includes("fourcores.xyz");

  // https://fourcores.xyz/api/tts/T33jdoAJy8PGY9Agq1fo

  let deckQuery;

  if (isCuriosa) {
    const regex = /\/([^\/]+)$/;
    const match = deckId.match(regex);
    if (match) deckQuery = `curiosa-${match[1]}`;
  }
  if (isRealms) {
    const regex = /\/(\d+)\//;
    const match = deckId.match(regex);
    if (match) deckQuery = `realms-${match[1]}`;
  }
  if (isFourCores) {
    const regex = /\/tts\/([A-Za-z0-9]+)/;
    const match = deckId.match(regex);
    if (match) deckQuery = `fourcores-${match[1]}`;
  }

  return deckQuery;
}
