"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { LogOut } from "lucide-react";
import React from "react";

export default function AvatarDropdown() {
  const { isAuthenticated, user } = useKindeBrowserClient();

  const displayName =
    user?.given_name && user?.family_name
      ? `${user.given_name} ${user.family_name}`
      : user?.email;

  const fallbackInitials = user?.given_name
    ? user.given_name[0]
    : user?.email
    ? user.email[0]
    : "U";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="object-cover w-10 h-10 rounded-full">
          <AvatarImage
            className="w-10 h-10 rounded-full"
            src={
              user?.picture
                ? user.picture
                : "https://ui.shadcn.com/avatars/03.png"
            }
          />
          <AvatarFallback>{fallbackInitials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      {isAuthenticated ? (
        <>
          <DropdownMenuContent>
            <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Commisions</DropdownMenuItem>
            <DropdownMenuItem>Scheduled</DropdownMenuItem>
            <DropdownMenuItem>Billings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-between font-semibold">
              <LogoutLink className="flex items-center w-full justify-between">
                Log out
                <LogOut />
              </LogoutLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
      ) : (
        <>
          <DropdownMenuContent className="p-0  ">
            <DropdownMenuLabel className="text-center my-2">
              My Account
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            <DropdownMenuItem className="justify-center p-0">
              <Button
                asChild
                variant={"secondary"}
                className="w-full font-normal rounded-none"
              >
                <LoginLink>Log in</LoginLink>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center p-0">
              <Button asChild className="w-full font-bold rounded-t-none">
                <RegisterLink>Sign up</RegisterLink>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </>
      )}
    </DropdownMenu>
  );
}
