import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash } from "lucide-react";
import React from "react";

export default function DashboardAccountAccountActionsSlot() {
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <Button variant={"secondary"}>
          <span>Change Password</span>
        </Button>

        <Button variant={"secondary"}>Suspend Account</Button>

        <Button variant={"destructive"}>
          <span>Delete Account</span>
          <Trash />
        </Button>
      </CardContent>
    </Card>
  );
}
