import { CARD_CDN, CARD_CDN_THUMB } from "@/constants";
import { useEffect, useState } from "react";

/** Track which full-res images have already been loaded this session */
const loadedCache = new Set<string>();

/**
 * Loads a low-res thumbnail from /3/ first, then swaps to the full image
 * once it has loaded. If the image was already loaded previously (cached),
 * it returns the full URL immediately without blurring.
 */
export function useBlurLoad(img: string) {
  const fullUrl = `${CARD_CDN}${img}.webp`;
  const thumbUrl = `${CARD_CDN_THUMB}${img}.webp`;
  const [loaded, setLoaded] = useState(() => loadedCache.has(fullUrl));

  useEffect(() => {
    if (loadedCache.has(fullUrl)) {
      setLoaded(true);
      return;
    }
    const image = new Image();
    image.onload = () => {
      loadedCache.add(fullUrl);
      setLoaded(true);
    };
    image.src = fullUrl;
    return () => {
      image.onload = null;
    };
  }, [fullUrl]);

  return { url: loaded ? fullUrl : thumbUrl, loaded };
}
