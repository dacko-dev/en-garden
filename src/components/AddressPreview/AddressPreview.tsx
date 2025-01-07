import React from "react";
import { addressSelectSchema } from "@/db/schema";
import { z } from "zod";

export default function AddressPreview({
  address,
}: {
  address: z.infer<typeof addressSelectSchema> | undefined | null;
}) {
  if (!address) {
    return null;
  }

  return (
    <address className="flex flex-col">
      <h3>{address.name}</h3>
      <p>{address.city}</p>
      <p>{address.zip}</p>
      <p>{address.address1}</p>
      <p>{address.address2 && <>{address.address2}</>}</p>
    </address>
  );
}
