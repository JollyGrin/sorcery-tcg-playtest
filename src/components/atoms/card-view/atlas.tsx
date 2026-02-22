import { CARD_CDN } from "@/components/organisms/GameBoard/constants";

export const FullCardAtlas = ({
  img = "atlas_rift_valley.webp",
}: {
  img?: string;
}) => {
  return (
    <div className="relative rounded-[1rem] isolate" style={{ width: "inherit", height: "inherit", margin: "0.5rem auto" }}>
      <div
        style={{
          backgroundImage: `url(${CARD_CDN}/${img}.webp)`,
          width: "100%",
          height: "100%",
          backgroundPosition: "right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transform: "rotate(90deg)",
          backgroundColor: "#9ca3af",
          borderRadius: "1rem",
          transition: "all 0.25s ease",
          isolation: "isolate",
        }}
      />
    </div>
  );
};
