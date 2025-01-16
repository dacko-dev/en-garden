"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";

export default function EnableCompanyButtonForm({
  onSubmit,
  wrapperClassName,
  buttonClassName,
}: {
  onSubmit: () => void;
  wrapperClassName?: string;
  buttonClassName?: string;
}) {
  const form = useForm();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`${wrapperClassName}`}
      >
        <Button type="submit" className={`${buttonClassName}`}>
          Enable Company
        </Button>
      </form>
    </Form>
  );
}
