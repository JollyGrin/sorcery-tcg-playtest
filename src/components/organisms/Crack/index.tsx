import { DraftCard } from "@/components/organisms/Draft/Card";
import { DraftPlayerData } from "@/components/organisms/Draft/types";
import { Ribbon } from "@/components/organisms/Crack/Ribbon";
import { useMemo, useState } from "react";
import { CrackStats } from "@/components/organisms/Crack/Stats";

const hTop = "10vh";
const hTabs = "5vh";
const hCards = "85vh";
export const gridHeight = { top: hTop, tabs: hTabs, cards: hCards };

export const CrackBoard = (props: {
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
}) => {
  const [activeView, setActiveView] = useState(0);
  const cardView = useMemo(() => {
    return props.player.finishedPacks?.[activeView];
  }, [activeView, props.player.finishedPacks.length]);

  return (
    <div
      className="grid h-screen bg-gray-300 items-center gap-0"
      style={{ gridTemplateRows: `${hTop} ${hTabs} ${hCards}` }}
    >
      <CrackStats {...props} />
      <Ribbon
        {...props}
        activeViewIndex={activeView}
        setActiveView={setActiveView}
      />
      <div
        className="grid p-[3rem_4rem] overflow-y-auto overflow-x-clip relative bg-gray-500"
        style={{
          height: hCards,
          gridTemplateColumns: "repeat(auto-fit, minmax(16.4rem, 1fr))",
        }}
      >
        {(!cardView || cardView?.length === 0) && (
          <p>No packs... yet! Click Crack a Pack!</p>
        )}
        {cardView?.map((card, index) => (
          <DraftCard key={"draftcard" + card?.name + index} {...card} />
        ))}
      </div>
    </div>
  );
};
