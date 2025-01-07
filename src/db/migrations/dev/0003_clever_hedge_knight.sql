ALTER TABLE "public"."services" ALTER COLUMN "duration_per" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "public"."services" ALTER COLUMN "price_per" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE IF EXISTS "public"."measurement_unit";--> statement-breakpoint
CREATE TYPE "public"."measurement_unit" AS ENUM('acre', 'sqft', 'sqm', 'hectare', 'project', 'installation', 'tree', 'hedgerow');--> statement-breakpoint
ALTER TABLE "public"."services" ALTER COLUMN "duration_per" SET DATA TYPE "public"."measurement_unit" USING "duration_per"::"public"."measurement_unit";--> statement-breakpoint
ALTER TABLE "public"."services" ALTER COLUMN "price_per" SET DATA TYPE "public"."measurement_unit" USING "price_per"::"public"."measurement_unit";