"use client";

import { addCompanyInfoAction, updateCompanyInfoAction } from "@/actions";
import CompanyInfoForm from "@/components/forms/CompanyInfoForm/CompanyInfoForm";
import EnableCompanyButtonForm from "@/components/forms/EnableCompanyButtonForm/EnableCompanyButtonForm";
import { companyInsertSchema, companySelectSchema } from "@/db/schema";
import { useToast } from "@/hooks/use-toast";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

export default function DashboardCompanyInfo({
  companyInfo,
}: {
  companyInfo: z.infer<typeof companySelectSchema> | null;
}) {
  console.log("companyInfo", companyInfo?.id);
  const [showForm, setShowForm] = useState(companyInfo?.id !== null);

  const { toast } = useToast();

  const addCompanyInfo = useCallback(
    async (values: z.infer<typeof companyInsertSchema>) => {
      const result = await addCompanyInfoAction({
        companyInfo: values,
        pathToRevalidate: "/dashboard/account/@company",
      });
      if (result.isError) {
        toast({
          title: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: result.message,
        });
        // setShowForm(false);
      }
    },
    []
  );

  const updateCompanyInfo = useCallback(
    async (values: z.infer<typeof companyInsertSchema>) => {
      const result = await updateCompanyInfoAction({
        companyInfo: values,
        pathToRevalidate: "/dashboard/account/@company",
      });
      if (result.isError) {
        toast({
          title: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: result.message,
        });
        // setShowForm(false);
      }
    },
    []
  );

  return (
    <div className="">
      <CompanyInfoForm
        edit={companyInfo !== null}
        disabled={!showForm}
        defaultValues={companyInfo}
        onSubmit={companyInfo ? updateCompanyInfo : addCompanyInfo}
      />
      {/* overlay */}
      <div
        className={`absolute inset-0 bg-background z-10 rounded-md transition-opacity duration-300 ease-in-out ${
          showForm ? "opacity-0 pointer-events-none" : "opacity-90"
        }`}
      />
      {!showForm && (
        <div
          className={`z-20 absolute inset-0 flex justify-center items-center flex-col px-20 gap-8`}
        >
          <p className="hyphens-manual text-center ">
            To add your company information, please click the button below to
            enable the form.
          </p>
          <EnableCompanyButtonForm
            buttonClassName="font-bold"
            wrapperClassName=""
            onSubmit={() => setShowForm(true)}
          />
        </div>
      )}
    </div>
  );
}
