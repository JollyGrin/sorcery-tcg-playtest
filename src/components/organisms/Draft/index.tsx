import { DraftCard } from "@/components/organisms/Draft/Card";
import { Grid } from "styled-system/jsx";
import { DraftPlayerData } from "./types";
import { DraftRibbon } from "./Ribbon";
import { DraftTray } from "./Tray";
import { useState } from "react";

const hTop = "7vh";
const hTabs = "5vh";
const hCards = "88vh";
export const gridHeight = { top: hTop, tabs: hTabs, cards: hCards };

export const DraftBoard = (props: {
  players: Record<string, DraftPlayerData>;
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

  return (
    <Grid
      h="100vh"
      bg="gray.300"
      alignItems="center"
      gridTemplateRows={`${hTop} ${hTabs} ${hCards}`}
      gap={0}
    >
      <DraftTray players={props.players} />
      <DraftRibbon {...props} />
      <Grid
        p="3rem 4rem"
        h={hCards}
        overflowY="auto"
        overflowX="clip"
        gridTemplateColumns="repeat(auto-fit, minmax(16.4rem, 1fr))"
        position="relative"
        bg="gray.500"
      >
        {props.player.activePack?.map((card, index) => (
          <DraftCard
            key={"draftcard" + card?.name + index}
            {...card}
            isSelected={index === selectedIndex}
            onSelect={setSelectedIndex}
          />
        ))}
      </Grid>
    </Grid>
  );
};
