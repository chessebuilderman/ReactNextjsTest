// import type { NextRequest } from 'next/server'


export { auth as middleware } from '@root/lib/common/auth/next-auth';
import { auth } from '@root/lib/common/auth/next-auth';

// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get('currentUser')?.value

//   if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//     return Response.redirect(new URL('/dashboard', request.url))
//   }

//   if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
//     return Response.redirect(new URL('/login', request.url))
//   }
// }

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/signin') {
    const newUrl = new URL('/signin', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }
});
