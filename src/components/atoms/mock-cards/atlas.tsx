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
      className="relative m-[0_auto] w-[calc(100%-1rem)] max-w-[221px] bg-yellow rounded-[1rem] isolate overflow-clip transition-all duration-[0.25s] ease-[ease]"
      style={{
        height,
        border: isMe ? "" : "solid 2px tomato",
        transform: shouldRotate(),
      }}
    >
      <div
        style={{
          backgroundImage: `url(${CARD_CDN}/${img}.webp)`,
        }} // bgImage has caching issues
        className="isolate h-[310px] w-full absolute right-0 bottom-[-160px] bg-right bg-cover bg-no-repeat scale-[0.85] rotate-90 translate-x-[-47.8%] translate-y-0 bg-gray-400 rounded-[1rem] transition-all duration-[0.25s] ease-[ease]"
      />{" "}
    </div>
  );
};
