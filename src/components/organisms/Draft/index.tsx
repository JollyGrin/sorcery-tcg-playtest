import { DraftCard } from "@/components/organisms/Draft/Card";
import { Tabs } from "@/components/atoms/Tabs";
import { Box, Grid, HStack } from "styled-system/jsx";
import { Button } from "@/components/ui/button";

const hTop = "25vh";
const hTabs = "5vh";
const hCards = "70vh";
export const gridHeight = { top: hTop, tabs: hTabs, cards: hCards };

export const DraftBoard = () => {
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
        overflow="auto"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        position="relative"
        gap="1rem"
        bg="gray.500"
      >
        {Array.from({ length: 15 }).map((_, index) => (
          <DraftCard key={"draftcard" + index} />
        ))}
      </Grid>
    </Grid>
  );
};
