import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const members = [
  {
    name: "Mai Thanh",
    role: "Florist",
    imgSrc: "https://ui.shadcn.com/avatars/01.png",
    description:
      "Mai is a passionate gardener with over 10 years of experience. She loves to create beautiful gardens and care for plants.",
  },
  {
    name: "Peter Johnson",
    role: "Gardener",
    imgSrc: "https://ui.shadcn.com/avatars/02.png",
    description:
      "Peter is a co-founder of En Garden. He is an experienced gardener who loves to grow vegetables and fruits.",
  },
  {
    name: "Brenda Smith",
    role: "Gardener",
    imgSrc: "https://ui.shadcn.com/avatars/03.png",
    description:
      "Brenda is an experienced gardener who loves to grow vegetables and fruits. She is passionate about organic gardening.",
  },
];

export default function TeamPage() {
  return (
    <div className="flex items-center flex-col py-20 min-h-full ">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Meet the team!</h1>
        {/* <p
          className="text-lg text-stone-500 font-extralight dark:text-stone-300 max-w-prose mx-auto"
          style={{ marginTop: "1rem" }}
        >
          We are passionate individuals who are dedicated to gardening and
          nature.
        </p> */}
      </div>

      <div className="flex items-stretch flex-col lg:flex-row gap-20 mt-12">
        {members.map((member) => (
          <MemberCard
            key={member.name}
            name={member.name}
            role={member.role}
            imgSrc={member.imgSrc}
            description={member.description}
          />
        ))}
      </div>
    </div>
  );
}

function MemberCard({
  name,
  role,
  imgSrc,
  description,
}: {
  name: string;
  role: string;
  imgSrc: string;
  description?: string;
}) {
  return (
    <div className="flex items-center gap-12 lg:gap-4 p-8 sm:p-6  lg:flex-col sm:flex-row flex-col shadow-md hover:shadow-lg transition-shadow bg-[#fefefe] border dark:bg-stone-900 lg:py-14 rounded-2xl lg:px-10 group">
      <div className="group-hover:animate-hop fill-mode-forwards min-w-fit flex justify-center">
        <Image
          src={imgSrc}
          alt={name}
          width={100}
          height={100}
          className=" object-cover rounded-full w-40 h-40"
        />
      </div>

      <div className="">
        <div className="flex lg:flex-col justify-center sm:justify-normal lg:justify-center flex-wrap-reverse items-center gap-2 mt-2">
          <h2 className="bg-primary order-1 text-primary-foreground px-2 text-sm font-medium rounded-full">
            {role}
          </h2>
          <h3 className="text-xl flex lg:order-2 items-center gap-2 font-semibold whitespace-nowrap">
            {name}
          </h3>
        </div>
        <p className="lg:text-center text-stone-500 dark:text-stone-300 my-4 max-w-prose mx-auto">
          {description}
        </p>
      </div>

      <div className="flex items-center sm:flex-col lg:flex-row justify-center gap-6 lg:mt-auto mr-4 lg:mr-0">
        <SocialButton>
          <Image
            src={"/icons/facebook_logo_primary.png"}
            alt="facebook logo"
            width={35}
            height={35}
          />
        </SocialButton>
        <SocialButton>
          <Image
            src={"/icons/instagram_glyph_gradient.png"}
            alt="instagram logo"
            width={35}
            height={35}
          />
        </SocialButton>
        <SocialButton>
          <Image
            className="hidden dark:block"
            src={"/icons/x-logo-white.png"}
            alt="x logo"
            width={35}
            height={35}
          />
          <Image
            className="block dark:hidden"
            src={"/icons/x-logo-black.png"}
            alt="social"
            width={30}
            height={30}
          />
        </SocialButton>
        {/* <SocialButton href="/icons/facebook_logo_primary.png" /> */}

        {/* <SocialButton href="/icons/instagram_glyph_gradient.png" /> */}
        {/* <SocialButton href="/icons/x-logo-white.png" /> */}
      </div>
    </div>
  );
}

function SocialButton({ children }: { children?: React.ReactNode }) {
  return (
    <Button size={"icon"} variant="ghost" className="rounded-full">
      {children}
    </Button>
  );
}
