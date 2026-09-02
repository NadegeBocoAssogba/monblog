import {z} from "zod";
export const articleSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères."),

  slug: z
    .string()
    .min(3, "Le slug doit contenir au moins 3 caractères.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets."
    ),

  excerpt: z
    .string()
    .min(10, "L'extrait doit contenir au moins 10 caractères."),

  content: z
    .string()
    .min(20, "Le contenu doit contenir au moins 20 caractères."),
  
  published: z.boolean(),
});