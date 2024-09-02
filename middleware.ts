import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
// isPublicRoute returns a boolean
const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware((auth, req) => {
  const isAdmin = auth().userId === process.env.ADMIN_USER_ID;

  if (isAdminRoute(req) && !isAdmin) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // this checks whether the route that we are accessing is added in the public route; if it's not, then we need to authenticate first using clerk in order for us to access the page
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
