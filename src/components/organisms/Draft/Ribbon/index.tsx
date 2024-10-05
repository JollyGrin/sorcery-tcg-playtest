import { Button } from "@/components/ui/button";
import { Box, Grid, HStack } from "styled-system/jsx";

export const DraftRibbon = () => {
  return (
    <Grid h="100%" bg="brown" gap={0} gridTemplateColumns="1fr 4fr 1fr">
      <Box bg="red">
        <p>pending</p>
      </Box>
      <Grid gridTemplateColumns="repeat(3,1fr)" alignItems="center">
        <div>
          <p>2x packs remaining</p>
        </div>
        <Button>Open a Pack</Button>
      </Grid>
      <Box bg="blue">
        <p>finished</p>
      </Box>
    </Grid>
  );
};
