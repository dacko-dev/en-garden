import { db } from "@/db/export";
import { commissionInsertSchema, commissions } from "@/db/schema";
import { getErrorMessage, zodIssuesResponse } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: NextRequest) {
  try {
    // Get user session and roles
    const session = getKindeServerSession();
    const user = await session.getUser();
    const roles = await session.getRoles();
    const isAdmin = roles?.some((role) => role.key === "admin");

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const commissionId = searchParams.get("commission_id");

    // Validation: Ensure necessary parameters are provided
    if (!isAdmin && !userId && !commissionId) {
      return new Response(null, {
        status: 400,
        statusText: "Either user_id or commission_id is required",
      });
    }

    // Authorization: Ensure user is allowed to access the data
    if (!isAdmin) {
      if (userId && userId !== user.id) {
        return new Response(null, {
          status: 403,
          statusText: "You are not authorized to view this user's data",
        });
      }

      if (commissionId) {
        const commissionOwner = await db
          .select({ user_id: commissions.user_id })
          .from(commissions)
          .where(eq(commissions.id, Number(commissionId)))
          .limit(1);

        if (!commissionOwner || commissionOwner[0].user_id !== user.id) {
          return new Response(null, {
            status: 403,
            statusText: "You are not authorized to view this commission",
          });
        }
      }
    }

    // Fetch the requested data
    if (commissionId) {
      // Fetch specific commission
      const commission = await db
        .select()
        .from(commissions)
        .where(eq(commissions.id, Number(commissionId)));

      return new Response(JSON.stringify(commission), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (userId) {
      // Fetch commissions for a specific user
      const userCommissions = await db
        .select()
        .from(commissions)
        .where(eq(commissions.user_id, userId));

      return new Response(JSON.stringify(userCommissions), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    if (isAdmin) {
      // Fetch all commissions for admin users
      const allCommissions = await db.select().from(commissions);
      return new Response(JSON.stringify(allCommissions), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Default unauthorized response
    return new Response(null, {
      status: 403,
      statusText: "You are not authorized",
    });
  } catch (error) {
    // Error handling
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get user session
    const session = getKindeServerSession();
    const user = await session.getUser();
    const roles = await session.getRoles();
    const isAdmin = roles?.some((role) => role.key === "admin");

    // Parse request body
    const body = await request.json();

    // Validate data against schema
    const commissionParsed = commissionInsertSchema.safeParse(body);

    if (!commissionParsed.success) {
      const issues = commissionParsed.error.issues;
      return zodIssuesResponse({ issues });
    }

    const commissionData = commissionParsed.data;

    // If the user is not an admin, ensure the commission belongs to them
    if (!isAdmin && commissionData.user_id !== user.id) {
      return new Response(null, {
        status: 403,
        statusText:
          "You are not authorized to create commissions for this user",
      });
    }

    // Insert the commission into the database
    const newCommissionArr = await db
      .insert(commissions)
      .values(commissionData)
      .returning();

    const newCommission = newCommissionArr[0];

    if (!newCommission) {
      return new Response(null, {
        status: 500,
        statusText: "Failed to create commission",
      });
    }

    return new Response(JSON.stringify(newCommission), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: getErrorMessage(error) }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
