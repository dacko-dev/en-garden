"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { addressInsertSchema, addressUpdateSchema } from "@/db/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/inputs/InputWithLabel/InputWithLabel";
import { Form } from "@/components/ui/form";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { addressFormSchemaType } from "@/types";
import { COMPANY_US_STATE } from "@/lib/constants";

export type AddressFormProps = {
  onSubmit: (
    // values: z.infer<typeof addressInsertSchema> & { id?: number }
    values: addressFormSchemaType
  ) => void;
  // defaultValues?: z.infer<typeof addressInsertSchema> & { id?: number };
  defaultValues?: addressFormSchemaType;
  edit?: boolean;
};

export default function AddressForm({
  onSubmit,
  defaultValues,
  edit,
}: AddressFormProps) {
  const { user } = useKindeAuth();
  const form = useForm<addressFormSchemaType>({
    // resolver: zodResolver(addressInsertSchema || addressUpdateSchema),
    resolver: zodResolver(edit ? addressUpdateSchema : addressInsertSchema),
    defaultValues: defaultValues || {
      id: undefined,
      user_id: user?.id,
      name: "",
      state: COMPANY_US_STATE,
      city: "",
      zip: "",
      address1: "",
      address2: "",
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <InputWithLabel<z.infer<typeof addressInsertSchema>>
          fieldLabel="Name"
          nameInSchema="name"
          inputClassName="col-span-3"
          wrapperClassName="grid grid-cols-4 items-center gap-4"
        />
        <InputWithLabel<z.infer<typeof addressInsertSchema>>
          fieldLabel="State"
          nameInSchema="state"
          disabled
          aria-disabled
          inputClassName="col-span-3"
          wrapperClassName="grid grid-cols-4 items-center gap-4"
        />

        <InputWithLabel<z.infer<typeof addressInsertSchema>>
          fieldLabel="City"
          nameInSchema="city"
          inputClassName="col-span-3"
          wrapperClassName="grid grid-cols-4 items-center gap-4"
        />

        <InputWithLabel<z.infer<typeof addressInsertSchema>>
          fieldLabel="Zip"
          nameInSchema="zip"
          inputClassName="col-span-3"
          wrapperClassName="grid grid-cols-4 items-center gap-4"
        />

        <InputWithLabel<z.infer<typeof addressInsertSchema>>
          fieldLabel="Street Address"
          nameInSchema="address1"
          inputClassName="col-span-3"
          wrapperClassName="grid grid-cols-4 items-center gap-4"
        />

        <InputWithLabel<z.infer<typeof addressInsertSchema>>
          fieldLabel="Apt/Suite (optional)"
          nameInSchema="address2"
          inputClassName="col-span-3"
          wrapperClassName="grid grid-cols-4 items-center gap-4"
        />
        <div className="flex justify-end mt-4">
          <Button
            disabled={
              form.formState.isSubmitting ||
              form.formState.isLoading ||
              form.formState.isValidating
            }
            type="submit"
          >
            {form.formState.isSubmitting ? <LoadingSpinner /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
