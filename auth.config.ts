import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPage = nextUrl.pathname.startsWith("/admin");

      if (isAdminPage) {
        return isLoggedIn;
      }

      return true;
    },
    async jwt({token, user}){
      if(user){
        token.id=user.id;
        token.role=user.role;
      }
      return token;
    }
    async session({ session, token }) {
    if (session.user) {
      session.user.id = token.id ?? "";
      session.user.role = token.role ?? "USER";
    }

    return session;
  },
  },

  providers: [],
} satisfies NextAuthConfig;