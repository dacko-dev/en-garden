import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { setupEnv } from "@/lib/setupEnv";

setupEnv();

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  out: "./src/db/migrations/dev",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
});
