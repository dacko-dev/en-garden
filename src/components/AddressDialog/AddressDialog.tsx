"use client";

import AddressForm, {
  AddressFormProps,
} from "@/components/forms/AddressForm/AddressForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";

type AddressDialogProps = {
  addressFormProps: AddressFormProps;
  title: string;
  description: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  button?: React.ReactNode;
};

export default function AddressDialog({
  addressFormProps,
  title,
  description,
  open,
  button,
  setOpen,
}: AddressDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {button && <DialogTrigger asChild>{button}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <AddressForm {...addressFormProps} />
      </DialogContent>
    </Dialog>
  );
}
