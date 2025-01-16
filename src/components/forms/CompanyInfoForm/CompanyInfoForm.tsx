"use client";

import { InputWithLabel } from "@/components/inputs/InputWithLabel/InputWithLabel";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  companyInsertSchema,
  companySelectSchema,
  companyUpdateSchema,
} from "@/db/schema";
import { cleanDefaultValues } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useForm } from "react-hook-form";
import { z } from "zod";

type companyInfoFormType = z.infer<typeof companyInsertSchema> & {
  id?: number;
};

export default function CompanyInfoForm({
  edit,
  onSubmit,
  defaultValues,
  disabled,
}: {
  edit?: boolean;
  onSubmit: (values: companyInfoFormType) => void;
  defaultValues?: z.infer<typeof companySelectSchema> | null;
  disabled?: boolean;
}) {
  const session = useKindeAuth();
  const user = session.getUser();

  const infoForm = useForm<companyInfoFormType>({
    defaultValues: defaultValues
      ? cleanDefaultValues(defaultValues)
      : {
          email: "",
          name: "",
          registration_number: "",
          tax_id: "",
          user_id: user?.id,
        },
    resolver: zodResolver(edit ? companyUpdateSchema : companyInsertSchema),
  });

  return (
    <Form {...infoForm}>
      <form
        onSubmit={infoForm.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <InputWithLabel<z.infer<typeof companyUpdateSchema>>
          fieldLabel="Company Name"
          nameInSchema="name"
          fieldDescription="Name of the company"
          wrapperClassName="col-span-full"
          disabled={disabled}
        />
        <InputWithLabel<z.infer<typeof companyUpdateSchema>>
          fieldLabel="Tax ID"
          nameInSchema="tax_id"
          disabled={disabled}
        />
        <InputWithLabel<z.infer<typeof companyUpdateSchema>>
          fieldLabel="Registration Number"
          nameInSchema="registration_number"
          disabled={disabled}
        />
        <InputWithLabel<z.infer<typeof companyUpdateSchema>>
          fieldLabel="Email"
          nameInSchema="email"
          fieldDescription="This email will be used for invoices and notifications"
          wrapperClassName="col-span-full"
          disabled={disabled}
        />

        <div className="mt-4 flex items-center justify-end col-span-full">
          <Button
            disabled={
              infoForm.formState.isSubmitting ||
              infoForm.formState.isLoading ||
              infoForm.formState.isValidating ||
              disabled
            }
            type="submit"
          >
            {/* Save */}
            {infoForm.formState.isSubmitting ? <LoadingSpinner /> : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
