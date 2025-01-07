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
import { HTMLAttributes, RefAttributes } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckboxProps } from "@radix-ui/react-checkbox";

type Props<S> = {
  fieldLabel: string;
  fieldDescription?: string | React.ReactNode;
  nameInSchema: keyof S & string;
  checkboxClassName?: HTMLAttributes<HTMLButtonElement>["className"];
  labelClassName?: HTMLAttributes<HTMLLabelElement>["className"];
  wrapperClassName?: string;
} & Omit<CheckboxProps & RefAttributes<HTMLButtonElement>, "ref">;

export function CheckboxWithLabel<S>({
  fieldLabel,
  fieldDescription,
  nameInSchema,
  checkboxClassName,
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
        <FormItem className={`flex items-center gap-2 ${wrapperClassName}`}>
          <FormControl>
            <Checkbox
              id={nameInSchema}
              className={`${checkboxClassName}`}
              {...props}
              {...field}
            />
          </FormControl>
          <FormLabel
            style={{
              // idk why label has margin top, overriding it
              marginTop: "0",
            }}
            className={`text-base ${labelClassName}`}
            htmlFor={nameInSchema}
          >
            {fieldLabel}
          </FormLabel>
          {fieldDescription && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
