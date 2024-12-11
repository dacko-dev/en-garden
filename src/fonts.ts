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

// import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export default withAuth(
//   async function middleware(req: NextRequest) {
//     //    console.log(req);
//   },
//   {
//     isReturnToCurrentPage: true,
//   }
// );

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - images (image folder)
//      * - icons (icon folder)
//      * - favicon.ico, icon.png, sitemap.xml, robots.txt (metadata files)
//      * - homepage ($ after beginning)
//      */
//     "/((?!api|_next/static|_next/image|favicon.ico|icon.png|sitemap.xml|robots.txt|images|icons|$|about|services).*)",
//   ],
// };
