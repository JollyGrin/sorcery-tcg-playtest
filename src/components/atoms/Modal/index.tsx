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

export const Modal = (props: {
  wrapperProps: DialogProps;
  trigger?: ReactNode;
  title?: string;
  content?: ReactNode;
}) => {
  return (
    <Dialog {...props.wrapperProps}>
      <DialogTrigger>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.content}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
