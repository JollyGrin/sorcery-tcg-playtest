import { useQuery } from "@tanstack/react-query";
import { getCardsData } from "./api";

export const useCardData = () => {
  return useQuery({
    queryFn: getCardsData,
    queryKey: ["card-data"],
    staleTime: Infinity,
  });
};
