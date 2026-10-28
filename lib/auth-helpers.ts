import { auth } from "@/auth";
export async function requireAdmin(){
    const session = await auth();

    if (!session?.user ){
        throw new Error ("Vous devez être connecté pour accéder à cette page.");
    }

    if (session.user.role !== "ADMIN"){
        throw new Error ("Vous n'avez pas la permission d'accéder à cette page.");
    }

    return session.user;
}