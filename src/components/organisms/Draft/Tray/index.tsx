import { DraftPlayerData } from "../types";

import {
  LuArrowRight as IconRight,
  LuCornerDownLeft as IconReturn,
} from "react-icons/lu";
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
  const isOnline = pathname.split("/").includes("online");

  function changePlayer(name: string) {
    if (isOnline) return;
    push({
      query: {
        ...query,
        name,
      },
    });
  }

  return (
    <div
      className="flex items-center justify-between px-4 py-2 gap-2"
      style={{
        background: "#292524",
        borderBottom: "1px solid rgba(168,162,158,0.12)",
      }}
      data-testid="stats"
    >
      {/* Player seats */}
      <div className="flex items-center gap-1 overflow-x-auto min-w-0">
        {players?.map(([key, value], index) => {
          const isActive = query.name === key;
          const status = getStatus(value);
          const pendingCount = value.pendingPacks?.filter(
            (p) => p.length > 0,
          ).length ?? 0;
          const finishedCount = value.finishedPacks?.length ?? 0;

          return (
            <div
              key={key + index}
              className="flex items-center gap-1 shrink-0"
            >
              <div
                onClick={() => changePlayer(key)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md transition-all duration-150 relative"
                style={{
                  background: isActive
                    ? "rgba(212,168,83,0.15)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid rgba(212,168,83,0.5)"
                    : "1px solid rgba(255,255,255,0.06)",
                  cursor: isOnline ? "default" : "pointer",
                }}
              >
                {/* Pending indicator */}
                {pendingCount > 0 && (
                  <span
                    className="absolute -top-1 -left-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                    style={{
                      background: "#D4A853",
                      color: "#1C1917",
                    }}
                  >
                    {pendingCount}
                  </span>
                )}
                {/* Finished indicator */}
                {finishedCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
                    style={{
                      background: "#78716C",
                      color: "#FAF7F0",
                    }}
                  >
                    {finishedCount}
                  </span>
                )}

                <span
                  className="text-sm font-medium"
                  style={{
                    color: isActive ? "#D4A853" : "#FAF7F0",
                  }}
                >
                  {key}
                </span>
                {status && (
                  <span
                    className="text-[10px] uppercase tracking-wider"
                    style={{
                      color:
                        status === "selecting"
                          ? "#D4A853"
                          : status === "thinking"
                            ? "#A8A29E"
                            : "#78716C",
                    }}
                  >
                    {status}
                  </span>
                )}
              </div>

              {/* Direction arrow */}
              {index !== players.length - 1 ? (
                <IconRight className="text-[#78716C] text-sm shrink-0 mx-0.5" />
              ) : (
                <IconReturn className="text-[#78716C] text-sm shrink-0 mx-0.5" />
              )}
            </div>
          );
        })}
      </div>

      {/* Share button */}
      {isOnline && (
        <button
          onClick={() => {
            const text = `https://spells.bar/draft/online?gid=${query.gid}`;
            copy(text);
            toast.success("Copied to clipboard");
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs shrink-0 transition-all duration-150"
          style={{
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#A8A29E",
          }}
        >
          <IconCopy className="text-[10px]" />
          <span>Share Lobby</span>
        </button>
      )}
    </div>
  );
};

function getStatus(props: DraftPlayerData) {
  if (!props) return;
  if (!props.activePack) return;

  const activeIsEmpty = props.activePack.length === 0;
  const isSelecting =
    props.selectedIndex !== undefined && props.selectedIndex >= 0;

  if (activeIsEmpty) return "waiting";
  if (!activeIsEmpty && !isSelecting) return "thinking";
  if (!activeIsEmpty && isSelecting) return "selecting";
}
