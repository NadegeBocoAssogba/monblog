import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user}){
      if (user){
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      //Si l’objet utilisateur existe dans la session
      if (session.user) {
        // session.user.id = token.id ?? "";
        session.user.id = (token.id as string) ?? "";
        // session.user.role = token.role ?? "USER";
        session.user.role = (token.role as "USER" | "ADMIN" | undefined) ?? "USER";

      }

    return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPage = nextUrl.pathname.startsWith("/admin");
      const isLoginPage = nextUrl.pathname === "/login";

      if (isAdminPage) {
        if (!isLoggedIn) return false;

        if (auth.user.role !== "ADMIN") {
          return Response.redirect(new URL("/", nextUrl));
        }

        return true;
      }

      if (isLoginPage && auth?.user?.role === "ADMIN") {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },

  },

  providers: [],
} satisfies NextAuthConfig;