import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ResponseJson } from "../shared/DTO/SharedDTO";
/**
 * * Function : middleware
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-07-31
 * Issue : 
 * @function middleware
 * @description Next.js 라우팅 제어 미들웨어 (권한이 필요한 페이지에 접근을 막는 역할)

 */
export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  console.log(pathname);
  if (pathname.startsWith("/admin") || pathname.startsWith("/user")) {
    console.log(pathname);
    const cookieHeader = req.headers.get("cookie") || "";
    const res = await fetch("http://localhost:3001/verify-session", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
    });

    if (res.status === 401) {
      const url = new URL('/login', req.url);
      return NextResponse.redirect(url);
    }

    const response: ResponseJson = await res.json();
    const userRole = response.role;

    if (pathname.startsWith("/admin")) {
      if (userRole === "admin") {
        return NextResponse.next();
      } else {
        const url = new URL("/login", req.url);
        return NextResponse.redirect(url);
      }
    }

    if (pathname.startsWith("/user")) {
      if (userRole === "admin" || userRole === "user") {
        return NextResponse.next();
      } else {
        const url = new URL("/login", req.url);
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
