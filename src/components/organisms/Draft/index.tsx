import { DraftCard } from "@/components/organisms/Draft/Card";
import { Tabs } from "@/components/atoms/Tabs";
import { Box, Grid, HStack } from "styled-system/jsx";
import { Button } from "@/components/ui/button";
import { DraftPlayerData } from "./types";
import { useCardFullData } from "@/utils/api/cardData/useCardData";

const hTop = "20vh";
const hTabs = "5vh";
const hCards = "75vh";
export const gridHeight = { top: hTop, tabs: hTabs, cards: hCards };

export const DraftBoard = ({
  player,
  setPlayerData,
}: {
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
}) => {
  const { data: cardData = [] } = useCardFullData();

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
    setPlayerData({
      ...player,
    });
  }

  return (
    <Grid
      h="100vh"
      bg="gray.300"
      alignItems="center"
      gridTemplateRows={`${hTop} ${hTabs} ${hCards}`}
      gap={0}
    >
      <Box>hi</Box>
      <Box p="1rem" bg="red">
        <HStack>
          <Tabs tabs={["Yours", "Pack 1"]} />
          <Button>Crack a Pack</Button>
        </HStack>
      </Box>
      <Grid
        p="4rem 0.5rem"
        h={hCards}
        overflowY="auto"
        overflowX="clip"
        gridTemplateColumns="repeat(auto-fit, minmax(16.4rem, 1fr))"
        position="relative"
        bg="gray.500"
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <DraftCard key={"draftcard" + index} />
        ))}
      </Grid>
    </Grid>
  );
};
