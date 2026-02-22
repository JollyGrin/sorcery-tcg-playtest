import { PlayerData } from "@/types/card";
import { useHover } from "@/utils/hooks/useHover";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button/variants";

// bit lengthy but maintains type safety
type ManaKey = keyof Pick<PlayerData, "manaRemaining" | "mana">;

export const ManaNumber = (props: {
  type: ManaKey;
  setValue(value: number): void;
  value: number;
}) => {
  const hoverRef = useRef(null);
  const isHovering = useHover(hoverRef);

  function increment() {
    props.setValue(props.value + 1);
  }

  function decrement() {
    if (props.value === 0) return;
    props.setValue(props.value - 1);
  }

  return (
    <div className="flex flex-col gap-0 p-0 w-full" ref={hoverRef}>
      <div className="grid grid-cols-[1fr] items-center w-inherit">
        {isHovering && (
          <div className="flex items-center gap-0 p-0 opacity-5 hover:opacity-100 transition-all duration-[0.25s] ease-[ease]">
            <button
              onClick={decrement}
              className={buttonVariants({ variant: "destructive", size: "sm" })}
              style={decrementStyle}
            >
              -
            </button>

            <button
              onClick={increment}
              className={buttonVariants({ size: "sm" })}
              style={incrementStyle}
            >
              +
            </button>
          </div>
        )}

        {!isHovering && (
          <p style={{ justifySelf: "end", fontSize: "0.8rem" }}>
            {props.value}
          </p>
        )}
      </div>
    </div>
  );
};

const decrementStyle = {
  padding: "0.1rem 0.25rem",
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  height: "20px",
};
const incrementStyle = {
  padding: "0.1rem 0.25rem",
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  height: "20px",
};
