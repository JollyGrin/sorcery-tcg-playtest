import { DraftCard } from "@/components/organisms/Draft/Card";
import { Grid } from "styled-system/jsx";
import { DraftPlayerData } from "@/components/organisms/Draft/types";
import { Ribbon } from "@/components/organisms/Crack/Ribbon";
import { useMemo, useState } from "react";
import { CrackStats } from "@/components/organisms/Crack/Stats";

const hTop = "10vh";
const hTabs = "5vh";
const hCards = "85vh";
export const gridHeight = { top: hTop, tabs: hTabs, cards: hCards };

export const CrackBoard = (props: {
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
      <CrackStats {...props} />
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
