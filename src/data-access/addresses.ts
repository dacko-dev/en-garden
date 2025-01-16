import "server-only";

import { db } from "@/db/export";
import { addresses } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";

export async function getCurrentUserAddresses() {
  const session = getKindeServerSession();
  const user = await session.getUser();

  if (!user) {
    return null;
  }

  try {
    const userAddressesData = await db
      .select()
      .from(addresses)
      .where(eq(addresses.user_id, user.id));

    return userAddressesData;
  } catch (e) {
    console.error(e);
    return null;
  }
}
