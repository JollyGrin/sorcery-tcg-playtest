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
    return props.player.pendingPacks.map(mapPackKey);
  }, [props.player.pendingPacks]);

  const { unrequestedPacks, requestedPacks, availablePacks } = useMemo(() => {
    const [_, values] = previousPlayer;
    const { finishedPacks } = values;

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
      expansionSlug: "bet",
    });
    props.setPlayerData({
      ...props.player,
      activePack: newBooster,
      packsOpened: (props.player.packsOpened ?? 0) + 1,
    });
  }

  function copyToPending() {
    props.setPlayerData({
      ...props.player,
      pendingPacks: [...props.player.pendingPacks, ...unrequestedPacks],
    });
  }

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
      selectedIndex: undefined,
    });
  }

  const [nextPack] = props.player.pendingPacks ?? [];

  useEffect(() => {
    // if nextplayer has finished pack in their pending, delete from my finished
  }, []);

  return (
    <>
      <SelectedCardsModal
        isOpen={disclosure.isOpen}
        onToggle={disclosure.toggle}
        cards={props.player.selectedCards}
      />

      <Grid h="100%" bg="brown" gap={0} gridTemplateColumns="1fr 3fr 1fr">
        <Flex alignItems="center" justifyContent="center" gap={1}>
          <Button
            disabled={unrequestedPacks.length === 0}
            onClick={copyToPending}
          >
            Request: {unrequestedPacks.length.toString()}
          </Button>
          <p>{requestedPacks.length.toString()}</p>
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
