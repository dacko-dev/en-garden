import { z } from "zod";

export const emailContactFormSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(5).max(60),
  message: z.string().min(10).max(500),
});
