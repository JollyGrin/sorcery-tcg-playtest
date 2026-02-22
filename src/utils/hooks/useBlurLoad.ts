import { CARD_CDN, CARD_CDN_THUMB } from "@/constants";
import { useEffect, useState } from "react";

/**
 * Loads a low-res thumbnail from /3/ first, then swaps to the full image
 * once it has loaded. Returns the current URL and whether the full image
 * has finished loading (so consumers can apply a blur filter while waiting).
 */
export function useBlurLoad(img: string) {
  const fullUrl = `${CARD_CDN}${img}.webp`;
  const thumbUrl = `${CARD_CDN_THUMB}${img}.webp`;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const image = new Image();
    image.onload = () => setLoaded(true);
    image.src = fullUrl;
    return () => {
      image.onload = null;
    };
  }, [fullUrl]);

  return { url: loaded ? fullUrl : thumbUrl, loaded };
}
