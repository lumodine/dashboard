import type {NextRequest} from "next/server";
import {NextResponse} from "next/server";
import tokenService from "@/services/token.service";

const publicRoutes = ["/reset-password", "/forgot-password"];

const authRoutes = ["/", "/sign-up"];

export async function middleware(request: NextRequest) {
  const {pathname} = request.nextUrl;

  const publicRoute = publicRoutes.find((publicRoute) => pathname.indexOf(publicRoute) !== -1);

  if (publicRoute) {
    return;
  }

  const token = await tokenService.getToken();
  const isAuthRoute = authRoutes.includes(pathname);

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL(authRoutes[0], request.url));
  } else if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/d", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
