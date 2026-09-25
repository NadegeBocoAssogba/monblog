// import NextAuth from 'next-auth';
// import { authConfig } from './auth.config';
// import Credentials from 'next-auth/providers/credentials';
// import { z } from 'zod';
// import type { User } from '@/app/lib/definitions';
// import bcrypt from 'bcrypt';
// import postgres from 'postgres';

// const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

// async function getUser(email: string): Promise<User | undefined> {
//   try{
//     const user = await sql<User[]>`SELECT * FROM users WHERE email = ${email}`;
//     return user[0];
//   }catch(e){
//     console.error("Échec de la récupération de l'utilisateur :", e);
//     throw new Error("Échec de la récupération de l'utilisateur :");
//   }
// }

 
// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({email: z.string().email(), password: z.string().min(8)})
//           .safeParse(credentials);

//           if (parsedCredentials.success) {
//             const { email, password } = parsedCredentials.data;
//             const user = await getUser(email);
//             if (!user) return null;
//             const isPasswordCorrect = await bcrypt.compare(password, user.password);
//             if (isPasswordCorrect) return user;
//           }
//           console.log("Identifiants invalides");
//           return null;
//       },
//     }),
//     ],
// });
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      // la fonction authorize permet de vérifier si les informations fournies par l'utilisateur sont correctes
      // dans mon cas, je vérifie si l'email et le mot de passe sont corrects
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email(), 
            password: z.string().min(8)
          })
          .safeParse(credentials);

          if (!parsedCredentials.success) {
            return null;
          }
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!user) {
            return null;
          };
          const isPasswordCorrect = await bcrypt.compare(
            password, 
            user.password
          );
          if (!isPasswordCorrect) {
            return null;
          }
          
          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            role: user.role,
          };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log("jwt");
      if (user) {
        token.id =user.id;
        // token.name = user.name;
        // token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("session");
      if (session.user) {
        session.user.id = token.id as string;
        // session.name = token.name;
        // session.email = token.email;
        (session.user as { role?: string }).role = token.role as string;
      }
      return session;
    },
  },
});