import { AuraDrop } from "./AuraDrop";
import { GameStateActions } from "..";
import { DragItem } from "@/components/molecules/DragItem";
import { GameCard } from "@/types/card";
import { useState } from "react";
import { Modal } from "@/components/atoms/Modal";
import { FullCardAtlas } from "@/components/atoms/card-view/atlas";
import { CardImage as FullCard } from "@/components/atoms/card-view/card";
import { CARD_CDN, GRIDS } from "../constants";
import { useRouter } from "next/router";

export const Auras = (props: GameStateActions & { isReversed?: boolean }) => {
  return (
    <div className="absolute w-full h-full">
      {Array.from({ length: 12 })
        .map((_, index) => index)
        .map((index) => (
          <Aura
            key={"aura" + index}
            card={props.gridItems?.[GRIDS.AURA_1 + index]?.[0]}
            gridIndex={GRIDS.AURA_1 + index}
            index={0}
            isReversed={props.isReversed}
          />
        ))}
    </div>
  );
};

const Aura = (props: {
  card: GameCard;
  gridIndex: number;
  index: number;
  isReversed?: boolean;
}) => {
  const { query } = useRouter();
  const name = query?.name ?? "p1";
  const isReversed = props.isReversed ?? name === "p2";

  const auraCard = props.card;
  const auraIndex = props.gridIndex - GRIDS.AURA_1; // normalize to zero
  const topIndex = Math.floor(auraIndex / 4) + 1; // increments every 4
  // const top = `${topIndex * 25}%`; // in percent
  const leftIndex = 1 + (auraIndex % 4); // every 4, resets
  // const left = `${leftIndex * 20}%`; // in percent

  const top = isReversed ? `${(4 - topIndex) * 25}%` : `${topIndex * 25}%`; // Reverse top
  const left = isReversed ? `${(5 - leftIndex) * 20}%` : `${leftIndex * 20}%`; // Reverse left
  return (
    <div
      style={{
        top,
        left,
      }}
      className="absolute w-[75px] h-[75px] -translate-x-1/2 -translate-y-1/2 hover:border-[5px] hover:border-solid hover:border-[rgba(0,100,200,0.5)] hover:rounded-[1rem]"
    >
      {!auraCard?.id && (
        <AuraDrop gridIndex={props.gridIndex}>
          <div className="w-full h-full bg-cover rotate-90 rounded-[0.5rem]" />
        </AuraDrop>
      )}
      {auraCard?.id && (
        <DragWrapper gridIndex={props.gridIndex} index={0} card={auraCard} />
      )}
    </div>
  );
};

const DragWrapper = ({
  card,
  ...props
}: {
  gridIndex: number;
  index: number;
  card: GameCard;
}) => {
  const [preview, setPreview] = useState(false);
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DragItem
        gridIndex={props.gridIndex}
        index={props.index}
        style={{ width: "100%", height: "100%", zIndex: 1000 }}
      >
        <div
          className="w-full h-full bg-[length:200%] bg-[position:10%_20%] rounded-[0.5rem]"
          style={{
            backgroundImage: `url(${CARD_CDN}${card.img}.webp)`,
            transform: card?.type === "site" ? "rotate(90deg)" : "",
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            setPreview(true);
          }}
        />
      </DragItem>
      <Modal
        wrapperProps={{ open: preview, onOpenChange: setPreview }}
        content={
          <div className="h-[600px] min-w-[400px]">
            {card?.type === "site" && <FullCardAtlas img={card?.img} />}
            {card?.type !== "site" && <FullCard img={card?.img} />}
          </div>
        }
      />
    </div>
  );
};
