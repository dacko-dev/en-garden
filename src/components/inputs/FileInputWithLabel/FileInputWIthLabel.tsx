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
import { InputHTMLAttributes, useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Upload } from "lucide-react";

type Props<S> = {
  fieldLabel: string;
  fieldDescription?: string;
  nameInSchema: keyof S & string;
  inputClassName?: string;
  labelClassName?: string;
  wrapperClassName?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "value">;

export function FileInputWithLabel<S>({
  fieldLabel,
  fieldDescription,
  nameInSchema,
  inputClassName,
  labelClassName,
  wrapperClassName,
  ...props
}: Props<S>) {
  const form = useFormContext();
  const [isDragging, setIsDragging] = useState(false);

  const dropElementRef = useRef<HTMLDivElement>(null);

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (
        dropElementRef.current &&
        !dropElementRef.current.contains(event.relatedTarget as Node)
      ) {
        setIsDragging(false);
      }
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      setIsDragging(false);
      if (!event.dataTransfer.files || !event.dataTransfer.files.length) {
        // if no files skip, so the files are
        return;
      }
      // console.log("event.dataTransfer.files: ", event.dataTransfer.files);
      const oldFiles = form.getValues(nameInSchema);

      //   check if files are already in the form

      const newFiles = oldFiles
        ? Array.from(event.dataTransfer.files).filter(
            (file) =>
              !oldFiles.some(
                (existingFile: File) => existingFile.name === file.name
              )
          )
        : Array.from(event.dataTransfer.files);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      form.setValue(nameInSchema, [...oldFiles, ...newFiles] as any);
    },
    [form, nameInSchema]
  );

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => {
        // omit value prop from file input
        // HTMLInputElement.files manages the file input value

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { value, onChange, ...fieldProps } = field;
        return (
          <FormItem className={wrapperClassName}>
            <FormLabel
              className={`text-base ${labelClassName}`}
              htmlFor={nameInSchema}
            >
              {fieldLabel}
            </FormLabel>
            {fieldDescription && (
              <FormDescription>{fieldDescription}</FormDescription>
            )}
            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                document.getElementById(nameInSchema)?.click();
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              ref={dropElementRef}
              className="w-full h-52 p-8 border-2 border-dotted rounded-md flex items-center justify-center flex-col gap-4 bg-card"
            >
              {!isDragging ? (
                <>
                  <Button variant={"secondary"} asChild>
                    <label
                      aria-label="Attach files"
                      tabIndex={0}
                      className="cursor-pointer select-none"
                      htmlFor={nameInSchema}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault(); // Prevent default scrolling behavior for Space
                          event.stopPropagation(); // Prevent the click event from firing
                          document.getElementById(nameInSchema)?.click(); // Simulate a click on the file input
                        }
                      }}
                    >
                      Attach
                      {/* <Upload /> */}
                      <ImageIcon />
                    </label>
                  </Button>

                  <p className="opacity-70 select-none">
                    Drag images here or click to upload
                  </p>
                </>
              ) : (
                <div className="opacity-70 select-none flex items-center justify-center flex-col gap-4">
                  <Upload size={40} />
                  <p>Drop here</p>
                </div>
              )}
              {/* ) : (
                <p>Drag and drop or click to upload</p>
              )} */}
            </div>
            <FormControl>
              <Input
                id={nameInSchema}
                type="file"
                className={`w-full hidden ${inputClassName}`}
                {...props}
                {...fieldProps}
                onChange={(event) => {
                  if (!event.target.files || !event.target.files.length) {
                    // if no files skip, so the files are
                    return;
                  }
                  // console.log("event.target.files: ", event.target.files);

                  onChange(Array.from(event.target.files));
                }}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
