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
        "relative rounded-[1rem] isolate opacity-100",
        position === "bottom" ? "mt-[-0.25rem]" : "",
      )}
      style={{
        width: "inherit",
        height: "inherit",
        margin: "0.5rem auto",
        transition: "all 0.25s ease",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${CARD_CDN}/${img}.webp)`,
          minHeight: minH,
          width: "100%",
          height: "100%",
          backgroundPosition: "top",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          transition: "all 0.25s ease",
        }}
      />
    </div>
  );
};
