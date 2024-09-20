"use client";

import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useCardData } from "@/utils/api/cardData/useCardData";
import { Box, Grid, HStack } from "styled-system/jsx";
import { getCardImage } from "@/components/organisms/GameBoard/constants";
import { GameCard, SorceryCard } from "@/types/card";
import { GameStateActions } from "@/components/organisms/GameBoard";
import { Button } from "@/components/ui/button";
import { actSpawnCard } from "@/utils/actions/card";
import { useRouter } from "next/router";

type Status = {
  value: string;
  label: string;
  type: string;
};

export const CardInject = (props: {
  gridIndex?: number;
  gameState: GameStateActions;
}) => {
  const { query } = useRouter();
  const name = query.name as string | undefined;
  const { data: cards } = useCardData();

  const statuses: Status[] =
    cards?.map((card) => ({
      value: card.slug,
      label: card.name,
      type: card.type,
    })) ?? [];

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [input, setInput] = useState("");

  function spawnCard() {
    if (!selectedStatus) return;
    const newCard: GameCard = {
      id: selectedStatus?.value,
      img: selectedStatus?.value,
      type: selectedStatus?.type as SorceryCard["type"],
      playerName: name,
    };
    console.log({ newCard });
    props.gameState.setGridItems(
      actSpawnCard(props.gameState.gridItems, props.gridIndex ?? 0, newCard),
    );
  }

  return (
    <Box>
      <Grid gridTemplateColumns="1fr 1fr">
        <Command>
          <CommandInput
            placeholder="Select card..."
            value={input}
            onChangeCapture={(e) => {
              //@ts-expect-error: type mistype
              const value = e?.target?.value as string;
              setInput(value);
            }}
          />
          <CommandList style={{ maxHeight: "480px" }}>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {statuses.map((status) => (
                <CommandItem
                  key={status.value}
                  onSelect={(value) => {
                    const newStatus =
                      statuses.find((priority) => priority.label === value) ||
                      null;
                    setSelectedStatus(newStatus);
                    setInput(newStatus?.label ?? "");
                  }}
                >
                  <span>{status.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
        <Box>
          {selectedStatus?.value ? (
            <img alt="card" src={getCardImage(selectedStatus?.value ?? "")} />
          ) : (
            <Box
              w="380px"
              aspectRatio={380 / 530}
              bg="gray.200"
              borderRadius="1rem"
            />
          )}
        </Box>
      </Grid>
      <HStack mt="1rem" justifyContent="end">
        <Button onClick={spawnCard}>
          Add card to Grid-{(props.gridIndex ?? 0) + 1}
        </Button>
      </HStack>
    </Box>
  );
};
