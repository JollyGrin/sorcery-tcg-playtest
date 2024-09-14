import Link from "next/link";
import { PlayerData, PlayersState } from "@/types/card";
import { GRIDS, LAYOUT_HEIGHTS } from "../constants";
import { Box, Flex, HStack } from "styled-system/jsx";

import { ReactNode, useMemo } from "react";
import { IconType } from "react-icons";
import { JsxStyleProps } from "styled-system/types";

import { PiCardsThreeFill as IconDeck } from "react-icons/pi";
import { TbCardsFilled as IconHand } from "react-icons/tb";
import { TbMap2 as IconMap } from "react-icons/tb";
import { GiPirateGrave as IconGrave } from "react-icons/gi";
import { GiHealthNormal as IconHealth } from "react-icons/gi";
import { cva } from "styled-system/css/cva.mjs";
import css from "styled-jsx/css";

import { mix } from "polished";

export const PlayerBox = ({
  name,
  player,
}: {
  name: string;
  player: PlayersState["GLOBAL"];
}) => {
  const life = player.data.life;

  function length(position: number) {
    return player.state[position].length;
  }

  const bg = useMemo(() => {
    const percent = Math.min(life / 20, 1);
    if (life > 10) return mix(percent, "#00b8a9", "#f8f3d4");
    if (life > 1) return mix(life / 20, "#f8f3d4", "#f6416c");

    return "purple";
  }, [life]);

  return (
    <HStack fontSize="1rem" gap={1}>
      <p className={textStyle({ visual: "bold" })}>{name}</p>

      <Flex
        minW="3rem"
        p="0.1rem 0.5rem"
        borderRadius="0.75rem"
        alignItems="center"
        justifyContent="center"
        gap={1}
        style={{
          background: bg,
        }}
      >
        <IconHealth fontSize="0.75rem" />
        <p>{life}</p>
      </Flex>

      <Flex
        bg="rgba(255,255,255,0.5)"
        p="0.1rem 0.5rem"
        borderRadius="0.75rem"
        gap={2}
        alignItems="center"
      >
        <Resource icon="earth" value={player.data.earth} />
        <Resource icon="fire" value={player.data.fire} />
        <Resource icon="water" value={player.data.water} />
        <Resource icon="wind" value={player.data.wind} />
      </Flex>

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
    </HStack>
  );
};

const Resource = (props: { value: number; icon: keyof PlayerData }) => (
  <HStack gap={1}>
    <img
      src={`/icon/${props.icon}.webp`}
      alt="fire"
      style={{ height: "1rem", width: "1rem" }}
    />
    <p style={{ fontFamily: "monospace" }}>{props.value}</p>
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
      <p style={{ fontFamily: "monospace" }}>{value}</p>
    </HStack>
  );
};

const textStyle = cva({
  base: {
    fontFamily: "monospace",
  },
  variants: {
    visual: {
      bold: { fontWeight: 600, fontFamily: "serif" },
    },
  },
});
