
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import {z} from "zod";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";


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

          if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!user){
            console.log("Utilisateur introuvable");
            return null;
          }
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch){
            console.log("Mot de passe incorrect");
            return null;
          }

          const userForAuth = {
            ...user,
            id: String(user.id),
          };

          console.log("Connexion réussie :", user.email);
          return userForAuth;

        }
        console.log("Identifiants incorrects")
        return null;
      },
    }),
  ],
});