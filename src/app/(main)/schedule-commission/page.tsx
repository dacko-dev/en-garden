import CommissionForm from "@/components/forms/CommissionForm/CommissionForm";
import { db } from "@/db/export";
import { addresses, services } from "@/db/schema";
import React from "react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export default async function ScheduleCommissionPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const servicesData = await db.select().from(services);
  const userAddresses = await db
    .select()
    .from(addresses)
    .where(eq(addresses.user_id, user.id));
  // const userAddresses = await db.query.addresses.findMany({
  //   where: eq(addresses.user_id, user.id),
  // });

  return (
    <div className="py-12 flex items-center justify-center flex-col md:px-20">
      <h1 className="w-full text-center font-bold text-3xl mb-20">
        Schedule a commission
      </h1>

      <CommissionForm
        services={servicesData}
        addresses={userAddresses}

        // onSubmit={(values) => {
        //   console.log(values);
        // }}
      />
    </div>
  );
}
