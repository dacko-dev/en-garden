CREATE TYPE "public"."commission_status" AS ENUM('active', 'canceled', 'suspended', 'completed');--> statement-breakpoint
ALTER TABLE "commissions" ADD COLUMN "status" "commission_status" DEFAULT 'active' NOT NULL;--> statement-breakpoint
ALTER TABLE "commissions" ADD COLUMN "status_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "commissions" DROP COLUMN "canceled";--> statement-breakpoint
ALTER TABLE "commissions" DROP COLUMN "canceled_at";--> statement-breakpoint
ALTER TABLE "commissions" DROP COLUMN "suspended";--> statement-breakpoint
ALTER TABLE "commissions" DROP COLUMN "suspended_at";--> statement-breakpoint
ALTER TABLE "commissions" DROP COLUMN "completed";--> statement-breakpoint
ALTER TABLE "commissions" DROP COLUMN "completed_at";