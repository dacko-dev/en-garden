"use client";

import { deleteAddressAction, updateAddressAction } from "@/actions";
import AddressDialog from "@/components/AddressDialog/AddressDialog";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { addressSelectSchema } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

export default function DashboardAddressCard({
  address,
}: {
  address: z.infer<typeof addressSelectSchema>;
}) {
  return (
    <Card className="shadow-md bg-background/50 overflow-hidden border flex flex-col">
      <CardHeader className="dark:bg-background bg-secondary py-4">
        <CardTitle className="flex items-center gap-2">
          {address.name}
        </CardTitle>

        {address.notes && <CardDescription>{address.notes}</CardDescription>}
      </CardHeader>
      <CardContent className="pt-6">
        <address className="">
          <div className="flex flex-col items-center gap-1">
            <div className="grid grid-cols-[auto_1fr] gap-1">
              <h4 className="not-italic font-bold">Address: </h4>
              <p>{address.address1}</p>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-1">
              <h4 className="not-italic font-bold">Apt/Suite: </h4>
              <p>{address.address2 || "N/A"}</p>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-1">
              <h4 className="not-italic font-bold">City: </h4>
              <p>{address.city}</p>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-1">
              <h4 className="not-italic font-bold">State: </h4>
              <p>{address.state}</p>
            </div>

            <div className="grid grid-cols-[auto_1fr] gap-1">
              <h4 className="not-italic font-bold">Zip: </h4>
              <p>{address.zip}</p>
            </div>
          </div>
        </address>
        {/* action buttons */}
      </CardContent>
      <CardFooter className="flex  items-center justify-end gap-4  mt-auto">
        <DeleteAddressAlert address_id={address.id} />
        <EditAddressDialog address={address} />
      </CardFooter>
    </Card>
  );
}

function DeleteAddressAlert({ address_id }: { address_id: number }) {
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          aria-label="Delete address"
          size={"icon"}
          title="Delete address"
          variant={"outline"}
          className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
        >
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your address. If you have any
            commissions associated with this address, please cancel them first.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            disabled={submitting}
            onClick={async () => {
              setSubmitting(true);
              const result = await deleteAddressAction({
                addressId: Number(address_id),
                pathToRevalidate: "/dashboard/account/@addresses",
              });
              if (result.isError) {
                toast({
                  title: "Error",
                  description: result.message,
                  variant: "destructive",
                });
                return;
              }
              if (!result.isError) {
                toast({
                  title: "Your address has been deleted",
                });
              }
              setSubmitting(false);
              setOpen(false);
            }}
            variant={"destructive"}
          >
            {submitting ? <LoadingSpinner /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function EditAddressDialog({
  address,
}: {
  address: z.infer<typeof addressSelectSchema>;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  return (
    <AddressDialog
      title="Edit Address"
      open={open}
      setOpen={setOpen}
      description="If the address is associated with any commissions, please cancel them first."
      addressFormProps={{
        edit: true,
        defaultValues: address,
        onSubmit: async (values) => {
          const response = await updateAddressAction({
            address: values,
            pathToRevalidate: "/dashboard/account/@addresses",
          });
          if (response.isError) {
            toast({
              title: "Error",
              description: response.message,
              variant: "destructive",
            });
          }
          if (!response.isError) {
            toast({
              title: "Success",
              description: "Your address has been updated",
            });
            setOpen(false);
          }
        },
      }}
      button={
        <Button
          type="button"
          aria-label="Edit address"
          title="Edit address"
          size={"icon"}
          variant={"outline"}
        >
          <Pencil />
        </Button>
      }
    />
  );
}
