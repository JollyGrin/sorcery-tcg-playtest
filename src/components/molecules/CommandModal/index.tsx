import { Modal } from "@/components/atoms/Modal";
import { GameStateActions } from "@/components/organisms/GameBoard";
import { Children } from "@/utils/helpers/types";
import { useKeyPress } from "@/utils/hooks/useKeyPress";
import { Command } from "./Command";
import { useEffect, useState } from "react";
import { PlayerDataProps } from "@/types/card";

export const CommandModalWrapper = ({
  children,
  ...props
}: Children & GameStateActions & PlayerDataProps) => {
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
