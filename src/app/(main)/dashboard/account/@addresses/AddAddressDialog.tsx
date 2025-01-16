"use client";

import { addAddressAction } from "@/actions";
import AddressDialog from "@/components/AddressDialog/AddressDialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import React, { useState } from "react";

export default function AddAddressDialog() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  return (
    <AddressDialog
      title="Add Address"
      description="Add a new address to your account"
      open={open}
      setOpen={setOpen}
      addressFormProps={{
        onSubmit: async (values) => {
          const result = await addAddressAction({
            address: values,
            pathToRevalidate: "/dashboard/account",
          });
          if (result.isError) {
            console.error(result.message);
            toast({
              title: "Error",
              description: result.message,
              variant: "destructive",
            });
          }
          toast({
            title: "Address added successfully",
          });
          setOpen(false);
        },
      }}
      button={
        <Button type="button" size={"icon"} variant={"default"} className="h-8">
          <Plus />
        </Button>
      }
    />
  );
}
