import { DragEvent, ReactNode, useState } from "react";
import { getCardImage, LAYOUT_HEIGHTS } from "./constants";
import { GameFooter } from "./Footer";
import { GameStateActions } from ".";
import { Auras } from "./Auras";
import { PlayerDataProps } from "@/types/card";
import { GameHeader } from "./Header";
import { useMediaQuery } from "@/utils/hooks/useMediaQuery";

const { nav, body, footer } = LAYOUT_HEIGHTS;

export const GameLayout = (
  props: GameStateActions &
    PlayerDataProps & {
      isReversed?: boolean;
      activeCardSlug?: string;
      setHoverCard(slug: string): void;
      children: ReactNode;
    },
) => {
  const matches = useMediaQuery("(min-width: 1200px)");
  const [trans, setTrans] = useState<string>("");

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent default drag behavior

    if (e.clientX !== 0 && e.clientY !== 0) {
      const transform = `translate(${e.clientX - 150}px, ${e.clientY - 150}px)`;
      setTrans(transform ?? "");
    }
  };

  return (
    <div
      className="grid relative gap-0"
      style={{ gridTemplateRows: `${nav} ${body} ${footer}` }}
    >
      <div
        className="z-5 absolute cursor-grab"
        draggable
        onDragStart={(e) => {
          const img = new Image();
          img.src = "";
          e.dataTransfer.setDragImage(img, 0, 0);
        }}
        onDrag={handleDrag} // Directly update position for smoother dragging
        style={{
          transform: trans,
          display: matches ? "block" : "none",
        }}
      >
        {matches && props.activeCardSlug && (
          <img
            src={getCardImage(props.activeCardSlug)}
            alt="card"
            style={{ maxWidth: "20rem" }}
          />
        )}
        {matches && props.activeCardSlug === undefined && (
          <div className="w-[20rem] h-[26rem] bg-gray rounded-[1rem] opacity-35" />
        )}
      </div>
      <GameHeader players={props.players} />
      <div className="relative h-full w-full max-w-[1200px] mx-auto">
        <Auras {...props} />
        <div className="grid gap-2 grid-cols-[repeat(5,1fr)] grid-rows-[repeat(4,1fr)] w-full h-full bg-[rgba(240,240,240,0.5)]">
          {props.children}
        </div>
      </div>

      <GameFooter {...props} />
    </div>
  );
};
