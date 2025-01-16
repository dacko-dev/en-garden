import DashboardUserCommissionCard from "@/app/(main)/dashboard/commissions/DashboardUserCommissionCard";
import { getCurrentUserCommissions } from "@/data-access/commissions";
import React from "react";

export default async function DashboardCommissionsPage() {
  const commissions = await getCurrentUserCommissions();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Account</h1>
        <p>View and edit your account details</p>
      </div>
      <div>
        {commissions ? (
          commissions.map((commission) => (
            <DashboardUserCommissionCard
              key={commission.id}
              commission={commission}
            />
          ))
        ) : (
          <p>No commissions found</p>
        )}
      </div>
    </div>
  );
}
