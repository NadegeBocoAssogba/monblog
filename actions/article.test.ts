import { expect, describe, test, vi } from "vitest";
// const mocks = vi.hoisted(() => ({
//     create: vi.fn(),
//     redirect: vi.fn(),
//     revalidatePath: vi.fn(),
// }));
const createMock = vi.fn();
const redirectMock = vi.fn();
const revalidatePathMock = vi.fn();
import { createArticle } from "./article";


describe("createArticle", () => {
  test("accepte un article valide", async () => {
    const formData = new FormData();

    formData.set("title", "Htyuui");
    formData.set("slug", "");
    formData.set("excerpt", "Un extrait suffisamment long");
    formData.set("content", "Un contenu suffisamment long pour le test.");
    formData.set("published", "off");

    const result = await createArticle({}, formData);

    // expect(result).toBeDefined();
    // console.log(result);
  });
});


// Mocker le module "@/lib/prisma" pour simuler la fonction create de l'article
vi.mock("@/lib/prisma", () => ({
    prisma: {
        article: {
            create: mocks.create,
        },
    },
}));

// Mocker la fonction redirect de Next.js pour simuler la redirection vers la page d'articles
vi.mock("next/navigation", () => ({
    redirect: mocks.redirect,
}));

// Mocker la fonction revalidatePath de Next.js pour simuler la revalidation du cache
vi.mock("next/cache", () => ({
    revalidatePath: mocks.revalidatePath,
}));
