import { PlayerData, PlayersState } from "@/types/card";
import { GRIDS } from "../constants";
import { Flex, HStack } from "styled-system/jsx";
import { useMemo, useState } from "react";
import { IconType } from "react-icons";
import { JsxStyleProps } from "styled-system/types";
import { cva } from "styled-system/css/cva.mjs";
import { mix } from "polished";
import { PiCardsThreeFill as IconDeck } from "react-icons/pi";
import { TbCardsFilled as IconHand, TbMap2 as IconMap } from "react-icons/tb";
import {
  GiBoltSpellCast as IconMana,
  GiPirateGrave as IconGrave,
  GiHealthNormal as IconHealth,
} from "react-icons/gi";
import { LiaDiceD6Solid as IconD6 } from "react-icons/lia";
import { FaDiceD20 as IconD20 } from "react-icons/fa";
import { ViewGraveyardModal } from "./ViewGraveyardModal";
import { Modal } from "@/components/atoms/Modal";
import { DiscardModalBody } from "../Footer/Grave/DiscardModal";

export const PlayerBox = ({
  name,
  player,
}: {
  name: string;
  player: PlayersState["GLOBAL"];
}) => {
  const [modal, setModal] = useState(false);
  const disclosure = {
    onOpen: () => setModal(true),
    isOpen: modal === true,
    onClose: () => setModal(false),
  };

  const life = player?.data?.life ?? 0;

  function length(position: number) {
    return player.state[position].length;
  }

  const bg = useMemo(() => {
    const percent = Math.min(life / 20, 1);
    if (life > 10) return mix(percent, "#00b8a9", "#f8f3d4");
    if (life > 1) return mix(life / 20, "#f8f3d4", "#f6416c");

    return "purple";
  }, [life]);

  if (!player) return null;
  if (!player?.data) return null;
  if (player?.data?.earth === undefined) return null;

  return (
    <>
      {disclosure.isOpen && (
        <Modal
          wrapperProps={{
            open: disclosure.isOpen,
            onOpenChange: disclosure.onClose,
          }}
          content={
            <DiscardModalBody
              cards={player?.state[GRIDS.GRAVE]}
              gridItems={player?.state}
            />
          }
        />
      )}
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
          <IconMana color="gray" size={15} style={{ marginLeft: "0.25rem" }} />
          <p
            style={{
              color: "gray",
            }}
          >
            {player.data.manaRemaining}
            {"/"}
            {player.data.mana}
          </p>
        </Flex>

        <Flex
          bg="rgba(255,255,255,0.5)"
          p="0.1rem 0.5rem"
          borderRadius="0.75rem"
          gap={2}
        >
          <span onClick={disclosure.onOpen}>
            <Stat Icon={IconGrave} value={length(GRIDS.GRAVE)} />
          </span>
          <Stat Icon={IconDeck} value={length(GRIDS.DECK)} />
          <Stat Icon={IconMap} value={length(GRIDS.ATLAS_DECK)} />
          <Stat Icon={IconHand} value={length(GRIDS.HAND)} />
          {player?.data?.dice?.d6 !== undefined && (
            <Stat Icon={IconD6} value={player?.data?.dice?.d6} />
          )}
          {player?.data?.dice?.d20 !== undefined && (
            <Stat Icon={IconD20} value={player?.data?.dice?.d20} />
          )}
        </Flex>
      </HStack>
    </>
  );
};

const Resource = (props: { value: number; icon: keyof PlayerData }) => (
  <HStack gap={1}>
    <img
      src={`/icon/${props.icon}.webp`}
      alt="resource icon"
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
