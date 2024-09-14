import Link from "next/link";
import { PlayersState } from "@/types/card";
import { GRIDS, LAYOUT_HEIGHTS } from "../constants";
import { Box, HStack } from "styled-system/jsx";
import { PlayerBox } from "./PlayerBox";

export const GameHeader = (props: { players?: PlayersState }) => {
  const playerKeys = Object.keys(props?.players ?? {}).filter(
    (key) => key !== "GLOBAL",
  );
  return (
    <div
      style={{
        background: "rgba(0,200,200,0.2)",
        padding: "0.5rem",
        height: LAYOUT_HEIGHTS.nav,
        display: "flex",
        gap: "2rem",
        overflowX: "auto",
        maxWidth: "100vw",
      }}
    >
      {playerKeys?.map((key) => (
        <Link href={{ query: { name: key } }}>
          {props?.players?.[key] && (
            <PlayerBox player={props?.players[key]} name={key} />
          )}
        </Link>
      ))}
    </div>
  );
};
