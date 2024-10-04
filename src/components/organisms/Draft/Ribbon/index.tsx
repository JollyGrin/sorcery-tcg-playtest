import { Box, HStack } from "styled-system/jsx";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/atoms/Tabs";

import { useCardFullData } from "@/utils/api/cardData/useCardData";
import { DraftProps } from "../types";

export const Ribbon = (props: DraftProps) => {
  const { data: cardData = [] } = useCardFullData();

  const types = cardData?.map((card) => card.guardian.rarity);
  console.log({ rarity: new Set(types) });

  function generateNewBooster() {
    const arr = [...cardData];
    const count = 15;
    let shuffled = arr.slice(); // Shallow copy to avoid mutating the original array
    for (let i = arr.length - 1; i > arr.length - 1 - count; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
    }
    return shuffled.slice(-count); // Return the last `count` items
  }
  function crackBooster() {
    const newBooster = generateNewBooster();
    props.setPlayerData({
      ...props.player,
      activePack: newBooster,
    });
  }

  return (
    <Box p="1rem" bg="red">
      <HStack>
        <Tabs tabs={["Yours", "Pack 1"]} />
        <Button onClick={crackBooster}>Crack a Pack</Button>
      </HStack>
    </Box>
  );
};
