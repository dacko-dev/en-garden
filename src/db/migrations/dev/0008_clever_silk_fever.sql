ALTER TABLE "commissions" ALTER COLUMN "address_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "commissions" ALTER COLUMN "start_time" SET DATA TYPE time(0);--> statement-breakpoint
ALTER TABLE "recurring" ALTER COLUMN "start_time" SET DATA TYPE time(0);--> statement-breakpoint
ALTER TABLE "commissions" DROP COLUMN "end_time";