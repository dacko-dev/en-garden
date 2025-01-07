"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const dashboardLinks = [
  { name: "Account", href: "/dashboard/account" },
  { name: "Commissions", href: "/dashboard/commissions" },
  { name: "Calendar", href: "/dashboard/calendar" },
  { name: "Payments", href: "/dashboard/payments" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const checkActivePath = (path: string) => {
    return path === pathname;
  };

  return (
    <nav>
      <ul className="flex items-center border-b">
        {dashboardLinks.map((link, index) => (
          <li key={link.href}>
            <Button
              asChild
              className="w-full font-bold rounded-none border border-b-0"
              // variant={"outline"}
              variant={checkActivePath(link.href) ? "default" : "outline"}
              size={"sm"}
            >
              <Link key={index} href={link.href} className="text-center">
                {link.name}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
