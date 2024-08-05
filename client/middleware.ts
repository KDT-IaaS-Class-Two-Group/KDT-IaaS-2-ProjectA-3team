import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ResponseJson } from "./ts/Interface/LoginResponse.interface";

// * ENUM
import ROUTE_PATH from "../shared/ENUM/PATHS.ENUM"
import USER_ROLE from "../shared/ENUM/ROLES.ENUM"
import CONTENT_TYPE from "../shared/ENUM/CONTENT_TYPE.ENUM"
import REQUEST_URL from "client/ts/enum/REQUEST_URL.ENUM"
import REQUEST_METHOD from "client/ts/enum/REQUEST_METHOD.ENUM"
import REQUEST_HEADER from "./ts/enum/REQUEST_HEADER.ENUM";
// * ENUM

/**
 * * Function : middleware
 * 작성자 : @naviadev / 2024-07-31
 * 편집자 : @naviadev / 2024-08-05
 * Issue : 
 * @function middleware
 * @description Next.js 라우팅 제어 미들웨어 (권한이 필요한 페이지에 접근을 막는 역할)
 */

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith(ROUTE_PATH.__ADMIN) || pathname.startsWith(ROUTE_PATH.__USER)) {
    const cookieHeader = req.headers.get(REQUEST_HEADER.COOKIE) || "";
    const res = await fetch(REQUEST_URL.__VERIFY_SESSION, {
      method: REQUEST_METHOD.__GET,
      headers: {
        [REQUEST_HEADER.CONTENT_TYPE] : CONTENT_TYPE.__JSON,
        Cookie: cookieHeader,
      },
    });

    if (res.status === 401) {
      const url = new URL(ROUTE_PATH.__LOGIN, req.url);
      return NextResponse.redirect(url);
    }

    const response: ResponseJson = await res.json();
    const userRole = response.role;
    if (pathname.startsWith(ROUTE_PATH.__ADMIN)) {
      if (userRole === USER_ROLE.__ADMIN) {
        return NextResponse.next();
      } else {
        const url = new URL(ROUTE_PATH.__LOGIN, req.url);
        return NextResponse.redirect(url);
      }
    }

    if (pathname.startsWith(ROUTE_PATH.__USER)) {
      if (userRole === USER_ROLE.__ADMIN || userRole === USER_ROLE.__EMPLOYEE) {
        return NextResponse.next();
      } else {
        const url = new URL(ROUTE_PATH.__ADMIN, req.url);
        return NextResponse.redirect(url);
      }
    }
  }
  return NextResponse.next();
};

export const config = {
  matcher: [ `${ROUTE_PATH.__ADMIN}/:path*`, `${ROUTE_PATH.__USER}/:path*`],
};
