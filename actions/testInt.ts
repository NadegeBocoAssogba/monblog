import { expect, describe, test, vi } from "vitest";
import {prisma} from "@/lib/prisma";
import {createArticle} from "./article";

const { revalidatePathMock, redirectMock } = vi.hoisted(() => ({
    revalidatePathMock: vi.fn(),
    redirectMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
    redirect: redirectMock,
}));

vi.mock("next/cache", () => ({
    revalidatePath: revalidatePathMock,
}));

describe('createArticle', () =>{
    test("crée un article valide dans la base", async ()=>{
        const formData = new FormData();
        formData.set("title", "Article valide");
        formData.set("slug", "article-valide");
        formData.set("excerpt", "L'extrait");
        formData.set("content", "La description de mon article valide");
        formData.set("published", "on")

        await createArticle({}, formData);

        const article = await prisma.article.findFirst({
            where: {title:"Article valide"}
        });

        expect(article).toBeDefined();
        expect(article?.excerpt).toBe("L'extrait")

        expect(redirectMock).toHaveBeenCalled();
        expect(revalidatePathMock).toHaveBeenCalled();
    })
})