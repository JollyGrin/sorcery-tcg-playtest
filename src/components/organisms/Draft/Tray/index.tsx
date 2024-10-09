import { Box, Flex, HStack } from "styled-system/jsx";
import { DraftPlayerData } from "../types";
import { css } from "styled-system/css";

import { LuArrowBigRightDash as IconRight } from "react-icons/lu";
import { RiArrowGoBackLine as IconReturnArrow } from "react-icons/ri";
import { FaRegCopy as IconCopy } from "react-icons/fa";
import { sortPlayersByJoin } from "../helpers";
import { useRouter } from "next/router";
import { Properties } from "styled-system/types/csstype";
import { useCopyToClipboard } from "@/utils/hooks";
import toast from "react-hot-toast";

export const DraftTray = (props: {
  players: Record<string, DraftPlayerData>;
}) => {
  const { query, push, pathname } = useRouter();
  const players = Object.entries(props.players).sort(sortPlayersByJoin);
  const [, copy] = useCopyToClipboard();

  function changePlayer(name: string) {
    if (pathname.split("/").includes("online")) return;
    push({
      query: {
        ...query,
        name,
      },
    });
  }

  return (
    <HStack data-testid="stats" p="1rem" position="relative">
      <HStack
        position="absolute"
        right={3}
        top={"0.5rem"}
        p="0.25rem 1rem"
        bg="teal.200"
        borderRadius="2rem"
        className={IconStyle}
        onClick={() => {
          const text = `https://spells.bar/draft/online?gid=${query.gid}`;
          copy(text);
          toast.success(`Copied to clipboard`);
        }}
      >
        <IconCopy />
        <p>Share Lobby</p>
      </HStack>

      {players?.map(([key, value], index) => {
        return (
          <Flex
            key={key + index}
            alignItems="center"
            gap={1}
            position="relative"
          >
            <Dots {...value} />
            <Flex
              key={key}
              direction="column"
              bg="lightblue"
              p="1rem"
              borderRadius="0.5rem"
              border="solid 2px"
              onClick={() => changePlayer(key)}
              style={{
                borderColor:
                  query.name === key ? "gold" : "rgba(0,200,250,0.5)",
              }}
            >
              <p>{key}</p>
              <p>{getStatus(value)}</p>
            </Flex>
            {index !== players.length - 1 ? (
              <IconRight size="2rem" />
            ) : (
              <IconReturnArrow size="2rem" />
            )}
          </Flex>
        );
      })}
    </HStack>
  );
};

const Dots = (props: DraftPlayerData) => {
  const s = "0.85rem"; // dot size

  const style: Properties = {
    width: s,
    height: s,
    position: "absolute",
    borderRadius: "100%",
    background: "red",
  };

  if (!props?.pendingPacks) return <div />;
  if (!props?.finishedPacks) return <div />;

  return (
    <>
      {props.pendingPacks.map(
        (pack, index) =>
          (pack ?? []).length > 0 && (
            <Box
              data-testid="pending-dot"
              key={pack[0]?.slug + index}
              left="-0.65rem"
              style={{ ...style, top: index ? `${index * 20}px` : 0 }}
            />
          ),
      )}
      {props.finishedPacks.map((pack, index) => (
        <Box
          data-testid="finished-dot"
          key={pack[0]?.slug + index}
          right="1.5rem"
          style={{ ...style, top: index ? `${index * 20}px` : 0 }}
        />
      ))}
    </>
  );
};

function getStatus(props: DraftPlayerData) {
  if (!props) return;
  if (!props.activePack) return;
  if (!props.selectedIndex) return;

  const activeIsEmpty = props.activePack.length === 0;
  // const pendingIsEmpty = props.pendingPacks.length === 0;
  const isSelecting = props.selectedIndex !== undefined;

  if (activeIsEmpty) return "waiting";
  if (!activeIsEmpty && !isSelecting) return "thinking";
  if (!activeIsEmpty && isSelecting) return "selecting";
}

const IconStyle = css({
  userSelect: "none",
  transform: "scale(1)",
  transition: "all 0.25s ease",
  cursor: "pointer",
  _hover: {
    transform: "scale(1.1)",
    filter: "drop-shadow(0 0 2px rgba(0,0,0,0.25))",
  },
  _active: {
    transform: "scale(1.05)",
  },
});
