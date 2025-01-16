"use client";

import { InputWithLabel } from "@/components/inputs/InputWithLabel/InputWithLabel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { userProfileSchema } from "@/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type userProfileFormType = z.infer<typeof userProfileSchema>;

export default function UserInfoForm({
  userProfile,
}: {
  userProfile: userProfileFormType;
}) {
  const infoForm = useForm<userProfileFormType>({
    defaultValues: userProfile,
    resolver: zodResolver(userProfileSchema),
  });

  const onSubmit = useCallback((values: userProfileFormType) => {
    console.log(values);
  }, []);

  return (
    <Form {...infoForm}>
      <form
        onSubmit={infoForm.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <InputWithLabel<z.infer<typeof userProfileSchema>>
          fieldLabel="Email"
          nameInSchema="email"
          disabled
          wrapperClassName="col-span-full"
        />
        <InputWithLabel<z.infer<typeof userProfileSchema>>
          fieldLabel="First Name"
          nameInSchema="first_name"
        />
        <InputWithLabel<z.infer<typeof userProfileSchema>>
          fieldLabel="Last Name"
          nameInSchema="last_name"
        />

        <FormItem className="col-span-full">
          <FormLabel>Phone Number</FormLabel>
          <FormControl>
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="whitespace-nowrap">🇺🇸 +1</span>
                </div>
                <Input
                  type="tel"
                  pattern={"[0-9]{3}-[0-9]{3}-[0-9]{4}"}
                  {...infoForm.register("phone")}
                />
                <Button type="button" variant={"secondary"}>
                  Verify
                </Button>
              </div>
              <FormDescription className="mt-2">
                We will send you a verification code
              </FormDescription>
            </div>
          </FormControl>
        </FormItem>
        <div className="mt-4 flex items-center justify-end col-span-full">
          <Button
            disabled={
              infoForm.formState.isSubmitting ||
              infoForm.formState.isLoading ||
              infoForm.formState.isValidating
            }
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
