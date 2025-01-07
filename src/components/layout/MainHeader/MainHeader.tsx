import { ThemeModeToggle } from "@/components/ThemeModeToggle/ThemeModeToggle";
import { yujiMai } from "@/fonts";
import Link from "next/link";
import React from "react";

import AvatarDropdown from "@/components/layout/MainHeader/AvatarDropdown";
import Image from "next/image";
import { headerLinks } from "@/lib/constants";
import ActionButtonHeader from "@/components/layout/MainHeader/ActionButtonHeader";
import MainSidebar from "@/components/layout/MainHeader/MainSidebar";

export default function MainHeader() {
  return (
    <header className={`border-b shadow-sm col-span-full grid grid-cols-main`}>
      <div className="flex items-center justify-between px-10 pr-4 md:pr-10 py-4 col-start-2 col-end-3">
        <Link href="/" className="flex items-center gap-4 ">
          <Image
            src={"/icons/logo_128.png"}
            width={60}
            height={60}
            alt="Logo Image"
            className="w-10 h-10"
          />
          <h1
            className={`${yujiMai.className} hidden lg:inline whitespace-nowrap select-none text-3xl`}
          >
            En Garden!
          </h1>
        </Link>

        <LinksDropdown>
          {headerLinks.map((link, index) => (
            <Link key={index} href={link.href} className="hover:underline">
              {link.name}
            </Link>
          ))}
        </LinksDropdown>

        <nav className="flex items-center gap-4 lg:gap-6">
          <div className="flex items-center justify-center gap-4">
            <ThemeModeToggle />
            <AvatarDropdown />
          </div>
          <div className="self-stretch w-[1px] rounded-sm bg-border" />

          <MainSidebar className="" />

          {/*ac hides when is mobile - uses hooks */}
          <ActionButtonHeader />
        </nav>
      </div>
    </header>
  );
}

function LinksDropdown({ children }: { children: React.ReactNode }) {
  const linksChildren = React.Children.toArray(children);

  return (
    <nav className="hidden sm:block">
      <div className="items-center justify-center gap-6 lg:gap-8 hidden md:flex">
        {linksChildren}
      </div>
      {/* TODO: see if needed */}
      {/* <div className="block md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            Links
            <ChevronDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {linksChildren.map((child, index) => (
              <DropdownMenuItem key={index}>{child}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div> */}
    </nav>
  );
}
