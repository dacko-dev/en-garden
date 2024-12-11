import { ThemeModeToggle } from "@/components/ThemeModeToggle/ThemeModeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { yujiMai } from "@/fonts";
import { CalendarPlus, LogOut, MailPlus, Phone, Send } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function MainHeader() {
  return (
    <header
      className={` border-b shadow-sm col-span-full       grid
  grid-cols-main`}
    >
      <div className="flex items-center justify-between px-10 py-4 col-start-2 col-end-3">
        <Link href="/" className="flex items-center gap-4 ">
          <h1 className={`${yujiMai.className} select-none text-3xl`}>
            En Garden!
          </h1>
        </Link>

        <nav className="flex items-center justify-center gap-8">
          <Link className="hover:underline" href="/about">
            About
          </Link>
          <Link className="hover:underline" href="/services">
            Services
          </Link>
          {/* <Link href="/contact">Contact</Link> */}
          <DropdownMenu>
            <DropdownMenuTrigger className="">Contact</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Phone</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <nav className="flex items-center gap-8">
          <div className="flex items-center justify-center gap-4">
            <ThemeModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full">
                <Avatar className="object-cover w-10 h-10 rounded-full">
                  <AvatarImage
                    className="w-10 h-10 rounded-full"
                    src="https://ui.shadcn.com/avatars/03.png"
                  />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>lucyRosa@gmail.com</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Commisions</DropdownMenuItem>
                <DropdownMenuItem>Scheduled</DropdownMenuItem>
                <DropdownMenuItem>Billings</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="justify-between font-semibold">
                  Log out
                  <LogOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="self-stretch w-[1px] rounded-sm bg-border" />

          <DropdownMenu>
            <DropdownMenuTrigger className=" px-4 py-2 bg-primary text-primary-foreground rounded-md">
              {/* <Button className="flex items-center font-bold"> */}
              Commission Us!
              {/* </Button> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
              <DropdownMenuItem className="justify-between">
                Schedule
                <CalendarPlus size={30} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
