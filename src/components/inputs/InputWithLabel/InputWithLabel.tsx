"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

type Props<S> = {
  fieldLabel: string;
  fieldDescription?: string | React.ReactNode;
  nameInSchema: keyof S & string;
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function InputWithLabel<S>({
  fieldLabel,
  fieldDescription,
  nameInSchema,
  inputClassName,
  labelClassName,
  wrapperClassName,
  ...props
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className={wrapperClassName}>
          <FormLabel
            className={`text-base ${labelClassName}`}
            htmlFor={nameInSchema}
          >
            {fieldLabel}
          </FormLabel>

          <FormControl>
            <Input
              id={nameInSchema}
              className={`w-full ${inputClassName}`}
              {...props}
              {...field}
            />
          </FormControl>
          {fieldDescription && typeof fieldDescription === "string" && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}
          {fieldDescription &&
            typeof fieldDescription !== "string" &&
            fieldDescription}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
