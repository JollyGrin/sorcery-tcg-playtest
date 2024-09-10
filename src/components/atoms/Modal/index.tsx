import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogProps } from "@radix-ui/react-dialog";
import { ReactNode } from "react";
import { VisuallyHidden } from "styled-system/jsx";
import { Pretty } from "styled-system/types";

export const Modal = (props: {
  wrapperProps: Pretty<DialogProps>;
  trigger?: ReactNode;
  title?: string;
  content?: ReactNode;
}) => {
  return (
    <Dialog {...props.wrapperProps}>
      {props.trigger && <DialogTrigger>{props.trigger}</DialogTrigger>}
      <DialogContent>
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>modal</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        {props.content}
      </DialogContent>
    </Dialog>
  );
};
