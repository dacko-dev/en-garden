import {
  Markazi_Text,
  Poppins,
  Rubik_Beastly,
  Rubik_Bubbles,
  Yuji_Mai,
} from "next/font/google";

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

export const rubikBeastly = Rubik_Beastly({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

export const rubikBubbles = Rubik_Bubbles({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

// Markazi
export const markazi = Markazi_Text({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Hind Mysuru
export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});
