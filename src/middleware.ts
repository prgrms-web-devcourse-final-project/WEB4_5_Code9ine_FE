import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value;
  console.log('쿠키값은', token);
  // 미로그인 보호 경로
  const protectedPaths = ['/accountbook', '/board', '/profile'];
  if (
    protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path)) &&
    !token
  ) {
    const loginURL = req.nextUrl.clone();
    loginURL.pathname = '/login';
    return NextResponse.redirect(loginURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/accountbook', '/board', '/profile', '/'],
};
