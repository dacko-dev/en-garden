import { db } from "@/db/export";
import { services } from "@/db/schema";

async function seed() {
  const mowing: typeof services.$inferInsert = {
    name: "Mowing",
    description: "Mow the lawn",
    price: "45",
    duration: 30,
    duration_unit: "minutes",
    duration_per: "1/4 acre",
  };

  await db.insert(services).values(mowing);
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
