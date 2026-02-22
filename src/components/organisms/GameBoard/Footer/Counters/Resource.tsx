import { PlayerData } from "@/types/card";
import { useMemo } from "react";

import { GiHealthNormal as IconHealth } from "react-icons/gi";

import { mix } from "polished";

export const Resource = (props: {
  type: keyof PlayerData;
  setValue(value: number): void;
  value: number;
}) => {
  function increment() {
    props.setValue(props.value + 1);
  }

  function decrement() {
    if (props.value === 0) return;
    props.setValue(props.value - 1);
  }

  // sets fade of life
  const bg = useMemo(() => {
    if (props.type !== "life") return "";
    const percent = Math.min(props.value / 20, 1);
    if (props.value > 10) return mix(percent, "#00b8a9", "#f8f3d4");
    if (props.value === 10) return "#f8f3d4";
    if (props.value > 1) return mix(props.value / 20, "#f8f3d4", "#f6416c");

    return "purple";
  }, [props.value]);

  return (
    <div className="flex items-center gap-1 w-full">
      {props.type === "life" && (
        <IconHealth
          color={bg}
          fontSize="0.85rem"
          style={{
            filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.45))",
            flexShrink: 0,
          }}
        />
      )}

      {!["mana", "manaRemaining", "life"].includes(props.type) && (
        <img
          src={`/icon/${props.type}.webp`}
          alt={props.type}
          style={{ height: "18px", width: "18px", flexShrink: 0 }}
        />
      )}

      <button
        onClick={decrement}
        className="min-h-[28px] min-w-[24px] px-1 rounded-sm border border-border text-text-secondary hover:text-text-primary hover:border-text-muted hover:bg-surface-muted transition-colors text-xs leading-none cursor-pointer bg-transparent"
      >
        -
      </button>

      <span
        className="text-xs tabular-nums text-center min-w-[1.25rem] text-text-primary"
        style={props.type === "life" ? { color: bg } : undefined}
      >
        {props.value}
      </span>

      <button
        onClick={increment}
        className="min-h-[28px] min-w-[24px] px-1 rounded-sm border border-border text-text-secondary hover:text-text-primary hover:border-text-muted hover:bg-surface-muted transition-colors text-xs leading-none cursor-pointer bg-transparent"
      >
        +
      </button>
    </div>
  );
};
