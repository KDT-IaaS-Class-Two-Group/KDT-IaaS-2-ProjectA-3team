import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/project")) {
    const cookieHeader = req.headers.get("cookie") || "";
    console.log(cookieHeader);
    const res = await fetch("http://localhost:3001/verify-session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
    });

    if (res.status === 401) {
      const url = new URL("/login", req.url);

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/project/:path*"],
};

// dispatchEvent
// 비공개 상태 토큰 -> ?
// Browser 저장용량
// 갈아끼우는 형태. 검증된 상태로
