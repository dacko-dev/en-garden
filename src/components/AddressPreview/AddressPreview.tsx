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
    <address className="flex flex-col p-4 bg-card rounded-md border-2 border-dotted w-full">
      {/* <h3>{address.name}</h3> */}
      <p>
        {address.city}, {address.zip} {address.address1},{" "}
        {address.address2 && <>{address.address2}</>}
      </p>
    </address>
  );
}
