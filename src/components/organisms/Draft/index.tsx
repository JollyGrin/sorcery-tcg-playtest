import { DraftCard } from "@/components/organisms/Draft/Card";
import { DraftPlayerData } from "./types";
import { DraftRibbon } from "./Ribbon";
import { DraftTray } from "./Tray";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";

const hTop = "9vh";
const hTabs = "6vh";
const hCards = "85vh";
export const gridHeight = { top: hTop, tabs: hTabs, cards: hCards };

export const DraftBoard = (props: {
  players: Record<string, DraftPlayerData>;
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
}) => {
  // select a card from active pack, ready for taking
  function setSelectedIndex(index?: number) {
    props.setPlayerData({
      ...props.player,
      selectedIndex: index,
    });
  }

  if (!props?.players) return <LoadingSpinner message="Loading draft..." />;

  return (
    <div
      className="grid h-screen bg-gray-300 items-center gap-0"
      style={{ gridTemplateRows: `${hTop} ${hTabs} ${hCards}` }}
    >
      <DraftTray players={props.players} />
      <DraftRibbon {...props} />
      <div
        className="grid p-[3rem_4rem] overflow-y-auto overflow-x-clip relative bg-gray-500"
        style={{
          height: hCards,
          gridTemplateColumns: "repeat(auto-fit, minmax(16.4rem, 1fr))",
        }}
      >
        {props.player.activePack?.map((card, index) => (
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
    </div>
  );
};
