"use client";

import { ReactNode, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Box, Grid } from "styled-system/jsx";
import { actions } from "./Commands";

type Actions = {
  value: string;
  label: string;
  params?: Record<string, string>;
};

export const CommandCombobox = (props: {
  children: ({ action }: { action: Actions }) => ReactNode;
}) => {
  const [selectedStatus, setSelectedStatus] = useState<Actions | null>(null);
  const [input, setInput] = useState("");

  return (
    <Grid gridTemplateColumns="2fr 3fr" h="100%">
      <Command>
        <CommandInput
          placeholder="Select action..."
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
            {actions.map((action) => (
              <CommandItem
                key={action.value}
                onSelect={(value) => {
                  const newStatus =
                    actions.find((priority) => priority.label === value) ||
                    null;
                  setSelectedStatus(newStatus);
                  setInput(newStatus?.label ?? "");
                }}
              >
                <span>{action.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
      <Box>
        {selectedStatus !== null && props.children({ action: selectedStatus })}
      </Box>
    </Grid>
  );
};
