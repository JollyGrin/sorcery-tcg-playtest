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
        className="min-h-[28px] min-w-[20px] px-0.5 rounded-sm border border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400 hover:bg-stone-100 transition-colors text-xs leading-none cursor-pointer bg-transparent"
      >
        -
      </button>

      <span className="text-xs tabular-nums text-center min-w-[1rem] text-stone-800 font-medium">
        {props.value}
      </span>

      <button
        onClick={increment}
        className="min-h-[28px] min-w-[20px] px-0.5 rounded-sm border border-stone-300 text-stone-500 hover:text-stone-800 hover:border-stone-400 hover:bg-stone-100 transition-colors text-xs leading-none cursor-pointer bg-transparent"
      >
        +
      </button>
    </div>
  );
};
