import Link from "next/link";
import { PlayersState } from "@/types/card";
import { LAYOUT_HEIGHTS } from "../constants";
import { PlayerBox } from "./PlayerBox";

import { FaRegCopy as IconCopy } from "react-icons/fa";
import { useCopyToClipboard } from "@/utils/hooks/useCopy";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { cn } from "@/lib/utils";

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
        background: "rgba(28, 25, 23, 0.8)",
        backdropFilter: "blur(8px)",
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
        <div key={key}>
          {isSolo ? (
            <Link href={{ query: { name: key } }}>
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
        </div>
      ))}
      <div
        className={cn(
          "flex items-center absolute right-0 top-[0.25rem] p-[0.25rem_1rem] bg-accent-gold text-surface-page rounded-[2rem]",
          "select-none scale-100 transition-all duration-[0.25s] ease-[ease] cursor-pointer",
          "hover:scale-110 hover:drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]",
          "active:scale-105",
        )}
        onClick={() => {
          const text = `https://spells.bar/online?gid=${query.gid}`;
          copy(text);
          toast.success(`Copied to clipboard`);
        }}
      >
        <IconCopy />
        <p>Share Lobby</p>
      </div>
    </div>
  );
};
