// import DashboardCommissionFilters from "@/app/(main)/dashboard/commissions/DashboardCommissionFilters";
// import DashboardUserCommissionCard from "@/app/(main)/dashboard/commissions/DashboardUserCommissionCard";
// import { Button } from "@/components/ui/button";
// import { getCurrentUserCommissions } from "@/data-access/commissions";
// import Link from "next/link";
import DashboardUserCommissions from "@/app/(main)/dashboard/commissions/DashboardUserCommissions";
import React from "react";

export default async function DashboardCommissionsPage() {
  // const commissions = await getCurrentUserCommissions();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold">Commissions</h1>
        <p>View and manage your commissions</p>
      </div>
      <DashboardUserCommissions />
    </div>
  );
}
