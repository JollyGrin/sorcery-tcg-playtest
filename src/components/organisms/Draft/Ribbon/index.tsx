import { Button } from "@/components/ui/button";
import { Flex, Grid } from "styled-system/jsx";
import { DraftPlayerData, DraftProps } from "../types";
import { findAdjacentPlayers, generateBoosterPack } from "../helpers";
import { useCardFullData } from "@/utils/api/cardData/useCardData";
import { useEffect, useMemo, useState } from "react";
import { SelectedCardsModal } from "./SelectedCardsModal";
import { useRouter } from "next/router";
import { mapPackKey } from "./helpers";

export const DraftRibbon = (
  props: DraftProps & {
    players: Record<string, DraftPlayerData>;
  },
) => {
  const { query } = useRouter();
  const name = (query?.name as string) ?? ("p1" as string);
  const [isOpen, setIsOpen] = useState(false);
  const disclosure = {
    isOpen,
    toggle: () => setIsOpen((prev) => !prev),
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(true),
  };

  const { data: cardData = [] } = useCardFullData();

  const { nextPlayer, previousPlayer } = useMemo(() => {
    return findAdjacentPlayers(props.players[name], props.players);
  }, [
    Object.values(props.players).map((player) => player.joinedSessionTimestamp),
  ]);

  const pendingPackKeys = useMemo(() => {
    if (!props?.player?.pendingPacks) return [];
    return props.player.pendingPacks.map(mapPackKey);
  }, [props.player.pendingPacks]);

  // handle the state of copying finished packs and waiting for removal from prev player
  const { unrequestedPacks, availablePacks } = useMemo(() => {
    const [, values] = previousPlayer;
    const { finishedPacks } = values;

    if (!finishedPacks) return {};

    const unrequestedPacks = finishedPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      return !pendingPackKeys.includes(packKey);
    });

    const requestedPacks = finishedPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      return pendingPackKeys.includes(packKey);
    });
    const requestedPackKeys = requestedPacks.map(mapPackKey);

    const availablePacks = props.player.pendingPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      return !requestedPackKeys.includes(packKey);
    });

    return { unrequestedPacks, requestedPacks, availablePacks };
  }, [previousPlayer[1].finishedPacks, pendingPackKeys]);

  function crackBooster() {
    const newBooster = generateBoosterPack({
      cardData,
      expansionSlug: "bet", // TODO: let players decide expansion
    });
    props.setPlayerData({
      ...props.player,
      activePack: newBooster,
      packsOpened: (props.player.packsOpened ?? 0) + 1,
    });
  }

  // function copyToPending() {
  //   props.setPlayerData({
  //     ...props.player,
  //     pendingPacks: [...props.player.pendingPacks, ...unrequestedPacks],
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

  function takeAndPass() {
    const { activePack, finishedPacks, selectedIndex, selectedCards } =
      props.player;

    if (selectedIndex === undefined) return;

    const updatedPack = [...activePack];
    const updatedSelected = [...selectedCards];

    const [card] = updatedPack.splice(selectedIndex, 1);
    updatedSelected.push(card);

    props.setPlayerData({
      ...props.player,
      activePack: [],
      finishedPacks: [...finishedPacks, updatedPack],
      selectedCards: updatedSelected,
      selectedIndex: undefined,
    });
  }

  const [nextPack] = props.player.pendingPacks ?? [];

  useEffect(() => {
    if (!props.player.pendingPacks) return;
    const [, value] = previousPlayer;

    // keys of my pending packs
    const myPendingPackKeys = props.player.pendingPacks.map(mapPackKey);
    // search for packs in previous player finished to add to my pending
    // packs in previous players finished that are not in my pending
    const packsToRequest = value.finishedPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      // find packs that are not in my pending
      return !myPendingPackKeys.includes(packKey);
    });

    if (packsToRequest.length === 0) return;

    props.setPlayerData({
      ...props.player,
      pendingPacks: [...props.player.pendingPacks, ...packsToRequest],
    });
  }, [previousPlayer[1].finishedPacks]);

  useEffect(() => {
    if (props.player.finishedPacks.length === 0) return;
    // if nextplayer has matching pack in their pending, delete from my finished
    const [, value] = nextPlayer;
    // get keys of packs in next player's pending
    const pendingPackKeys = value.pendingPacks.map(mapPackKey);
    // find packs that are not requested yet
    const unrequestedPacks = props.player.finishedPacks.filter((pack) => {
      const packKey = mapPackKey(pack);
      return !pendingPackKeys.includes(packKey);
    });

    const unrequestedPackKeys = unrequestedPacks.map(mapPackKey);
    const isSame = props.player.finishedPacks.every((pack) => {
      const packKey = mapPackKey(pack);
      return unrequestedPackKeys.includes(packKey);
    });

    if (isSame) return;

    props.setPlayerData({
      ...props.player,
      finishedPacks: unrequestedPacks,
    });
  }, [nextPlayer[1].pendingPacks]);

  if (!availablePacks) return null;

  return (
    <>
      <SelectedCardsModal
        isOpen={disclosure.isOpen}
        onToggle={disclosure.toggle}
        cards={props.player.selectedCards}
      />

      <Grid h="100%" bg="brown" gap={0} gridTemplateColumns="1fr 3fr 1fr">
        <Flex alignItems="center" justifyContent="center" gap={1}>
          {/* <Button */}
          {/*   disabled={unrequestedPacks.length === 0} */}
          {/*   onClick={copyToPending} */}
          {/* > */}
          {/*   Request: {unrequestedPacks.length.toString()} */}
          {/* </Button> */}
          {/* <p>{requestedPacks.length.toString()}</p> */}
          <Button
            disabled={
              availablePacks.length === 0 ||
              props.player.activePack.length > 0 ||
              nextPack.length === 0
            }
            onClick={activatePendingPack}
          >
            Flip -{availablePacks.length}
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
            <Button
              disabled={
                (nextPack ?? []).length > 0 || unrequestedPacks.length > 0
              }
              onClick={crackBooster}
            >
              Open a Pack
            </Button>
          ) : (
            <Button
              disabled={props.player.selectedIndex === undefined}
              onClick={takeAndPass}
            >
              Take &amp; Pass
            </Button>
          )}
        </Grid>
        <Flex alignItems="center" justifyContent="center">
          {props.player.selectedCards.length > 0 && (
            <Button
              bg="purple.800"
              onClick={disclosure.onOpen}
              borderRadius="10rem"
            >
              View Selected
            </Button>
          )}
        </Flex>
      </Grid>
    </>
  );
};
