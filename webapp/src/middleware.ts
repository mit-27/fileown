import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


const isProtectedRoute = createRouteMatcher([
    '/dashboard(.*)',
]);

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) {
        auth().protect()
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],

};