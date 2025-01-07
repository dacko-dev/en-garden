"use client";

import ActionButtonSidebar from "@/components/layout/MainHeader/ActionButtonSidebar";
import { Button } from "@/components/ui/button";
import { yujiMai } from "@/fonts";
import { useIsMobile } from "@/hooks/use-mobile";
import { headerLinks } from "@/lib/constants";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
  useKindeAuth,
} from "@kinde-oss/kinde-auth-nextjs";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function MainSidebar({ className }: { className?: string }) {
  const isMobile = useIsMobile();
  const { user } = useKindeAuth();

  if (!isMobile) {
    return null;
  }

  return (
    <div className={`group flex ${className}`}>
      <input
        type="checkbox"
        defaultChecked={false}
        id="menu-toggle"
        className="hidden peer"
      />

      {/* <MainSidebar /> */}
      <aside className="px-16 flex flex-col justify-center sm:justify-normal sm:px-0 fixed top-0 transition-all right-0 h-full w-full sm:w-80 bg-background border-0  sm:border-l border-border z-40 transform peer-checked:invisible  peer-checked:border-4 peer-checked:translate-x-full duration-300 ease-in-out">
        {/* <div className="p-4 sm:absolute flex justify-end  sm:-left-16">
          <Button
            asChild
            variant={"outline"}
            className="rounded-full cursor-pointer"
            size={"icon"}
          >
            <label htmlFor="menu-toggle">
              <X />
            </label>
          </Button>
        </div> */}

        <Link
          href="/"
          className="flex items-center justify-center gap-4 text-center p-4 "
        >
          <h1
            className={`${yujiMai.className}  whitespace-nowrap select-none text-3xl`}
          >
            En Garden!
          </h1>
        </Link>

        <div className="my-auto">
          <div className="px-4 w-full flex">
            <ActionButtonSidebar />
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="w-8 h-1 rounded-sm bg-stone-300 dark:bg-white opacity-70" />
          </div>
          <nav>
            <ul className="px-4 flex  flex-col gap-2">
              {headerLinks.map((link, index) => (
                <li key={link.href}>
                  <Button
                    asChild
                    className="w-full font-bold"
                    variant={"outline"}
                    size={"lg"}
                  >
                    <Link key={index} href={link.href} className="text-center">
                      {link.name}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex w-full flex-col p-4 gap-2 sm:mt-auto self-end">
          {user ? (
            <LogoutLink className="flex items-center w-full justify-between">
              Log out
              <LogOut />
            </LogoutLink>
          ) : (
            <>
              <Button
                size={"lg"}
                asChild
                variant={"secondary"}
                className="w-full font-normal"
              >
                <LoginLink>Log in</LoginLink>
              </Button>
              <Button size={"lg"} asChild className="w-full font-bold ">
                <RegisterLink>Sign up</RegisterLink>
              </Button>
            </>
          )}
        </div>
      </aside>

      <Button asChild className="cursor-pointer z-[100] relative" size={"icon"}>
        <label htmlFor="menu-toggle">
          <Menu
            className="group-has-[#menu-toggle:checked]:visible
            group-has-[#menu-toggle:checked]:opacity-100
            opacity-0
            transition-all
          transform group-has-[#menu-toggle:checked]:rotate-0 rotate-45
          collapse absolute"
          />
          <X
            className="group-has-[#menu-toggle:checked]:collapse absolute
            group-has-[#menu-toggle:checked]:opacity-0
            opacity-100
          transition-all transform group-has-[#menu-toggle:checked]:rotate-45
          rotate-0
          "
          />
        </label>
      </Button>
    </div>
  );
}
