"use client";

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
import { CalendarPlus, MailPlus, Phone, Send } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default function ActionButtonDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" px-4 py-2 bg-primary text-primary-foreground rounded-md">
        {/* <Button className="flex items-center font-bold"> */}
        Commission Us!
        {/* </Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="justify-between "
          onClick={() => {
            redirect("/api/auth/login?post_login_redirect_url=/commision");
          }}
        >
          Schedule
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
