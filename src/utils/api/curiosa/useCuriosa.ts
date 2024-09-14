import { useQuery } from "@tanstack/react-query";
import { getCuriosaDeck, getRealmsAppDeck } from "./api";

export const useCuriosaDeck = (deckId?: string) => {
  return useQuery({
    queryKey: ["deck:curiosa", deckId],
    queryFn: () => getCuriosaDeck(deckId as string),
    enabled: !!deckId,
  });
};

export const useRealmsAppDeck = (deckId?: string) => {
  return useQuery({
    queryKey: ["deck:realms", deckId],
    queryFn: () => getRealmsAppDeck(deckId as string),
    enabled: !!deckId,
  });
};
