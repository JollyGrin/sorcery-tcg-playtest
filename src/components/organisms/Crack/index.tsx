import { DraftCard } from "@/components/organisms/Draft/Card";
import { DraftPlayerData } from "@/components/organisms/Draft/types";
import { Ribbon } from "@/components/organisms/Crack/Ribbon";
import { useEffect, useMemo, useRef, useState } from "react";
import { CrackStats } from "@/components/organisms/Crack/Stats";
import { GiCardPick } from "react-icons/gi";

export const CrackBoard = (props: {
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
}) => {
  const [activeView, setActiveView] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const prevViewRef = useRef(0);
  const prevPackCountRef = useRef(0);

  const cardView = useMemo(() => {
    return props.player.finishedPacks?.[activeView];
  }, [activeView, props.player.finishedPacks.length]);

  // Trigger entrance animation on view change or new pack
  useEffect(() => {
    const packCount = props.player.finishedPacks?.length ?? 0;
    if (activeView !== prevViewRef.current || packCount !== prevPackCountRef.current) {
      setAnimKey((k) => k + 1);
    }
    prevViewRef.current = activeView;
    prevPackCountRef.current = packCount;
  }, [activeView, props.player.finishedPacks?.length]);

  const hasCards = cardView && cardView.length > 0;

  return (
    <div
      className="grid h-screen gap-0"
      style={{
        gridTemplateRows: "auto auto 1fr",
        background:
          "radial-gradient(ellipse at 50% 0%, #3D2B1F 0%, #1C1917 60%)",
      }}
    >
      <CrackStats {...props} />
      <Ribbon
        {...props}
        activeViewIndex={activeView}
        setActiveView={setActiveView}
      />
      <div
        className="relative overflow-y-auto"
        style={{
          overflowX: "clip",
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
            {cardView.map((card, index) => (
              <div
                key={`crack-${animKey}-${card.slug}-${index}`}
                style={{
                  animation: `draft-enter 0.38s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.03}s both`,
                }}
              >
                <DraftCard {...card} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center gap-3 select-none">
            <GiCardPick className="text-[3.5rem] text-[#D4A853] opacity-30" />
            <p className="text-[#A8A29E] text-base max-w-[28ch]">
              Choose an expansion and crack your first pack!
            </p>
          </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes draft-enter {
          from {
            opacity: 0;
            transform: translateX(-70px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};
