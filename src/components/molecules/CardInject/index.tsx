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
import { useCardData, useTokenData } from "@/utils/api/cardData/useCardData";
import { Box, Grid, HStack } from "styled-system/jsx";
import { getCardImage } from "@/components/organisms/GameBoard/constants";
import { GameCard, SorceryCard } from "@/types/card";
import { GameStateActions } from "@/components/organisms/GameBoard";
import { Button } from "@/components/ui/button";
import { actSpawnCard } from "@/utils/actions/card";
import { useRouter } from "next/router";
import { Switch } from "@/components/ui/switch";
import { css } from "styled-system/css";
import { TOKEN_CARDS, TOKEN_RUBBLE } from "@/utils/api/cardData/api";

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
  const [isChecked, setIsChecked] = useState(false);
  const { data: cards } = useCardData();

  const { data: tokens } = useTokenData();
  const tokenCards: typeof TOKEN_CARDS =
    tokens
      ?.filter((token) => token !== "rubble")
      ?.map((token) => {
        const name = token.split("_").join(" ");
        const nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
        return {
          slug: token,
          name: nameUppercase,
          type: "minion",
        };
      }) ?? [];

  const statuses: Status[] =
    (isChecked ? [...tokenCards, TOKEN_RUBBLE] : cards)?.map((card) => ({
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
    props.gameState.setGridItems(
      actSpawnCard(props.gameState.gridItems, props.gridIndex ?? 0, newCard),
    );
  }

  return (
    <Box>
      <HStack mb="1rem">
        <p
          className={css({
            opacity: isChecked ? 0.5 : 1,
          })}
        >
          Cards
        </p>
        <Switch
          id="card-type"
          onCheckedChange={(check) => setIsChecked(check)}
        />

        <p
          className={css({
            opacity: !isChecked ? 0.5 : 1,
          })}
        >
          Tokens
        </p>
      </HStack>

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
