import {expect, describe, it} from "vitest";
import {articleSchema} from "./article";

describe("articleSchema", () => {
    it("accepte un article valide", () => {
        const article = {
            title: "Mon article",
            slug: "mon-article",
            excerpt: "Voici un extrait suffisamment long.",
            content: "Voici le contenu de mon article qui est suffisamment long.",
            published: false,
        };
        const result = articleSchema.safeParse(article);
        expect(result.success).toBe(true)
    });
    it("refuse un titre trop court", () => {
        const article = {
            title: "Hi",
            slug: "mon-article",
            excerpt: "Voici un extrait suffisamment long.",
            content: "Voici le contenu de mon article qui est suffisamment long.",
            published: false,
        };

        const result = articleSchema.safeParse(article);

        expect(result.success).toBe(false);
    });
    it("refuse un slug invalide", () => {
        const article = {
            title: "Mon article",
            slug: "mon-article-avec-des-caracteres-invalide$",
            excerpt: "Voici un extrait suffisamment long.",
            content: "Voici le contenu de mon article qui est suffisamment long.",
            published: false,
        };

        const result = articleSchema.safeParse(article);

        expect(result.success).toBe(false);
    });
    it("refuse un extrait trop court", () => {
        const article = {
            title: "Mon article",
            slug: "mon-article",
            excerpt: "extrait.",
            content: "Voici le contenu de mon article qui est suffisamment long.",
            published: false,
        };

        const result = articleSchema.safeParse(article);

        expect(result.success).toBe(false);
    });
    it("refuse un contenu trop court", () => {
        const article = {
            title: "Mon article",
            slug: "mon-article",
            excerpt: "Voici un extrait suffisamment long.",
            content: "contenu.",
            published: false,
        };

        const result = articleSchema.safeParse(article);

        expect(result.success).toBe(false);
    });
    it("refuse published s'il n'est pas booléen", () => {
        const article = {
            title: "Mon article",
            slug: "mon-article",
            excerpt: "Voici un extrait suffisamment long.",
            content: "Voici le contenu de mon article qui est suffisamment long.",
            published: "non",
        };

        const result = articleSchema.safeParse(article);

        expect(result.success).toBe(false);
    });
});