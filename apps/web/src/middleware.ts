import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";


const publicAppPaths = [
    "/app/login"
];

export default auth(async (req) => {
    const url = req.nextUrl.clone();

    if (url.pathname.includes("api/trpc")) {
        return NextResponse.next();
    }

    const pathname = req.nextUrl.pathname;

    const isPublicAppPath = publicAppPaths.some((path) =>
        pathname.startsWith(path),
    );

    if (!req.auth && pathname.startsWith("/app") && !isPublicAppPath) {
        return NextResponse.redirect(
            new URL(
                `/app/login?redirectTo=${encodeURIComponent(req.nextUrl.href)}`,
                req.url,
            ),
        );
    }


});

export const config = {
    matcher: [
        "/((?!api|assets|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
        "/",

    ]
}