import { DraftCard } from "@/components/organisms/Draft/Card";
import { DraftPlayerData } from "./types";
import { DraftRibbon } from "./Ribbon";
import { DraftTray } from "./Tray";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { GiCardPick } from "react-icons/gi";

export const DraftBoard = (props: {
  players: Record<string, DraftPlayerData>;
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
}) => {
  function setSelectedIndex(index?: number) {
    props.setPlayerData({
      ...props.player,
      selectedIndex: index,
    });
  }

  if (!props?.players) return <LoadingSpinner message="Loading draft..." />;

  const hasCards = props.player.activePack?.length > 0;

  return (
    <div
      className="grid h-screen gap-0"
      style={{
        gridTemplateRows: `auto auto 1fr`,
        background:
          "radial-gradient(ellipse at 50% 0%, #3D2B1F 0%, #1C1917 60%)",
      }}
    >
      <DraftTray players={props.players} />
      <DraftRibbon {...props} />
      <div
        className="relative overflow-y-auto overflow-x-clip"
        style={{
          background: hasCards
            ? "radial-gradient(ellipse at center top, rgba(212,168,83,0.04) 0%, transparent 60%)"
            : undefined,
        }}
      >
        {hasCards ? (
          <div
            className="grid p-6 pb-12 gap-1"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(16.4rem, 1fr))",
            }}
          >
            {props.player.activePack.map((card, index) => (
              <DraftCard
                key={"draftcard" + card?.name + index}
                {...card}
                isSelected={index === props.player.selectedIndex}
                onSelect={() =>
                  props.player.selectedIndex === index
                    ? setSelectedIndex(undefined)
                    : setSelectedIndex(index)
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 select-none">
            <GiCardPick className="text-[3.5rem] text-[#D4A853] opacity-30" />
            <p className="text-[#A8A29E] text-base max-w-[28ch]">
              {props.player.pendingPacks?.length > 0
                ? "A pack has been passed to you. Activate it above to continue drafting."
                : props.player.packsOpened === 0
                  ? "Choose an expansion and crack your first pack to begin."
                  : "Waiting for the next pack to come around..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
