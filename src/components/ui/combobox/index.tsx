"use client";

import * as React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FaChevronDown as IconChevDown } from "react-icons/fa";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

type Status = {
  value: string;
  label: string;
  icon: IconType;
};

const statuses: Status[] = [
  { value: "backlog", label: "Backlog", icon: IconChevDown },
  { value: "todo", label: "Todo", icon: IconChevDown },
  { value: "in progress", label: "In Progress", icon: IconChevDown },
  { value: "done", label: "Done", icon: IconChevDown },
  { value: "canceled", label: "Canceled", icon: IconChevDown },
];

export function ComboBox() {
  const [, setOpen] = React.useState(false);
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
                const newStatus =
                  statuses.find((priority) => priority.label === value) || null;
                setSelectedStatus(newStatus);
                setInput(newStatus?.label ?? "");
                setOpen(false);
              }}
            >
              <status.icon
                className={cn(
                  "mr-2 h-4 w-4",
                  status.value === selectedStatus?.value
                    ? "opacity-100"
                    : "opacity-40",
                )}
              />
              <span>{status.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
