import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CommissionApi } from "@/app/api/commissions/route";

import {
  Check,
  CircleSlash,
  Ellipsis,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  capitalizeFirstWord,
  makePlural,
  transformTimeToDate,
} from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { COMISSION_STATUSES_TYPE } from "@/types";

function getBadgeVariant(
  status: COMISSION_STATUSES_TYPE
): "default" | "destructive" | "secondary" | "outline" {
  switch (status) {
    case "canceled":
      return "secondary";
    case "suspended":
      return "destructive";
    case "completed":
      return "secondary";
    default:
      return "default";
  }
}

export default function DashboardUserCommissionCard({
  commission,
}: {
  commission: CommissionApi;
}) {
  console.log("commission", commission);

  return (
    <Card className="shadow-md border rounded-lg relative">
      <Badge
        variant={getBadgeVariant(commission.status)}
        className="absolute -top-2 left-10"
      >
        {capitalizeFirstWord(commission.status)}
      </Badge>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-semibold">
              {commission.name}
            </CardTitle>
            <CardDescription className="text-stone-500">
              {commission.is_recurring ? "Recurring" : "One-time"} commission
            </CardDescription>
          </div>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[10px] gap-1 flex flex-col">
              <DropdownMenuItem asChild>
                <Button
                  variant={"ghost"}
                  className="w-full flex justify-between items-center"
                >
                  Edit
                  <Pencil />
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Button
                  variant={"secondary"}
                  className="w-full flex justify-between items-center"
                >
                  Cancel
                  <CircleSlash />
                </Button>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Button
                  variant={"destructive"}
                  className="w-full flex justify-between items-center"
                >
                  Delete
                  <Trash2 />
                </Button>
              </DropdownMenuItem>

              {/* <DropdownMenuItem>
                Delete
                <Trash2 />
              </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col">
            <span className="text-stone-500 text-sm">Service</span>
            <span className="font-medium">{commission.service?.name}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-stone-500 text-sm">Address</span>
            <span className="font-medium flex items-center">
              {commission.address?.name}
              <Button className="ml-2 rounded-full" variant="ghost" size="icon">
                <Eye />
              </Button>
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col">
            <span className="text-stone-500 text-sm">Units</span>
            <span className="font-medium">
              {commission.unknown_units
                ? "Unknown"
                : `${commission.units} ${capitalizeFirstWord(
                    makePlural(commission.service?.price_per)
                  )}`}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col">
            <span className="text-stone-500 text-sm">Date</span>
            <span className="font-medium">
              {/* IF recurring, skip year */}
              {commission.is_recurring
                ? Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                  }).format(new Date(commission.start_date))
                : Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                  }).format(new Date(commission.start_date))}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-stone-500 text-sm">Time</span>
            <span className="font-medium">
              {Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }).format(transformTimeToDate(commission.start_time))}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-stone-500 text-sm">Notes</span>
          <Textarea
            defaultValue={commission.notes || undefined}
            className="font-medium min-h-[100px] bg-background/10"
          ></Textarea>
        </div>
        {commission.images_names && commission.images_names.length > 0 && (
          <div className="space-y-2">
            <span className="text-stone-500 text-sm">Images</span>
            <div className="grid grid-cols-3 gap-2">
              {commission.images_names.map((image, index) => (
                <div
                  key={index}
                  className="bg-stone-100 text-center p-2 rounded-md text-sm font-medium"
                >
                  {image}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* paid status button */}
        <div className="mt-auto self-end">
          <Button
            size={"lg"}
            variant="default"
            className="w-full"
            // onClick={() => handlePayCommission(commission.id)}
          >
            Pay For Commission
          </Button>

          <Button
            size={"lg"}
            variant="outline"
            className="w-full flex items-center justify-center gap-4 "
            // onClick={() => handlePayCommission(commission.id)}
          >
            Paid <Check />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
