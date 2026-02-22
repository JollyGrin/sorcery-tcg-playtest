import { Note20241013 } from "./Notes/20241013";
import { LOCALSTORAGE_KEYS } from "@/components/organisms/GameBoard/constants";
import { useLocalStorage } from "@/utils/hooks";

export const ReleaseNoteBody = () => {
  const { key, ...options } =
    LOCALSTORAGE_KEYS.DISCLAIMER.GAMEBOARD.lastSeenNote;
  const [, setLastSeenNote] = useLocalStorage(key, 0, options);

  function confirmRead() {
    const now = Date.now();
    setLastSeenNote(now);
  }

  return (
    <div className="max-w-[700px] w-[65vw] md:w-[80vw] max-h-[600px] overflow-y-auto relative">
      <div
        className="absolute right-0 bg-gray-300 px-[0.5rem] py-[0.25rem] rounded-[4px] cursor-pointer transition-all duration-[0.25s] ease-[ease] hover:bg-gray-200"
        onClick={confirmRead}
      >
        X
      </div>
      <p
        style={{
          fontWeight: 700,
          fontSize: "2.5rem",
        }}
      >
        Release Notes
      </p>
      <p>(new updates!)</p>
      <hr className="border-border my-[1rem]" />
      <Note20241013 />
    </div>
  );
};
