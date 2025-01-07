"use client";

import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { emailContactFormSchema } from "@/lib/schemas";
import { InputWithLabel } from "@/components/inputs/InputWithLabel/InputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel/TextAreaWithLabel";
import { Button } from "@/components/ui/button";

export default function EmailContactForm() {
  const { user } = useKindeAuth();

  const form = useForm<z.infer<typeof emailContactFormSchema>>({
    resolver: zodResolver(emailContactFormSchema),
    defaultValues: {
      email: user && user?.email ? user?.email : "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof emailContactFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex  justify-center flex-col gap-6"
      >
        <InputWithLabel<z.infer<typeof emailContactFormSchema>>
          fieldLabel="Email"
          nameInSchema="email"
        />

        <InputWithLabel<z.infer<typeof emailContactFormSchema>>
          fieldLabel="Subject"
          nameInSchema="subject"
        />

        <TextAreaWithLabel<z.infer<typeof emailContactFormSchema>>
          fieldLabel="Message"
          nameInSchema="message"
        />
        <div className="flex justify-end">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
