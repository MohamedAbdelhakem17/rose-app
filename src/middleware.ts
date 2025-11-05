import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const privatePages = ['/wishlist', '/checkout'];
const handleI18nRouting = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isPrivatePage = privatePages.some(p => pathname.includes(p));

  // Example: check if user has a token (customize this)
  const token = req.cookies.get('token')?.value;

  if (isPrivatePage && !token) {
    // user not logged in → redirect to login
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  // user logged in or public page → continue
  return handleI18nRouting(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
