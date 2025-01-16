import DashboardCompanyInfo from "@/components/DashboardCompanyInfo/DashboardCompanyInfo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUserCompanyInfo } from "@/data-access/users";
import React from "react";

export default async function DashboardAccountPaymentSlot() {
  const companyInfo = await getCurrentUserCompanyInfo();
  console.log(companyInfo);
  return (
    <Card className="relative">
      <CardHeader>
        <CardTitle>Company</CardTitle>
        <CardDescription>
          Add or update your company information
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DashboardCompanyInfo companyInfo={companyInfo} />
      </CardContent>
    </Card>
  );
}
