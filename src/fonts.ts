import { Poppins, Rubik_Bubbles, Yuji_Mai } from "next/font/google";

// export const inter = Inter({
//     subsets: ['latin'],
//     display: 'swap',
//   })

export const yujiMai = Yuji_Mai({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// Rubik Beastly

export const rubikBubbles = Rubik_Bubbles({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// Hind Mysuru
export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
