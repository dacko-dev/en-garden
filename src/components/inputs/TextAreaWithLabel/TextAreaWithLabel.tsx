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
import { InputHTMLAttributes } from "react";
import { Textarea } from "@/components/ui/textarea";

type Props<S> = {
  fieldLabel: string;
  fieldDescription?: string;
  nameInSchema: keyof S & string;
  className?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

export function TextAreaWithLabel<S>({
  fieldLabel,
  fieldDescription,
  nameInSchema,
  className,
  ...props
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldLabel}
          </FormLabel>
          {fieldDescription && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}
          <FormControl>
            <Textarea
              id={nameInSchema}
              className={`w-full ${className}`}
              {...props}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
