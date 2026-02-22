import { cn } from "@/lib/utils";
import { useBlurLoad } from "@/utils/hooks/useBlurLoad";

export const CardImage = ({
  img = "headless_haunt",
  position = "top",
  minH = "300px",
}: {
  img?: string;
  position?: "top" | "bottom";
  minH?: string;
}) => {
  const { url, loaded } = useBlurLoad(img);
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
          backgroundImage: `url(${url})`,
          minHeight: minH,
          width: "100%",
          height: "100%",
          backgroundPosition: "top",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          filter: loaded ? "none" : "blur(10px)",
          transition: "all 0.25s ease, filter 0.3s ease",
        }}
      />
    </div>
  );
};
