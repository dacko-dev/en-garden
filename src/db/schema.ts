import {
  integer,
  pgTable,
  text,
  boolean,
  timestamp,
  pgEnum,
  date,
  decimal,
  jsonb,
  time,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { z } from "zod";
import {
  ACCEPTED_FILE_TYPES,
  COMPANY_US_STATE,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
} from "@/lib/constants";

export const recurrenceEnum = pgEnum("recurrence", [
  "daily",
  "weekly",
  "monthly",
]);

export const recurrenceSchema = createSelectSchema(recurrenceEnum);

// https://orm.drizzle.team/docs/zod
export const durationUnitEnum = pgEnum("duration_unit", [
  "minutes",
  "hours",
  "days",
  "weeks",
  "months",
]);

export const durationUnitSchema = createSelectSchema(durationUnitEnum);

export const measurementUnitEnum = pgEnum("measurement_unit", [
  "acre",
  "sqft",
  "sqm",
  "hectare",
  "project",
  "installation",
  "tree",
  "hedgerow",
]);

export const measurementUnitSchema = createSelectSchema(measurementUnitEnum);

export const paymentType = pgEnum("payment_type", ["card", "cash"]);

// stored users from Kinde auth
export const users = pgTable("users", {
  id: text().primaryKey().notNull(),
  email: text().notNull().unique(),

  is_company: boolean().notNull().default(false),
  first_name: text(),
  last_name: text(),
  avatar_url: text(),
  phone: text(),
  notes: text(),
  active: boolean().notNull().default(true),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),

  stripe_customer: jsonb(),
  stripe_subscription: jsonb(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  commissions: many(commissions),
  addresses: many(addresses),
  company: one(companies),
}));

export const userSelectSchema = createSelectSchema(users);
export const userInsertSchema = createInsertSchema(users);
export const userUpdateSchema = createUpdateSchema(users, {
  first_name: (schema) => schema.max(50).optional().nullable(),
  last_name: (schema) => schema.max(50).optional().nullable(),
  notes: (schema) => schema.optional().nullable(),
  phone: (schema) => schema.optional().nullable(),
  avatar_url: (schema) => schema.optional().nullable(),
  email: (schema) => schema.optional().nullable(),
  active: (schema) => schema.optional().default(true),
});

// same for inserting and updating
export const userProfileSchema = userSelectSchema
  .pick({
    id: true,
    email: true,
    first_name: true,
    last_name: true,
    avatar_url: true,
    phone: true,
    notes: true,
  })
  .extend({
    first_name: z.string().max(50).optional().nullable(),
    last_name: z.string().max(50).optional().nullable(),
    notes: z.string().optional().nullable(),
    avatar_url: z.string().optional().nullable(),
    phone: z
      .string()
      .regex(/^\d{3}-\d{3}-\d{4}$/)
      .optional()
      .nullable(),
  });

export const companies = pgTable("companies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: text()
    .notNull()
    .references(() => users.id),
  name: text().notNull(), // Legal name of the company
  email: text().notNull().unique(),
  tax_id: text().notNull(), // Tax ID
  registration_number: text(), // Business registration number

  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const companiesRelations = relations(companies, ({ one }) => ({
  user: one(users, {
    fields: [companies.user_id],
    references: [users.id],
  }),
}));

const companySchemaExtend = {
  name: z.string().min(2).max(50),
  email: z.string().email(),
  tax_id: z
    .string()
    .min(9)
    .max(9)
    .refine(
      (val) => {
        return /^\d{9}$/.test(val);
      },
      {
        message: "Invalid tax ID format",
      }
    ),
  registration_number: z
    .string()
    .min(9)
    .max(9)
    .refine(
      (val) => {
        return /^\d{9}$/.test(val);
      },
      {
        message: "Invalid registration number format",
      }
    )
    .optional()
    .nullable(),
};

export const companySelectSchema = createSelectSchema(companies);
export const companyInsertSchema = createInsertSchema(companies)
  .omit({
    created_at: true,
    updated_at: true,
  })
  .extend(companySchemaExtend);

export const companyUpdateSchema =
  createUpdateSchema(companies).extend(companySchemaExtend);

export const addresses = pgTable("addresses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: text().notNull(),

  main: boolean().notNull().default(false),

  name: text().notNull(),
  address1: text().notNull(), // street address
  address2: text(), // apartment, suite, etc
  state: text().notNull().default(COMPANY_US_STATE), // disabled in forms
  city: text().notNull(),
  zip: text().notNull(),
  notes: text(),

  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const addressSelectSchema = createSelectSchema(addresses);

export const addressInsertSchema = createInsertSchema(addresses, {
  name: (schema) => schema.max(50),
  address1: (schema) => schema.max(255),
  address2: (schema) => schema.max(255).optional().nullable(),
  city: (schema) => schema.max(255),
  notes: (schema) => schema.optional().nullable(),
  zip: (schema) => schema.min(5).max(10),
});

export const addressUpdateSchema = addressInsertSchema.extend({
  id: z
    .union([z.number(), z.string()])
    .refine(
      (val) => {
        if (typeof val === "string") {
          return !isNaN(parseInt(val));
        }
        return true;
      },
      {
        message: "Invalid id input",
      }
    )
    .transform((val) => {
      if (typeof val === "string") {
        return parseInt(val);
      }
      return val;
    }),
});

// export const addressUpdateSchema = createUpdateSchema(addresses);

export const addressesRelations = relations(addresses, ({ one }) => ({
  user: one(users, {
    fields: [addresses.user_id],
    references: [users.id],
  }),
}));

export const services = pgTable("services", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull().unique(),
  quick_info: text(),
  description: text(),
  price: decimal(),
  duration: integer(),
  duration_unit: durationUnitEnum(),
  duration_per: measurementUnitEnum(),

  not_measurable: boolean().notNull().default(false), // if the service cant be measured in units
  allow_recurrence: boolean().notNull().default(false),
  price_per: measurementUnitEnum(),
  active: boolean().notNull().default(true),

  notes: text(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const serviceSelectSchema = createSelectSchema(services);

export const commissions = pgTable("commissions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: text().notNull(),

  assigned_to: text(),

  name: text(), // name of the commission for the user, like "Summer House Lawn Mowing"

  service_id: integer().notNull(),
  address_id: integer().notNull(),

  is_recurring: boolean().notNull().default(false),
  start_time: time({ precision: 0, withTimezone: false }).notNull(),
  start_date: timestamp().notNull(), // start date of the commission, also used for recurring commissions

  units: integer(), // number of units of the service, based on measurementUnitEnum
  unknown_units: boolean().notNull().default(false), // if the user doesn't know the units, the payment will be done after the service is done

  notes: text(),

  canceled: boolean().notNull().default(false),
  canceled_at: timestamp(),

  suspended: boolean().notNull().default(false),
  suspended_at: date(),

  completed: boolean().notNull().default(false),
  completed_at: date(),

  images_names: text("images_names")
    .array()
    .default(sql`'{}'::text[]`),

  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const commissionSelectSchema = createSelectSchema(commissions);
export const commissionInsertSchema = createInsertSchema(commissions);
export const commissionUpdateSchema = createUpdateSchema(commissions);

export const commissionsRelations = relations(commissions, ({ one }) => ({
  user: one(users, {
    fields: [commissions.user_id],
    references: [users.id],
  }),
  assigned: one(users, {
    fields: [commissions.assigned_to],
    references: [users.id],
  }),
  service: one(services, {
    fields: [commissions.service_id],
    references: [services.id],
  }),
  address: one(addresses, {
    fields: [commissions.address_id],
    references: [addresses.id],
  }),
  recurring: one(recurring, {
    fields: [commissions.id],
    references: [recurring.commission_id],
  }),
}));

export const recurring = pgTable("recurring", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  commission_id: integer().notNull(),
  recurrence: recurrenceEnum().notNull(),
  start_time: time({ precision: 0, withTimezone: false }).notNull(),
  start_date: date().notNull(),
  notes: text(),

  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const recurringInsertSchema = createInsertSchema(recurring);
export const recurringSelectSchema = createSelectSchema(recurring);
export const recurringUpdateSchema = createUpdateSchema(recurring);

export const recurringRelations = relations(recurring, ({ one }) => ({
  commission: one(commissions, {
    fields: [recurring.commission_id],
    references: [commissions.id],
  }),
}));

export const servicesRelations = relations(services, ({ many }) => ({
  commissions: many(commissions),
}));

// const recurringKeyEnum = recurringInsertSchema
//   .pick({ recurrence: true })

// commision form schema
export const commissionFormSchema = commissionInsertSchema
  .omit({
    images_names: true,
    assigned_to: true,
    canceled: true,
    canceled_at: true,
    completed: true,
    completed_at: true,
    created_at: true,
    suspended: true,
    suspended_at: true,
  })
  .extend({
    name: z.string().min(2).max(50),
    recurrence: recurringInsertSchema.shape.recurrence.optional().nullable(),
    units: z
      .union([z.number(), z.string().max(100)])
      .optional()
      .nullable()
      .transform((val) => {
        if (typeof val === "string") {
          return parseInt(val);
        }
        return val;
      }),
    service_id: z
      .union([z.number(), z.string()])
      .refine(
        (val) => {
          if (typeof val === "string") {
            return !isNaN(parseInt(val));
          }
          return true;
        },
        {
          message: "Invalid service input",
        }
      )
      .transform((val) => {
        if (typeof val === "string") {
          return parseInt(val);
        }
        return val;
      }),
    address_id: z
      .union([z.number(), z.string()])
      .refine(
        (val) => {
          if (typeof val === "string") {
            return !isNaN(parseInt(val));
          }
          return true;
        },
        {
          message: "Invalid address input",
        }
      )
      .transform((val) => {
        if (typeof val === "string") {
          return parseInt(val);
        }
        return val;
      }),

    // address_id: z
    //   .string()
    //   .refine((val) => !val || !isNaN(parseInt(val)), {
    //     message: "Invalid address input",
    //   })
    //   .transform((val) => parseInt(val)),

    images_files: z
      .array(z.instanceof(File))
      .optional()
      .nullable()
      .superRefine((val, ctx) => {
        if (val && val.length > 0) {
          // check if there are less than MAX_FILE_COUNT files
          if (val.length > MAX_FILE_COUNT) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Max ${MAX_FILE_COUNT} files allowed`,
            });
          }
          // check if the file types are valid
          val.forEach((file: File) => {
            if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Invalid file type",
              });
            }
          });

          // check if the files are less than MAX_FILE_SIZE
          val.forEach((file: File) => {
            if (file.size > MAX_FILE_SIZE) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: `Files can't exceed ${MAX_FILE_SIZE / 1024 / 1024}MB`,
              });
            }
          });
        }

        return true;
      }),
  })
  .superRefine((data, ctx) => {
    if (data.is_recurring && !data.recurrence) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide recurrence timing",
      });
    }
    return true;
  });

export const daysOffWork = pgTable("days_off_work", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date_from: date().notNull(),
  date_to: date(),
  name: text().notNull(),
  disabled: boolean().notNull().default(false),
});

// export const payments = pgTable("payments", {
//   id: integer().primaryKey().generatedAlwaysAsIdentity(),
//   user_id: uuid(),
//   amount: decimal().notNull(),
//   commission_id: integer().notNull(),
//   recurring_id: integer(),
//   notes: text(),
//   created_at: timestamp().notNull().defaultNow(),
//   updated_at: timestamp()
//     .notNull()
//     .defaultNow()
//     .$onUpdate(() => new Date()),
// });

// export const paymentsRelations = relations(payments, ({ one }) => ({
//   user: one(users, {
//     fields: [payments.user_id],
//     references: [users.id],
//   }),
//   commission: one(commissions, {
//     fields: [payments.commission_id],
//     references: [commissions.id],
//   }),
//   recurring: one(recurring, {
//     fields: [payments.recurring_id],
//     references: [recurring.id],
//   }),
// }));
