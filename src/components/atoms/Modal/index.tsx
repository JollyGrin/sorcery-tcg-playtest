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
}) => {
  return (
    <Dialog {...props.wrapperProps}>
      <DialogTrigger>{props.trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
