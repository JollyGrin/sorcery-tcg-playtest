import { Modal } from "@/components/atoms/Modal";
import { GameStateActions } from "@/components/organisms/GameBoard";
import { Children } from "@/utils/helpers/types";
import { useKeyPress } from "@/utils/hooks/useKeyPress";
import { Command } from "./Command";
import { useEffect, useState } from "react";
import { PlayerDataProps } from "@/types/card";
import { useRouter } from "next/router";

export const CommandModalWrapper = ({
  children,
  ...props
}: Children & GameStateActions & PlayerDataProps) => {
  useUntapAllListener(props);
  const { isOpen, onClose } = useDisclosure();

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
