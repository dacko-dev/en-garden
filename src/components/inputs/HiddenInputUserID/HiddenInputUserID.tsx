"use client";

import { Input } from "@/components/ui/input";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { InputHTMLAttributes, useEffect } from "react";
import { useFormContext } from "react-hook-form";

type Props<S> = {
  nameInSchema: keyof S & string;
  inputClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export default function HiddenInputUserID<S>({
  nameInSchema,
  inputClassName,
}: Props<S>) {
  const { user } = useKindeAuth();
  const form = useFormContext();

  useEffect(() => {
    if (user?.id) {
      form.setValue("user_id", user.id);
    }
  }, [user?.id]);

  if (!user?.id) return null;

  return (
    <Input
      type="hidden"
      id={nameInSchema}
      className={`${inputClassName}`}
      {...form.register(nameInSchema)}
    />
  );
}

//     <FormControl>
//     <Input
//         type="hidden"
//       id={nameInSchema}
//       className={`${inputClassName}`}
//       {...props}
//       {...field}
//     />
//   </FormControl>

// <input
//   type="hidden"
//   className={inputClassName}
//   name={nameInSchema}
//   value={user?.id}
// />
