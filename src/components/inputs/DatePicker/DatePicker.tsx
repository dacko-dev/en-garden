import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar, CalendarProps } from "@/components/ui/calendar";

type Props<S> = {
  fieldLabel: string;
  fieldDescription?: string;
  nameInSchema: keyof S & string;
  labelClassName?: string;
  buttonClassName?: string;
  wrapperClassName?: string;
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "initialFocus"
  >;
};

export default function DatePicker<S>({
  fieldLabel,
  fieldDescription,
  nameInSchema,
  labelClassName,
  buttonClassName,
  wrapperClassName,
  calendarProps,
}: Props<S>) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className={wrapperClassName}>
          <FormLabel
            htmlFor={nameInSchema}
            className={`text-base ${labelClassName}`}
          >
            {fieldLabel}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  id={nameInSchema}
                  variant={"outline"}
                  className={cn(
                    ` pl-3 text-left font-normal ${buttonClassName}}`,
                    !field.value && "text-muted-foreground"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                autoFocus
                {...calendarProps}
              />
            </PopoverContent>
          </Popover>
          {fieldDescription && (
            <FormDescription>{fieldDescription}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
