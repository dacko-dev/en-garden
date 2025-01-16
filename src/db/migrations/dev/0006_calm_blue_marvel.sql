ALTER TABLE "services" ALTER COLUMN "not_measurable" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "state" text DEFAULT 'Arizona' NOT NULL;