import Link from "next/link";
import { PlayersState } from "@/types/card";
import { LAYOUT_HEIGHTS } from "../constants";
import { PlayerBox } from "./PlayerBox";
import { HStack } from "styled-system/jsx";

import { FaRegCopy as IconCopy } from "react-icons/fa";
import { useCopyToClipboard } from "@/utils/hooks/useCopy";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { css } from "styled-system/css";

export const GameHeader = (props: { players?: PlayersState }) => {
  const { query, pathname } = useRouter();
  const [, copy] = useCopyToClipboard();
  const playerKeys = Object.keys(props?.players ?? {}).filter(
    (key) => key !== "GLOBAL",
  );

  const isSolo = pathname === "/solo";
  return (
    <div
      style={{
        background: "rgba(0,200,200,0.2)",
        padding: "0.5rem 1rem",
        height: LAYOUT_HEIGHTS.nav,
        display: "flex",
        gap: "2rem",
        overflowX: "auto",
        maxWidth: "100vw",
        scrollbarGutter: "stable both-edges",
        position: "relative",
      }}
    >
      {playerKeys?.map((key) => (
        <>
          {isSolo ? (
            <Link key={key} href={{ query: { name: key } }}>
              {props?.players?.[key] && (
                <PlayerBox player={props?.players[key]} name={key} />
              )}
            </Link>
          ) : (
            <>
              {props?.players?.[key] && (
                <PlayerBox player={props?.players[key]} name={key} />
              )}
            </>
          )}
        </>
      ))}
      <HStack
        position="absolute"
        right={0}
        top={"0.25rem"}
        p="0.25rem 1rem"
        bg="teal.200"
        borderRadius="2rem"
        className={IconStyle}
        onClick={() => {
          const text = `https://spells.bar/online?gid=${query.gid}`;
          copy(text);
          toast.success(`Copied to clipboard`);
        }}
      >
        <IconCopy />
        <p>Share Lobby</p>
      </HStack>
    </div>
  );
};

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
