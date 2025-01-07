import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./export";

async function main() {
  const envName = process.env.NODE_ENV || "development";
  const folderName = envName === "production" ? "prod" : "dev";

  try {
    await migrate(db, {
      migrationsFolder: `src/db/migrations/${folderName}/`,
      migrationsTable: "drizzle_migrations",
    });
  } catch (error) {
    console.error("Error migrating the database", error);
    process.exit(1);
  }
}

main();
