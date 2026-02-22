import { PlayerData } from "@/types/card";

// bit lengthy but maintains type safety
type ManaKey = keyof Pick<PlayerData, "manaRemaining" | "mana">;

export const ManaNumber = (props: {
  type: ManaKey;
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

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={decrement}
        className="min-h-[28px] min-w-[20px] px-0.5 rounded-sm border border-border text-text-secondary hover:text-text-primary hover:border-text-muted hover:bg-surface-muted transition-colors text-xs leading-none cursor-pointer bg-transparent"
      >
        -
      </button>

      <span className="text-xs tabular-nums text-center min-w-[1rem] text-text-primary">
        {props.value}
      </span>

      <button
        onClick={increment}
        className="min-h-[28px] min-w-[20px] px-0.5 rounded-sm border border-border text-text-secondary hover:text-text-primary hover:border-text-muted hover:bg-surface-muted transition-colors text-xs leading-none cursor-pointer bg-transparent"
      >
        +
      </button>
    </div>
  );
};
