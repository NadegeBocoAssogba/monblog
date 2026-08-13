"use server";

import {prisma} from "@/lib/prisma";

export async function createArticle(formData: FormData) {
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    await prisma.article.createMany({
        data: [
            {
                title: title,
                slug: slug,
                excerpt: excerpt,
                content: content,
            },
        ],
    });
}