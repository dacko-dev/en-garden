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
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const reccurenceEnum = pgEnum("reccurence", [
  "daily",
  "weekly",
  "monthly",
]);

export const recurrenceSchema = createSelectSchema(reccurenceEnum);

// https://orm.drizzle.team/docs/zod
export const reccurenceSchema = createSelectSchema(reccurenceEnum);

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
  id: text().primaryKey(),
  email: text().notNull().unique(),
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

export const usersRelations = relations(users, ({ many }) => ({
  commissions: many(commissions),
  addresses: many(addresses),
  // payments: many(payments),
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

export const addresses = pgTable("addresses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: text().notNull(),

  main: boolean().notNull().default(false),

  name: text().notNull(),
  address1: text().notNull(),
  address2: text(),
  city: text().notNull(),
  zip: text().notNull(),
  notes: text(),

  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const addressInsertSchema = createInsertSchema(addresses, {
  name: (schema) => schema.max(50),
  address1: (schema) => schema.max(255),
  address2: (schema) => schema.max(255).optional().nullable(),
  city: (schema) => schema.max(255),
  notes: (schema) => schema.optional().nullable(),
  zip: (schema) => schema.min(3).max(50),
});

export const addressSelectSchema = createSelectSchema(addresses);
export const addressUpdateSchema = addressInsertSchema;

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
  id: integer().primaryKey(),
  // gen_random_uuid ()
  // id: uuid().primaryKey(),
  user_id: text().notNull(),

  assigned_to: text(),

  name: text(), // name of the commission for the user, like "Summer House Lawn Mowing"

  service_id: integer().notNull(),
  address_id: integer(),

  is_recurring: boolean().notNull().default(false),
  start_time: timestamp().notNull(),
  end_time: timestamp().notNull(),
  start_date: timestamp().notNull(), // start date of the commission, also used for recurring commissions

  units: integer(), // number of units of the service, based on measurementUnitEnum
  unknown_units: boolean().notNull().default(false), // if the user doesn't know the units, the payment will be done after the service is done

  same_address: boolean().notNull().default(false),
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
// excluding image_names from insert schema - it is a FileList and has to be added separately in the browser environment
// .extend({
//   images: z.instanceof(FileList).optional().nullable(),
// });
export const commissionInsertSchema = createInsertSchema(commissions).omit({
  images_names: true,
});
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
  commission_id: text().notNull(),
  reccurence: reccurenceEnum().notNull(),
  start_time: timestamp().notNull(),
  end_time: timestamp().notNull(),
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

const reccuringKey = recurringInsertSchema.pick({ reccurence: true });

// commision form schema
export const commisionFormSchema = commissionInsertSchema.merge(reccuringKey);

export const daysOffWork = pgTable("days_off_work", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  date_from: date().notNull(),
  date_to: date(),
  name: text().notNull(),
  disabled: boolean().notNull().default(false),
});
