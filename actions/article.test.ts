import { expect, describe, test, vi, beforeEach } from "vitest";

const {createMock, redirectMock, revalidatePathMock } = vi.hoisted(() => ({
    createMock: vi.fn(),
    redirectMock: vi.fn(),
    revalidatePathMock: vi.fn(),
}));
// const createMock = vi.fn();
// const redirectMock = vi.fn();
// const revalidatePathMock = vi.fn();

// Associer les fonctions mockées aux modules réels
vi.mock("@/lib/prisma", () => ({
    prisma: {
        article: {
            create: createMock,
        },
    },
}));

vi.mock("next/navigation", () => ({
    redirect: redirectMock,
}));

vi.mock("next/cache", () => ({
    revalidatePath: revalidatePathMock,
}));

import { createArticle } from "./article";

describe("createArticle", () => {
    // Réinitialiser ou nettoyer l'historique des mocks avant chaque test
    beforeEach(() => {
        vi.clearAllMocks();
    });

  test("accepte un article valide", async () => {

    // Dire à la fausse base de données comment réagir
    createMock.mockResolvedValue({
        id: 1,
        title: "Mon article",
        slug: "mon-article",
        excerpt: "Voici un extrait suffisamment long.",
        content: "Voici le contenu de mon article qui est suffisamment long.",
        published: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    // Créer un objet FormData pour simuler les données d'un formulaire
    const formData = new FormData();

    formData.set("title", "Mon article");
    formData.set("slug", "mon-article");
    formData.set("excerpt", "Voici un extrait suffisamment long.");
    formData.set("content", "Voici le contenu de mon article qui est suffisamment long.");
    formData.set("published", "false");

    const result = await createArticle({}, formData);

    // Vérifier que la fonction create a été appelée avec les bons arguments
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({
        data: expect.objectContaining({
            title: "Mon article",
            slug: "mon-article",
            excerpt: "Voici un extrait suffisamment long.",
            content: "Voici le contenu de mon article qui est suffisamment long.",
            published: false,
        }),
    });
    expect(redirectMock).toHaveBeenCalledWith("/articles");
    expect(revalidatePathMock).toHaveBeenCalledWith("/articles");
    expect(result).toBeUndefined();
  });
});