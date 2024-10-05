import { Button } from "@/components/ui/button";
import { Box, Grid, HStack } from "styled-system/jsx";
import { DraftProps } from "../types";

export const DraftRibbon = (props: DraftProps) => {
  return (
    <Grid h="100%" bg="brown" gap={0} gridTemplateColumns="1fr 4fr 1fr">
      <Box bg="red">
        <p>pending</p>
      </Box>
      <Grid
        gridTemplateColumns="repeat(3,1fr)"
        alignItems="center"
        p="0 0.5rem"
      >
        <div>
          <p>2x packs remaining</p>
        </div>
        <Button disabled={!props.player || props.player.activePack.length > 0}>
          Open a Pack
        </Button>
      </Grid>
      <Box bg="blue">
        <p>finished</p>
      </Box>
    </Grid>
  );
};
