
import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(2, "Le nom doit contenir au moins 2 caractères."),

    email: z
      .string()
      .email("Veuillez saisir une adresse e-mail valide."),

    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères."),

    confirmPassword: z
      .string()
      .min(8, "Veuillez confirmer votre mot de passe."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas.",
    path: ["confirmPassword"],
  });
