import {
  CARD_CDN,
  LOCALSTORAGE_KEYS,
} from "@/components/organisms/GameBoard/constants";
import { useLocalStorage } from "@/utils/hooks";

export const CardAtlas = ({
  height = "90px",
  img = "atlas_rift_valley.webp",
  ...props
}: {
  img?: string;
  height?: string;
  isMine?: boolean;
}) => {
  const { key, ...options } = LOCALSTORAGE_KEYS.SETTINGS.rotateEnemy;
  const [rotateEnemy] = useLocalStorage(key, false, options);

  const isMe = props.isMine === undefined || !!props.isMine;
  function shouldRotate() {
    if (rotateEnemy === false) return "rotate(0deg)";
    return isMe ? "rotate(0deg)" : "rotate(180deg)";
  }
  return (
    <div
      className="relative isolate overflow-clip"
      style={{
        width: "calc(100% - 1rem)",
        maxWidth: "221px",
        margin: "0 auto",
        borderRadius: "1rem",
        transition: "all 0.25s ease",
        height,
        border: isMe ? "" : "solid 2px tomato",
        transform: shouldRotate(),
      }}
    >
      <div
        style={{
          backgroundImage: `url(${CARD_CDN}/${img}.webp)`,
          height: "310px",
          width: "100%",
          position: "absolute",
          right: 0,
          bottom: "-160px",
          backgroundPosition: "right",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transform: "scale(0.85) rotate(90deg) translateX(-47.8%) translateY(0)",
          backgroundColor: "#9ca3af",
          borderRadius: "1rem",
          transition: "all 0.25s ease",
          isolation: "isolate",
        }}
      />{" "}
    </div>
  );
};
