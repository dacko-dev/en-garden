import { db } from "@/db/export";
import { companies, users } from "@/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import "server-only";

export async function getCurrentUserProfile() {
  const session = getKindeServerSession();
  const user = await session.getUser();

  if (!user) {
    return null;
  }

  try {
    const userProfileData = await db
      .select({
        id: users.id,
        email: users.email,
        first_name: users.first_name,
        last_name: users.last_name,
        phone: users.phone,
      })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    return userProfileData[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getCurrentUserCompanyInfo() {
  const session = getKindeServerSession();
  const user = await session.getUser();

  if (!user) {
    return null;
  }

  try {
    const companyData = await db
      .select()
      .from(companies)
      .where(eq(companies.user_id, user.id))
      .limit(1);

    if (companyData.length === 0) {
      return null;
    }

    return companyData[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}
