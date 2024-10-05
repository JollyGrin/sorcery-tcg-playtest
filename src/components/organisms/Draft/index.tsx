import { DraftCard } from "@/components/organisms/Draft/Card";
import { Grid } from "styled-system/jsx";
import { DraftPlayerData } from "./types";
import { Ribbon } from "./Ribbon";
import { useMemo, useState } from "react";
import { DraftStats } from "./Stats";

const hTop = "7vh";
const hTabs = "5vh";
const hCards = "88vh";
export const gridHeight = { top: hTop, tabs: hTabs, cards: hCards };

export const DraftBoard = (props: {
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
}) => {
  const [activeView, setActiveView] = useState(0);
  const cardView = useMemo(() => {
    return props.player.finishedPacks?.[activeView];
  }, [activeView, props.player.finishedPacks.length]);

  return (
    <Grid
      h="100vh"
      bg="gray.300"
      alignItems="center"
      gridTemplateRows={`${hTop} ${hTabs} ${hCards}`}
      gap={0}
    >
      <DraftStats {...props} />
      <Ribbon
        {...props}
        activeViewIndex={activeView}
        setActiveView={setActiveView}
      />
      <Grid
        p="3rem 4rem"
        h={hCards}
        overflowY="auto"
        overflowX="clip"
        gridTemplateColumns="repeat(auto-fit, minmax(16.4rem, 1fr))"
        position="relative"
        bg="gray.500"
      >
        {(!cardView || cardView?.length === 0) && (
          <p>No packs... yet! Click Crack a Pack!</p>
        )}
        {cardView?.map((card, index) => (
          <DraftCard key={"draftcard" + card?.name + index} {...card} />
        ))}
      </Grid>
    </Grid>
  );
};
