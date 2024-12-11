import Link from "next/link";
import React from "react";

export default function Mainfooter() {
  return (
    <footer
      className="border-t   grid
  grid-cols-main shadow-sm mt-auto col-span-full"
    >
      <div className="flex items-center justify-center py-2  col-start-2 col-end-3">
        <ul role="list" className="flex items-center  gap-24">
          <li>
            <Link className="hover:underline" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/services">
              Services
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
