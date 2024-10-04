import { DraftCard } from "@/components/organisms/Draft/Card";
import { Box, Grid } from "styled-system/jsx";
import { DraftPlayerData } from "./types";
import { Ribbon } from "./Ribbon";

const hTop = "20vh";
const hTabs = "5vh";
const hCards = "75vh";
export const gridHeight = { top: hTop, tabs: hTabs, cards: hCards };

export const DraftBoard = (props: {
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
}) => {
  return (
    <Grid
      h="100vh"
      bg="gray.300"
      alignItems="center"
      gridTemplateRows={`${hTop} ${hTabs} ${hCards}`}
      gap={0}
    >
      <Box>todo: player data</Box>
      <Ribbon {...props} />
      <Grid
        p="4rem 0.5rem"
        h={hCards}
        overflowY="auto"
        overflowX="clip"
        gridTemplateColumns="repeat(auto-fit, minmax(16.4rem, 1fr))"
        position="relative"
        bg="gray.500"
      >
        {props.player.activePack.map((card, index) => (
          <DraftCard key={"draftcard" + card.name} {...card} />
        ))}
      </Grid>
    </Grid>
  );
};
