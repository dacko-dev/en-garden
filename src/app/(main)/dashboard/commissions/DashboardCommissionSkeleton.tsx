import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const FilterSkeleton = () => (
  <div className="flex flex-col gap-3">
    <Skeleton className="h-4 w-[100] rounded-sm" />
    <Skeleton className="h-9 w-[180] rounded-md" />
  </div>
);

const CardSkeleton = () => <Skeleton className=" h-[300] rounded-md" />;

export default function DashboardCommissionSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-end gap-4">
        <FilterSkeleton />
        <FilterSkeleton />
        <FilterSkeleton />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>

      <div className="gap-8 grid grid-cols-2">
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}
