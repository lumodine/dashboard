import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import tokenService from "./services/token.service";

const authRoutes = [
    "/sign-in",
    "/sign-up",
    "/forgot-password",
];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = await tokenService.getToken();
    const isAuthRoute = authRoutes.includes(pathname);
    
    if (!token && !isAuthRoute) {
        return NextResponse.redirect(new URL(authRoutes[0], request.url));
    } else if (token && isAuthRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};
