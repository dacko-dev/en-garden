import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// setupEnv();

config({ path: [".env", ".env.production"] });

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default defineConfig({
  out: "./src/db/migrations/prod",
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL,
  },
});
