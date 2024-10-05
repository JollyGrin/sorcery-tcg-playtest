import { Button } from "@/components/ui/button";
import { Box, Grid } from "styled-system/jsx";
import { DraftPlayerData, DraftProps } from "../types";
import { generateBoosterPack } from "../helpers";
import { useCardFullData } from "@/utils/api/cardData/useCardData";

export const DraftRibbon = (props: DraftProps) => {
  const { data: cardData = [] } = useCardFullData();

  function crackBooster() {
    const newBooster = generateBoosterPack({
      cardData,
      expansionSlug: "bet",
    });
    props.setPlayerData({
      ...props.player,
      activePack: newBooster,
      packsOpened: (props.player.packsOpened ?? 0) + 1,
    });
  }

  function takeAndPass() {
    const { activePack, finishedPacks, selectedIndex, selectedCards } =
      props.player;

    if (!selectedIndex) return;

    const updatedPack = [...activePack];
    const updatedSelected = [...selectedCards];

    const [card] = updatedPack.splice(selectedIndex, 1);
    updatedSelected.push(card);

    props.setPlayerData({
      ...props.player,
      activePack: [],
      finishedPacks: [...finishedPacks, updatedPack],
      selectedIndex: undefined,
    });
  }

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
          <p>{props.player.packsOpened ?? "0"} packs opened</p>
        </div>

        {props.player.activePack.length === 0 ? (
          <Button onClick={crackBooster}>Open a Pack</Button>
        ) : (
          <Button
            disabled={props.player.selectedIndex === undefined}
            onClick={takeAndPass}
          >
            Take &amp; Pass
          </Button>
        )}
      </Grid>
      <Box bg="blue">
        <p>finished</p>
      </Box>
    </Grid>
  );
};
