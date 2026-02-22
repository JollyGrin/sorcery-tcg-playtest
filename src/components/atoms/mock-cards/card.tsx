import {
  CARD_CDN,
  LOCALSTORAGE_KEYS,
} from "@/components/organisms/GameBoard/constants";
import { useLocalStorage } from "@/utils/hooks";
import { useHover } from "@/utils/hooks/useHover";
import { useKeyPress } from "@/utils/hooks/useKeyPress";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const CardImage = ({
  height = "90px",
  img = "headless_haunt.webp",
  position = "top",
  index = 1,
  isTapped,
  ...props
}: {
  img?: string;
  position?: "top" | "bottom";
  index?: number;
  isTapped?: boolean;
  show?: boolean;
  height?: string;
  isMine?: boolean;
}) => {
  const hoverRef = useRef(null);
  const isHovering = useHover(hoverRef);

  const { key, ...options } = LOCALSTORAGE_KEYS.SETTINGS.rotateEnemy;
  const [rotateEnemy] = useLocalStorage(key, false, options);

  const isPressed = useKeyPress("Alt");
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    if (isHovering && isPressed) {
      setPreview((prev) => !prev);
    }
  }, [isPressed]);

  const show = props.show || (preview && isHovering);
  const isMe = props.isMine === undefined || !!props.isMine;
  function shouldRotate() {
    if (rotateEnemy === false) return "rotate(0deg)";
    return isMe ? "rotate(0deg)" : "rotate(180deg)";
  }

  return (
    <div
      className={cn(
        "relative m-[0_auto] w-[calc(100%-1rem)] max-w-[221px] bg-yellow rounded-[1rem] isolate transition-all duration-[0.25s] ease-[ease]",
        show ? "overflow-visible" : "overflow-clip",
        position === "bottom" ? "mt-[-0.25rem]" : "",
        isTapped && !isHovering ? "rotate-[5deg] opacity-80" : "opacity-100",
      )}
      style={{
        filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.2))",
        zIndex: isHovering ? 1000 : index,
        height,
        transform: shouldRotate(),
        border: isMe ? "" : "solid 2px tomato",
      }}
      onMouseOut={() => setPreview(false)}
    >
      <div
        ref={hoverRef}
        className={cn(
          "h-[310px] w-full bg-top bg-cover bg-no-repeat transition-all duration-[0.25s] ease-[ease]",
          show ? "absolute scale-150" : "",
        )}
        style={{
          backgroundImage: `url(${CARD_CDN}/${img}.webp)`,
        }}
      />{" "}
    </div>
  );
};
