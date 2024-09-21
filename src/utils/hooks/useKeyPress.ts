import { useEffect, useState } from "react";
import { LiteralUnion } from "styled-system/types";

type KeyboardEventKey = LiteralUnion<
  | PunctuationKeys
  | ModifierKeys
  | WhitespaceKeys
  | NavigationKeys
  | FunctionKeys
  | NumericKeypadKeys,
  string
>;

export function useKeyPress(targetKey: KeyboardEventKey) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState<boolean>(false);
  // Add event listeners
  useEffect(() => {
    // If pressed key is our target key then set to true
    // eslint-disable-next-line
    function downHandler({ key }: any) {
      if (!keyPressed && key === targetKey) {
        setKeyPressed(true);
        // rather than rely on keyup to unpress, use a timeout to workaround the fact that
        // keyup events are unreliable when the meta key is down. See Issue #3:
        // http://web.archive.org/web/20160304022453/http://bitspushedaround.com/on-a-few-things-you-may-not-know-about-the-hellish-command-key-and-javascript-events/
        setTimeout(() => {
          setKeyPressed(false);
        }, 1000);
      }
    }

    window.addEventListener("keydown", downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downHandler);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount
  return keyPressed;
}

type ModifierKeys = LiteralUnion<
  | "Alt"
  | "AltGraph"
  | "CapsLock"
  | "Control"
  | "Fn"
  | "FnLock"
  | "Hyper"
  | "Meta"
  | "NumLock"
  | "ScrollLock"
  | "Shift"
  | "Super"
  | "Symbol"
  | "SymbolLock"
>;

type WhitespaceKeys = "Enter" | "Tab" | " ";

type PunctuationKeys = "?" | "!";

type NavigationKeys =
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "ArrowUp"
  | "End"
  | "Home"
  | "PageDown"
  | "PageUp";

type FunctionKeys =
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12"
  | "F13"
  | "F14"
  | "F15"
  | "F16"
  | "F17"
  | "F18"
  | "F19"
  | "F20"
  | "Soft1"
  | "Soft2"
  | "Soft3"
  | "Soft4";

type NumericKeypadKeys =
  | "Decimal"
  | "Key11"
  | "Key12"
  | "Multiply"
  | "Add"
  | "Clear"
  | "Divide"
  | "Subtract"
  | "Separator"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9";
