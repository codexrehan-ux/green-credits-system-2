import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

const protectedPaths = [
    "/dashboard",
    "/actions",
    "/redeem",
    "/profile",
    "/history",
    "/onboarding",
    "/leaderboard",
    "/impact",
];

export default auth((req) => {
    const { pathname } = req.nextUrl;
    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

    if (isProtected && !req.auth) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Redirect logged-in users away from login page
    if (pathname === "/login" && req.auth) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/actions/:path*",
        "/redeem",
        "/profile",
        "/history",
        "/onboarding",
        "/leaderboard",
        "/impact",
        "/login",
    ],
};
