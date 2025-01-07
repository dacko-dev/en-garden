"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { addressInsertSchema } from "@/db/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/inputs/InputWithLabel/InputWithLabel";
import { Form } from "@/components/ui/form";

// used in
export type AddressFormProps = {
  onSubmit: (values: z.infer<typeof addressInsertSchema>) => void;
  defaultValues?: z.infer<typeof addressInsertSchema>;
};

export default function AddressForm({
  onSubmit,
  defaultValues,
}: AddressFormProps) {
  const form = useForm<z.infer<typeof addressInsertSchema>>({
    resolver: zodResolver(addressInsertSchema),
    defaultValues: defaultValues || {
      city: "San Francisco",
      zip: "94103",
      address1: "123 Main St",
      address2: "Apt 123",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
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
          fieldLabel="Line 1"
          nameInSchema="address1"
          inputClassName="col-span-3"
          wrapperClassName="grid grid-cols-4 items-center gap-4"
        />

        <InputWithLabel<z.infer<typeof addressInsertSchema>>
          fieldLabel="Line 2"
          nameInSchema="address2"
          inputClassName="col-span-3"
          wrapperClassName="grid grid-cols-4 items-center gap-4"
        />
        <div className="flex justify-end mt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
