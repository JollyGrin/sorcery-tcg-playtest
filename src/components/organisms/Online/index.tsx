import { useWebGame } from "@/lib/contexts/WebGameProvider";

export const Online = () => {
  const { gameState } = useWebGame();
  return <p>{JSON.stringify(gameState)}</p>;
};
