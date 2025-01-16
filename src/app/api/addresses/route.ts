import { db } from "@/db/export";
import { addresses, addressInsertSchema } from "@/db/schema";
import { getErrorMessage, zodIssuesResponse } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

// TODO: change the response of the errors
export async function GET(request: NextRequest) {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    const roles = await session.getRoles();
    const isAdmin = roles?.find((role) => role.key === "admin") !== undefined;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return {
        status: 400,
        message: "User ID is required",
      };
    }

    if (userId !== user.id || (userId !== user.id && !isAdmin)) {
      return new Response(null, {
        status: 403,
        statusText: "You are not authorized",
      });
    }

    const userAddresses = await db
      .select()
      .from(addresses)
      .where(eq(addresses.user_id, userId));

    return new Response(JSON.stringify(userAddresses), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: unknown) {
    return new Response(null, {
      status: 500,
      statusText: getErrorMessage(error),
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();

    const roles = await session.getRoles();
    const isAdmin = roles?.find((role) => role.key === "admin") !== undefined;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");

    if (!userId) {
      return new Response(null, {
        status: 400,
        statusText: "User ID is required",
      });
    }

    const address = await request.json();
    // throws an error if the address is invalid, https://zod.dev/?id=parse
    const parsedAddress = addressInsertSchema.safeParse(address);

    if (!parsedAddress.success) {
      const issues = parsedAddress.error.issues;
      return zodIssuesResponse({ issues });
    }

    const parsedAddressData = parsedAddress.data;

    if (userId !== user.id || !isAdmin) {
      return {
        status: 403,
        message: "You are not authorized",
      };
    }

    await db.insert(addresses).values({
      ...parsedAddressData,
      user_id: userId,
    });

    return {
      status: 200,
      message: "Address added successfully",
    };
  } catch (error) {
    return new Response(null, {
      status: 500,
      statusText: getErrorMessage(error),
    });
  }
}
