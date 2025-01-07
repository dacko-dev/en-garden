CREATE TYPE "public"."payment_type" AS ENUM ('card', 'cash');--> statement-breakpoint
ALTER TABLE "commissions"
ADD COLUMN "unknown_units" boolean DEFAULT false NOT NULL;