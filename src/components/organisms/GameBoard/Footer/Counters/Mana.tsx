import { PlayerData } from "@/types/card";
import { useHover } from "@/utils/hooks/useHover";
import { useRef } from "react";
import { Grid, HStack, VStack } from "styled-system/jsx";
import { button } from "styled-system/recipes";

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
    <VStack gap={0} p={0} ref={hoverRef} w="100%">
      <Grid gridTemplateColumns={"1fr"} alignItems="center" w="inherit">
        {isHovering && (
          <HStack
            gap={0}
            p={0}
            opacity="0.05"
            _hover={{ opacity: 1 }}
            transition="all 0.25s ease"
          >
            <button
              onClick={decrement}
              className={button({ variant: "destructive", size: "sm" })}
              style={decrementStyle}
            >
              -
            </button>

            <button
              onClick={increment}
              className={button({ size: "sm" })}
              style={incrementStyle}
            >
              +
            </button>
          </HStack>
        )}

        {!isHovering && (
          <p style={{ justifySelf: "end", fontSize: "0.8rem" }}>
            {props.value}
          </p>
        )}
      </Grid>
    </VStack>
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
