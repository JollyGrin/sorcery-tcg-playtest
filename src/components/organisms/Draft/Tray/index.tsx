import { DraftPlayerData } from "../types";
import { CSSProperties } from "react";

import { LuArrowBigRightDash as IconRight } from "react-icons/lu";
import { RiArrowGoBackLine as IconReturnArrow } from "react-icons/ri";
import { FaRegCopy as IconCopy } from "react-icons/fa";
import { sortPlayersByJoin } from "../helpers";
import { useRouter } from "next/router";
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
    <div className="flex items-center p-4 relative" data-testid="stats">
      <div
        className="flex items-center absolute right-3 top-[0.5rem] p-[0.25rem_1rem] bg-teal-200 rounded-[2rem] select-none scale-100 transition-all duration-[0.25s] ease-in-out cursor-pointer hover:scale-110 hover:drop-shadow-[0_0_2px_rgba(0,0,0,0.25)] active:scale-105"
        onClick={() => {
          const text = `https://spells.bar/draft/online?gid=${query.gid}`;
          copy(text);
          toast.success(`Copied to clipboard`);
        }}
      >
        <IconCopy />
        <p>Share Lobby</p>
      </div>

      {players?.map(([key, value], index) => {
        return (
          <div
            key={key + index}
            className="flex items-center gap-1 relative"
          >
            <Dots {...value} />
            <div
              key={key}
              className="flex flex-col bg-[lightblue] p-4 rounded-[0.5rem] border-solid border-2"
              onClick={() => changePlayer(key)}
              style={{
                borderColor:
                  query.name === key ? "gold" : "rgba(0,200,250,0.5)",
              }}
            >
              <p>{key}</p>
              <p>{getStatus(value)}</p>
            </div>
            {index !== players.length - 1 ? (
              <IconRight size="2rem" />
            ) : (
              <IconReturnArrow size="2rem" />
            )}
          </div>
        );
      })}
    </div>
  );
};

const Dots = (props: DraftPlayerData) => {
  const s = "0.85rem"; // dot size

  const style: CSSProperties = {
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
            <div
              data-testid="pending-dot"
              key={pack[0]?.slug + index}
              className="left-[-0.65rem]"
              style={{ ...style, top: index ? `${index * 20}px` : 0 }}
            />
          ),
      )}
      {props.finishedPacks.map((pack, index) => (
        <div
          data-testid="finished-dot"
          key={pack[0]?.slug + index}
          className="right-[1.5rem]"
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
