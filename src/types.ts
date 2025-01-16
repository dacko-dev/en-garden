import { addressInsertSchema, commissionFormSchema } from "@/db/schema";
import { z } from "zod";

export type commissionFormSchemaType = z.infer<typeof commissionFormSchema>;

export type addressFormSchemaType = z.infer<typeof addressInsertSchema> & {
  id: number;
};

export type ActionResponse<T> = {
  message: string;
  isError: boolean;
  data?: T;
};

export type ActionResponseWithIssues<T> = ActionResponse<T> & {
  issues?: z.ZodIssue[];
};
