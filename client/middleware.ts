import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
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

  if (pathname.startsWith('/project')) {
    const cookieHeader = req.headers.get('cookie') || '';
    console.log(cookieHeader);
    const res = await fetch('http://localhost:3001/verify-session', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookieHeader,
      },
    });

    if (res.status === 401) {
      const url = new URL('/login', req.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/project/:path*'],
};

// dispatchEvent
// 비공개 상태 토큰 -> ?
// Browser 저장용량
// 갈아끼우는 형태. 검증된 상태로
