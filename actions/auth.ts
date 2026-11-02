'use server';
 
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";
import { registerSchema } from '@/lib/validations/user';
import { redirect } from 'next/navigation';
 
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
    
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Email ou mot de passe incorrect.';
        default:
          return 'Une erreur est survenue.';
      }
    }
    throw error;
  }
}

async function registerUser(
  prevState: String | undefined,
  formData: FormData
) {
  // Validation des données saisies
  // Recueil des données du formulaire
  const validateFields = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // Si la validation échoue, retourner un message d'erreur
  if (!validateFields.success){
    return validateFields.error.issues[0].message??"Les données saisies sont invalides.";
  }

  // Si la validation réussit, enregistrer ses infos dans une constante
  const {name, email, password} = validateFields.data;

  // Vérifier si l'utilisateur existe déjà dans la base de données à partir de son email
  const existingUser = await prisma.user.findUnique({
    where:{
      email
    }
  })
  if (existingUser){
    return "Cette adresse email est déjà utilisée.";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

}
