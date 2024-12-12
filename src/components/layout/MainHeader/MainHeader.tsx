import { ThemeModeToggle } from "@/components/ThemeModeToggle/ThemeModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { yujiMai } from "@/fonts";
import Link from "next/link";
import React from "react";

import AvatarDropdown from "@/components/layout/MainHeader/AvatarDropdown";
import ActionButtonDropdown from "@/components/layout/MainHeader/ActionButtonDropdown";
import { Mail, MailPlus, Phone, Send } from "lucide-react";

export default function MainHeader() {
  return (
    <header className={`border-b shadow-sm col-span-full grid grid-cols-main`}>
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
          <Link className="hover:underline" href="/contact">
            Contact
          </Link>
        </nav>

        <nav className="flex items-center gap-8">
          <div className="flex items-center justify-center gap-4">
            <ThemeModeToggle />
            <AvatarDropdown />
          </div>
          <div className="self-stretch w-[1px] rounded-sm bg-border" />

          <ActionButtonDropdown />
        </nav>
      </div>
    </header>
  );
}
