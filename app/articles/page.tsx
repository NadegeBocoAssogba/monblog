import { prisma } from "@/lib/prisma";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Articles
          </h1>

          <p className="mt-2 text-gray-600">
            Gérez les articles de votre blog.
          </p>
        </div>

        <a
          href="/articles/new"
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Nouvel article
        </a>
      </div>

      <div className="space-y-4">
        {articles.map((article) => (
          <article
            key={article.id}
            className="rounded-lg border p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {article.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {article.excerpt}
                </p>
              </div>

              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                {article.published
                  ? "Publié"
                  : "Brouillon"}
              </span>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              /{article.slug}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}