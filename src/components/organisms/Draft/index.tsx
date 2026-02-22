import { DraftCard } from "@/components/organisms/Draft/Card";
import { DraftPlayerData } from "./types";
import { DraftRibbon } from "./Ribbon";
import { DraftTray } from "./Tray";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner";
import { GiCardPick } from "react-icons/gi";
import { CardDTO } from "@/utils/api/cardData/CardDataType";
import { useState, useRef, useEffect } from "react";

export const DraftBoard = (props: {
  players: Record<string, DraftPlayerData>;
  player: DraftPlayerData;
  setPlayerData(data: DraftPlayerData): void;
}) => {
  // Exit animation state: snapshot of cards + picked index
  const [exitState, setExitState] = useState<{
    cards: CardDTO[];
    pickedIndex: number;
  } | null>(null);

  // Bumped on every new pack entrance to force re-mount & animate
  const [animKey, setAnimKey] = useState(0);
  const prevPackLenRef = useRef(0);
  const isAnimatingRef = useRef(false);

  // Detect when a new pack appears (0 → N cards) to trigger entrance
  useEffect(() => {
    const prev = prevPackLenRef.current;
    const curr = props.player.activePack?.length ?? 0;
    if (prev === 0 && curr > 0 && !isAnimatingRef.current) {
      setAnimKey((k) => k + 1);
    }
    prevPackLenRef.current = curr;
  }, [props.player.activePack?.length]);

  function setSelectedIndex(index?: number) {
    if (isAnimatingRef.current) return;
    props.setPlayerData({
      ...props.player,
      selectedIndex: index,
    });
  }

  // Intercept state updates to animate take-and-pass exits
  const animatedSetPlayerData = (data: DraftPlayerData) => {
    if (isAnimatingRef.current) return;

    // Detect take-and-pass: activePack goes from filled → empty
    const isTakeAndPass =
      props.player.activePack.length > 0 &&
      data.activePack.length === 0 &&
      props.player.selectedIndex !== undefined;

    if (isTakeAndPass) {
      isAnimatingRef.current = true;
      setExitState({
        cards: [...props.player.activePack],
        pickedIndex: props.player.selectedIndex!,
      });

      setTimeout(() => {
        isAnimatingRef.current = false;
        setExitState(null);
        props.setPlayerData(data);
      }, 650);
      return;
    }

    props.setPlayerData(data);
  };

  if (!props?.players) return <LoadingSpinner message="Loading draft..." />;

  const displayCards = exitState?.cards ?? props.player.activePack ?? [];
  const hasCards = displayCards.length > 0;
  const isExiting = !!exitState;

  return (
    <div
      className="grid h-screen gap-0"
      style={{
        gridTemplateRows: "auto auto 1fr",
        background:
          "radial-gradient(ellipse at 50% 0%, #3D2B1F 0%, #1C1917 60%)",
      }}
    >
      <DraftTray players={props.players} />
      <DraftRibbon
        player={props.player}
        setPlayerData={animatedSetPlayerData}
        players={props.players}
        isAnimating={isExiting}
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
              pointerEvents: isExiting ? "none" : "auto",
            }}
          >
            {displayCards.map((card, index) => {
              const isPicked = isExiting && index === exitState?.pickedIndex;

              return (
                <div
                  key={`card-${animKey}-${card.slug}-${index}`}
                  className="relative"
                  style={{
                    zIndex: isPicked ? 10000 : undefined,
                    animation: isExiting
                      ? isPicked
                        ? "draft-pick 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards"
                        : `draft-exit 0.32s ease-in ${0.06 + index * 0.018}s forwards`
                      : `draft-enter 0.38s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.03}s both`,
                  }}
                >
                  <DraftCard
                    {...card}
                    isSelected={
                      isPicked ||
                      (!isExiting &&
                        index === props.player.selectedIndex)
                    }
                    onSelect={() =>
                      props.player.selectedIndex === index
                        ? setSelectedIndex(undefined)
                        : setSelectedIndex(index)
                    }
                  />
                </div>
              );
            })}
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

      {/* Draft animation keyframes */}
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
        @keyframes draft-exit {
          from {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateX(90px) scale(0.96);
          }
        }
        @keyframes draft-pick {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: brightness(1);
          }
          30% {
            opacity: 1;
            transform: scale(1.18) translateY(0);
            filter: brightness(1.35) drop-shadow(0 0 24px rgba(212, 168, 83, 0.7));
          }
          100% {
            opacity: 0;
            transform: scale(0.15) translateY(-65vh);
            filter: brightness(2);
          }
        }
      `}</style>
    </div>
  );
};
