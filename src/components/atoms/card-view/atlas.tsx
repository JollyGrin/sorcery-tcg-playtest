import { useBlurLoad } from "@/utils/hooks/useBlurLoad";

export const FullCardAtlas = ({
  img = "atlas_rift_valley",
}: {
  img?: string;
}) => {
  const { url, loaded } = useBlurLoad(img);
  return (
    <div className="relative rounded-[1rem] isolate" style={{ width: "inherit", height: "inherit", margin: "0.5rem auto" }}>
      <div
        style={{
          backgroundImage: `url(${url})`,
          width: "100%",
          height: "100%",
          backgroundPosition: "right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transform: "rotate(90deg)",
          backgroundColor: "#9ca3af",
          borderRadius: "1rem",
          filter: loaded ? "none" : "blur(10px)",
          transition: "all 0.25s ease, filter 0.3s ease",
          isolation: "isolate",
        }}
      />
    </div>
  );
};
