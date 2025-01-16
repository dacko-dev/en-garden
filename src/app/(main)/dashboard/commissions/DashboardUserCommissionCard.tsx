import { commissionSelectSchema } from "@/db/schema";
import React from "react";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DashboardUserCommissionCard({
  commission,
}: {
  commission: z.infer<typeof commissionSelectSchema>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{commission.name}</CardTitle>
        <CardDescription>
          {commission.is_recurring ? "Recurring" : "One-time"} commission
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Service ID: {commission.service_id}</p>
        <p>Address ID: {commission.address_id}</p>
        <p>Start Time: {commission.start_time}</p>
        <p>
          Start Date: {new Date(commission.start_date).toLocaleDateString()}
        </p>
        <p>Units: {commission.unknown_units ? "Unknown" : commission.units}</p>
        <p>Notes: {commission.notes}</p>
        <p>
          Status:
          {commission.canceled ? (
            <Badge color="red">Canceled</Badge>
          ) : commission.suspended ? (
            <Badge color="yellow">Suspended</Badge>
          ) : commission.completed ? (
            <Badge color="green">Completed</Badge>
          ) : (
            <Badge color="blue">Active</Badge>
          )}
        </p>
        <p>Created At: {new Date(commission.created_at).toLocaleString()}</p>
        <p>Updated At: {new Date(commission.updated_at).toLocaleString()}</p>
        {commission.images_names && commission.images_names.length > 0 && (
          <div>
            <p>Images:</p>
            <ul>
              {commission.images_names.map((image, index) => (
                <li key={index}>{image}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// import { commissionSelectSchema } from '@/db/schema'
// import React from 'react'
// import { z } from 'zod'
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@shadcn/ui'

// export default function DashboardUserCommissionCard({
//     commission,
//     }: {
//     commission: z.infer<typeof commissionSelectSchema>
// }) {

//     return (
//         <Card>
//             <CardHeader>
//                 <CardTitle>{commission.title}</CardTitle>
//                 <CardDescription>{commission.description}</CardDescription>
//             </CardHeader>
//             <CardContent>
//                 <p>Amount: {commission.amount}</p>
//                 <p>Status: {commission.status}</p>
//             </CardContent>
//         </Card>
//     )
// }
