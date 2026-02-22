import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogProps } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

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
        <span className="sr-only">
          <DialogHeader>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogDescription>modal</DialogDescription>
          </DialogHeader>
        </span>
        {props.content}
      </DialogContent>
    </Dialog>
  );
};
