"use client";

import DashboardCommissionFilters from "@/app/(main)/dashboard/commissions/DashboardCommissionFilters";
import DashboardCommissionSkeleton from "@/app/(main)/dashboard/commissions/DashboardCommissionSkeleton";
import DashboardUserCommissionCard from "@/app/(main)/dashboard/commissions/DashboardUserCommissionCard";
import { Button } from "@/components/ui/button";
import { getCurrentUserCommissionsClient } from "@/data-access/client/commissions";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function DashboardUserCommissions() {
  const { user } = useKindeAuth();

  const {
    data: commissions,
    isPending,
    isLoading,
  } = useQuery({
    enabled: !!user,
    queryKey: ["user-commissions"],
    queryFn: () => getCurrentUserCommissionsClient({ user_id: user?.id }),
  });

  return (
    <div className="mt-12">
      {isPending || isLoading ? (
        <DashboardCommissionSkeleton />
      ) : commissions?.data?.length ? (
        <div className="flex flex-col gap-8">
          <DashboardCommissionFilters />
          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {commissions.data.map((commission) => (
              <DashboardUserCommissionCard
                key={commission.id}
                commission={commission}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="border flex flex-col rounded-md border-dotted p-20">
          <p>No commissions</p>
          <Button asChild className="mt-4">
            <Link href="/schedule-commission">Add Commission</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
