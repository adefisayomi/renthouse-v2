import { NextRequest, NextResponse } from 'next/server';
import { auth_token } from './src/constants';

export default async function middleware (req: NextRequest) {

  const token = req.cookies.get(auth_token) || null;
  const { pathname } = req.nextUrl;

  // If there is no token and the user is on the dashboard page, redirect to the auth page
  if (!token && pathname.startsWith('/settings')) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

   // If there is a token, verify it
   if (token) {
    try {
      // If the user is on the auth page, redirect to the dashboard page
      if (pathname.startsWith('/auth')) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    } catch (error) {
      // If token verification fails, clear the cookie and redirect to the auth page
      const response = NextResponse.redirect(new URL('/signin', req.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
