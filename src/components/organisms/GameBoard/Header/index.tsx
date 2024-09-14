import Link from "next/link";
import { PlayersState } from "@/types/card";
import { LAYOUT_HEIGHTS } from "../constants";
import { PlayerBox } from "./PlayerBox";

export const GameHeader = (props: { players?: PlayersState }) => {
  const playerKeys = Object.keys(props?.players ?? {}).filter(
    (key) => key !== "GLOBAL",
  );
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
      }}
    >
      {playerKeys?.map((key) => (
        <Link key={key} href={{ query: { name: key } }}>
          {props?.players?.[key] && (
            <PlayerBox player={props?.players[key]} name={key} />
          )}
        </Link>
      ))}
    </div>
  );
};
