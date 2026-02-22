import { CardImage } from "@/components/atoms/card-view/card";
import Tilt, { GlareProps } from "react-parallax-tilt";
import { useState } from "react";
import { CardDTO } from "@/utils/api/cardData/CardDataType";

export const DraftCard = ({
  isSelected,
  onSelect,
  ...cardDTO
}: CardDTO & {
  isSelected?: boolean;
  onSelect?(): void;
}) => {
  const [isOver, setIsOver] = useState(false);

  const rarityColor: Record<CardDTO["guardian"]["rarity"], string> = {
    Ordinary: "rgba(255,255,255,0.6)",
    Exceptional: "rgba(60,160,210,1)",
    Elite: "rgba(160,60,255,1)",
    Unique: "rgba(230,180,50,1)",
  };

  const rarityRing: Record<CardDTO["guardian"]["rarity"], string> = {
    Ordinary: "transparent",
    Exceptional: "rgba(60,160,210,0.6)",
    Elite: "rgba(160,60,255,0.6)",
    Unique: "rgba(230,180,50,0.7)",
  };

  return (
    <div
      data-testid={"draftcard-" + cardDTO.slug}
      className="transition-all duration-200 ease-out"
      style={{
        zIndex: isOver ? 10000 : isSelected ? 100 : 1,
        transform:
          isOver && cardDTO.guardian.type === "Site" ? "rotate(90deg)" : "",
        filter: isOver || isSelected ? "saturate(1.4)" : "saturate(0.92)",
      }}
    >
      <Tilt
        {...tiltOptions}
        glareColor={rarityColor[cardDTO.guardian.rarity]}
        scale={isOver ? 1.3 : 1}
      >
        <div
          className="flex justify-center w-full h-[23.5rem] items-center rounded-lg overflow-clip cursor-pointer relative"
          onMouseOver={() => setIsOver(true)}
          onMouseOut={() => setIsOver(false)}
          onClick={onSelect}
          style={{
            boxShadow: isSelected
              ? `0 0 0 3px #D4A853, 0 0 20px rgba(212,168,83,0.4), 0 4px 12px rgba(0,0,0,0.5)`
              : `0 2px 8px rgba(0,0,0,0.4)`,
            background: isSelected
              ? "rgba(212,168,83,0.15)"
              : "rgba(0,0,0,0.2)",
          }}
        >
          <CardImage img={cardDTO.slug} />
          {isSelected && (
            <div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, rgba(212,168,83,0.1) 0%, transparent 40%)",
              }}
            />
          )}
        </div>
      </Tilt>
      {/* Rarity indicator dot */}
      {cardDTO.guardian.rarity !== "Ordinary" && (
        <div className="flex justify-center mt-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: rarityRing[cardDTO.guardian.rarity],
              boxShadow: `0 0 6px ${rarityRing[cardDTO.guardian.rarity]}`,
            }}
          />
        </div>
      )}
    </div>
  );
};

const glareOptions: GlareProps = {
  glareEnable: true,
  glareColor: "lightblue",
  glareMaxOpacity: 0.2,
  glarePosition: "all",
};
const tiltOptions = {
  ...glareOptions,
};
