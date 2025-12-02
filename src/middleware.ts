import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const privatePages = ['/wishlist', '/orders', '/profile', '/dashboard'];
// const authPages = ['/login', '/forgot-password', '/register'];

const handleI18nRouting = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;

  // Remove locale prefix (/en, /ar)
  const pathname = nextUrl.pathname.replace(/^\/(en|ar)/, '');
  console.log('pathname: ' + pathname);

  // Check if route starts with /dashboard
  const isDashboardRoute = pathname.startsWith('/dashboard');

  const isDashboard = pathname === '/dashboard';
  if (isDashboard) {
    return NextResponse.redirect(new URL('/dashboard/overview', req.url));
  }

  // Get session (NextAuth v4)
  const token = await getToken({
    req,
  });
  console.log('token: ' + token?.role);

  // UNAUTHENTICATED -> redirect home
  if ((isDashboardRoute || privatePages.includes(pathname)) && !token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // AUTHENTICATED but NOT ADMIN → redirect home
  // if (isDashboardRoute && token?.role !== 'admin') {
  //   return NextResponse.redirect(new URL('/', req.url));
  // }

  // Continue with intl routing
  return handleI18nRouting(req);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
