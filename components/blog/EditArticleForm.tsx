"use client";

import { useActionState } from "react";
import updateArticle from "@/actions/article";

type Article = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
};

type EditArticleFormProps = {
  article: Article;
};

export default function EditArticleForm({
  article,
}: EditArticleFormProps) {
  const updateArticleWithId = updateArticle.bind(
    null,
    article.id
  );

  const [state, formAction, isPending] = useActionState(
    updateArticleWithId,
    {
      errors: {},
      message: "",
    }
  );

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="mb-2 block font-medium"
        >
          Titre
        </label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={article.title}
          className="w-full rounded-md border p-2"
        />

        {state.errors?.title && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="slug"
          className="mb-2 block font-medium"
        >
          Slug
        </label>

        <input
          id="slug"
          name="slug"
          type="text"
          defaultValue={article.slug}
          className="w-full rounded-md border p-2"
        />

        {state.errors?.slug && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.slug[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="excerpt"
          className="mb-2 block font-medium"
        >
          Extrait
        </label>

        <textarea
          id="excerpt"
          name="excerpt"
          rows={3}
          defaultValue={article.excerpt}
          className="w-full rounded-md border p-2"
        />

        {state.errors?.excerpt && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.excerpt[0]}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="content"
          className="mb-2 block font-medium"
        >
          Contenu
        </label>

        <textarea
          id="content"
          name="content"
          rows={10}
          defaultValue={article.content ?? ""}
          className="w-full rounded-md border p-2"
        />

        {state.errors?.content && (
          <p className="mt-1 text-sm text-red-600">
            {state.errors.content[0]}
          </p>
        )}
      </div>

      {state.message && (
        <p className="text-sm text-red-600">
          {state.message}
        </p>
      )}

      <div className="flex items-center gap-2">
        <input
          id="published"
          name="published"
          type="checkbox"
          defaultChecked={article.published}
          className="h-4 w-4"
        />

        <label htmlFor="published">
          Publier cet article
        </label>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-black px-5 py-2 text-white disabled:opacity-50"
      >
        {isPending ? "Modification..." : "Enregistrer"}
      </button>
    </form>
  );
}