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
  function over() {
    setIsOver(true);
  }
  function out() {
    setIsOver(false);
  }

  const rarityColor: Record<CardDTO["guardian"]["rarity"], string> = {
    Ordinary: "#fff",
    Exceptional: "rgba(0,100,150,1)",
    Elite: "rgba(150,0,250,1)",
    Unique: "rgba(230,180,50,1)",
  };

  return (
    <div
      data-testid={"draftcard-" + cardDTO.slug}
      className="transition-all duration-[0.25s] ease-in-out"
      style={{
        zIndex: isOver ? 10000 : 1,
        transform:
          isOver && cardDTO.guardian.type === "Site" ? " rotate(90deg)" : "",
        filter: isOver || isSelected ? `saturate(1.5)` : "saturate(1)",
      }}
    >
      <Tilt
        {...tiltOptions}
        glareColor={rarityColor[cardDTO.guardian.rarity]}
        scale={isOver ? 1.3 : 1}
      >
        <div
          className="flex justify-center w-full h-[23.5rem] drop-shadow-[0_0_5px_rgba(0,0,0,0.35)] items-center rounded-[0.5rem] overflow-clip"
          onMouseOver={over}
          onMouseOut={out}
          onClick={onSelect}
          style={{
            background: isSelected ? "rgba(0,250,100,0.5)" : "",
          }}
        >
          <CardImage img={cardDTO.slug} />
        </div>
      </Tilt>
    </div>
  );
};

const glareOptions: GlareProps = {
  glareEnable: true,
  glareColor: "lightblue",
  glareMaxOpacity: 0.25,
  glarePosition: "all",
};
const tiltOptions = {
  ...glareOptions,
};
