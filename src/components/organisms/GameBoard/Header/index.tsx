import Link from "next/link";
import { PlayersState } from "@/types/card";
import { LAYOUT_HEIGHTS } from "../constants";

export const GameHeader = (props: { players?: PlayersState }) => {
  const playerKeys = Object.keys(props?.players ?? {}).filter(
    (key) => key !== "GLOBAL",
  );
  return (
    <div
      style={{
        background: "rgba(0,200,0,0.2)",
        padding: "0.5rem",
        height: LAYOUT_HEIGHTS.nav,
        display: "flex",
        gap: "2rem",
      }}
    >
      {playerKeys?.map((key) => (
        <Link href={{ query: { name: key } }}>
          <p>{key}</p>
        </Link>
      ))}
    </div>
  );
};
