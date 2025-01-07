import { withAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export default withAuth(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function middleware(req: NextRequest) {},
  {
    // Redirect to the current page after login
    isReturnToCurrentPage: true,
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images, icons (static content folders)
     * - favicon.ico, icon.png, sitemap.xml, robots.txt (metadata files)
     * - homepage ($ after beginning)
     * - about, services, contact, team (static pages)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|sitemap.xml|robots.txt|images|icons|$|about|services|contact|team).*)",
  ],
};
