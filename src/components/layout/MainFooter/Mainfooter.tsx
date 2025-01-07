import Link from "next/link";
import React from "react";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

// TODO: mobile footer
export default function Mainfooter() {
  return (
    <footer
      className="border-t  hidden md:grid
  grid-cols-main shadow-sm mt-auto col-span-full"
    >
      <div className="flex items-center justify-center py-2  col-start-2 col-end-3 overflow-x-auto">
        <ul role="list" className="flex items-center  gap-24">
          {footerLinks.map(({ href, label }) => (
            <li key={href}>
              <FooterLink href={href}>{label}</FooterLink>
            </li>
          ))}
          {/* <li>
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
          <li>
            <Link className="hover:underline" href="/privacy">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link className="hover:underline" href="/terms">
              Terms of Service
            </Link>
          </li> */}
        </ul>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      className="hover:underline  text-sm opacity-90 hover:opacity-100  transition-opacity duration-100"
      href={href}
    >
      {children}
    </Link>
  );
}
