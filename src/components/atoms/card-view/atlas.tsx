import { CARD_CDN } from "@/components/organisms/GameBoard/constants";

export const FullCardAtlas = ({
  img = "atlas_rift_valley.webp",
}: {
  img?: string;
}) => {
  return (
    <div className="relative m-[0.5rem_auto] w-inherit h-inherit rounded-[1rem] isolate">
      <div
        style={{
          backgroundImage: `url(${CARD_CDN}/${img}.webp)`,
        }} // bgImage has caching issues
        className="isolate w-full h-full bg-right bg-cover bg-no-repeat rotate-90 bg-gray-400 rounded-[1rem] transition-all duration-[0.25s] ease-[ease]"
      />
    </div>
  );
};
