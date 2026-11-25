"use server";

import {prisma} from "@/lib/prisma";
import {articleSchema} from "@/lib/validations/article";
import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache";
import { requireAuth } from "@/lib/auth-helpers"
// import { auth } from "@/auth";

export async function createArticle(prevState: unknown, formData: FormData) {
    const user = await requireAuth();

    const validateFields = articleSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        published: formData.get("published") === "on",
        authorId: user.id,
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    const { title, slug, excerpt, content, published } = validateFields.data;

    try {
        await prisma.article.create({
            data:{
                title: title,
                slug: slug,
                excerpt: excerpt,
                content: content,
                published: published,
                authorId: Number(user.id),
            },
        });
        
    } catch (error) {
        console.error("Erreur lors de la création de l'article:", error);
        return {
            message: "Une erreur est survenue lors de la création de l'article. Veuillez réessayer.",
        }
    }
    revalidatePath("/articles");
    redirect("/articles");

}


export default async function updateArticle(
    id: number,
    prevState: unknown,
    formData: FormData
) {
    // Vérifier que l'utilisateur est authentifié et récupérer ses informations
    const user = await requireAuth();
    
    // Récupérer l'article à modifier
    const article = await prisma.article.findUnique({
        where: {
            id,
        },
    });

    // Vérifier que l'article existe
    if (!article) {
        return {
            message: "Article non trouvé ou accès refusé.",
        };
    }

    // Vérifier que l'utilisateur est l'auteur de l'article ou un administrateur
    if (article.authorId !== Number(user.id) && user.role !== "ADMIN") {
        return {
            message: "Vous n'avez pas la permission de modifier cet article.",
        };
    }

    // Valider les données du formulaire
    const validatedFields = articleSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        published: formData.get("published") === "on",
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    // Récupérer les données validées
    const { title, slug, excerpt, content, published } = validatedFields.data;


    // Modifier l'article dans la base de données
    try {
        await prisma.article.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                published,
            },
        });
    } catch (error) {
        console.error("Erreur lors de la modification :", error);

        return {
            message: "Impossible de modifier l'article.",
        };
    }

    // Actualiser la liste et rediriger
    revalidatePath("/articles");
    redirect("/articles");
}

export async function deleteArticle(id: number) {
    // Récupérer l'utilisateur connecté
    const user = await requireAuth();

    // Récupérer l'article à supprimer
    const article = await prisma.article.findUnique({
        where: {
            id,
        },
    });

    // Vérifier que l'article existe
    if (!article) {
        return {
            message: "Article non trouvé ou accès refusé.",
        };
    }

    // Vérifier que l'utilisateur est l'auteur de l'article ou un administrateur
    if (article.authorId !== Number(user.id) && user.role !== "ADMIN") {
        return {
            message: "Vous n'avez pas la permission de supprimer cet article.",
        };
    }

    // Supprimer l'article de la base de données
    try {
        await prisma.article.delete({
            where: { id },
        });
    } catch (error) {
        console.error("Erreur lors de la suppression :", error);
        
        return {
            message: "Impossible de supprimer l'article.",
        };
    }

    revalidatePath("/articles");
    redirect("/articles");
}