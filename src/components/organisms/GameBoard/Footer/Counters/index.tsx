import { PlayerData, PlayerDataProps } from "@/types/card";
import { useRouter } from "next/router";
import { useState } from "react";
import { cva } from "styled-system/css/cva.mjs";
import { Flex, Grid, HStack, VStack } from "styled-system/jsx";
import { button } from "styled-system/recipes";

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
      p={0}
      m={0}
      justifyContent="center"
      alignItems="center"
    >
      {(["earth", "fire", "water", "wind"] as const).map((type) => (
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
  type: "fire" | "water" | "wind" | "earth";
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
    <VStack gap={0} p={0}>
      <Grid gridTemplateColumns="1fr 1fr" alignItems="center">
        <img
          src={`/icon/${props.type}.webp`}
          alt="fire"
          className={iconStyle()}
          style={{ height: "21px", width: "20px" }}
        />
        <p style={{ justifySelf: "end", fontSize: "0.8rem" }}>{props.value}</p>
      </Grid>
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
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            height: "20px",
          }}
        >
          +
        </button>
      </HStack>
    </VStack>
  );
};

const iconStyle = cva({
  base: {
    width: "25px",
  },
});
