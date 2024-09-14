import Link from "next/link";
import { PlayersState } from "@/types/card";
import { GRIDS, LAYOUT_HEIGHTS } from "../constants";
import { Box, Flex, HStack } from "styled-system/jsx";

import { ReactNode } from "react";
import { IconType } from "react-icons";
import { JsxStyleProps } from "styled-system/types";

import { PiCardsThreeFill as IconDeck } from "react-icons/pi";
import { TbCardsFilled as IconHand } from "react-icons/tb";
import { TbMap2 as IconMap } from "react-icons/tb";
import { GiPirateGrave as IconGrave } from "react-icons/gi";
import { GiHealthNormal as IconHealth } from "react-icons/gi";
import { cva } from "styled-system/css/cva.mjs";

export const PlayerBox = ({
  name,
  player,
}: {
  name: string;
  player: PlayersState["GLOBAL"];
}) => {
  const { GRAVE, DECK, ATLAS_DECK, HAND } = GRIDS;
  function length(position: number) {
    return player.state[position].length;
  }

  return (
    <HStack fontSize="1rem" gap={1}>
      <p>{name}</p>

      <Flex
        bg="rgba(255,255,255,0.5)"
        p="0.1rem 0.5rem"
        borderRadius="0.75rem"
        gap={2}
      >
        <Stat Icon={IconGrave} value={length(GRIDS.GRAVE)} />
        <Stat Icon={IconDeck} value={length(GRIDS.DECK)} />
        <Stat Icon={IconMap} value={length(GRIDS.ATLAS_DECK)} />
        <Stat Icon={IconHand} value={length(GRIDS.HAND)} />
      </Flex>

      <Flex
        bg="rgba(0,255,100,0.5)"
        p="0.1rem 0.5rem"
        borderRadius="0.75rem"
        alignItems="center"
        gap={1}
      >
        <IconHealth fontSize="0.75rem" />
        <p>20</p>
      </Flex>

      <Flex
        bg="rgba(255,255,255,0.5)"
        p="0.1rem 0.5rem"
        borderRadius="0.75rem"
        gap={2}
        alignItems="center"
      >
        <Resource icon="earth" value={3} />
        <Resource icon="fire" value={5} />
        <Resource icon="water" value={9} />
        <Resource icon="wind" value={3} />
      </Flex>
    </HStack>
  );
};

const Resource = (props: {
  value: number;
  icon: "earth" | "fire" | "water" | "wind";
}) => (
  <HStack gap={1}>
    <img
      src={`/icon/${props.icon}.webp`}
      alt="fire"
      style={{ height: "1rem", width: "1rem" }}
    />
    <p>{props.value}</p>
  </HStack>
);

const Stat = ({
  Icon,
  value,
  ...props
}: { Icon: IconType; value: number } & JsxStyleProps) => {
  return (
    <HStack gap={1} alignItems="center" {...props}>
      <Icon fontSize="0.875rem" opacity={0.5} />
      <p>{value}</p>
    </HStack>
  );
};

const iconStyle = cva({
  base: {
    width: "1rem",
  },
});
