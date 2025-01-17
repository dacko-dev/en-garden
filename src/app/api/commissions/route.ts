import "server-only";
import { db } from "@/db/export";
import { addresses, commissions, recurring, services } from "@/db/schema";
import { getErrorMessage } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";
import { desc, eq, InferSelectModel } from "drizzle-orm";

export type CommissionApi = InferSelectModel<typeof commissions> & {
  service?: Partial<InferSelectModel<typeof services>>;
  address?: Partial<InferSelectModel<typeof addresses>>;
  recurring?: Partial<InferSelectModel<typeof recurring>>;
};

export type CommissionApiResponse = CommissionApi[];

type CommonWith = {
  service: {
    columns: Partial<{
      [K in keyof InferSelectModel<typeof services>]: boolean;
    }>;
  };
  address: {
    columns: Partial<{
      [K in keyof InferSelectModel<typeof addresses>]: boolean;
    }>;
  };
  recurring: {
    columns: Partial<{
      [K in keyof InferSelectModel<typeof recurring>]: boolean;
    }>;
  };
};

const commonWith: CommonWith = {
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
};

// Response Helpers
function successResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function errorResponse(message: string, status = 500): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

// GET Handler
export async function GET(request: NextRequest) {
  try {
    const session = getKindeServerSession();
    const user = await session.getUser();
    const roles = await session.getRoles();
    const isAdmin = roles?.some((role) => role.key === "admin") ?? false;

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const commissionId = searchParams.get("commission_id");

    // Ensure the user is authorized to view the data
    if (!isAdmin && userId && userId !== user.id) {
      return errorResponse("Unauthorized", 403);
    }

    if (commissionId) {
      // Fetch specific commission
      const commission = await db.query.commissions.findFirst({
        with: commonWith,
        where: eq(commissions.id, Number(commissionId)),
      });

      // Check if user is the owner or an admin
      if (!commission || (commission.user_id !== user.id && !isAdmin)) {
        return errorResponse("Unauthorized", 403);
      }

      return successResponse([commission]);
    }

    if (userId) {
      // Fetch commissions for a specific user
      const userCommissions = await db.query.commissions.findMany({
        with: commonWith,
        where: eq(commissions.user_id, user.id),
      });

      return successResponse(userCommissions);
    }

    if (isAdmin) {
      // Fetch all commissions for admin users
      const allCommissions = await db.query.commissions.findMany({
        with: commonWith,
        orderBy: desc(commissions.created_at),
      });
      return successResponse(allCommissions);
    }

    return errorResponse("Unauthorized", 403);
  } catch (error) {
    return errorResponse(getErrorMessage(error), 500);
  }
}
