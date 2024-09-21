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
import { Switch } from "@/components/ui/switch";
import { css } from "styled-system/css";
import { TOKEN_CARDS } from "@/utils/api/cardData/api";

type Status = {
  value: string;
  label: string;
  params?: Record<string, string>;
};

const statuses: Status[] = [
  {
    value: "d6",
    label: "Roll a D6",
  },
];

export const CommandCombobox = (props: {
  gridIndex?: number;
  gameState: GameStateActions;
}) => {
  const { query } = useRouter();
  const name = query.name as string | undefined;
  const [isChecked, setIsChecked] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [input, setInput] = useState("");

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
          <p>djska</p>
        </Box>
      </Grid>
      <HStack mt="1rem" justifyContent="end">
        <Button>djsak</Button>
      </HStack>
    </Box>
  );
};
