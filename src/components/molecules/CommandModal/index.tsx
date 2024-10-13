import { Modal } from "@/components/atoms/Modal";
import { GameStateActions } from "@/components/organisms/GameBoard";
import { Children } from "@/utils/helpers/types";
import { useKeyPress } from "@/utils/hooks/useKeyPress";
import { Command } from "./Command";
import { useEffect, useState } from "react";
import { PlayerDataProps } from "@/types/card";
import { useRouter } from "next/router";
import { LOCALSTORAGE_KEYS } from "@/components/organisms/GameBoard/constants";
import { useLocalStorage } from "@/utils/hooks";
import { ReleaseNoteBody } from "../ReleaseNotes";

export const CommandModalWrapper = ({
  children,
  ...props
}: Children & GameStateActions & PlayerDataProps) => {
  // untap all cards with key u
  useUntapAllListener(props);

  // command modal disclosure
  const { isOpen, onClose } = useDisclosure();

  const { key, ...options } =
    LOCALSTORAGE_KEYS.DISCLAIMER.GAMEBOARD.lastSeenNote;
  const [lastSeenNote] = useLocalStorage(key, 0, options);
  const lastPublishedNote = new Date("2024-10-13").getTime(); // later make this grab the most recent date, dynamic
  const hasSeenUpdate = lastPublishedNote < lastSeenNote; // if last seen is after last publish

  return (
    <div>
      <div>
        <Modal
          wrapperProps={{
            open: isOpen,
            onOpenChange: onClose,
          }}
          content={<Command {...props} />}
        />

        <Modal
          wrapperProps={{
            open: !hasSeenUpdate,
          }}
          content={<ReleaseNoteBody />}
        />
      </div>
      {children}
    </div>
  );
};

function useDisclosure() {
  const [isOpen, setIsOpen] = useState(false);
  const isPressed = useKeyPress("?");

  useEffect(() => {
    if (isPressed) setIsOpen((prev) => !prev);
  }, [isPressed]);

  return {
    isOpen,
    onOpen: () => setIsOpen(true),
    onClose: () => setIsOpen(false),
  };
}

/**
 * Not accessible through the command menu, happens via keypress
 * */
function useUntapAllListener(props: GameStateActions) {
  const { query } = useRouter();
  const name = query?.name as string;

  const isPressed = useKeyPress("u");
  function untapAll() {
    const newGrid = [...props.gridItems];
    const untappedGrid = newGrid.map((gridCell) =>
      gridCell.map((gridItem) => {
        if (gridItem.playerName === name) {
          const newGridItem = { ...gridItem };
          newGridItem.isTapped = false;
          return newGridItem;
        } else {
          return gridItem;
        }
      }),
    );
    props.setGridItems(untappedGrid);
  }

  useEffect(() => {
    if (isPressed) untapAll();
  }, [isPressed]);
}
