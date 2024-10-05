import { useQuery } from "@tanstack/react-query";
import { getCardsData, getCardsFullData, getTokensData } from "./api";

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

export const useCardFullData = () => {
  return useQuery({
    queryFn: getCardsFullData,
    queryKey: ["card-data-full"],
    staleTime: Infinity,
  });
};
