"use server";

import {prisma} from "@/lib/prisma";
import {articleSchema} from "@/lib/validations/article";
import { redirect } from "next/navigation";
import {revalidatePath} from "next/cache";
import { requireAdmin } from "@/lib/auth-helpers"

export async function createArticle(prevState: unknown, formData: FormData) {
    try{
        await requireAdmin();
    } catch (error){
        return{
            message: error instanceof Error
                ? error.message
                : "Accès refusé.",
        }
    }
    const validateFields = articleSchema.safeParse({
        title: formData.get("title"),
        slug: formData.get("slug"),
        excerpt: formData.get("excerpt"),
        content: formData.get("content"),
        published: formData.get("published") === "on",
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
){
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
    const { title, slug, excerpt, content, published } = validatedFields.data;
    try {
        await prisma.article.update({
            where: {
                id,
            },
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

    revalidatePath("/articles");
    redirect("/articles");
}

export async function deleteArticle(id: number) {
    try {
        await prisma.article.delete({
            where: {
                id,
            },
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