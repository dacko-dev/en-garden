import DashboardSidebar from "@/components/layout/DashboardSidebar/DashboardSidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_1fr] h-full py-20 px-10">
      <DashboardSidebar />

      <section className="mt-10">{children}</section>
    </div>
  );
}
