import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];

function decodeJWT(token: string) {
  try {
    const base64Payload = token.split(".")[1];
    // Decode base64 URL-safe variant
    const payload = atob(base64Payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("auth-token")?.value;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const decoded = decodeJWT(token);
    if (!decoded) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < now) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (pathname.startsWith("/dashboard/")) {
      const requestedDashboard = pathname.split("/")[2];
      if (requestedDashboard && requestedDashboard !== decoded.userType) {
        return NextResponse.redirect(
          new URL(`/dashboard/${decoded.userType}`, request.url)
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
