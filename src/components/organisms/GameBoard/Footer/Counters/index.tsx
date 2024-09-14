import { PlayerData, PlayerDataProps } from "@/types/card";
import { useHover } from "@/utils/hooks/useHover";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { cva } from "styled-system/css/cva.mjs";
import { Flex, Grid, HStack, VStack } from "styled-system/jsx";
import { button } from "styled-system/recipes";

import { GiHealthNormal as IconHealth } from "react-icons/gi";

import { mix } from "polished";

export const CountersTray = (props: PlayerDataProps) => {
  const { query } = useRouter();
  const name = query?.name ?? "p1";
  const me = props?.players?.[name as string].data;

  function setField(field: keyof PlayerData) {
    return (value: number) => {
      const newData = { ...me, [field]: value };
      props.setMyData(newData as PlayerData);
    };
  }

  return (
    <Flex
      direction="column"
      h="100%"
      overflowY="auto"
      p="0.5rem"
      justifyContent="space-between"
      alignItems="center"
      gap="0.5rem"
    >
      {(["life", "earth", "fire", "water", "wind"] as const).map((type) => (
        <Resource
          key={type}
          type={type}
          setValue={setField(type)}
          value={me?.[type] ?? 0}
        />
      ))}
    </Flex>
  );
};

const Resource = (props: {
  type: "fire" | "water" | "wind" | "earth" | "life";
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

  const bg = useMemo(() => {
    if (props.type !== "life") return "";
    const percent = Math.min(props.value / 20, 1);
    if (props.value > 10) return mix(percent, "#00b8a9", "#f8f3d4");
    if (props.value === 10) return "#f8f3d4";
    if (props.value > 1) return mix(props.value / 20, "#f8f3d4", "#f6416c");

    return "purple";
  }, [props.value]);

  return (
    <VStack gap={0} p={0} ref={hoverRef} w="100%">
      <Grid gridTemplateColumns="2fr 1fr" alignItems="center" w="inherit">
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
              style={{
                padding: "0.5rem",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                height: "20px",
              }}
            >
              -
            </button>

            <button
              onClick={increment}
              className={button({ size: "sm" })}
              style={{
                padding: "0.5rem",
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                height: "20px",
              }}
            >
              +
            </button>
          </HStack>
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
        {!isHovering && props.type !== "life" && (
          <img
            src={`/icon/${props.type}.webp`}
            alt="fire"
            className={iconStyle()}
            style={{ height: "21px", width: "20px" }}
          />
        )}
        <p style={{ justifySelf: "end", fontSize: "0.8rem" }}>{props.value}</p>
      </Grid>
    </VStack>
  );
};

const iconStyle = cva({
  base: {
    width: "25px",
  },
});
