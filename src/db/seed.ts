import { db } from "@/db/export";
import { daysOffWork, services } from "@/db/schema";
import { blackouts, holidays, servicesData } from "@/lib/constants";

async function seed() {
  const holidaysData = holidays;
  const blackoutsData = blackouts;

  await db.insert(services).values(servicesData);
  await db.insert(daysOffWork).values(holidaysData);
  await db.insert(daysOffWork).values(blackoutsData);
}

async function main() {
  try {
    await seed();
  } catch (error) {
    console.error("Error seeding the database", error);
    process.exit(1);
  }
}

main();
