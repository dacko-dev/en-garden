import AddCommission from "@/components/AddCommission/AddCommission";
import { db } from "@/db/export";
import { addresses, services } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import React from "react";

export default async function ScheduleCommissionPage() {
  const session = getKindeServerSession();
  const user = await session.getUser();

  const servicesData = await db.select().from(services);
  const addressesData = await db
    .select()
    .from(addresses)
    .where(eq(addresses.user_id, user.id));

  return (
    <div className="py-12 flex items-center justify-center flex-col md:px-20">
      <h1 className="w-full text-center font-bold text-3xl mb-20">
        Schedule a commission
      </h1>

      <AddCommission services={servicesData} addresses={addressesData} />
    </div>
  );
}
