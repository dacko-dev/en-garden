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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectProps } from "@radix-ui/react-select";

type DataObj = {
  value: string;
  label: string;
};

type Props<S> = {
  fieldLabel: string | React.ReactNode;
  fieldDescription?: string;
  nameInSchema: keyof S & string;
  data: DataObj[];
  triggerClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
} & SelectProps;

export function SelectWithLabel<S>({
  fieldLabel,
  fieldDescription,
  nameInSchema,
  data,
  triggerClassName,
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

          <Select {...field} {...props} onValueChange={field.onChange}>
            <FormControl className="w-full">
              <SelectTrigger
                id={nameInSchema}
                className={`w-full ${triggerClassName}`}
              >
                <SelectValue placeholder="Select" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {data.map((item) => (
                <SelectItem
                  key={`${nameInSchema}_${item.value}`}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldDescription && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
