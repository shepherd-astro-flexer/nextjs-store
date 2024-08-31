import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// isPublicRoute returns a boolean
const isPublicRoute = createRouteMatcher(["/", "/products(.*)", "/about"]);

export default clerkMiddleware((auth, req) => {
  console.log(req);
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
