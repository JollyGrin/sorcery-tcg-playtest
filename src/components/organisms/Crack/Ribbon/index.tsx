import { Box, Grid, HStack } from "styled-system/jsx";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/atoms/Tabs";

import { useCardFullData } from "@/utils/api/cardData/useCardData";
import { DraftProps } from "@/components/organisms/Draft/types";
import {
  Expansion,
  generateBoosterPack,
} from "@/components/organisms/Draft/helpers";
import { useState } from "react";

export const Ribbon = (
  props: DraftProps & {
    activeViewIndex: number;
    setActiveView(index: number): void;
  },
) => {
  const { data: cardData = [] } = useCardFullData();
  const [set, setSet] = useState<Expansion>("Beta");

  function crackBooster() {
    const newBooster = generateBoosterPack({
      cardData,
      expansionSlug: set,
    });
    const { finishedPacks } = props.player;
    const isEmpty = finishedPacks.length === 0;
    props.setPlayerData({
      ...props.player,
      finishedPacks: isEmpty ? [newBooster] : [...finishedPacks, newBooster],
    });
    props.setActiveView(props.player.finishedPacks.length);
  }

  const packTabs =
    props.player?.finishedPacks?.length > 0
      ? props.player?.finishedPacks?.map((_, index) => `Pack ${index + 1}`)
      : [];

  return (
    <Box p="1rem" bg="brown">
      <Grid gridTemplateColumns="1fr 7fr">
        <HStack>
          <select onChange={(e) => setSet(e.target.value as Expansion)}>
            <option>Alpha</option>
            <option>Beta</option>
            <option>Arthurian Legends</option>
          </select>
          <Button minW="9rem" onClick={crackBooster}>
            Crack a Pack
          </Button>
        </HStack>
        <HStack maxW="70vw" overflowX="auto" overflowY="clip">
          {props.player.finishedPacks.length > 0 && (
            <Tabs
              tabs={packTabs}
              onSelect={props.setActiveView}
              selectedIndex={props.activeViewIndex}
            />
          )}
        </HStack>
      </Grid>
    </Box>
  );
};
