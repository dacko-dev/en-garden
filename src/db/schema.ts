import {
  integer,
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  pgEnum,
  date,
  decimal,
} from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const reccurenceEnum = pgEnum("reccurence", [
  "daily",
  "weekly",
  "monthly",
]);

// stored users from Kinde auth
export const users = pgTable("users", {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text().notNull(),
  first_name: text(),
  last_name: text(),
  avatar_url: text(),
  phone: text(),
  address1: text(),
  address2: text(),
  city: text(),
  state: text(),
  zip: text(),
  notes: text(),
  active: boolean().notNull().default(true),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const services = pgTable("services", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  description: text(),
  price: decimal(),
  duration: integer(),
  duration_unit: text(),
  duration_per: text(),

  recurring: boolean().notNull().default(false),
  price_per: text(),
  active: boolean().notNull().default(true),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ many }) => ({
  commissions: many(commissions),
  // payments: many(payments),
}));

export const commissions = pgTable("commissions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: uuid(),
  service_id: integer().notNull(),

  is_recurring: boolean().notNull().default(false),
  start_time: timestamp().notNull(),
  end_time: timestamp().notNull(),
  date_start: timestamp().notNull(),

  same_address: boolean().notNull().default(false),
  notes: text(),

  suspended: boolean().notNull().default(false),
  suspended_at: date(),
  completed: boolean().notNull().default(false),
  completed_at: date(),

  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const commissionsAddress = pgTable("commissions_address", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  commission_id: integer().notNull(),
  address1: text().notNull(),
  address2: text(),
  city: text().notNull(),
  state: text().notNull(),
  zip: text().notNull(),
  notes: text(),

  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const commissionsRelations = relations(commissions, ({ one }) => ({
  user: one(users, {
    fields: [commissions.user_id],
    references: [users.id],
  }),
  service: one(services, {
    fields: [commissions.service_id],
    references: [services.id],
  }),
  recurring: one(recurring, {
    fields: [commissions.id],
    references: [recurring.commission_id],
  }),
}));

export const recurring = pgTable("recurring", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  commission_id: integer().notNull(),
  reccurence: reccurenceEnum().notNull(),
  start_time: timestamp().notNull(),
  end_time: timestamp().notNull(),
  date_start: date().notNull(),
  notes: text(),

  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

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
