import { auth } from "@auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/jobs/new"];
  if (protectedRoutes.some((r) => pathname.startsWith(r)) && !isLoggedIn) {
    return Response.redirect(new URL(`/login?callbackUrl=${pathname}`, req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
