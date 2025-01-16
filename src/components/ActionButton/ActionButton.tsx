"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { CalendarPlus, MailPlus, Phone, Send } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ActionButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { user } = useKindeAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        // className="whitespace-nowrap px-4 py-2 bg-primary text-primary-foreground rounded-md"
        className="whitespace-nowrap w-full"
      >
        <Button asChild className="w-full">
          {children || <p>Commission Us!</p>}
        </Button>
        {/* <Button size={"icon"} asChild className="md:hidden block p-2">
          <Plus size={24} />
        </Button> */}
        {/* <Button className="flex items-center font-bold"> */}

        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="justify-between "
          // onClick={() => {
          //   redirect("/api/auth/login?post_login_redirect_url=/schedule-commision");
          // }}
        >
          <Link
            href={
              user
                ? "/schedule-commission"
                : "/api/auth/login?post_login_redirect_url=/schedule-commission"
            }
            className=""
          >
            Schedule
          </Link>
          <CalendarPlus size={30} />
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Contact</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem className="justify-between">
                Email
                <MailPlus />
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-between">
                Message
                <Send />
              </DropdownMenuItem>
              <DropdownMenuItem className="justify-between">
                Phone
                <Phone />
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
