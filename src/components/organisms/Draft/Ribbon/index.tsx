import { Button } from "@/components/ui/button";
import { Box, Flex, Grid } from "styled-system/jsx";
import { DraftPlayerData, DraftProps } from "../types";
import { generateBoosterPack } from "../helpers";
import { useCardFullData } from "@/utils/api/cardData/useCardData";

export const DraftRibbon = (
  props: DraftProps & {
    takeAndPass?(): void;
  },
) => {
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

  // function takeAndPass() {
  //   const { activePack, finishedPacks, selectedIndex, selectedCards } =
  //     props.player;

  //   if (selectedIndex === undefined) return;

  //   const updatedPack = [...activePack];
  //   const updatedSelected = [...selectedCards];

  //   const [card] = updatedPack.splice(selectedIndex, 1);
  //   updatedSelected.push(card);

  //   props.setPlayerData({
  //     ...props.player,
  //     activePack: [],
  //     finishedPacks: [...finishedPacks, updatedPack],
  //     selectedIndex: undefined,
  //   });
  // }

  function activatePendingPack() {
    const { pendingPacks } = props.player;
    const updatedPending = [...pendingPacks];
    const [pack] = updatedPending.splice(0, 1);

    props.setPlayerData({
      ...props.player,
      pendingPacks: updatedPending,
      activePack: pack,
    });
  }

  const [nextPack] = props.player.pendingPacks ?? [];

  return (
    <Grid h="100%" bg="brown" gap={0} gridTemplateColumns="1fr 4fr 1fr">
      <Flex alignItems="center" justifyContent="center">
        <Button
          disabled={
            props.player.pendingPacks.length === 0 ||
            props.player.activePack.length > 0 ||
            nextPack.length === 0
          }
          onClick={activatePendingPack}
        >
          Flip pack -
          {(nextPack?.length > 0 && props.player.pendingPacks.length) || " 0"}
        </Button>
      </Flex>
      <Grid
        gridTemplateColumns="repeat(3,1fr)"
        alignItems="center"
        p="0 0.5rem"
      >
        <div>
          <p>{props.player.packsOpened ?? "0"} packs opened</p>
        </div>

        {props.player.activePack.length === 0 ? (
          <Button disabled={(nextPack ?? []).length > 0} onClick={crackBooster}>
            Open a Pack
          </Button>
        ) : (
          <Button
            disabled={props.player.selectedIndex === undefined}
            onClick={props.takeAndPass}
          >
            Take &amp; Pass
          </Button>
        )}
      </Grid>
      <Flex alignItems="center" justifyContent="center">
        <p>{props.player.finishedPacks.length} ready for next</p>
      </Flex>
    </Grid>
  );
};
