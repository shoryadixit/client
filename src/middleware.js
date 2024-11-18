import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(request) {
  try {
    const authCookie = (await cookies()).get("connect.sid");

    const { pathname } = request.nextUrl;

    const authPages = ["/login", "/register"];
    const isAuthPage = authPages.includes(pathname);

    if (!authCookie && (pathname.startsWith("/account") || pathname.startsWith("/product"))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (authCookie && isAuthPage) {
      try {
        const res = await fetch("https://server-vczs.onrender.com/api/session", {
          method: "POST",
          headers: {
            Cookie: `${authCookie.name}=${authCookie.value}`,
          },
          credentials: "include",
          cache: "no-store",
        });

        if (res.ok) {
          const data = await res.json();
          if (!data.error) {
            return NextResponse.redirect(new URL("/", request.url));
          }
        }
      } catch (error) {
        console.error("Session verification failed:", error);
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    // Protected routes
    "/account/:path*",
    "/product/:path*",
    // Auth pages
    "/login",
    "/register",
  ],
};
