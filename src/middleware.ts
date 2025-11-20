import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Remove locale prefix (/en, /ar)
  const pathname = nextUrl.pathname.replace(/^\/(en|ar)/, '');

  // Check if route starts with /dashboard
  const isDashboardRoute = pathname.startsWith('/dashboard');

  // Get session (NextAuth v4)
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // UNAUTHENTICATED -> redirect home
  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // AUTHENTICATED but NOT ADMIN → redirect home
  if (isDashboardRoute && token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Continue with intl routing
  return handleI18nRouting(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
