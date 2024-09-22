import { useQuery } from "@tanstack/react-query";
import { getCardsData, getTokensData } from "./api";

export const useCardData = () => {
  return useQuery({
    queryFn: getCardsData,
    queryKey: ["card-data"],
    staleTime: Infinity,
  });
};

export const useTokenData = () => {
  return useQuery({
    queryFn: getTokensData,
    queryKey: ["token-data"],
    staleTime: Infinity,
  });
};
