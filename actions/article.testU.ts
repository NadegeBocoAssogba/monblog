import { expect, describe, it } from "vitest";
import { createArticle } from "./article";


describe("createArticle", () => {
    it("refuse un article invalide", async () => {
        const formData = new FormData();
        formData.set("title", "Ae");
        formData.set("slug", "a-a");
        formData.set("excerpt", "Voici un extrait suffisamment long.");
        formData.set("content", "Voici le contenu de mon article qui est suffisamment long.");
        formData.set("published", "off");

        const result = await createArticle({}, formData);
        expect(result).toBeDefined();
        expect(result?.errors).toBeDefined();
        expect(result?.errors?.title).toBeDefined();
        expect(result?.errors?.title?.[0]).toBe("Le titre doit contenir au moins 3 caractères.");
    });
});