CREATE TYPE "public"."duration_unit" AS ENUM('minutes', 'hours', 'days', 'weeks', 'months');--> statement-breakpoint
CREATE TYPE "public"."measurement_unit" AS ENUM('acres', 'sqft', 'sqm', 'hectares', 'project', 'installation', 'tree', 'hedgerow');--> statement-breakpoint
CREATE TYPE "public"."reccurence" AS ENUM('daily', 'weekly', 'monthly');--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "addresses_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"main" boolean DEFAULT false NOT NULL,
	"name" text NOT NULL,
	"address1" text NOT NULL,
	"address2" text,
	"city" text NOT NULL,
	"zip" text NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "commissions" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"assigned_to" text,
	"name" text,
	"service_id" integer NOT NULL,
	"address_id" integer,
	"is_recurring" boolean DEFAULT false NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"start_date" timestamp NOT NULL,
	"units" integer,
	"same_address" boolean DEFAULT false NOT NULL,
	"notes" text,
	"canceled" boolean DEFAULT false NOT NULL,
	"canceled_at" timestamp,
	"suspended" boolean DEFAULT false NOT NULL,
	"suspended_at" date,
	"completed" boolean DEFAULT false NOT NULL,
	"completed_at" date,
	"images_names" text[] DEFAULT '{}'::text[],
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "days_off_work" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "days_off_work_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date_from" date NOT NULL,
	"date_to" date,
	"name" text NOT NULL,
	"disabled" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recurring" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "recurring_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"commission_id" text NOT NULL,
	"reccurence" "reccurence" NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"start_date" date NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "services_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"quick_info" text,
	"description" text,
	"price" numeric,
	"duration" integer,
	"duration_unit" "duration_unit",
	"duration_per" "measurement_unit",
	"allow_recurrence" boolean DEFAULT false NOT NULL,
	"price_per" "measurement_unit",
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "services_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"first_name" text,
	"last_name" text,
	"avatar_url" text,
	"phone" text,
	"notes" text,
	"active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"stripe_customer" jsonb,
	"stripe_subscription" jsonb,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
