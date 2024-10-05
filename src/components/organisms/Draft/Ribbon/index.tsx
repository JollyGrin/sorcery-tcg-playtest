import { Box, HStack } from "styled-system/jsx";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/atoms/Tabs";

import { useCardFullData } from "@/utils/api/cardData/useCardData";
import { DraftProps } from "../types";
import { generateBoosterPack } from "../helpers";
import { useEffect } from "react";

export const Ribbon = (props: DraftProps) => {
  const { data: cardData = [] } = useCardFullData();

  function crackBooster() {
    const newBooster = generateBoosterPack({
      cardData,
      expansionSlug: "alp",
    });
    const existingActive = props.player.activePack;
    props.setPlayerData({
      ...props.player,
      activePack: newBooster,
      finishedPacks: [...props.player.finishedPacks, existingActive],
    });
  }

  useEffect(() => {
    if (props.player.activePack.length === 0) crackBooster();
  }, []);

  return (
    <Box p="1rem" bg="red">
      <HStack>
        <Tabs tabs={["Yours", "Pack 1"]} />
        <Button onClick={crackBooster}>Crack a Pack</Button>
      </HStack>
    </Box>
  );
};
