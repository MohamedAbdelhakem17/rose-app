import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const privatePages = ['/wishlist', '/orders', '/profile'];
const authPages = ['/login', '/forgot-password', '/register'];

const handleI18nRouting = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const pathname = req.nextUrl.pathname;

  //  Normalize path to remove locale prefix (e.g. /en/wishlist → /wishlist)
  const normalizedPath = (() => {
    const localePattern = new RegExp(
      `^/(${routing.locales.join('|')})(/|$)`,
      'i'
    );
    return pathname.replace(localePattern, '/');
  })();

  //  Redirect unauthenticated users trying to access private pages
  if (!token && privatePages.includes(normalizedPath)) {
    const url = new URL('/login', req.nextUrl.origin);
    url.searchParams.set('callbackUrl', normalizedPath);

    return NextResponse.redirect(url);
  }

  // Redirect logged-in users trying to access auth pages
  if (token && authPages.includes(normalizedPath)) {
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  //  Otherwise, continue with i18n routing
  return handleI18nRouting(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
