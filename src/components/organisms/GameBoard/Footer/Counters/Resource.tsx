import { PlayerData } from "@/types/card";
import { useHover } from "@/utils/hooks/useHover";
import { useMemo, useRef } from "react";
import { buttonVariants } from "@/components/ui/button/variants";

import { GiHealthNormal as IconHealth } from "react-icons/gi";

import { mix } from "polished";

export const Resource = (props: {
  type: keyof PlayerData;
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
    <div className="flex flex-col gap-0 p-0 w-full" ref={hoverRef}>
      <div className="grid grid-cols-[2fr_1fr] items-center w-inherit">
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
        {!isHovering && props.type === "life" && (
          <IconHealth
            color={bg}
            fontSize="1rem"
            style={{
              filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.45))",
            }}
          />
        )}

        {!isHovering &&
          !["mana", "manaRemaining", "life"].includes(props.type) && (
            <img
              src={`/icon/${props.type}.webp`}
              alt="fire"
              className="w-[25px]"
              style={{ height: "21px", width: "20px" }}
            />
          )}

        <p style={{ justifySelf: "end", fontSize: "0.8rem" }}>{props.value}</p>
      </div>
    </div>
  );
};

const decrementStyle = {
  padding: "0.5rem",
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  height: "20px",
};
const incrementStyle = {
  padding: "0.5rem",
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  height: "20px",
};
