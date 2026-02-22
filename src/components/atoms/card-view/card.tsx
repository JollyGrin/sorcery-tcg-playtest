import { CARD_CDN } from "@/components/organisms/GameBoard/constants";
import { cn } from "@/lib/utils";

export const CardImage = ({
  img = "headless_haunt.webp",
  position = "top",
  minH = "300px",
}: {
  img?: string;
  position?: "top" | "bottom";
  minH?: string;
}) => {
  return (
    <div
      className={cn(
        "w-inherit h-inherit relative m-[0.5rem_auto] rounded-[1rem] isolate opacity-100 transition-all duration-[0.25s] ease-[ease]",
        position === "bottom" ? "mt-[-0.25rem]" : "",
      )}
    >
      <div
        style={{
          backgroundImage: `url(${CARD_CDN}/${img}.webp)`,
          minHeight: minH,
        }}
        className="w-full h-full bg-top bg-contain bg-no-repeat transition-all duration-[0.25s] ease-[ease]"
      />
    </div>
  );
};
