import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing
import { commisionFormSchema } from "@/db/schema";
import { z } from "zod";

interface CommissionFormState extends z.infer<typeof commisionFormSchema> {
  set: (
    fn: (
      state: z.infer<typeof commisionFormSchema>
    ) => z.infer<typeof commisionFormSchema>
  ) => void;
  reset: () => void;
}

const commissionFormInitialState = commisionFormSchema.parse({
  name: "",
  is_recurring: false,
  user_id: "",
  same_address: true,
  start_date: new Date(),
  images_names: null,
});

export const useCommissionFormStore = create<CommissionFormState>()(
  devtools(
    persist(
      (set) => ({
        ...commissionFormInitialState,
        set: (fn) => set((state) => fn(state)),
        reset: () => set(commissionFormInitialState),
      }),
      {
        name: "commission-form",
      }
    )
  )
);
