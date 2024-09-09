import { useQuery } from "@tanstack/react-query";
import { getCuriosaDeck } from "./api";

export const useCuriosaDeck = (deckId?: string) => {
  return useQuery({
    queryKey: ["deck:curiosa", deckId],
    queryFn: () => getCuriosaDeck(deckId as string),
    enabled: !!deckId,
  });
};
