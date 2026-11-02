import { auth } from "@/auth";
import { redirect } from "next/navigation"
export async function requireAdmin(){
    const session = await auth();

    if (!session?.user ){
        // throw new Error ("Vous devez être connecté pour accéder à cette page."); remplacé par une fonction de redirection.
        redirect("/login")
    }

    if (session.user.role !== "ADMIN"){ 
        // throw new Error ("Vous n'avez pas la permission d'accéder à cette page."); remplacé par une fonction de redirection.
        redirect("/")
    }

    return session.user;
}