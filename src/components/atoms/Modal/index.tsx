import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { Box } from "styled-system/jsx";

export const Modal = (props: {
  wrapperProps: DialogProps;
  trigger?: ReactNode;
  title?: string;
  content?: ReactNode;
}) => {
  return (
    <Dialog {...props.wrapperProps}>
      {props.trigger && <DialogTrigger>{props.trigger}</DialogTrigger>}
      <DialogContent>
        {props.title && (
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
          </DialogHeader>
        )}
        {props.content}
      </DialogContent>
    </Dialog>
  );
};
