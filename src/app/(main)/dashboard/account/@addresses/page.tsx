"use server";

import AddAddressDialog from "@/app/(main)/dashboard/account/@addresses/AddAddressDialog";
import DashboardAddressCard from "@/components/DashboardAddressCard/DashboardAddressCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getCurrentUserAddresses } from "@/data-access/addresses";
import React from "react";

export default async function DashboardAccountAddressesSlot() {
  const addressesData = await getCurrentUserAddresses();

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Addresses
          <AddAddressDialog />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {addressesData ? (
          <div className="grid grid-cols-3 gap-8">
            {addressesData.map((address) => (
              <DashboardAddressCard address={address} key={address.id} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed flex items-center flex-col justify-center rounded-md p-10 py-16">
            <p className="font-light opacity-70">No addresses</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
