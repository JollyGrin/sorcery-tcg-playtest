"use client";

import * as React from "react";
import { css, cx } from "styled-system/css";
import { muted } from "styled-system/recipes";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { FaChevronDown as IconChevDown } from "react-icons/fa";
import { IconType } from "react-icons";

type Status = {
  value: string;
  label: string;
  icon: IconType;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: IconChevDown,
  },
  {
    value: "todo",
    label: "Todo",
    icon: IconChevDown,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: IconChevDown,
  },
  {
    value: "done",
    label: "Done",
    icon: IconChevDown,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: IconChevDown,
  },
];
const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

export function ComboBox() {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null,
  );
  const [input, setInput] = React.useState("");

  return (
    <Command>
      <CommandInput
        placeholder="Change status..."
        value={input}
        onChangeCapture={(e) => {
          //@ts-expect-error: type mistype
          const value = e?.target?.value as string;
          setInput(value);
        }}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              onSelect={(value) => {
                console.log({ value });
                const newStatus =
                  statuses.find((priority) => priority.label === value) || null;
                console.log({ newStatus });
                setSelectedStatus(newStatus);
                setInput(newStatus?.label ?? "");
                setOpen(false);
              }}
            >
              <status.icon
                className={css({
                  mr: "2",
                  h: "4",
                  w: "4",
                  opacity: status.value === selectedStatus?.value ? "1" : "0.4",
                })}
              />
              <span>{status.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
