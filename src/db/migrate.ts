import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./export";

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
      migrationsTable: "drizzle_migrations",
    });
  } catch (error) {
    console.error("Error migrating the database", error);
    process.exit(1);
  }
}

main();
