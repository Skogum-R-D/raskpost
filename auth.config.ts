import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  session: { strategy: "jwt" as const },
  pages: { signIn: "/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedRoutes = ["/jobs/new"];
      if (protectedRoutes.some((r) => nextUrl.pathname.startsWith(r)) && !isLoggedIn) {
        return Response.redirect(new URL(`/login?callbackUrl=${nextUrl.pathname}`, nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
