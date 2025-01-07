"use client";
import React from "react";
import AddressForm, {
  AddressFormProps,
} from "@/components/forms/AddressForm/AddressForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

type NewAddressDialogProps = {
  addressFormProps: AddressFormProps;
};

export default function NewAddressDialog({
  addressFormProps,
}: NewAddressDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" size={"icon"} variant={"default"} className="h-8">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Address</DialogTitle>
          <DialogDescription>
            Add a new address to your account.
          </DialogDescription>
        </DialogHeader>

        <AddressForm {...addressFormProps} />
        {/* <DialogFooter>
                <Button type="submit">Add</Button>
              </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
