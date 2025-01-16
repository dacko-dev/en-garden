"use client";

import { addCommissionAction } from "@/actions";
import CommissionForm from "@/components/forms/CommissionForm/CommissionForm";
import { addressSelectSchema, serviceSelectSchema } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

// wrapper component for the commission form for response handling and passing onSubmit function
export default function AddCommission({
  services,
  addresses,
}: {
  services: z.infer<typeof serviceSelectSchema>[];
  addresses: z.infer<typeof addressSelectSchema>[];
}) {
  const { toast } = useToast();

  return (
    <CommissionForm
      services={services}
      addresses={addresses}
      onSubmit={async (values) => {
        const response = await addCommissionAction({ commission: values });
        if (response.isError) {
          toast({
            duration: 5000,
            title: response.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: response.message,
            description: "Your commission has been scheduled",
          });
        }
      }}
    />
  );
}
