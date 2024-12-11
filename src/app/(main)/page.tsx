import { Button } from "@/components/ui/button";
import { rubikBubbles } from "@/fonts";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex  justify-center items-center h-full">
      <div className="flex flex-col items-center  ">
        <div>
          <h1
            style={{
              backgroundSize: "15%",
            }}
            className={`${rubikBubbles.className} py-4 select-none bg-clip-text text-transparent bg-grass dark:bg-grassDark text-7xl font-bold`}
          >
            Still mowing the lawn?
          </h1>
        </div>
        <div className="w-24 h-24 test-home"></div>
        <Image
          src="/images/grass_texture_dark.jpg"
          alt="Garden Illustration"
          width={300}
          height={300}
        />
        {/* <div>
            <Image
              src="/images/cutting_grass_256.png"
              alt="Garden Illustration"
              width={300}
              height={300}
            />
          </div> */}
        <div className="flex items-center justify-center flex-col gap-4">
          <h2 className={`text-xl`}>
            Stop wasting your weekends. Let us do the work for you.
          </h2>
          <div className="flex items-center justify-between gap-8 ">
            <Button
              size={"lg"}
              variant={"outline"}
              className="text-lg font-normal"
            >
              <Link href="/services">Services</Link>
            </Button>
            <Button size={"lg"} className="text-lg font-normal">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
