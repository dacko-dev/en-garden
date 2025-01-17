import "server-only";
import { db } from "@/db/export";
import { commissions } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export type UserDashboardCommissions = Awaited<
  ReturnType<typeof getCurrentUserCommissions>
>;

// single commission type
export type UserDashboardCommission =
  NonNullable<UserDashboardCommissions> extends Array<infer U> ? U : null;

export async function getCurrentUserCommissions() {
  const session = getKindeServerSession();
  const user = await session.getUser();

  if (!user) {
    return null;
  }

  try {
    const userCommissionsData = await db.query.commissions.findMany({
      with: {
        service: {
          columns: {
            name: true,
            price: true,
            duration: true,
            price_per: true,
            duration_per: true,
            duration_unit: true,
          },
        },
        address: {
          columns: {
            name: true,
            address1: true,
            address2: true,
            city: true,
            state: true,
            zip: true,
          },
        },
        recurring: {
          columns: {
            recurrence: true,
            start_date: true,
            start_time: true,
          },
        },
      },
      where: eq(commissions.user_id, user.id),
    });

    return userCommissionsData;
  } catch (e) {
    console.error(e);
    return null;
  }
}
